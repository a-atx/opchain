// The local release sequence must keep covering every GitHub Actions workflow:
// scripts/release-sequence.mjs is the manual-deploy substitute for CI when a
// release is cut, so a workflow added to .github/workflows/ without a ledger
// entry is a silent coverage gap. This suite pins the mapping via --list.
import { describe, it, expect } from "vitest";
import { spawnSync } from "node:child_process";
import { readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

function run(args) {
  return spawnSync(process.execPath, ["scripts/release-sequence.mjs", ...args], {
    cwd: ROOT,
    encoding: "utf8",
  });
}

describe("scripts/release-sequence.mjs", () => {
  const list = run(["--list"]);

  it("--list exits 0 and prints all three stages", () => {
    expect(list.status).toBe(0);
    for (const stage of ["pre-merge:", "pre-tag:", "post-deploy:"]) {
      expect(list.stdout).toContain(stage);
    }
  });

  it("every workflow in .github/workflows/ appears in the ledger", () => {
    const workflows = readdirSync(join(ROOT, ".github/workflows")).filter((f) => f.endsWith(".yml"));
    for (const wf of workflows) {
      expect(list.stdout, `${wf} has no ledger entry — add its local step`).toContain(wf);
    }
  });

  it("refuses an unknown stage with usage", () => {
    const r = run(["--stage", "nonsense"]);
    expect(r.status).toBe(1);
    expect(r.stderr).toContain("usage:");
  });

  it("refuses an unknown --env for post-deploy", () => {
    const r = run(["--stage", "post-deploy", "--env", "production-ish"]);
    expect(r.status).toBe(1);
  });
});
