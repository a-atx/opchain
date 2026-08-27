# Ship "roadmap → GitHub Issues" — instructions for an executing agent

> **2026-08-27 sequencing amendment:** The original GitHub-Issues migration and
> staging deployment completed. Before production, the roadmap was deliberately
> revised: v1.9 is now Assurance and governed delivery ops; v2.0 is the committed
> self-improving pipeline; voting is established for v2.1-v2.3. Steps 5 and 5b
> below describe the refreshed staging gate. Production still requires a new,
> explicit approval after that review.

**Audience:** this document is written to be handed directly to an AI agent
with computer control (browser + terminal) — e.g. pasted as the task prompt
for ChatGPT's computer-use / Operator mode — running **on Aidan's own Mac,
under his own already-authenticated `gh` and `wrangler` sessions.** It is not
written for a human reader first; it's written as an executable runbook.

If you are that agent: read this whole document before doing anything. It
has hard stops. Do not skip them, and do not improvise past what's written
here — if something doesn't match what you observe (wrong branch state, a
command errors differently than expected, a file doesn't exist), **stop and
report back what you see instead of guessing.**

## What this finishes

A previous session built and locally verified a feature that repoints the
`opchain.dev` `/changelog` roadmap from dead/hardcoded data to live GitHub
Issues on `asfbay-bit/opchain-skills`, and switches the "Request a feature"
form from creating Linear tickets to creating GitHub issues. Full design
context: [`docs/plans/2026-08-26-roadmap-github-issues.md`](../plans/2026-08-26-roadmap-github-issues.md).

Everything is built, tested (462/462), and sitting **uncommitted** in a git
worktree at:

```
/Users/aidanelsesser/repos/opchain/.claude/worktrees/roadmap-github-issues-19f5a6
```

on branch `claude/roadmap-github-issues-19f5a6`. The live GitHub-side setup
(labels, milestones, 11 real issues on `asfbay-bit/opchain-skills`) is
**already done** — you are not creating those again.

What's left, in order: commit → push → PR → merge → mint one new secret →
deploy to staging → **human checks it** → deploy to production → verify.

## Hard stops — do not proceed past these without an explicit go-ahead in the conversation you're running in

1. **Before running `wrangler secret put`** (Step 3) — you're about to write
   a real credential into the production Worker's config. Confirm the token
   scope you're about to paste is exactly what Step 2 says, nothing more.
2. **Before running `npm run deploy` (production, Step 6)** — this repo's
   own `CLAUDE.md` is explicit that deploys are meant to be a deliberate
   human action from a logged-in laptop, specifically because an
   automated/scoped token caused a real production incident before (see
   `CLAUDE.md` → Deployment). Running the command from Aidan's own
   authenticated session narrows that risk, but a production push is still
   a production push. **Stop after Step 5 (staging) and Step 5b (human
   review) and get an explicit "yes, ship it" before Step 6.** Don't treat
   "the instructions said to keep going" as that confirmation — get it
   fresh, in the moment.
3. **Never paste, echo, log, or repeat the token value itself** anywhere —
   not in a chat message, not in a commit, not in a file. `wrangler secret
   put` prompts for it interactively for exactly this reason; use that
   prompt, not a `--` flag (which would land in shell history).
4. **If `git status` in the main checkout (Step 5) shows anything
   unexpected** (uncommitted changes that aren't yours, a branch that isn't
   `main`) — stop and report it rather than proceeding. Per this repo's own
   safety convention, investigate unfamiliar state before acting on it.

---

## Step 0 — orient yourself

```bash
gh auth status               # expect: logged in with repo scope
npx wrangler whoami           # expect: logged in to the account owning opchain-dev / opchain-staging
cd /Users/aidanelsesser/repos/opchain/.claude/worktrees/roadmap-github-issues-19f5a6
git status --short
git branch --show-current   # expect: claude/roadmap-github-issues-19f5a6
npm test 2>&1 | tail -5      # expect: all passing (462 tests at last check)
```

If either auth check fails, stop and report — don't try to log in as some
other account. If tests don't pass, stop and report too — don't push broken
code.

## Step 1 — commit and open the PR

```bash
git add -A
git commit -m "$(cat <<'EOF'
feat(roadmap): source /changelog from GitHub Issues, not Linear/hardcoded data

Reads from asfbay-bit/opchain-skills (roadmap:* labels + milestones) via a
rewritten scripts/gen-roadmap.mjs. The community feature-request form now
creates a GitHub issue instead of a Linear ticket. Vote ids switch from
Linear team-prefix ids to bare GitHub issue numbers.

See docs/plans/2026-08-26-roadmap-github-issues.md for full design context.
EOF
)"
git push -u origin claude/roadmap-github-issues-19f5a6

gh pr create --title "feat(roadmap): source /changelog from GitHub Issues, not Linear" --body "$(cat <<'EOF'
## Summary
- /changelog roadmap now reads from GitHub Issues on asfbay-bit/opchain-skills (roadmap:* labels + milestones), replacing dead/hardcoded data
- RoadmapForm.astro's community feature-request path now creates a GitHub issue instead of a Linear ticket
- Vote ids switch from Linear team-prefix ids to bare GitHub issue numbers (/api/votes id validation updated accordingly)
- Full design doc: docs/plans/2026-08-26-roadmap-github-issues.md

## Test plan
- [x] npm test — 462/462 passing
- [x] astro check — 0 errors
- [x] astro build verified against the real live GitHub issues (3 v1.9 theme-options, 8 v1.10/v1.11 horizon-items, correct vote-target ids)
- [ ] CI green on this PR
- [ ] Staging deployed + smoke-tested by hand after merge, before production

Designed and built in a prior Claude Code session; shipped per
docs/runbooks/2026-08-26-roadmap-github-issues-ship.md.
EOF
)"
```

Report the PR URL back before continuing.

## Step 2 — wait for CI, then merge

Watch for CI to go green (`gh pr checks --watch` or refresh the PR page).
Once green, merge it:

```bash
gh pr merge --squash --delete-branch
```

If CI fails, stop and report the failure — don't merge a red PR, and don't
try to fix it yourself without checking in first (you may be missing
context on why something broke).

## Step 3 — mint the new GitHub token

This is a **credential-creation step** — read the "Hard stops" section above
before doing this.

1. Open `https://github.com/settings/personal-access-tokens/new` in the browser.
2. **Token name:** `opchain-roadmap-github-token` (or similar — anything identifiable).
3. **Expiration:** whatever Aidan's org policy allows (90 days is a reasonable default if unsure — this is a rotate-able token, not a long-lived secret).
4. **Resource owner:** `asfbay-bit`.
5. **Repository access:** "Only select repositories" → `asfbay-bit/opchain-skills`. **Do not** select "All repositories."
6. **Permissions:** under Repository permissions, set **Issues: Read and write**. Leave everything else at its default (No access).
7. Click **Generate token**. Copy the value — you'll paste it once, in Step 4, and nowhere else.

## Step 4 — store the token as a Cloudflare Worker secret

Production only — staging has `FEEDBACK_DRY_RUN=true` wired in already
(`wrangler.jsonc` → `env.staging.vars`), so the roadmap-request form never
reaches GitHub on staging regardless, and this secret isn't needed there.

```bash
cd /Users/aidanelsesser/repos/opchain
git checkout main
git pull
wrangler secret put ROADMAP_GITHUB_TOKEN
# paste the token at the interactive prompt when asked — do not use a flag
```

## Step 5 — deploy to staging and refresh roadmap data

Still from `/Users/aidanelsesser/repos/opchain` on `main` (now containing
the merged PR):

```bash
npm run gen-roadmap        # pulls the 12 real GitHub issues into roadmap.json fresh
npm run deploy:staging
npm run smoke:staging
curl -sS "https://staging.opchain.dev/api/health?cb=$(date +%s)"
```

Confirm the health check's `version` matches the local commit SHA
(`git rev-parse --short HEAD`).

### Step 5b — human review (hard stop)

Open `https://staging.opchain.dev/changelog` in the browser yourself (or
have it opened for review) and check:

- The "Coming Next" tab shows the selected v1.9 direction, Assurance and governed delivery ops, with 4 scope items and no vote controls.
- The "Planned" tab shows committed v2.0 (The self-improving pipeline) followed by v2.1 (3 items), v2.2 (2 items), and v2.3 (2 items).
- v2.0 has no vote control. All 7 candidates in v2.1-v2.3 do, using preserved GitHub issue ids #1-#7.
- Vote buttons work (click one, count should tick up — staging KV is separate from prod, this is just testing the mechanism).
- Scroll to "Request a feature," submit a test entry. Since staging is dry-run, expect the synthetic success state — this only proves the form still round-trips correctly, not that GitHub issue creation works (that only happens on prod, where the token now lives).

**Get an explicit "yes, deploy to production" before Step 6.** This is the
hard stop from the top of this document — actually get it, don't assume it.

## Step 6 — deploy to production

```bash
npm run deploy
npm run smoke:prod
curl -sS "https://opchain.dev/api/health?cb=$(date +%s)"
```

Confirm `version` matches the deployed commit SHA again.

### Step 6b — verify the write path for real

On `https://opchain.dev/changelog`, submit one real test entry through
"Request a feature" (something obviously a test, e.g. title "test — please
ignore, verifying GitHub issue creation works"). Confirm:

- The response shows a real `opchain-skills#<number>` id as a clickable link.
- The link actually opens a new issue on `asfbay-bit/opchain-skills` with the `community-submitted` label (not a `roadmap:*` label — that's correct, it's supposed to stay off the public roadmap until triaged).
- Close/delete that test issue afterward so it doesn't linger in the tracker.

## Step 7 (optional) — vote-history migration

Production KV may still hold vote counts under the **old** id format
(`vote-count:OPC-170` etc.) from before this change. These won't be found
under the new numeric-issue-number keys automatically. This step is
optional — skipping it just means those specific items' vote counts restart
at 0.

**Read before you write.** Don't blindly copy — check what's actually there
first and report it back:

```bash
npx wrangler kv key get "vote-count:OPC-170" --binding NOTIFY --remote --text
npx wrangler kv key get "vote-count:OPC-173" --binding NOTIFY --remote --text
npx wrangler kv key get "vote-count:OPC-174" --binding NOTIFY --remote --text
```

If any of these return a non-zero count, report the values back before
migrating anything. The v1.9 options map to the first 3 issues created
(`#1` = Marketplace + templates = was `OPC-170`, `#2` = Agency play = was
`OPC-173`, `#3` = Pipeline depth = was `OPC-174` — confirm this mapping
against `docs/plans/2026-08-26-roadmap-github-issues.md` before writing
anything, don't assume it from memory). Only after confirming, copy forward:

```bash
npx wrangler kv key put "vote-count:1" "<value from OPC-170>" --binding NOTIFY --remote
npx wrangler kv key put "vote-count:2" "<value from OPC-173>" --binding NOTIFY --remote
npx wrangler kv key put "vote-count:3" "<value from OPC-174>" --binding NOTIFY --remote
```

If all three old keys come back empty/zero, skip this step entirely and say so.

## Not in scope for this runbook

- **Turnstile / stronger rate-limiting** on the request form — left as an
  open decision in the plan doc. The 5/hour per-IP KV rate limit already
  shipped in this PR is the floor, not the final answer. Don't add Turnstile
  as part of this runbook; it needs its own site-key/secret setup and a
  separate decision from Aidan.
- **Dropping Linear internally** — out of scope; this change only touched
  the public roadmap + community-request surface. Bug/improvement/security
  feedback still goes to Linear exactly as before.

## When you're done

Report back, plainly:
- The PR URL and merge commit SHA.
- The staging and production `version` values you confirmed.
- Whether Step 7 (vote migration) applied, and to what values, or that it was skipped because the old keys were empty.
- Anything that didn't match this runbook's expectations, even if you worked around it.
