# Roadmap → GitHub Issues

**Status:** Both sprints built, tested, and verified end-to-end locally.
**Not deployed** — this is all sitting in the working tree, one deploy away.
Produced via `/oc-app-architect` (checkpoint `skill_state.roadmap_github_issues`).

## Problem

The `/changelog` roadmap data lived as two hand-maintained, differently-shaped
`const` arrays directly inside
[`changelog.astro`](../../site/src/pages/changelog.astro): `v19Options`
(bar-chart vote) and `futureReleaseGroups` (v1.10/v1.11 grouped cards).
`site/src/data/roadmap-static.ts` and `roadmap-types.ts` looked like the real
data source but were **orphaned dead code** — nothing imported them. The
original design intent — a build-time pull from Linear
(`scripts/gen-roadmap.mjs`) — was bypassed on 2026-06-19 and kept only "for a
future re-wire." That re-wire is this feature, pointed at GitHub Issues
instead of Linear, and it revives `roadmap-types.ts` as the real contract
instead of leaving it dead.

## Decisions

| Question | Decision |
|---|---|
| Which repo do issues live in? | **`asfbay-bit/opchain-skills`** (the public mirror) |
| Scope | **Full swap** — read path (Sprint 1) and write path + migration (Sprint 2), both done |
| Voting | **Kept `/api/votes`** (KV per-IP/day dedup), repointed to GitHub issue numbers. *(Revised 2026-08-26 from the original "switch to GitHub reactions" — reactions require leaving the site and a GitHub login to cast a vote, a real conversion hit on a marketing page not worth the win of deleting some KV code.)* |
| Bucketing | **Labels** — `roadmap:shipped` / `roadmap:in-progress` / `roadmap:planned` / `roadmap:backlog`. The label IS the bucket; no separate visibility gate |
| Data unification | **Unified via `roadmap-types.ts`** — one `loadRoadmap()` call feeds both `changelog.astro` render shapes. Per-milestone editorial shell copy stays hand-written; only item lists are live data |

### Why `opchain-skills` checks out

1. **Issues are decoupled from the mirror's file sync.** `mirror-public.yml` force-push-resets the repo's *file content* on every sync; GitHub Issues live in a separate data plane, untouched.
2. **The public repo already tells people to do this.** `mirror/CONTRIBUTING.md`: *"File them here. We watch this repo's issues and use them to plan upstream work."*

---

## Sprint 1 — read path

| File | Change |
|---|---|
| [`site/src/data/roadmap-types.ts`](../../site/src/data/roadmap-types.ts) | Revived as the real contract. `RoadmapItem` gained `deliverables: string[]`, dropped Linear's `priority`. Added `itemsForMilestone()`. **Loads via `import.meta.glob("./roadmap.json")`, not `fs.readFileSync(__dirname + ...)`** — see the bug callout below. |
| [`site/src/data/roadmap-static.ts`](../../site/src/data/roadmap-static.ts) | Deleted — dead code. |
| [`scripts/gen-roadmap.mjs`](../../scripts/gen-roadmap.mjs) | Rewritten: one GitHub REST call per `roadmap:*` label, anonymous (public repo), paginated, PRs filtered. Graceful-degrade only, no strict mode. |
| [`site/src/pages/changelog.astro`](../../site/src/pages/changelog.astro) | `v19Options` and each `futureReleaseGroups[].items` derived from `itemsForMilestone(roadmap, "planned", "v1.9"/"v1.10"/"v1.11")`. |
| [`src/index.js`](../../src/index.js) | `VOTE_ID_RE` → `/^\d{1,6}$/` (GitHub issue numbers, was Linear team-prefix ids). |
| `tests/gen-roadmap.test.js`, `tests/votes.test.js` | Rewritten for the new shapes. |

### A real bug this caught: `import.meta.url` + Astro SSG don't mix

Building the first version of `loadRoadmap()` with the old
`fs.readFileSync(path.join(__dirname, "roadmap.json"))` pattern (inherited
verbatim from the dead Linear-era code) **silently returned an empty roadmap
on every real `astro build`.** Astro/Vite bundles `roadmap-types.ts` into a
prerender chunk under `dist/.prerender/chunks/` — `import.meta.url`-relative
path math resolves against *that* location, not `site/src/data`, so the fs
read threw ENOENT and fell into the empty-roadmap catch block every time.
`node scripts/gen-roadmap.mjs` and Vitest both worked fine (plain Node, no
Vite bundling), which is exactly why this never surfaced before — nothing
had ever exercised this code through a real Astro build until this feature
did. Confirmed with a temporary debug log during verification; fixed by
switching to `import.meta.glob("./roadmap.json", { eager: true })`, which
Vite resolves against the *source* module graph at compile time regardless
of where the compiled chunk ends up, and still degrades to "no match" (not a
build error) when the file doesn't exist — preserving the original
graceful-degrade contract. Verified via a real `astro build` afterward:
exactly 3 `theme-option` elements and 8 `horizon-item` elements rendered,
matching the 3+4+4 real GitHub issues below.

---

## Sprint 2 — write path + content migration

### Live repo setup (done via `gh api`, confirmed with your go-ahead)

- 5 labels created on `asfbay-bit/opchain-skills`: `roadmap:shipped`, `roadmap:in-progress`, `roadmap:planned`, `roadmap:backlog`, `community-submitted`.
- 3 milestones created: `v1.9` (#1), `v1.10` (#2), `v1.11` (#3).
- 11 issues created (`roadmap:planned`, correct milestone, body = original blurb + deliverables + a "migrated from /changelog" provenance footer), preserving the exact copy from the old hardcoded arrays:
  - v1.9: [#1 Marketplace + templates](https://github.com/asfbay-bit/opchain-skills/issues/1), [#2 Agency play](https://github.com/asfbay-bit/opchain-skills/issues/2), [#3 Pipeline depth](https://github.com/asfbay-bit/opchain-skills/issues/3)
  - v1.10: [#4](https://github.com/asfbay-bit/opchain-skills/issues/4) Claude.ai web skill install, [#5](https://github.com/asfbay-bit/opchain-skills/issues/5) VS Code / Cursor extension, [#6](https://github.com/asfbay-bit/opchain-skills/issues/6) oc-discovery-ops, [#7](https://github.com/asfbay-bit/opchain-skills/issues/7) oc-monorepo-ops
  - v1.11: [#8](https://github.com/asfbay-bit/opchain-skills/issues/8) oc-qa-ops, [#9](https://github.com/asfbay-bit/opchain-skills/issues/9) oc-data-ops, [#10](https://github.com/asfbay-bit/opchain-skills/issues/10) oc-compliance-ops, [#11](https://github.com/asfbay-bit/opchain-skills/issues/11) oc-security-hardening
- `node scripts/gen-roadmap.mjs` run for real afterward → 11 items, bucketed/milestoned correctly. `astro build` confirmed against the real data: 3 theme-options, 8 horizon-items, vote targets are real issue numbers 1–11.

### Write path (RoadmapForm.astro → GitHub, not Linear)

- New shared module [`src/lib/roadmap-config.js`](../../src/lib/roadmap-config.js) — `ROADMAP_GITHUB_REPO`, `ROADMAP_BUCKET_LABELS`, `ROADMAP_COMMUNITY_LABEL`, imported by both `gen-roadmap.mjs` (Node) and `src/index.js` (Worker) so the repo name lives in one place.
- `handleFeedback` in [`src/index.js`](../../src/index.js) now branches on `isCommunity` **before** the Linear-specific code and calls a new `handleRoadmapRequest()` that creates a GitHub issue instead — `community-submitted` label (deliberately not a `roadmap:*` bucket label, so it stays off the public roadmap until a maintainer promotes it during triage, same two-step as before). Dead Linear-specific `isCommunity` branches (labelIds, description lines, title prefix, `LINEAR_COMMUNITY_LABEL_ID`) removed — bug/improvement/security/general feedback is unaffected and still goes to Linear.
- **New mitigation for the spam-visibility asymmetry I flagged in Sprint 1:** a GitHub issue is public the instant it's created, unlike a Linear ticket (invisible until triage). Added a per-IP rate limit (5/hour, reusing the existing `NOTIFY` KV binding and pattern already used by `handleNotify`) scoped specifically to this path. This doesn't require a new decision or new infra — it's the same KV binding the site already has — but it's worth knowing it's there. Turnstile is a bigger, separate integration and stays an open question (see below).
- `RoadmapForm.astro` copy updated ("Connected to GitHub · creates a public issue"), and the success-state id is now a real link to the created issue (`opchain-skills#<number>` → `html_url`) since, unlike the old Linear ticket, this is something a submitter can actually go look at.
- New tests in `tests/feedback.test.js`: not-configured 503, success shape (id/url/labels/title prefix), fetch-error 502, non-2xx 500, rate-limit 429, dry-run bypass. 462/462 tests pass overall.

### New secret needed before this can go live: `ROADMAP_GITHUB_TOKEN`

Fine-grained PAT scoped to `issues:write` on `asfbay-bit/opchain-skills`,
separate from `MIRROR_TOKEN` (least-privilege — that one only needs
`contents:write`). **I can't provision this myself** — it needs your GitHub
account and then `wrangler secret put ROADMAP_GITHUB_TOKEN` (prod) / the
`env.staging` equivalent, from your logged-in laptop per this repo's manual
deploy convention. Until it's set, the write path 503s `not_configured`
exactly like `LINEAR_API_KEY` does today — it fails closed, not open.

### Still open

1. **Turnstile/rate-limiting** — the 5/hour per-IP limit above is a floor, not a final answer. Add Cloudflare Turnstile if spam turns out to be a real problem after launch; not built now since it's a separate integration (site key/secret, widget, verification call) I didn't want to bundle into this change without you weighing in.
2. **Vote-history migration** — production KV holds `vote-count:OPC-170`-style keys under the old id format. They won't be found under the new numeric-issue-number keys. A manual `wrangler kv` copy (`vote-count:OPC-170` → `vote-count:1`, etc.) at deploy time preserves them; skipping it just means vote counts restart at 0 for these specific items. Not done here — it's a live-KV action against production, not something to script blind.
3. **Whether to drop Linear internally too** — out of scope; this only touched the public roadmap + community-request surface.

## Suggested next step

Everything is built and tested locally. To actually ship it:

```bash
npm run gen-roadmap        # refresh roadmap.json from the now-real issues right before building
wrangler secret put ROADMAP_GITHUB_TOKEN   # you, from your laptop — new PAT, issues:write on opchain-skills
npm run deploy:staging      # then eyeball staging.opchain.dev/changelog
npm run deploy              # once it looks right
```
