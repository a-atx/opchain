#!/usr/bin/env node
// The GitHub Actions surface, runnable as a local release sequence.
//
// This repo's deploys are manual and its branch protection has been bypassed
// before when Actions provably weren't firing (2026-08 precedent: admin-merge
// with local verification substituting). This script makes that substitution
// principled instead of ad hoc: every workflow in .github/workflows/ maps to a
// named step here, grouped into the three moments of a release cut —
//
//   pre-merge     run on the release branch before it merges      (ci.yml, lighthouse.yml)
//   pre-tag       run from an origin/main checkout before signing (release-ledger.yml's gate,
//                                                                  check-release-surfaces)
//   post-deploy   run against staging/prod after a deploy         (canary.yml, deploy-lag.yml,
//                                                                  mirror-public.yml,
//                                                                  publish-mcp-registry.yml,
//                                                                  lighthouse-prod.yml)
//
// Classes: `fail` steps gate the sequence (exit 1); `warn` steps report and
// continue (advisory in CI too, or dependent on optional local tooling).
// Opchain-internal: lives in scripts/, never mirrored, not part of the
// shipped skill catalog.
//
//   node scripts/release-sequence.mjs --stage pre-merge
//   node scripts/release-sequence.mjs --stage pre-tag --version 1.9.0
//   node scripts/release-sequence.mjs --stage post-deploy --env staging
//   node scripts/release-sequence.mjs --list
import { spawnSync, execSync } from "node:child_process";
import { existsSync, lstatSync, readlinkSync, readdirSync } from "node:fs";
import { homedir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = process.env.OPCHAIN_ROOT ?? join(dirname(fileURLToPath(import.meta.url)), "..");
const ENV_URLS = { staging: "https://staging.opchain.dev", prod: "https://opchain.dev" };

function sh(cmd, opts = {}) {
  const r = spawnSync(cmd, { shell: true, cwd: opts.cwd ?? ROOT, encoding: "utf8", env: { ...process.env, ...opts.env } });
  return { ok: r.status === 0, out: `${r.stdout ?? ""}${r.stderr ?? ""}`.trim(), status: r.status };
}

function git(args) {
  try {
    return execSync(`git ${args}`, { cwd: ROOT, encoding: "utf8" }).trim();
  } catch {
    return null;
  }
}

const playwrightBrowsersPresent = () => {
  for (const dir of [join(homedir(), "Library/Caches/ms-playwright"), join(homedir(), ".cache/ms-playwright")]) {
    try {
      if (readdirSync(dir).some((d) => d.startsWith("chromium"))) return true;
    } catch {}
  }
  return false;
};

function checkSkillSymlinks() {
  // Mirrors ci.yml's inline ".claude/skills has no drift from skills/" job.
  const problems = [];
  const linkDir = join(ROOT, ".claude/skills");
  for (const name of readdirSync(linkDir)) {
    if (name === "orchestrator.md") continue;
    const p = join(linkDir, name);
    if (!lstatSync(p).isSymbolicLink()) problems.push(`${name}: not a symlink`);
    else if (readlinkSync(p) !== `../../skills/${name}`) problems.push(`${name}: wrong target ${readlinkSync(p)}`);
  }
  for (const d of readdirSync(join(ROOT, "skills"), { withFileTypes: true })) {
    if (d.isDirectory() && !existsSync(join(linkDir, d.name)))
      problems.push(`skills/${d.name}: no .claude/skills symlink`);
  }
  return { ok: problems.length === 0, out: problems.join("\n") || "symlinks clean" };
}

async function probeHealth(base) {
  // Mirrors canary.yml: 200, JSON, no x-deny-reason, cache-busted, 3 attempts.
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(`${base}/api/health?rs=${Date.now()}`, { signal: AbortSignal.timeout(10_000) });
      const deny = res.headers.get("x-deny-reason");
      if (deny) return { ok: false, out: `x-deny-reason=${deny} — Worker custom-domain binding missing; re-run the deploy from a logged-in laptop` };
      const ct = res.headers.get("content-type") ?? "";
      if (res.status !== 200 || !ct.includes("application/json"))
        return { ok: false, out: `HTTP ${res.status}, content-type ${ct} — a Cloudflare challenge here also blinds /mcp (docs/runbooks/cloudflare-challenge.md)` };
      const body = await res.json();
      return { ok: !!body.version, out: `version=${body.version}` , version: body.version };
    } catch (err) {
      if (attempt === 3) return { ok: false, out: String(err) };
    }
  }
}

// ── the ledger: every workflow → its local step ─────────────────────────────
const LEDGER = [
  // pre-merge — ci.yml worker job, in its order
  { id: "checkpoint-validate", workflow: "ci.yml", stage: "pre-merge", cls: "fail", run: () => sh("npm run checkpoint:validate") },
  { id: "hook-suites", workflow: "ci.yml", stage: "pre-merge", cls: "fail", run: () => sh("npm run test:hooks") },
  { id: "checkpoint-doctor", workflow: "ci.yml (advisory)", stage: "pre-merge", cls: "warn", run: () => sh("npm run checkpoint:doctor") },
  { id: "bundle-sync", workflow: "ci.yml", stage: "pre-merge", cls: "fail", run: () => sh("npm run sync-bundles:check") },
  { id: "skill-symlinks", workflow: "ci.yml", stage: "pre-merge", cls: "fail", run: checkSkillSymlinks },
  { id: "unit-tests", workflow: "ci.yml", stage: "pre-merge", cls: "fail", run: () => sh("npm test") },
  {
    id: "worker-build", workflow: "ci.yml", stage: "pre-merge", cls: "fail",
    run: () => sh("npm run build", { env: { OPCHAIN_VERSION: git("rev-parse --short HEAD") ?? "local" } }),
  },
  { id: "astro-check", workflow: "ci.yml (site job)", stage: "pre-merge", cls: "fail", run: () => sh("npm run check", { cwd: join(ROOT, "site") }) },
  { id: "roadmap-data", workflow: "ci.yml (e2e prep)", stage: "pre-merge", cls: "warn", run: () => sh("node scripts/gen-roadmap.mjs") },
  {
    id: "site-e2e", workflow: "ci.yml (site-e2e job)", stage: "pre-merge", cls: "fail",
    run: () => playwrightBrowsersPresent()
      ? sh("npm run test:e2e", { cwd: join(ROOT, "site") })
      : { ok: false, skip: true, out: "Playwright browsers not installed — `cd site && npm run test:e2e:install`, then re-run" },
  },
  {
    id: "lighthouse-budgets", workflow: "lighthouse.yml", stage: "pre-merge", cls: "warn",
    run: () => existsSync(join(ROOT, "site/node_modules/.bin/lhci"))
      ? sh("npx --no -- lhci autorun --config=../lighthouserc.cjs", { cwd: join(ROOT, "site") })
      : { ok: false, skip: true, out: "lhci not installed in site/ — `cd site && npm install`, then re-run" },
  },

  // pre-tag — from an origin/main checkout, before signing (Appendix B B2)
  {
    id: "tag-gate-expects-missing", workflow: "release-ledger.yml (the gate it backstops)", stage: "pre-tag", cls: "fail",
    run: () => {
      const r = sh(`node scripts/check-release-tag.mjs${process.argv.includes("--json") ? " --json" : ""}`);
      // Right before signing, the correct state is a clean refusal naming the
      // NEW version's missing tag. Anything else — catalog-split,
      // tag-version-mismatch, seal errors — means the bump is incomplete.
      if (r.out.includes("missing-tag")) return { ok: true, out: "gate reports missing-tag for the new version — sign and push the tag next" };
      if (r.ok) return { ok: true, out: "already tagged — post-tag re-run" };
      return { ok: false, out: r.out };
    },
  },
  { id: "release-surfaces", workflow: "(site-half CI companion)", stage: "pre-tag", cls: "fail", run: () => sh("node scripts/check-release-surfaces.mjs") },
  { id: "clean-tree", workflow: "(local hygiene)", stage: "pre-tag", cls: "warn", run: () => {
      const out = git("status --porcelain") ?? "";
      return { ok: out === "", out: out || "working tree clean" };
    },
  },

  // post-deploy — against the environment just shipped
  {
    id: "canary-health", workflow: "canary.yml", stage: "post-deploy", cls: "fail",
    run: async (ctx) => probeHealth(ctx.baseUrl),
  },
  {
    id: "deploy-lag", workflow: "deploy-lag.yml", stage: "post-deploy", cls: "fail",
    run: async (ctx) => {
      git("fetch origin");
      const head = git("rev-parse --short origin/main");
      const probe = await probeHealth(ctx.baseUrl);
      if (!probe.ok) return probe;
      const ok = head && (probe.version.startsWith(head) || head.startsWith(probe.version));
      return { ok, out: `live=${probe.version} origin/main=${head}${ok ? "" : " — DRIFT"}` };
    },
  },
  { id: "smoke", workflow: "canary.yml (deep probe)", stage: "post-deploy", cls: "fail", run: (ctx) => sh(ctx.envName === "prod" ? "npm run smoke:prod" : "npm run smoke:staging") },
  {
    id: "release-ledger", workflow: "release-ledger.yml", stage: "post-deploy", cls: "fail", prodOnly: true,
    run: () => {
      // check-release-tag verifies ancestry of *this checkout's* HEAD. From a
      // feature worktree that's a guaranteed false refusal — the deploy's own
      // gate already ran it at ship time from the shipped checkout.
      const head = git("rev-parse HEAD");
      const main = git("rev-parse origin/main");
      if (head !== main)
        return { ok: false, skip: true, out: `HEAD (${head?.slice(0, 7)}) != origin/main (${main?.slice(0, 7)}) — run from an origin/main checkout for the full ledger check (the deploy's own gate enforced it at ship time)` };
      return sh("node scripts/check-release-tag.mjs");
    },
  },
  {
    id: "registry-publish", workflow: "publish-mcp-registry.yml", stage: "post-deploy", cls: "warn", prodOnly: true,
    run: () => {
      const r = sh("gh run list --workflow publish-mcp-registry.yml --limit 1 --json conclusion,displayTitle --jq '.[0] | .conclusion + \" \" + .displayTitle'");
      if (!r.ok) return { ok: false, skip: true, out: "gh unavailable — check the Publish to MCP Registry run on GitHub by hand" };
      return { ok: r.out.startsWith("success"), out: r.out };
    },
  },
  {
    id: "mirror-sync", workflow: "mirror-public.yml", stage: "post-deploy", cls: "warn", prodOnly: true,
    run: () => {
      const r = sh("gh api repos/asfbay-bit/opchain-skills/commits/HEAD --jq .commit.message");
      if (!r.ok) return { ok: false, skip: true, out: "gh unavailable — check asfbay-bit/opchain-skills' latest mirror commit by hand" };
      const head = git("rev-parse origin/main") ?? "";
      const ok = r.out.includes(head.slice(0, 7));
      return { ok, out: `${r.out}${ok ? "" : ` — mirror behind origin/main ${head.slice(0, 7)} (skills-touching pushes only; may be expected)`}` };
    },
  },
  {
    id: "lighthouse-prod", workflow: "lighthouse-prod.yml", stage: "post-deploy", cls: "warn", prodOnly: true,
    run: () => existsSync(join(ROOT, "site/node_modules/.bin/lhci"))
      ? sh("npx --no -- lhci autorun --config=../lighthouserc.prod.cjs", { cwd: join(ROOT, "site") })
      : { ok: false, skip: true, out: "lhci not installed in site/ — `cd site && npm install`, then re-run" },
  },
];

// ── cli ─────────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const flag = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : null;
};

if (args.includes("--list")) {
  console.log("workflow → local step (class) by stage\n");
  for (const stage of ["pre-merge", "pre-tag", "post-deploy"]) {
    console.log(`${stage}:`);
    for (const s of LEDGER.filter((s) => s.stage === stage))
      console.log(`  ${s.id.padEnd(26)} ${s.cls.padEnd(5)} ← ${s.workflow}${s.prodOnly ? "  [prod only]" : ""}`);
  }
  process.exit(0);
}

const stage = flag("--stage");
if (!["pre-merge", "pre-tag", "post-deploy"].includes(stage ?? "")) {
  console.error("usage: release-sequence.mjs --stage pre-merge|pre-tag|post-deploy [--env staging|prod] | --list");
  process.exit(1);
}
const envName = flag("--env") ?? "staging";
if (stage === "post-deploy" && !ENV_URLS[envName]) {
  console.error(`unknown --env ${envName}; expected staging|prod`);
  process.exit(1);
}
const ctx = { envName, baseUrl: ENV_URLS[envName] };

const results = [];
for (const step of LEDGER.filter((s) => s.stage === stage)) {
  if (step.prodOnly && envName !== "prod") continue;
  process.stdout.write(`→ ${step.id} (${step.workflow}) … `);
  const t0 = Date.now();
  let r;
  try {
    r = await step.run(ctx);
  } catch (err) {
    r = { ok: false, out: String(err) };
  }
  const secs = ((Date.now() - t0) / 1000).toFixed(1);
  const verdict = r.ok ? "✓" : r.skip ? "⤳ skipped" : step.cls === "warn" ? "⚠" : "✗";
  console.log(`${verdict} (${secs}s)`);
  if (!r.ok && r.out) console.log(r.out.split("\n").slice(-12).map((l) => `    ${l}`).join("\n"));
  results.push({ ...step, ...r });
}

const failed = results.filter((r) => !r.ok && !r.skip && r.cls === "fail");
const warned = results.filter((r) => !r.ok && r.cls === "warn");
const skipped = results.filter((r) => r.skip);
console.log(`\n${stage}: ${results.length - failed.length - warned.length - skipped.length} ok, ${warned.length} warn, ${skipped.length} skipped, ${failed.length} FAILED`);
if (failed.length) {
  console.error(`FAILED: ${failed.map((f) => f.id).join(", ")}`);
  process.exit(1);
}
