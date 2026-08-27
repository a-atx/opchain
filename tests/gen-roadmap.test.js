import { describe, expect, it } from "vitest";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const REPO_ROOT  = path.resolve(__dirname, "..");
const SCRIPT     = path.join(REPO_ROOT, "scripts", "gen-roadmap.mjs");
const OUT_PATH   = path.join(REPO_ROOT, "site", "src", "data", "roadmap.json");

// Runs gen-roadmap.mjs as a subprocess with a fetch shim that routes on the
// `labels=` query param, since the script fires one GET per roadmap:* label.
// `responses` maps label -> { status?, issues? } — an unlisted label (or one
// mapped to `{ issues: [] }`) returns an empty page; `{ status: 403 }` (etc.)
// makes that call fail. The shim is loaded via NODE_OPTIONS=--import=<file>
// so each test gets a fresh interpreter and no shared state.
function runScript({ responses = {} } = {}) {
  const fetchImpl =
    `async (url) => {\n` +
    `  const RESPONSES = ${JSON.stringify(responses)};\n` +
    `  for (const [label, data] of Object.entries(RESPONSES)) {\n` +
    `    if (url.includes(encodeURIComponent(label))) {\n` +
    `      if (data.status && data.status !== 200) {\n` +
    `        return new Response("upstream error", { status: data.status });\n` +
    `      }\n` +
    `      return new Response(JSON.stringify(data.issues || []), { status: 200, headers: { "Content-Type": "application/json" } });\n` +
    `    }\n` +
    `  }\n` +
    `  return new Response(JSON.stringify([]), { status: 200, headers: { "Content-Type": "application/json" } });\n` +
    `}`;
  const shimPath = path.join(REPO_ROOT, "node_modules", `.gen-roadmap-shim-${Date.now()}-${Math.random()}.mjs`);
  fs.writeFileSync(shimPath, `globalThis.fetch = ${fetchImpl};\n`, "utf8");

  // Snapshot + restore OUT_PATH so a real prebuild on the host doesn't
  // bleed into the test outcome.
  const had = fs.existsSync(OUT_PATH);
  const snapshot = had ? fs.readFileSync(OUT_PATH, "utf8") : null;

  let result;
  try {
    result = spawnSync(
      "node",
      ["--import", shimPath, SCRIPT],
      {
        cwd: REPO_ROOT,
        // Force no real token even if the host shell has one set, so
        // requests stay routed through the shim deterministically.
        env: { ...process.env, GITHUB_TOKEN: "" },
        encoding: "utf8",
      },
    );
  } finally {
    try { fs.unlinkSync(shimPath); } catch { /* best-effort */ }
  }

  const written = fs.existsSync(OUT_PATH) ? JSON.parse(fs.readFileSync(OUT_PATH, "utf8")) : null;

  if (had) {
    fs.writeFileSync(OUT_PATH, snapshot);
  } else if (fs.existsSync(OUT_PATH)) {
    fs.unlinkSync(OUT_PATH);
  }

  return { status: result.status, stdout: result.stdout, stderr: result.stderr, written };
}

describe("scripts/gen-roadmap.mjs", () => {
  it("exits 0 with an empty roadmap when a GitHub fetch errors", () => {
    const { status, stderr, written } = runScript({
      responses: { "roadmap:planned": { status: 403 } },
    });
    expect(status).toBe(0);
    expect(stderr).toMatch(/GitHub fetch failed/);
    expect(written.note).toMatch(/GitHub fetch failed/);
    expect(written.items.shipped).toEqual([]);
  });

  it("exits 0 when every label returns zero issues", () => {
    const { status, stdout, written } = runScript({ responses: {} });
    expect(status).toBe(0);
    expect(stdout).toMatch(/wrote 0 items/);
    expect(written.items.planned).toEqual([]);
  });

  it("shapes a planned issue: id, milestone, deliverables, and non-bucket labels", () => {
    const issue = {
      number: 42,
      title: "Marketplace + templates",
      body: "A community skill/pack registry.\n\n- Public skill listings\n- Starter templates\n",
      html_url: "https://github.com/asfbay-bit/opchain-skills/issues/42",
      labels: [{ name: "roadmap:planned" }, { name: "community-submitted" }],
      milestone: { title: "v1.9", number: 3, due_on: null },
      updated_at: "2026-08-01T00:00:00Z",
    };
    const { status, stdout, written } = runScript({
      responses: { "roadmap:planned": { issues: [issue] } },
    });
    expect(status).toBe(0);
    expect(stdout).toMatch(/wrote 1 items/);
    expect(written.items.planned).toHaveLength(1);
    const item = written.items.planned[0];
    expect(item.id).toBe("42");
    expect(item.bucket).toBe("planned");
    expect(item.milestone).toBe("v1.9");
    expect(item.milestoneSort).toBe(3);
    expect(item.blurb).toBe("A community skill/pack registry.");
    expect(item.deliverables).toEqual(["Public skill listings", "Starter templates"]);
    expect(item.labels).toEqual(["community-submitted"]);
    expect(item.url).toBe("https://github.com/asfbay-bit/opchain-skills/issues/42");
  });

  it("excludes pull requests returned by the issues endpoint", () => {
    const realIssue = {
      number: 7,
      title: "Real roadmap item",
      body: "Body.",
      html_url: "https://github.com/asfbay-bit/opchain-skills/issues/7",
      labels: [{ name: "roadmap:backlog" }],
      milestone: null,
      updated_at: "2026-08-01T00:00:00Z",
    };
    const prIssue = {
      number: 8,
      title: "A pull request, not a roadmap item",
      body: "Body.",
      html_url: "https://github.com/asfbay-bit/opchain-skills/pull/8",
      pull_request: { url: "https://api.github.com/repos/asfbay-bit/opchain-skills/pulls/8" },
      labels: [{ name: "roadmap:backlog" }],
      milestone: null,
      updated_at: "2026-08-01T00:00:00Z",
    };
    const { written } = runScript({
      responses: { "roadmap:backlog": { issues: [realIssue, prIssue] } },
    });
    expect(written.items.backlog).toHaveLength(1);
    expect(written.items.backlog[0].id).toBe("7");
  });
});
