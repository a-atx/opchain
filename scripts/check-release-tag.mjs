#!/usr/bin/env node
// check-release-tag.mjs
//
// Guards the other half of the release ledger from check-release-surfaces.mjs.
// That script asks "do the site surfaces agree with each other?"; this one asks
// "does a git tag exist for the release those surfaces are claiming?"
//
// ── why this exists ─────────────────────────────────────────────────────────
// oc-release-ops Phase 5 hands off to oc-git-ops for "the merge / tag", and
// orchestrator.md §3 lists the same edge. Both are prose, and orchestrator.md
// itself records why prose does not hold an edge: measured across 87 sessions,
// cross-skill prose produced zero autonomous invocations. The result, audited
// 2026-08-26: thirteen shipped releases on /changelog, three tags in git.
// v1.0 through v1.7 all shipped untagged. Consequences that actually bit:
//
//   * .github/workflows/publish-mcp-registry.yml runs `on: push: tags: v*`,
//     so ten releases never republished the MCP registry pointer.
//   * `/oc-release plan` reads `git log <last-release-tag>..HEAD` and had to
//     fall back to scraping changelog.astro.
//   * No `git checkout v1.6.0`. No bisect across releases.
//
// ── the trigger signal ──────────────────────────────────────────────────────
// The lockstep catalog version — the `version:` frontmatter shared by every
// skills/<id>/SKILL.md. oc-release-ops Principle 3 makes it the SSOT for the
// release semver, and src/lib/discovery.js surfaces it as /skills.json
// `catalogVersion`. A release deploy always moves it; a blog or hotfix deploy
// never does.
//
// That precision is the point. A guard that demanded a tag on EVERY production
// deploy would fire on every content deploy, and a guard that cries wolf gets
// disabled — taking the protection with it. That is rule 3 of the commit gate
// (plugins/opchain/hooks/pre-commit-gate.cjs), learned the same way.
//
// Header.CURRENT_RELEASE cannot serve as the signal: it is major.minor ("v1.8"),
// so it is blind to a patch release. The catalog version is full semver.
//
// Run:   node scripts/check-release-tag.mjs
// Exit:  0 when the release is tagged (or when no new release is being made),
//        1 when the catalog claims a version that git has no tag for.

import { readFileSync, readdirSync, existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));

/** Run git, returning trimmed stdout, or null on any failure. Never throws. */
function realGit(args, cwd) {
  try {
    const r = spawnSync("git", args, { cwd, encoding: "utf8" });
    return r.status === 0 ? (r.stdout || "").trim() : null;
  } catch {
    return null;
  }
}

/**
 * Read the lockstep catalog version from skills/<id>/SKILL.md frontmatter.
 *
 * Returns { version, disagreement } — `disagreement` is non-null when the
 * skills do not all agree, which means a bump is half-applied. oc-release-ops
 * calls the bump atomic for exactly this reason; a split catalog is a bug
 * whichever way you look at it, so we surface it rather than picking a winner.
 */
export function readCatalogVersion(skillsDir) {
  if (!existsSync(skillsDir)) return { version: null, disagreement: null, count: 0 };

  const seen = new Map(); // version -> [skill ids]
  let count = 0;

  for (const entry of readdirSync(skillsDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const skillMd = join(skillsDir, entry.name, "SKILL.md");
    if (!existsSync(skillMd)) continue;

    let text;
    try {
      text = readFileSync(skillMd, "utf8");
    } catch {
      continue;
    }
    // Frontmatter only — a `version:` deeper in the body is prose, not the field.
    const fm = text.startsWith("---") ? text.slice(3, text.indexOf("\n---", 3)) : text;
    const m = fm.match(/^version:\s*(\S+)\s*$/m);
    if (!m) continue;

    count += 1;
    const v = m[1];
    if (!seen.has(v)) seen.set(v, []);
    seen.get(v).push(entry.name);
  }

  if (seen.size === 0) return { version: null, disagreement: null, count };
  if (seen.size > 1) {
    const detail = [...seen.entries()]
      .sort((a, b) => b[1].length - a[1].length)
      .map(([v, ids]) => `${v} (${ids.length}: ${ids.slice(0, 3).join(", ")}${ids.length > 3 ? "…" : ""})`)
      .join(" vs ");
    return { version: null, disagreement: detail, count };
  }
  return { version: [...seen.keys()][0], disagreement: null, count };
}

/**
 * Is the release the catalog claims actually tagged in git?
 *
 * FAIL CLOSED. Every state we cannot evaluate — no git, no catalog, a split
 * catalog — is a refusal, never a pass. A gate whose error path is "allow" is
 * a formality; the commit gate learned that the expensive way (GATE-03).
 */
export function checkReleaseTag({ cwd = ROOT, git = realGit, skillsDir = join(ROOT, "skills"), fetch = true } = {}) {
  const { version, disagreement, count } = readCatalogVersion(skillsDir);

  if (disagreement) {
    return {
      ok: false,
      version: null,
      tag: null,
      reason: "catalog-split",
      errors: [
        `skills/*/SKILL.md do not agree on a version: ${disagreement}.`,
        "A half-applied bump. Finish (or revert) `/oc-release bump` before deploying.",
      ],
    };
  }

  if (!version) {
    return {
      ok: false,
      version: null,
      tag: null,
      reason: "no-catalog",
      errors: [
        `could not read a version from any SKILL.md under ${skillsDir} (${count} scanned).`,
        "Refusing to certify a release whose version cannot be determined.",
      ],
    };
  }

  const tag = `v${version}`;

  if (git(["rev-parse", "--git-dir"], cwd) === null) {
    return {
      ok: false,
      version,
      tag,
      reason: "no-git",
      errors: ["not a git repository (or git unavailable) — cannot verify the release tag."],
    };
  }

  // Best-effort: a stale local tag list would fail an honest deploy.
  if (fetch) git(["fetch", "origin", "--tags", "--quiet"], cwd);

  const localTag = git(["rev-parse", "-q", "--verify", `refs/tags/${tag}`], cwd);
  if (!localTag) {
    return {
      ok: false,
      version,
      tag,
      reason: "missing-tag",
      errors: [`the catalog is at ${version}, but no ${tag} tag exists.`],
    };
  }

  // The tag must describe code that is actually in what we are shipping.
  // A tag on an unrelated branch would satisfy "exists" and mean nothing.
  //
  // Routed through the injected `git` rather than spawnSync so it is testable.
  // The first cut called spawnSync directly here, which made the "unit" tests
  // secretly depend on the real repo's tag graph: they passed locally and failed
  // in CI, where actions/checkout is shallow and carries no tags.
  // `--is-ancestor` communicates through the exit code, so success is "" (exit 0,
  // no stdout) and failure is null — distinguishable, since "" !== null.
  const reachable = git(["merge-base", "--is-ancestor", tag, "HEAD"], cwd) !== null;
  if (!reachable) {
    return {
      ok: false,
      version,
      tag,
      reason: "unreachable-tag",
      errors: [`${tag} exists but is not an ancestor of HEAD — it describes code you are not shipping.`],
    };
  }

  const onOrigin = git(["ls-remote", "--tags", "origin", `refs/tags/${tag}`], cwd);
  if (onOrigin !== null && onOrigin === "") {
    return {
      ok: false,
      version,
      tag,
      reason: "unpushed-tag",
      errors: [`${tag} exists locally but was never pushed — publish-mcp-registry never fired for it.`],
    };
  }

  return { ok: true, version, tag, reason: "tagged", errors: [] };
}

/** The remediation text is shared by the CLI and deploy.mjs so they cannot drift. */
export function remediation({ version, tag, reason }) {
  if (reason === "unpushed-tag") {
    return `Push it:\n    git push origin ${tag}\n`;
  }
  if (reason === "missing-tag") {
    return (
      `Tag the release before shipping it:\n` +
      `    git tag -a ${tag} -m "release: ${tag}"\n` +
      `    git push origin ${tag}\n\n` +
      `Or run /oc-git-release ${version}, which does both and records the tag\n` +
      `in the oc-git-ops checkpoint.\n`
    );
  }
  return "";
}

// CLI
if (import.meta.url === `file://${process.argv[1]}`) {
  const result = checkReleaseTag();
  console.log("RELEASE TAG CHECK");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`  catalog version:  ${result.version ?? "(unreadable)"}`);
  console.log(`  expected tag:     ${result.tag ?? "(n/a)"}`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  if (result.ok) {
    console.log(`✓ ${result.tag} exists, is an ancestor of HEAD, and is on origin`);
    process.exit(0);
  }
  console.error(`✗ release-tag check failed:\n  - ${result.errors.join("\n  - ")}`);
  const fix = remediation(result);
  if (fix) console.error(`\n${fix}`);
  process.exit(1);
}
