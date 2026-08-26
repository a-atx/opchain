// Relicense gate (D1, decided 2026-08-22): every surface that states the
// project license must say Apache-2.0, and the license must ship as text.
// Third-party license mentions (e.g. a gem or tool that is itself MIT) are
// out of scope and intentionally not asserted here.
import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(join(ROOT, p), "utf8");

describe("Apache-2.0 relicense surfaces", () => {
  it("LICENSE / LICENSES/ carry the Apache-2.0 text and NOTICE names the holder", () => {
    expect(read("LICENSE")).toMatch(/Apache License\s*\n\s*Version 2\.0, January 2004/);
    expect(read("LICENSES/Apache-2.0.txt")).toMatch(/Version 2\.0, January 2004/);
    expect(read("NOTICE")).toContain("Aidan Elsesser and the opchain contributors");
  });

  it("manifests declare Apache-2.0", () => {
    expect(JSON.parse(read("package.json")).license).toBe("Apache-2.0");
    expect(JSON.parse(read("site/package.json")).license).toBe("Apache-2.0");
    expect(
      JSON.parse(read("plugins/opchain/.claude-plugin/plugin.json")).license,
    ).toBe("Apache-2.0");
  });

  it("every SKILL.md frontmatter declares license: Apache-2.0", () => {
    const dirs = readdirSync(join(ROOT, "skills"), { withFileTypes: true }).filter(
      (d) => d.isDirectory(),
    );
    expect(dirs.length).toBeGreaterThanOrEqual(29);
    for (const d of dirs) {
      const fm = read(join("skills", d.name, "SKILL.md")).split("\n---")[0];
      expect(fm, `skills/${d.name}/SKILL.md`).toMatch(/^license: Apache-2\.0$/m);
    }
  });

  it("site + public-face surfaces say Apache-2.0 and no longer claim MIT", () => {
    const surfaces = [
      "site/src/components/Footer.astro",
      "site/src/pages/index.astro",
      "site/src/pages/compare.astro",
      "site/src/pages/uses.astro",
      "site/src/pages/security.astro",
      "mirror/README.md",
      "README.md",
      "skills/README.md",
    ];
    for (const p of surfaces) {
      const s = read(p);
      expect(s, p).toContain("Apache-2.0");
      // The READMEs keep one historical "were published under MIT" note.
      const mitMentions = (s.match(/\bMIT\b/g) || []).length;
      const allowed = /README\.md$/.test(p) ? 1 : 0;
      expect(mitMentions, `${p} stray MIT mentions`).toBeLessThanOrEqual(allowed);
    }
  });
});
