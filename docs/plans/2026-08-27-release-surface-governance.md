# Release-surface governance — rules for site surfaces while a release is cut and reviewed

_2026-08-27. Decision doc, produced under `/oc-app-architect` (process assessment) + `/oc-git-ops` (multi-contributor workflow) + `/oc-docs-forge` (docs placement). Question: with the Apache-2.0 relicense shipped, DCO decided, and external contributors about to arrive via the repo split, should explicit rules govern updating the site surfaces when a new release is being created and reviewed? **Verdict: yes** — the policy half-exists as skill lore in `skills/oc-release-ops/references/site-release-surfaces.md`; this doc promotes it to repo governance, closes the enforcement gaps, and maps each piece onto work the split runbook already owes. Companion to [2026-08-22-oss-split-licensing-compliance.md](2026-08-22-oss-split-licensing-compliance.md), [2026-08-25-site-surface-pass.md](2026-08-25-site-surface-pass.md), and [docs/runbooks/oss-split-execution-handoff.md](../runbooks/oss-split-execution-handoff.md) (the handoff wins where they disagree; this doc is additive and touches none of its phases' mechanics)._

## Why yes — the incident record

Every release-adjacent failure this repo has had is the same failure: **release
truth lives in ~40 hand-edited strings across two repos-worth of surfaces, with
no single owner and only partial gates.** All of it happened with ONE
contributor:

| When | What happened | Root cause |
|---|---|---|
| 2026-07-10 (v1.8.0) | Release bump broke version-pinned tests until every surface was found by hand; the checklist that run produced became `check-release-surfaces.mjs` + a memory note | Surfaces discovered per-release, not declared |
| 2026-07-24 → 2026-08-01 (v1.8.2) | Release commit deferred the changelog/site surfaces as "release work"; main's skills stamped 1.8.2 while `skills/CHANGELOG.md` stopped at 1.8.1 and `server.json` said 1.8.0; no tag; the advertised `/plugin install` was broken for ~5 weeks | Nothing couples "skills stamped vN" to "changelog has vN" to "site announces vN" — a partial release can merge |
| 2026-08-25 surface pass (D2) | ~30 drifting version/count strings across 10+ files: three different skill counts, "13 shipped" vs 16 rendered cards, changelog hero badge "v1.8.0 latest" vs actual v1.8.2 | Counts and patch versions are hand strings; the CI check compares surfaces to each other, not to reality |
| 2026-05-13 and 2026-08 | Staging served an off-main SHA; prod served off-main `c14936d` for ~2 weeks | Same drift class on the deploy side — since fixed by `deploy.mjs` ancestry enforcement, which is the model to copy |

External contributors make this strictly worse on both axes: the catalog (the
thing the surfaces describe) gains many writers, while the surfaces themselves
gain none — a contributor merging a skill in `opchain-skills` post-split cannot
see, edit, or even discover the site strings their PR just invalidated. Drift
rate goes up; ability to correct it goes down. So: yes, establish the rules —
but mostly by **promoting and mechanizing what already exists**, not inventing
process.

## What already exists (do not reinvent)

1. **The policy core, as skill lore:** `skills/oc-release-ops/references/site-release-surfaces.md`
   already defines the two surface classes and the one hard rule — *the site
   must not claim shipped what isn't live in prod*. **Live-claim surfaces**
   (L1–L7: header chip, homepage bar + stat, changelog hero + tab counts,
   skills-page callout, styleguide badge) flip at the deploy moment; **forward
   surfaces** (F1–F6: "coming next" cards, planned tabs, roadmap buckets) update
   in the build PR. This is the right policy. Its only defect is that it's
   invisible to anyone who isn't the release agent.
2. **Partial enforcement:** `scripts/check-release-surfaces.mjs` +
   `tests/release-surfaces.test.js` (CI, every PR) assert the eight live-claim
   probes agree with Header's `CURRENT_RELEASE`; `tests/site-release-chip.test.js`
   and the release-pinned Playwright spec pin copy and deep-links.
3. **Deploy gates:** staging-from-main ancestry refusal in `scripts/deploy.mjs`,
   the ⛔ human eyeball at the same SHA, `deploy-lag.yml`, cache-busted health
   checks.
4. **Contributor scaffolding:** CODEOWNERS (everything → maintainer), PR
   template, DCO decision (D4), governance pack (#440).
5. **A slot already reserved for this doc's output:** the handoff's C4 must
   author `RELEASING.md` in the product repo, and Phase E item 3 owes the
   counts module + pinned-surfaces test (surface-pass D2).

## The gaps

- **G1 — Policy is lore, not governance.** No file a contributor would read
  (CONTRIBUTING, PR template, a root RELEASING.md) says release surfaces exist,
  who may touch them, or when.
- **G2 — Consistency ≠ truth.** The checker proves the eight surfaces agree
  with each other; all eight can agree on a lie. It compares major.minor lines
  only, so the changelog claimed "v1.8.0 latest" while v1.8.2 was current and
  CI stayed green. Nothing ties `CURRENT_RELEASE` to `skills/CHANGELOG.md`'s
  latest entry, the tag, or the deployed catalog.
- **G3 — Counts aren't derived (D2).** ~30 count/version strings are hand
  strings. A catalog-touching PR — exactly the PR external contributors send —
  silently invalidates them with no failing check.
- **G4 — Partial releases can merge** (the v1.8.2 failure mode). No gate
  couples the product-side stamp to the changelog to the site announcement.
- **G5 — Post-split coupling point is undefined.** Once skills merge in
  `opchain-skills`, nothing mechanically obligates the site until the submodule
  pin bumps. Who does the site half, and triggered by what, must be written
  down before the first external release.

## The rules (proposed)

**R1 — Adopt the L/F taxonomy as repo policy, with a touch rule.** Live-claim
surfaces flip **only in the release-cut PR**, merged only when the deploy
follows immediately (the existing #311 pattern; if merge and deploy decouple,
hold the flips). Forward surfaces may move in any release-build PR. **Feature
PRs — internal or external — never touch live-claim surfaces**; reviewers
reject on sight; the PR template gains a checkbox ("touches no release-claim
surfaces, or this IS the release PR").

**R2 — A release is one atomic pair of PRs** (the handoff's Phase D flow,
generalized): *product half* — 29× `SKILL.md version:`, `skills/CHANGELOG.md`,
`plugin.json`, `marketplace.json` ×2, `server.json`, signed tag — then *site
half* — the L-surfaces, the `changelog.astro` entry, counts, and (post-split)
the submodule pin, verified by `check-release-surfaces.mjs`. Order is fixed:
**product merges and tags first; the site half never claims vN before the vN
tag exists.** Neither half merges without the other scheduled in the same
sitting.

**R3 — Truth gates, not just consistency gates:**
- *R3a (small, do now):* extend `check-release-surfaces.mjs` to assert Header
  `CURRENT_RELEASE` matches the newest release heading in
  `skills/CHANGELOG.md` — the site becomes unable to claim a release the
  product hasn't recorded, and a product bump without the site half fails the
  next site-touching CI run instead of drifting for weeks.
- *R3b (already Phase E item 3):* the release/counts module — skill counts,
  tri-agent counts, walkthrough counts derived from `getAllSkills()`/frontmatter/
  data files — plus the pinned-surfaces test, so contributor catalog PRs
  propagate counts instead of invalidating them. Acceptance: the ~30 D2 strings
  reduce to imports; the v1.9 cut edits one module.
- *R3c (post-split, lands with C6/D):* a check that the submodule pin's tag
  equals the site's claimed release, alongside the planned
  `check-version-lockstep.mjs` on the product side.

**R4 — Review-window conduct.** While a release is being reviewed: staging is
the only preview (staging-from-main stands); no unrelated PR bumps any surface;
an abandoned release means the unmerged site half is simply closed — the R2
ordering exists precisely so there is nothing live to roll back.

**R5 — Ownership seam for contributors.** An external contributor's release
obligation ends at the product repo: their skill PR plus a
`skills/CHANGELOG.md` "Unreleased" note. The site half is always
maintainer/release-agent work in the monorepo (CODEOWNERS already routes it).
Write this seam into the product `CONTRIBUTING.md` (C4 rewrite, one paragraph)
and `RELEASING.md` so contributors know a lagging site chip after their merge
is expected and owned, not a bug to PR against.

**R6 — oc-release-ops executes; governance documents.** The skill and its
references remain the operational detail (card promotion mechanics).
`RELEASING.md` + CONTRIBUTING carry the contract contributors and reviewers
actually see. At Phase D, the planned `version-locations.md` rework should
also refresh `site-release-surfaces.md` (its L6/F5 rows still cite
`roadmap-static.ts`, deleted in #449, and its 21-day hero window is
superseded — see R8).

**R7 — Mandatory release-surface audit prompt.** Every release-cut PR must
include a completed run of the agent audit prompt in
[docs/governance/RELEASING.md §6](../governance/RELEASING.md): ground truth
from the actual release diff → every matrix surface read and verdict-tabled
against it → content check of the changelog copy → mechanical gates → an
explicit SHIP / DO-NOT-SHIP line in the PR description. This is the
compensating control until R3a–R3c land: the mechanical checks prove the
surfaces agree with *each other*; the prompt proves they agree with *what
actually shipped*.

**R8 — Changelog display rules (codified 2026-08-27 from current practice — the five-hero count is open to maintainer override).**
Nothing is ever deleted from `/changelog`; the newest release is the one open
hero and patches extend its version/date range in place (plus a compact
`rel-card`) rather than adding heroes; **five heroes total** (open + four most
recent previous minors) stay above the `earlier releases` divider, everything
older ages to a `rel-card` via the aging pass at each minor cut. This
supersedes the reference doc's 21-day window, which two consecutive cuts did
not practice. The Planned tab keeps **≥ 3 votable `data-vote-target` options**
— a release-surface invariant because the R9 vote needs a top-3 to weight.

**R9 — Scope decisions: creator vote + weighted community block.** What ships
next is decided by the process in
[docs/governance/GOVERNANCE.md](../governance/GOVERNANCE.md): each creator
casts one vote; the site's community tallies enter as a weighted block (+3 to
the most-voted option, +2 to the second, +1 to the third, read at a
pre-announced cutoff); highest total wins; **ties anywhere resolve through
discussion**, recorded in the decision's GitHub issue. The vote decides
*what* ships; R1–R8 govern *how*.

**R10 — Activation condition (decided with Aidan, 2026-08-27).** The package
is **adopted but dormant until a second maintainer is added** — the event
being the PR that adds a second Maintainers-table row (+ CODEOWNERS +
`required_approving_review_count` → 1; already on the handoff's human
checklist). Until then the sole maintainer decides at discretion, the 3/2/1
community block is advisory rather than binding, and RELEASING.md functions
as the maintainer's own checklist. Both governance docs carry the clause.

## Where each piece lands (no collision with the handoff)

| Piece | Vehicle | When |
|---|---|---|
| This doc | Decision record in `docs/plans/` | now |
| **`RELEASING.md` draft** (R1–R8 + surface matrix + the R7 audit prompt) | **Authored 2026-08-27 at [docs/governance/RELEASING.md](../governance/RELEASING.md)** — staged under `docs/` deliberately so the C1 manifest is untouched; C4 copies it to the product-repo root and adapts the two-repo wording (the handoff's "exists nowhere" note is amended to point here) | drafted now; canonical at C4 |
| **`GOVERNANCE.md` draft** (R9 vote + roles + decision classes) | **Authored 2026-08-27 at [docs/governance/GOVERNANCE.md](../governance/GOVERNANCE.md)** — same staging logic; C4 copies to product root (it also satisfies the MAINTAINERS.md item via its Maintainers table, or split that table out at C4) | drafted now; canonical at C4 |
| R3a changelog cross-check | Small monorepo PR (script + test) | now — independent of the flip |
| PR-template checkbox + monorepo CONTRIBUTING note | Same small PR | now |
| R3b counts module + pinned test | Phase E item 3, acceptance criteria above | Phase E |
| R3c pin/tag check + product lockstep check | C6 consume PR / Phase D | with the flip |
| Product CONTRIBUTING seam paragraph (R5) | C4's planned CONTRIBUTING rewrite | C4 |
| `site-release-surfaces.md` reference refresh (21-day → five-hero rule, dead L6/F5 rows) | Phase D housekeeping, alongside `version-locations.md` | Phase D |

## What NOT to do

- **No merge-freeze automation or branch locks.** Deploys are manual and
  human-gated; the atomic point is the deploy, not the merge. The incident
  record shows drift, not races.
- **No bot that opens surface-bump PRs.** The removed
  `checkpoint-after-merge.yml` already demonstrated the failure mode:
  per-merge automation under branch protection is permanent open-PR cost for
  data derivable elsewhere.
- **Don't flip live-claim surfaces earlier "for review completeness."** A
  reviewed-but-undeployed claim is still a lie in prod — the L/F split exists
  because of exactly this temptation.
