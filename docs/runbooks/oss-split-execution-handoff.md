# OSS-split execution handoff — staging review → cut-over

_Operator instructions for an autonomous agent (written for Codex; any competent agent or human can follow them). Written 2026-08-26 against main `b1ba54f`. **Do not trust this document's snapshot of state — re-verify every "current state" claim in Phase 0 before acting.** The strategy, evidence, and rollback reasoning behind every step live in [docs/plans/2026-08-22-oss-split-licensing-compliance.md](../plans/2026-08-22-oss-split-licensing-compliance.md) (the plan; section references below are to it) and [docs/plans/2026-08-25-site-surface-pass.md](../plans/2026-08-25-site-surface-pass.md). Read both before Phase C._

## Decisions — already made, do not re-ask

| # | Decision | Value |
|---|---|---|
| D1 | License | **Apache-2.0**, whole monorepo + product repo (shipped 2026-08-24; releases ≤ 1.8.2 were MIT) |
| D2 | Copyright holder / owner | **"Aidan Elsesser and the opchain contributors"**, repos stay under `asfbay-bit` |
| D3 | Monorepo visibility | **Stays public**; forward-only scrub (done); never rewrite its history |
| D4 | Inbound terms | **DCO, no CLA**; the open core is permanently open |

## Hard rules

1. **Never force-push `main` of `asfbay-bit/opchain`.** The one sanctioned force-push in this job is the single cut-over push to `asfbay-bit/opchain-skills` in Phase C5.
2. **Commit identity:** every commit is authored `Aidan Elsesser <admin@opchain.dev>` with `git commit -s` (Signed-off-by must match the author — the DCO App enforces this) and a `Co-Authored-By:` trailer naming your agent. Never let the agent be the git author.
3. **Human gates are marked `⛔ HUMAN`.** Stop and wait for Aidan at each one; do not proceed on your own judgment.
4. **Deploys:** staging must be main (`scripts/deploy.mjs` enforces ancestry); prod only after a human eyeballs staging. `.dev.vars` must exist at repo root before deploying (copy from the primary checkout if absent).
5. **Verification over recall:** before each phase, re-run that phase's "verify" block. If reality disagrees with this doc, reality wins — read the plan, adjust, and note the divergence in the PR/commit that fixes it.
6. **PR flow:** one PR at a time; the repo's PR template, CODEOWNERS review, and CI (Worker, Site, e2e, LHCI) must be green; squash-merge. Update `.checkpoints/*.checkpoint.json` at inflection points (`npm run checkpoint:validate` must pass).
7. Build side-effects: `npm run build` regenerates `site/public/og/*.png` byte-nondeterministically — **never commit OG churn**; `git checkout -- site/public/og` before staging files.

## Phase 0 — Ground truth (run first, every session)

```bash
git fetch origin && git log --oneline -3 origin/main
curl -s "https://opchain.dev/api/health?n=$RANDOM" ; echo
curl -s "https://staging.opchain.dev/api/health?n=$RANDOM" ; echo
gh pr list -R asfbay-bit/opchain --state open
gh api repos/asfbay-bit/opchain-skills --jq '{pushed_at, default_branch, open_issues_count}'
```

Expected as of writing: prod `24b97be` (behind), staging = main. If prod already equals main, skip Phase A. If `opchain-skills` has commits newer than the last mirror run or any open PRs/issues beyond roadmap issues, **stop — the cut-over plan assumed a disposable snapshot repo; re-assess with Aidan.** (Note: the roadmap now files community issues on `opchain-skills` — see `docs/plans/2026-08-26-roadmap-github-issues.md`. Those issues are expected and must survive the flip; a force-push rewrites git history, not issues, so they do — but re-read that doc before C5.)

## Phase A — Staging review → prod ship

1. Automated review of staging (all must pass):
   ```bash
   npm run smoke:staging
   for p in / /security/ /privacy/ /changelog/ /skills/ /install/ /coverage/ /architecture/; do
     curl -s -o /dev/null -w "%{http_code} $p\n" "https://staging.opchain.dev$p?n=$RANDOM"; done
   curl -s "https://staging.opchain.dev/.well-known/security.txt?n=$RANDOM" | head -3   # GitHub-first Contact + Expires
   curl -s "https://staging.opchain.dev/skills.json?n=$RANDOM" | jq '{license, catalogVersion, count}'
   ```
2. Visual spot-check (screenshots if you can render): `/security` (private-advisory CTA, no form), `/changelog` (Apache-2.0 card), `/showcase` (sample-labeled cost copy), footer license link, `/roadmap` surfaces if present.
3. `⛔ HUMAN` — Aidan eyeballs staging and says ship.
4. Ship: from a checkout of `origin/main` (detached is fine): `npm run deploy` → `npm run smoke:prod` → verify prod `/api/health` version equals `origin/main` short SHA, `/LICENSE` is 200 `text/plain`, `security.txt` is GitHub-first. Close any open deploy-lag issue.

## Phase B — `/privacy` overhaul (independent of the flip; do while waiting on gates)

Rewrite `site/src/pages/privacy.astro` so every claim matches `src/index.js` at time of writing the PR. Required content (verify each against code, cite nothing you didn't read):

- **Remove** all Try-It copy and the 365-day `LEAD_TTL_DAYS` claim; delete the dead `LEAD_TTL_DAYS` type in `site/src/env.d.ts`.
- **Disclose every store with its real retention:** `lead:` records from `/api/notify` (email + metadata; check whether a TTL has been added — if not, either add `expirationTtl` in the same PR or state "retained until deleted on request"); roadmap vote counts + 25h IP-hash locks; `mcp-checkpoint:*` KV (client-supplied JSON, no TTL today — disclose as-is, do NOT claim planned fixes); the `oc_id` cookie; server-side PostHog capture (env-gated, not consent-gated — fix the wording here and on `/security`); client PostHog (consent-gated); feedback → Linear; roadmap feature requests → GitHub issues on `opchain-skills` (public!).
- Add a last-updated stamp, a deletion contact, and `aria-live` on any status region touched.
- Gate: `astro check` 0 errors, `astro build` green, full `npm test` green, then PR per the hard rules. Acceptance: someone reading only the page and only the Worker source finds zero contradictions.

## Phase C — The flip (plan §2.4–§2.5 is authoritative; §5 is the rollback table)

**C0 — Prereqs.** `brew install git-filter-repo gitleaks`. Close stale drafts #385/#363 if still open. `⛔ HUMAN` — Aidan announces a freeze on `skills/`, `plugins/`, `.claude-plugin/`, `mcp/`, `server.json`, `src/lib/mcp/` (freeze holds until the consume PR merges).

**C1 — Manifest.** Create `split/product-paths.txt` in the monorepo from plan §2.2, then re-derive against the current tree (the seam PRs added `scripts/{check-skill-flags,lint-internal-refs,sync-plugin-skills}.mjs` — decide each per the §2.2 rule: *validators + product runtime → product; site-page derivations → site*; `check-skill-flags` imports the site flag registry and **stays**; `sync-plugin-skills` moves). PR it for `⛔ HUMAN` review — the filter run is one-shot.

**C2 — Extraction** (fresh clone, never the working repo): follow plan §2.4 steps 2–5 verbatim: `git clone --no-local --single-branch --branch main`, record `EXTRACT_SHA`, optional `--mailmap`, then `git filter-repo --paths-from-file … --path-rename mirror/README.md:README.md --path-rename mirror/CONTRIBUTING.md:CONTRIBUTING.md --path-rename mirror/.github/:.github/`. **Do not use `--replace-text`** (decided: tip-scrub only, blame continuity wins).

**C3 — Verify the rewrite** (all must hold before anything is pushed): commit count ≈ 76–90; `git tag -l` → `v1.8.0 v1.8.1 v1.8.2`; `plugins/opchain/skills` is a **real directory** (the symlink was materialised by seam S5 — if you see mode `120000`, stop and re-check); `git log --follow -- skills/oc-app-architect/SKILL.md` reaches 2026-04-14; `README.md`/`CONTRIBUTING.md`/`.github/ISSUE_TEMPLATE`/`LICENSE`/`NOTICE` at root; `gitleaks git -v .` clean.

**C4 — Bootstrap commit** (one commit, `-s`, human author) per plan §2.4 step 6: product `package.json` (`name: opchain-skills, version: 1.8.2, license: Apache-2.0, engines: {node: ">=22"}, dependencies: gray-matter` — runtime dep of the local MCP server), CI with job ids `validate` / `test` / `hooks` / `plugin-layout` (these exact names — the ruleset requires them), `dco.yml`, rewrite README/CONTRIBUTING (kill "force-push snapshot / private upstream / PRs can't merge"; the governance files extracted from the monorepo root carry over), regenerate the 18-row skill table + issue-template dropdowns from the 29 skill dirs, CHANGELOG note "≤1.8.2 MIT; ≥1.8.3 Apache-2.0". Then locally: `npm test`, `claude plugin validate ./plugins/opchain` if available (else validate `marketplace.json`/`plugin.json` shape by hand), and a local-marketplace install test if a Claude Code CLI is present.

**C5 — Cut-over.** `⛔ HUMAN` — Aidan confirms "flip now". Then, in this order: disable `mirror-public.yml`'s trigger in the monorepo (a stray push would overwrite the new history) but **keep the file + `MIRROR_TOKEN` for rollback**; `git push --force origin main` + push the three tags to `opchain-skills`; apply repo settings + ruleset per plan §2.4 step 9 (contexts = the CI job ids + `DCO`; bypass `pull_request`, never `always`; `web_commit_signoff_required=true`). `⛔ HUMAN` — install the DCO GitHub App on `opchain-skills` (UI-only).

**C6 — Consume PR** in the monorepo, per plan §2.5 verbatim: remove product paths, `git submodule add` `opchain-skills` pinned to the bootstrap SHA, top-level `skills` symlink, rewire `package.json` scripts through `OPCHAIN_*` env seams (already landed — mostly path changes), `src/index.js` MCP import path, `actions/checkout` gets `submodules: true` everywhere, npm `prepare` runs submodule init, `deploy.mjs` gains the submodule-drift refusal, Dependabot `gitsubmodule` entry, repoint contribution links in `site/src/lib/repo.ts` (issues/advisories for the product → `opchain-skills` — one file, that was the point), second `Acknowledgments` line in `security.txt`, CLAUDE.md mirror section → "Consuming opchain-skills". CI green → `⛔ HUMAN` review → squash-merge.

**C7 — Cut-over verification** (all must pass): fresh-dir `/plugin marketplace add asfbay-bit/opchain-skills` + `/plugin install opchain` → hooks + 29 skills; `npm ci && npm test && npm run build` green in the monorepo; deploy staging → `npm run smoke:staging` + `/skills.json` count 29 + `POST /mcp` list_skills + `/opchain-skills.zip` contains LICENSE; `⛔ HUMAN` eyeball → deploy prod → `smoke:prod`.

**C8 — Retire** (only after C7 is fully green): delete `mirror-public.yml` + `mirror/` in a monorepo PR; `gh secret delete MIRROR_TOKEN` on both repos; `⛔ HUMAN` — revoke the fine-grained PAT in GitHub settings; also delete the stale `CLOUDFLARE_*` Actions secrets (no workflow uses them).

**Rollback:** any step before C5 → delete the scratch clone. C5 itself → re-run `mirror-public.yml` via `workflow_dispatch` (regenerates the old snapshot; this is why the workflow + token survive until C8). C6 → revert the PR. Never roll back by force-pushing the monorepo.

## Phase D — First product release `v1.8.3` (plan §2.6)

Two-PR flow: product repo bumps 29× `SKILL.md version:` + `skills/CHANGELOG.md` + `plugin.json` + `marketplace.json` ×2 + `server.json` → tag `v1.8.3` (annotated, pushed from main) → `publish-mcp-registry.yml` runs via OIDC unchanged; add a `release.yml` that attaches `opchain-skills.zip` + `SHA256SUMS` + SBOM + `actions/attest-build-provenance`. Site repo bumps the submodule pin + the 8 live-claim surfaces (`scripts/check-release-surfaces.mjs` verifies) → staging → `⛔ HUMAN` eyeball → prod. `/skills.json catalogVersion` must then report `1.8.3`. Never create `v*` tags in the site repo again.

## Phase E — Remaining board (after the flip; each its own PR)

1. Surface-pass "now" leftovers ([2026-08-25-site-surface-pass.md](../plans/2026-08-25-site-surface-pass.md)): the D5 `aria-live` sweep, D6 token-debt sweep (undefined `--dim`, `/dashboard` foreign token vocabulary — light theme unreadable), `/pipeline-builder` decision-table refresh, `did.json` (mint via `scripts/gen-did.mjs` locally — key material never in CI — or drop the `host.identifier`), skills.ts role map completeness check, delete `roadmap-static.ts` if still dead.
2. Hosted-service data handling (plan §4.3): TTL + size cap + session isolation + rate limit on `POST /mcp write_checkpoint`; leads TTL; `DATA-HANDLING.md`.
3. Counts/release module + pinned-surfaces test (surface-pass D2) so v1.9 can't recreate the string drift.

## Human-only checklist (Aidan)

- [ ] Phase A eyeball + "ship prod"; Phase C5 "flip now"; C7 eyeball; D eyeball
- [ ] Install the DCO App on `opchain-skills` (C5); revoke the `MIRROR_TOKEN` PAT (C8)
- [ ] Cloudflare WAF skip rule → the expression in [cloudflare-challenge.md](cloudflare-challenge.md)
- [ ] Triage the ~6 open Dependabot alerts; decide the Astro 7 PR (#444)
- [ ] Trademark clearance search (OPENCHAIN Reg. 5242152 / OPTCHAIN Reg. 7397498) **before any public announcement** of the contributor repo
- [ ] Name a second maintainer/reviewer, then raise `required_approving_review_count` to 1 on `opchain-skills`
