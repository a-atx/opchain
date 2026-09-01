# Making oc-git-ops run with every release

**Date:** 2026-08-26
**Skill:** oc-app-architect (design phase — no code written yet)
**Status:** BUILT 2026-08-27, shipping in v1.8.3. Steps 1–6 and 8 landed; step 7 (tag backfill) is pre-approved and unblocked once this merges.

---

## 1. The problem

`oc-release-ops` Phase 5 step 3 says the release hands off to `oc-git-ops` for
"the merge / tag". `orchestrator.md` §3 lists the same edge twice
(`/oc-release ship → oc-git-ops`). Both are **prose**.

opchain's own orchestrator already states the finding that kills this design:

> Nothing in the skill catalog can make one skill invoke another — measured
> across 87 sessions, cross-skill prose produced *zero* autonomous invocations
> […] Where an edge must hold […] it has to be enforced by something outside
> the catalog.

So the answer to "how do we make git-ops run with every release" is not a
better sentence in a SKILL.md. It is a chokepoint.

### Evidence the edge is not holding

13 shipped releases on `/changelog`; 3 tags in git.

| changelog entry | tag |
|---|---|
| v1.0, v1.1, v1.2, v1.3, v1.4, v1.4.2, v1.4.3, v1.5, v1.6, v1.7 | ❌ none |
| v1.8, v1.8.1, v1.8.2 | ✅ v1.8.0 / v1.8.1 / v1.8.2 |

**10 of 13 releases shipped without git-ops ever producing a tag.** The v1.8
line is tagged only because the v1.8.x sessions did it by hand.

### Why nobody noticed

Because the tag has no *owner*. `oc-git-ops`'s command reference has
`/oc-git-init`, `/git-branch`, `/oc-git-commit`, `/oc-git-pr`, `/git-push`,
`/oc-git-sync`, `/oc-git-status`, `/git-diff`, `/oc-git-convention` — and no
tag verb. `grep -c 'git tag' skills/oc-git-ops/SKILL.md` → **0**.

`oc-release-ops` delegates "the merge / tag" to a skill that has never had a
tag step. Even on the runs where the handoff *did* happen, the tag half of it
had nowhere to land.

### What the missing tags actually cost

1. **`publish-mcp-registry.yml` runs `on: push: tags: ["v*"]`.** Ten releases
   never republished the MCP registry pointer. The registry listing tracked
   opchain only from v1.8.0 onward.
2. **`/oc-release plan` reads `git log <last-release-tag>..HEAD`.** With no
   tags it falls back to scraping `changelog.astro` — a weaker, lossier input
   for the next release's scope.
3. **No `git checkout v1.6.0`.** No bisect across releases, no "what exactly
   shipped in v1.5", no diffing two releases without archaeology.
4. **The ledger claim is false.** `plugins/opchain/commands/oc-release.md`
   tells the assistant "a changelog entry with no tag is a broken ledger —
   report it rather than continuing past it." It has been broken 10 times and
   was never reported, because nothing checks.

---

## 2. Design

Four layers, mirroring how the commit gate is already built: **an owner, a
chokepoint, a shared implementation, a backstop.**

```
  L0  OWNER        oc-git-ops gets /oc-git-release <semver>
                   (the tag verb that never existed)
                          │
  L1  CHOKEPOINT   scripts/deploy.mjs refuses a PRODUCTION deploy that
                   would publish a NEW catalog version with no matching tag
                          │  ← this is the layer that actually enforces
  L2  GATE ROW     /oc-release verify calls the same script, so the
                   assistant path and the machinery path share one check
                          │
  L3  BACKSTOP     release-ledger.yml (daily) — every shipped changelog
                   entry must have a tag; one tracking issue, like deploy-lag
```

### L0 — give oc-git-ops the verb it's missing

Add `/oc-git-release <semver>` to `skills/oc-git-ops/SKILL.md`:

1. Assert HEAD is the merge commit of the release PR and is reachable from
   `origin/main`.
2. `git tag -a v<semver> -m "release: v<semver> — <theme>"` on that commit.
3. `git push origin v<semver>`.
4. Append to `oc-git-ops.checkpoint.json`:
   `skill_state.releases[] = { semver, tag, tag_sha, pr, merged_at }`.

`/oc-git-sync v<semver>` (the form release-ops already calls) routes to this
verb after the PR merges, rather than dead-ending.

**This layer alone changes nothing** — it is still prose. It exists so the
enforcement below has something to point at.

### L1 — the chokepoint (the part that does the work)

Extend `scripts/deploy.mjs`, in the exact shape of the existing
staging-from-main guard (same file, same fail-loud-with-escape-hatch pattern).

**Trigger signal: the lockstep catalog version.** All 29 `skills/*/SKILL.md`
carry `version: 1.8.2` today — release-ops Principle 3 ("lockstep skill
versions") makes this the declared SSOT for the release semver, and
`src/lib/discovery.js:175` already surfaces it as `/skills.json`
`catalogVersion`. A release deploy always moves it; a blog or hotfix deploy
never does.

On the **production** path only:

```
catalogVersion := the common `version:` across skills/*/SKILL.md
if a tag v<catalogVersion> exists AND is reachable from HEAD AND is on origin:
    ✓ pass
else:
    ✗ REFUSE — "this deploy would publish catalogVersion X with no v X tag.
                Run /oc-git-release X first."
    escape hatch: OPCHAIN_ALLOW_UNTAGGED_RELEASE=1
```

Why this trigger and not "every prod deploy must be tagged": most prod deploys
are content, not releases. A guard that nags on every blog deploy gets
disabled, and takes the protection with it — that is
`pre-commit-gate.cjs` Rule 3 ("opt-in per repo… a gate that denies in
unrelated cases gets uninstalled"). Gating on *catalog version advanced*
means the guard is silent for ordinary deploys and unskippable for releases.

Why not `Header.CURRENT_RELEASE`: it is `v1.8` — major.minor only, so it
cannot see a patch release. `check-release-surfaces.mjs` deliberately checks
only the release *line*. The catalog version is full semver.

**Known bypass:** `npx wrangler deploy` run directly skips `deploy.mjs`
entirely. Documented, not closed — closing it needs a `PreToolUse` hook, which
only covers agent-run commands, not a human's terminal. Deferred as a stretch
item.

### L2 — one implementation, two callers

Put the check in `scripts/check-release-tag.mjs` (sibling of
`check-release-surfaces.mjs`, same exit-code contract). `deploy.mjs` calls it;
`/oc-release verify` gains a table row that calls it. The gate the assistant
runs and the gate the machinery runs are then the same code, so they cannot
disagree.

### L3 — backstop for drift that already happened

`.github/workflows/release-ledger.yml`, daily, in the `deploy-lag.yml` mould:
enumerate shipped `/changelog` entries, assert a matching tag exists, open or
update **one** tracking issue listing the gaps. Close it after backfilling;
the next run reopens if drift returns.

This is what would have caught the 10 missing tags in 2026-05 instead of
2026-08.

---

## 3. Backfilling the 10 missing tags

Tag each shipped release at the commit that landed its changelog entry.

> **⚠ Hazard — do not push these tags naively.**
> `publish-mcp-registry.yml` fires on `push: tags: ["v*"]` and *auto-syncs
> `server.json`'s version from the tag*. Pushing `v1.3.0` today would publish
> **1.3.0** to the MCP registry and regress the public pointer from 1.8.2.
> Ten backfilled tags = ten regressions, last-write-wins.

Mitigation, in order of preference:

1. **Add a monotonicity guard to `publish-mcp-registry.yml`** — refuse to
   publish a version below what the registry currently serves. Worth having
   permanently, independent of the backfill.
2. Backfill with the workflow disabled, re-enable after.
3. Backfill locally only, never push the old tags (keeps bisect working for
   whoever has the clone; loses it for everyone else — weakest option).

Recommendation: **(1)**, then push the backfill.

**Decision (2026-08-26): approved — backfill goes ahead, but only after the
monotonicity guard (step 1) is merged.** The backfill is blocked on that
guard by design; do not push old tags before it lands.

---

## 4. What this does NOT fix

- The `oc-release-ops` checkpoint is stale (`phase: ship-pr-open` for v1.8.2,
  which shipped as `c440c7b`). Checkpoint hygiene is a separate thread.
- The prose edges in `orchestrator.md` §3 stay prose. They are documentation
  of intent, and that is fine — L1 is what makes the intent hold.
- `oc-deploy-ops`, `oc-docs-forge`, `oc-repo-ops` edges are unchanged. This
  plan closes exactly one edge: release → git-ops.

---

## 5. Sequencing

| # | Change | Files |
|---|---|---|
| 1 | Monotonicity guard on the registry publisher | `.github/workflows/publish-mcp-registry.yml` |
| 2 | `check-release-tag.mjs` + tests | `scripts/`, `tests/` |
| 3 | Wire into the prod path | `scripts/deploy.mjs` |
| 4 | `/oc-git-release` verb | `skills/oc-git-ops/SKILL.md` |
| 5 | `verify` gate row | `skills/oc-release-ops/SKILL.md` |
| 6 | Backstop workflow | `.github/workflows/release-ledger.yml` |
| 7 | Backfill 10 tags | git only |
| 8 | Doc the rule | `CLAUDE.md` deploy-flow section |

1–3 are the load-bearing ones. 4–5 are catalog changes and ride the next
release bump. 6–7 are cleanup of the debt this design surfaced.

### Status as of 2026-08-27 — built, shipping in v1.8.3

| # | Change | State |
|---|---|---|
| 1 | Monotonicity guard on the registry publisher | ✅ `publish-mcp-registry.yml` — only the newest tag publishes; `workflow_dispatch` exempt |
| 2 | `check-release-tag.mjs` + tests | ✅ 12 tests, all covering fail-open paths |
| 3 | Wire into the prod path | ✅ `deploy.mjs` `assertReleaseTagged()`, production only |
| 4 | `/oc-git-release` verb | ✅ oc-git-ops SKILL.md + `skills.command.oc-git-release.enabled` flag |
| 5 | `verify` gate row | ✅ oc-release-ops calls the same script |
| 6 | Backstop workflow | ✅ `release-ledger.yml`, daily, one tracking issue |
| 7 | Backfill 10 tags | ⏳ pre-approved; do it after this merges (step 1 must be on main first) |
| 8 | Doc the rule | ✅ `CLAUDE.md` § Deployment |

**Verified end-to-end.** With the catalog bumped to 1.8.3 and no `v1.8.3` tag
yet, `node scripts/check-release-tag.mjs` exits 1 and names the fix — which is
the guard doing exactly its job. `npm run deploy` will refuse production until
the tag is pushed. Gates green at build time: 473 tests / 37 files,
`astro check` 0 errors 0 warnings, 76 pages built, 13/13 hook tests, 12
checkpoints valid, catalog + flag registry in sync.

### A correction to §1

§1 said this design "closes exactly one edge: release → git-ops." Building it
surfaced that the ledger was broken in *both* directions. Ten releases shipped
with no tag — and by 2026-08-27, **42 commits were live in production under the
v1.8.2 label**, including the Astro 7 migration and the five seam PRs. The tag
stopped tracking what shipped, and then what shipped stopped tracking the tag.

The deploy guard addresses the first. The second is a release-cadence problem,
not a machinery one: v1.8.3 exists partly to describe those 42 commits honestly
rather than let them keep riding an old label.
