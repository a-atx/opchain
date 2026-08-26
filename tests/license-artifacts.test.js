// LICENSE ships inside every distributed artifact and on every machine-readable
// discovery surface (OSS-split plan §3.2 row 1 / §5 step 2). Companion to
// tests/license-strings.test.js, which gates the human-readable surfaces.
import { describe, it, expect } from "vitest";
import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync, existsSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { buildSkillsJson, buildMcpCard, buildLlmsTxt, buildAiCatalog } from "../src/lib/discovery.js";
import worker from "../src/index.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const ORIGIN = "https://opchain.dev";

const catalog = {
  skills: [
    {
      id: "oc-app-architect",
      displayName: "OC · App Architect",
      shortDesc: "Idea → spec → design → build → launch.",
      description: "Unified app development.",
      phases: ["plan", "build"],
      triAgent: true,
      commands: ["/oc-app"],
      version: "1.8.2",
    },
  ],
};

describe("discovery surfaces carry the license", () => {
  it("skills.json declares Apache-2.0 and links /LICENSE", () => {
    const j = buildSkillsJson({ catalog, origin: ORIGIN, version: "test" });
    expect(j.license).toBe("Apache-2.0");
    expect(j.licenseUrl).toBe(`${ORIGIN}/LICENSE`);
  });

  it("the MCP server card declares Apache-2.0", () => {
    expect(buildMcpCard({ catalog, origin: ORIGIN, version: "test" }).license).toBe("Apache-2.0");
  });

  it("llms.txt links the license text", () => {
    expect(buildLlmsTxt({ catalog, origin: ORIGIN })).toContain(`[License](${ORIGIN}/LICENSE)`);
  });

  it("the ARD ai-catalog entry declares Apache-2.0", () => {
    const cat = buildAiCatalog({ catalog, origin: ORIGIN, version: "test" });
    expect(cat.entries[0].license).toBe("Apache-2.0");
  });
});

describe("the Worker serves /LICENSE and /NOTICE as text/plain", () => {
  // Prod parity: wrangler uploads extensionless assets with NO Content-Type,
  // and every response carries nosniff — the route must pin the type itself.
  const env = {
    ASSETS: {
      async fetch() {
        return new Response("                                 Apache License\n", { status: 200 });
      },
    },
  };

  for (const path of ["/LICENSE", "/NOTICE"]) {
    it(`GET ${path} → 200 text/plain with the text intact`, async () => {
      const res = await worker.fetch(new Request(`https://opchain.dev${path}`), env);
      expect(res.status).toBe(200);
      expect(res.headers.get("Content-Type")).toBe("text/plain; charset=utf-8");
      expect(res.headers.get("X-Content-Type-Options")).toBe("nosniff");
      expect(await res.text()).toContain("Apache License");
    });
  }
});

describe("zip artifacts carry LICENSE + NOTICE", () => {
  it("combined and per-skill zips include the license text", { timeout: 120_000 }, () => {
    const pub = mkdtempSync(join(tmpdir(), "opchain-zip-test-"));
    try {
      execFileSync("bash", [join(ROOT, "scripts/make-skills-zip.sh")], {
        env: { ...process.env, OPCHAIN_PUBLIC_DIR: pub },
        stdio: "pipe",
      });
      const list = (z) => execFileSync("unzip", ["-l", z], { encoding: "utf8" });

      const combined = list(join(pub, "opchain-skills.zip"));
      expect(combined).toMatch(/\sLICENSE$/m);
      expect(combined).toMatch(/\sNOTICE$/m);

      const per = list(join(pub, "skills", "oc-app-architect.zip"));
      expect(per).toMatch(/\soc-app-architect\/LICENSE$/m);
      expect(per).toMatch(/\soc-app-architect\/NOTICE$/m);
    } finally {
      rmSync(pub, { recursive: true, force: true });
    }
  });

  it("sync-docs publishes the license alongside the doc tree", { timeout: 30_000 }, () => {
    const docs = mkdtempSync(join(tmpdir(), "opchain-docs-test-"));
    try {
      execFileSync("bash", [join(ROOT, "scripts/sync-docs.sh")], {
        env: { ...process.env, OPCHAIN_DOCS_DIR: docs },
        stdio: "pipe",
      });
      expect(readFileSync(join(docs, "LICENSE"), "utf8")).toContain("Apache License");
      expect(existsSync(join(docs, "NOTICE"))).toBe(true);
      expect(existsSync(join(docs, "oc-app-architect", "SKILL.md"))).toBe(true);
    } finally {
      rmSync(docs, { recursive: true, force: true });
    }
  });
});
