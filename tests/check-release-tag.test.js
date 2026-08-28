// The release-tag guard. Companion to the release-surface check: that one asks
// whether the site surfaces agree with each other, this one asks whether git
// has a tag for the release they claim.
//
// Every case below is a way the guard could fail OPEN — pass a release that is
// not really tagged. That is the only interesting direction: a false refusal
// costs one loud message and an escape hatch, a false pass costs another
// untagged release, and the repo already has ten of those.
import { describe, it, expect } from "vitest";
import { mkdtempSync, rmSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { checkReleaseTag, readCatalogVersion, remediation } from "../scripts/check-release-tag.mjs";

/** Build a throwaway skills/ tree: { skillId: version }. */
function skillsTree(versions) {
  const dir = mkdtempSync(join(tmpdir(), "oc-skills-"));
  for (const [id, version] of Object.entries(versions)) {
    mkdirSync(join(dir, id), { recursive: true });
    writeFileSync(
      join(dir, id, "SKILL.md"),
      `---\nname: ${id}\nversion: ${version}\n---\n\n# ${id}\n\nSome prose that mentions version: 9.9.9 in the body.\n`,
    );
  }
  return dir;
}

/**
 * A fake git that answers from a table, so tests never touch a real repo.
 *
 * `reachable` models `merge-base --is-ancestor`, which signals through the exit
 * code: "" for yes, null for no. Faking this matters — the first version of the
 * checker called spawnSync directly for the ancestry test, so these cases quietly
 * ran against the real repo and broke in CI, where the checkout is shallow and
 * has no tags at all.
 */
function fakeGit({ tags = [], remoteTags = null, isRepo = true, reachable = true } = {}) {
  return (args) => {
    const [cmd] = args;
    if (cmd === "rev-parse" && args.includes("--git-dir")) return isRepo ? ".git" : null;
    if (cmd === "rev-parse") {
      const ref = args[args.length - 1].replace("refs/tags/", "");
      return tags.includes(ref) ? "a".repeat(40) : null;
    }
    if (cmd === "merge-base") return reachable ? "" : null;
    if (cmd === "ls-remote") {
      if (remoteTags === null) return null; // network down — unknowable, not empty
      const ref = args[args.length - 1].replace("refs/tags/", "");
      return remoteTags.includes(ref) ? `${"a".repeat(40)}\trefs/tags/${ref}` : "";
    }
    if (cmd === "fetch") return "";
    return null;
  };
}

describe("readCatalogVersion", () => {
  it("reads the lockstep version when every skill agrees", () => {
    const dir = skillsTree({ "oc-git-ops": "1.8.2", "oc-release-ops": "1.8.2" });
    expect(readCatalogVersion(dir)).toMatchObject({ version: "1.8.2", disagreement: null, count: 2 });
    rmSync(dir, { recursive: true, force: true });
  });

  it("reads only frontmatter, not a `version:` line in the body", () => {
    const dir = skillsTree({ "oc-git-ops": "1.8.2" });
    expect(readCatalogVersion(dir).version).toBe("1.8.2"); // body says 9.9.9
    rmSync(dir, { recursive: true, force: true });
  });

  it("reports a split catalog instead of picking the majority", () => {
    const dir = skillsTree({ a: "1.8.3", b: "1.8.3", c: "1.8.2" });
    const r = readCatalogVersion(dir);
    expect(r.version).toBeNull();
    expect(r.disagreement).toContain("1.8.3");
    expect(r.disagreement).toContain("1.8.2");
    rmSync(dir, { recursive: true, force: true });
  });
});

describe("checkReleaseTag", () => {
  const withTree = (versions, opts) => {
    const skillsDir = skillsTree(versions);
    try {
      return checkReleaseTag({ skillsDir, fetch: false, ...opts });
    } finally {
      rmSync(skillsDir, { recursive: true, force: true });
    }
  };

  it("passes when the tag exists, is reachable, and is on origin", () => {
    const r = withTree({ "oc-git-ops": "1.8.2" }, {
      git: fakeGit({ tags: ["v1.8.2"], remoteTags: ["v1.8.2"], reachable: true }),
    });
    expect(r).toMatchObject({ ok: true, version: "1.8.2", tag: "v1.8.2", reason: "tagged" });
  });

  it("REFUSES when the catalog was bumped but never tagged", () => {
    const r = withTree({ "oc-git-ops": "1.8.3" }, {
      git: fakeGit({ tags: ["v1.8.2"], remoteTags: ["v1.8.2"] }),
    });
    expect(r.ok).toBe(false);
    expect(r.reason).toBe("missing-tag");
    expect(r.errors.join(" ")).toContain("no v1.8.3 tag exists");
  });

  it("REFUSES a tag that exists but does not describe HEAD", () => {
    // A tag on an unrelated branch satisfies "exists" and means nothing. This is
    // also the shape CI produces on a shallow checkout, which is how the
    // spawnSync leak in the first implementation was found.
    const r = withTree({ "oc-git-ops": "1.8.2" }, {
      git: fakeGit({ tags: ["v1.8.2"], remoteTags: ["v1.8.2"], reachable: false }),
    });
    expect(r.ok).toBe(false);
    expect(r.reason).toBe("unreachable-tag");
  });

  it("REFUSES a tag that exists locally but was never pushed", () => {
    const r = withTree({ "oc-git-ops": "1.8.2" }, {
      git: fakeGit({ tags: ["v1.8.2"], remoteTags: [] }),
    });
    expect(r.ok).toBe(false);
    expect(r.reason).toBe("unpushed-tag");
  });

  it("does NOT refuse on an unreachable remote — unknowable is not absent", () => {
    // remoteTags: null models `git ls-remote` failing (offline, auth). Treating
    // that as "the tag is missing" would block every deploy on a flaky network.
    const r = withTree({ "oc-git-ops": "1.8.2" }, {
      git: fakeGit({ tags: ["v1.8.2"], remoteTags: null }),
    });
    expect(r.ok).toBe(true);
  });

  it("REFUSES a half-applied bump rather than guessing the release", () => {
    const r = withTree({ a: "1.8.3", b: "1.8.2" }, {
      git: fakeGit({ tags: ["v1.8.2", "v1.8.3"], remoteTags: ["v1.8.2", "v1.8.3"] }),
    });
    expect(r.ok).toBe(false);
    expect(r.reason).toBe("catalog-split");
  });

  it("REFUSES when git is unavailable — fails closed, like the commit gate", () => {
    const r = withTree({ "oc-git-ops": "1.8.2" }, { git: fakeGit({ isRepo: false }) });
    expect(r.ok).toBe(false);
    expect(r.reason).toBe("no-git");
  });

  it("REFUSES when no SKILL.md is readable at all", () => {
    const empty = mkdtempSync(join(tmpdir(), "oc-empty-"));
    const r = checkReleaseTag({ skillsDir: empty, fetch: false, git: fakeGit({}) });
    expect(r.ok).toBe(false);
    expect(r.reason).toBe("no-catalog");
    rmSync(empty, { recursive: true, force: true });
  });
});

describe("remediation", () => {
  it("tells you to push a tag you already made", () => {
    expect(remediation({ version: "1.8.3", tag: "v1.8.3", reason: "unpushed-tag" }))
      .toContain("git push origin v1.8.3");
  });

  it("names /oc-git-release for a tag that does not exist yet", () => {
    const text = remediation({ version: "1.8.3", tag: "v1.8.3", reason: "missing-tag" });
    expect(text).toContain("git tag -a v1.8.3");
    expect(text).toContain("/oc-git-release 1.8.3");
  });
});
