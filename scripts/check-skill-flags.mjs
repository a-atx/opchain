#!/usr/bin/env node
// Site-side drift gate between the skills tree and the feature-flag registry.
//
// scripts/gen-skills-catalog.mjs is the product-pure validator — it must run
// in the extracted contributor repo, where src/lib/flags does not exist — so
// every check that needs the registry lives here instead: flags.required /
// flags.exposes names must be registered, exposes defaults must match the
// registered type, every command verb needs its skills.command.<verb>.enabled
// gate, and every skill directory needs its skills.registry.<id>.enabled
// visibility flag. Runs in pretest/prebuild right after gen-catalog.
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { matter } from "./lib/frontmatter.mjs";
import { FLAGS, isKnown } from "../src/lib/flags/registry.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SKILLS_DIR = process.env.OPCHAIN_SKILLS_DIR ?? join(ROOT, "skills");

function listSkillDirs() {
  return readdirSync(SKILLS_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory() && existsSync(join(SKILLS_DIR, e.name, "SKILL.md")))
    .map((e) => e.name)
    .sort();
}

function checkSkill(id) {
  const { data } = matter(readFileSync(join(SKILLS_DIR, id, "SKILL.md"), "utf8"));
  const flags = data.flags;
  if (flags && typeof flags === "object") {
    for (const name of Array.isArray(flags.required) ? flags.required : []) {
      if (typeof name === "string" && !isKnown(name)) {
        throw new Error(
          `skills/${id}/SKILL.md: flags.required references unknown flag \`${name}\` ` +
          `(register it in src/lib/flags/registry.js first)`,
        );
      }
    }
    for (const entry of Array.isArray(flags.exposes) ? flags.exposes : []) {
      if (!entry || typeof entry !== "object" || typeof entry.name !== "string") continue;
      if (!isKnown(entry.name)) {
        throw new Error(
          `skills/${id}/SKILL.md: flags.exposes references unknown flag \`${entry.name}\` ` +
          `(register it in src/lib/flags/registry.js first)`,
        );
      }
      const def = FLAGS[entry.name];
      if (typeof entry.default !== def.type) {
        throw new Error(
          `skills/${id}/SKILL.md: flags.exposes[${entry.name}].default is ` +
          `${typeof entry.default}, expected ${def.type}`,
        );
      }
    }
  }
  // Commands surface as `/<verb>` or `/<verb> <subcommand>`. The flag tracks
  // the verb only — subcommands inherit the parent's gate.
  const seen = new Set();
  for (const cmd of Array.isArray(data.commands) ? data.commands : []) {
    if (typeof cmd !== "string") continue;
    const verb = cmd.replace(/^\//, "").split(/\s+/, 1)[0];
    if (!verb || seen.has(verb)) continue;
    seen.add(verb);
    const flagName = `skills.command.${verb}.enabled`;
    if (!isKnown(flagName)) {
      throw new Error(
        `skills/${id}/SKILL.md: command verb \`/${verb}\` has no flag in the registry ` +
        `(add ${flagName} to src/lib/flags/registry.js)`,
      );
    }
  }
  if (!isKnown(`skills.registry.${id}.enabled`)) {
    throw new Error(
      `skills/${id}/: no visibility flag in the registry ` +
      `(add skills.registry.${id}.enabled to src/lib/flags/registry.js)`,
    );
  }
}

function main() {
  const ids = listSkillDirs();
  if (ids.length === 0) {
    throw new Error(`no skills/ directories with a SKILL.md found under ${SKILLS_DIR}`);
  }
  ids.forEach(checkSkill);

  // Reverse drift — a registry flag whose skill directory is gone. Only
  // meaningful against the real tree, so opt-in (pretest/prebuild set it);
  // fixture trees in tests exercise the forward checks alone.
  if (process.env.OPCHAIN_STRICT_REGISTRY === "1") {
    const have = new Set(ids);
    for (const name of Object.keys(FLAGS)) {
      const m = name.match(/^skills\.registry\.(.+)\.enabled$/);
      if (m && !have.has(m[1])) {
        throw new Error(
          `src/lib/flags/registry.js: skills.registry.${m[1]}.enabled has no skills/${m[1]}/ directory`,
        );
      }
    }
  }
  console.log(`✓ skill↔flag registry in sync: ${ids.length} skills`);
}

main();
