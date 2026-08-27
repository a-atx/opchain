# opchain governance — how decisions get made

> **Status: reviewed draft, staged in the monorepo.** At the repo split
> (handoff Phase C4) this becomes the root `GOVERNANCE.md` of
> `asfbay-bit/opchain-skills`. Release mechanics (what a release touches and in
> what order) live in [RELEASING.md](RELEASING.md); this doc covers **who
> decides**.
>
> **Not yet in effect.** This governance process **activates when a second
> maintainer is added** to the Maintainers table below — a vote "between
> creators" is meaningless with one creator. See *Activation* for what applies
> in the meantime.

## Roles

- **Creators (maintainers):** listed below. They review and merge PRs, own the
  site and its release surfaces, cut releases, and cast votes under the
  decision process. CODEOWNERS routes all paths to this group.
- **Contributors:** anyone sending a PR under the DCO (`git commit -s`).
  Contributions are welcomed per `CONTRIBUTING.md`; a contributor's release
  obligation ends at the product half (see RELEASING.md §7).
- **The community:** anyone voting on the public roadmap options at
  [opchain.dev/changelog](https://opchain.dev/changelog). Votes are cast on
  the site (per-IP/day dedup) against options backed by GitHub issues on
  `asfbay-bit/opchain-skills`, and they carry formal weight in scope
  decisions — see below.

### Maintainers

| Name | GitHub | Role |
|---|---|---|
| Aidan Elsesser | @asfbay-bit | Creator / lead maintainer |

*(A second maintainer is an open item; when added here, also add them to
CODEOWNERS and raise `required_approving_review_count` to 1.)*

## Activation

This document is **adopted but dormant** until the project has **two or more
maintainers**. Concretely, it takes effect on the merge of the PR that adds a
second row to the Maintainers table (which must also update CODEOWNERS and
raise `required_approving_review_count` to 1 — one event, one PR).

Until that day:

- **The sole maintainer decides everything at their discretion.** No decision
  made before activation is invalid for not having followed the process below.
- The community site vote still runs and its tallies are still read — the sole
  maintainer *should* weigh them when picking scope (they're the whole point of
  the votable options) — but the 3/2/1 block is advisory, not binding, until
  there is a creator vote for it to join.
- [RELEASING.md](RELEASING.md) operates in the same mode: it is the working
  release checklist the maintainer follows and may amend directly; it becomes
  binding on all maintainers and contributors at activation.

From activation onward, changes to either document follow decision class 4
(PR + creator vote).

## Decision classes

**1. Release scope and roadmap priority — the weighted vote (below).**
What the next release contains, which theme option wins, what enters the
planned tabs. Runs at release planning, before the Coming Next scope is set.

**2. Day-to-day technical decisions — maintainer discretion.** Normal PR
review resolves these. Any creator may escalate a contested technical
decision to the weighted-vote process.

**3. Breaking changes.** Must follow the breaking-change policy at the top of
`skills/CHANGELOG.md` (called out as **BREAKING**, entry in the changelog).
Whether to *accept* a breaking change is a class-1 decision if any creator or
the affected discussion asks for it.

**4. Governance changes.** Amendments to this file or RELEASING.md happen by
PR plus a creator vote (community block included when the question has been
put to a site vote). The license commitment is not amendable by this process:
the open core is permanently open (decision D4, 2026-08-22).

## The weighted vote

When a class-1 decision is called:

1. **Each creator casts one vote** for one of the candidate options.
2. **The community's site vote enters as a weighted block**, read from the
   live tallies on the votable options (`/changelog` vote targets, backed by
   `/api/votes` and the corresponding GitHub issues):
   - the option with the **most** site votes receives **+3 votes**,
   - the **second** most-voted option receives **+2 votes**,
   - the **third** receives **+1 vote**.
3. **Highest total wins.**
4. **Ties — anywhere — are resolved through discussion**, not re-votes or
   coin flips: a tie in the final totals, and equally a tie in the site
   tallies that makes the 3/2/1 assignment ambiguous, moves to the decision's
   GitHub issue (or the maintainers' channel) until the creators reach
   consensus. The discussion outcome is recorded where the vote is recorded.

Operational notes:

- The block requires **at least three votable options live on the site** —
  this is why RELEASING.md F4 treats "≥ 3 `data-vote-target` options" as a
  release-surface invariant, not cosmetics. With exactly two candidate options
  the block degrades to +3/+2; a decision should not be put to the process
  with fewer than two.
- Tallies are read at a declared cutoff (announce the snapshot time in the
  decision issue *before* reading them), so the count can't be gamed by
  timing.
- **Record the outcome** in the decision's GitHub issue: the creator votes,
  the site tallies and their 3/2/1 assignment, the totals, and any
  tie-breaking discussion. The Coming Next copy on `/changelog` then reflects
  the winner (RELEASING.md F2).

### Worked example

Three theme options are votable for v1.10. Site tallies at the announced
cutoff: A = 41, B = 17, C = 9 → block: A +3, B +2, C +1. Two creators vote:
one for B, one for C. Totals: A = 3, B = 3, C = 2. A and B tie → the creators
discuss in the decision issue and record the consensus. If they had both voted
B: B = 4, A = 3, C = 1 → B wins outright, no discussion needed.

## Relationship to the release process

The vote decides **what** ships; [RELEASING.md](RELEASING.md) governs **how**
it ships and which surfaces must move. In particular: scope selection (this
doc) happens at step 1 of the release ritual, and no live-claim surface
announces the outcome as *shipped* until the deploy moment (RELEASING.md §1
and §5).
