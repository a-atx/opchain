// Shared config for the GitHub-Issues-backed roadmap (read + write paths).
// Imported by both scripts/gen-roadmap.mjs (Node, build time) and
// src/index.js (the Worker, request time) so the repo name lives in one
// place. See docs/plans/2026-08-26-roadmap-github-issues.md.

export const ROADMAP_GITHUB_REPO = "asfbay-bit/opchain-skills";

export const ROADMAP_BUCKET_LABELS = {
  "roadmap:shipped": "shipped",
  "roadmap:in-progress": "in-progress",
  "roadmap:planned": "planned",
  "roadmap:backlog": "backlog",
};

// Applied to community feature-request submissions (POST /api/feedback with
// a `category`). Deliberately NOT a roadmap:* label — stays off the public
// roadmap until a maintainer promotes it during triage, same as the old
// Linear community-submitted + roadmap-visible two-step.
export const ROADMAP_COMMUNITY_LABEL = "community-submitted";
