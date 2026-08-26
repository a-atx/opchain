## Summary

<!-- What does this PR do, and why? Link the issue if there is one. -->

## Changes

-

## Checklist

- [ ] `npm test` passes locally (and `npm run test:hooks` if hooks changed)
- [ ] `npm run gen-catalog` passes (skill frontmatter valid, incl. `license:`)
- [ ] `npm run sync-bundles:check` passes (bundled references in sync — run `npm run sync-bundles` after editing `skills/orchestrator.md` or the checkpoint protocol)
- [ ] `skills/CHANGELOG.md` has an entry if skill behaviour changed
- [ ] No internal references introduced (`aidops`, personal paths, monorepo-only tooling) in shipped skill content
- [ ] Every commit is signed off (`git commit -s`, [DCO 1.1](https://developercertificate.org/)) with a **human** author
- [ ] AI assistance (if any) is disclosed via a `Co-Authored-By:` trailer

## Notes for the reviewer

<!-- Anything non-obvious: trade-offs, follow-ups, screenshots. -->
