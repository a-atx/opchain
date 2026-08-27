#!/usr/bin/env node
/**
 * scripts/gen-roadmap.mjs — pulls roadmap items from GitHub Issues at build time.
 *
 * Source: the public `asfbay-bit/opchain-skills` mirror. An issue is a
 * roadmap item iff it carries exactly one of the four `roadmap:*` labels —
 * that label IS both the visibility gate and the bucket, collapsing the old
 * Linear model's two separate concepts (`roadmap-visible` label + a
 * state-driven bucket) into one. Writes the result to
 * `site/src/data/roadmap.json` (gitignored — regenerated on every run).
 *
 * Auth: none required. `opchain-skills` is public, so anonymous REST reads
 * work (60 req/hr per IP — comfortably enough for four label-scoped fetches
 * per run). Set GITHUB_TOKEN to raise the ceiling to 5,000/hr if that's ever
 * not enough; never required.
 *
 * Graceful degrade (network error, rate limit, or GitHub outage):
 *   - Writes an empty roadmap (with a diagnostic `note`) and exits 0, same
 *     as the old Linear version's default mode. This script isn't wired
 *     into `prebuild`/deploy (see CLAUDE.md) — a human eyeballs staging
 *     before promoting to prod, which is the actual gate against shipping
 *     an empty roadmap, not a build-time strict mode. Run by hand via
 *     `npm run gen-roadmap` when you want fresh data baked into a build.
 *
 * Bucketing rule (label-driven, no separate gate):
 *   - `roadmap:shipped`     → shipped
 *   - `roadmap:in-progress` → in-progress
 *   - `roadmap:planned`     → planned
 *   - `roadmap:backlog`     → backlog
 *   An issue with none of these four labels is not a roadmap item and is
 *   never fetched (each bucket is its own label-scoped API call).
 *
 * Each item also reports its GitHub milestone's `title` (e.g. "v1.9") so the
 * UI can group cards under a version header when one exists. Items without
 * a milestone fall into "Later" within their bucket.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ROADMAP_GITHUB_REPO, ROADMAP_BUCKET_LABELS } from "../src/lib/roadmap-config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const OUT_PATH   = path.join(__dirname, "..", "site", "src", "data", "roadmap.json");

const REPO = ROADMAP_GITHUB_REPO;
const BUCKET_LABELS = ROADMAP_BUCKET_LABELS;
const PER_PAGE = 100;

function parseNextLink(linkHeader) {
  if (!linkHeader) return null;
  for (const part of linkHeader.split(",")) {
    const m = part.match(/<([^>]+)>;\s*rel="next"/);
    if (m) return m[1];
  }
  return null;
}

async function fetchIssuesForLabel(label, token) {
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "opchain-dev-gen-roadmap",
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const all = [];
  let nextUrl =
    `https://api.github.com/repos/${REPO}/issues` +
    `?labels=${encodeURIComponent(label)}&state=all&per_page=${PER_PAGE}`;

  while (nextUrl) {
    const res = await fetch(nextUrl, { headers });
    if (!res.ok) {
      throw new Error(`GitHub API ${res.status} for label "${label}": ${await res.text().catch(() => "")}`);
    }
    const page = await res.json();
    all.push(...page);
    nextUrl = parseNextLink(res.headers.get("Link"));
  }
  // The issues endpoint also returns pull requests; those never carry
  // roadmap:* labels in practice, but filter defensively.
  return all.filter((issue) => !issue.pull_request);
}

function firstLine(body) {
  return (body || "").split("\n")[0].trim().slice(0, 240);
}

function parseDeliverables(body) {
  const items = [];
  for (const line of (body || "").split("\n")) {
    const m = line.match(/^\s*[-*]\s+(.+)$/);
    if (m) items.push(m[1].trim());
  }
  return items;
}

function shape(issue, bucket) {
  return {
    id: String(issue.number),
    title: issue.title,
    blurb: firstLine(issue.body),
    deliverables: parseDeliverables(issue.body),
    url: issue.html_url,
    bucket,
    milestone: issue.milestone?.title || null,
    milestoneSort: issue.milestone?.number ?? null,
    targetDate: issue.milestone?.due_on || null,
    labels: (issue.labels || [])
      .map((l) => (typeof l === "string" ? l : l.name))
      .filter((name) => !BUCKET_LABELS[name]),
    updatedAt: issue.updated_at,
  };
}

function emptyRoadmap(note) {
  return {
    generated_at: new Date().toISOString(),
    note,
    items: { shipped: [], "in-progress": [], planned: [], backlog: [] },
    milestones: [],
  };
}

function groupByBucket(items) {
  const out = { shipped: [], "in-progress": [], planned: [], backlog: [] };
  for (const it of items) out[it.bucket].push(it);
  // Sort: shipped → newest first; in-progress + planned → milestone sort
  // then issue number; backlog → most recently updated first.
  out.shipped.sort((a, b) => (b.updatedAt || "").localeCompare(a.updatedAt || ""));
  const milestoneRank = (it) => it.milestoneSort ?? Number.POSITIVE_INFINITY;
  out["in-progress"].sort((a, b) => milestoneRank(a) - milestoneRank(b) || Number(a.id) - Number(b.id));
  out.planned.sort((a, b) => milestoneRank(a) - milestoneRank(b) || Number(a.id) - Number(b.id));
  out.backlog.sort((a, b) => (b.updatedAt || "").localeCompare(a.updatedAt || ""));
  return out;
}

function collectMilestones(items) {
  const map = new Map();
  for (const it of items) {
    if (!it.milestone) continue;
    if (!map.has(it.milestone)) {
      map.set(it.milestone, {
        name: it.milestone,
        sortOrder: it.milestoneSort,
        targetDate: it.targetDate,
        counts: { shipped: 0, "in-progress": 0, planned: 0, backlog: 0 },
      });
    }
    map.get(it.milestone).counts[it.bucket] += 1;
  }
  return Array.from(map.values()).sort(
    (a, b) => (a.sortOrder ?? Infinity) - (b.sortOrder ?? Infinity),
  );
}

function writeRoadmap(payload) {
  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  fs.writeFileSync(OUT_PATH, JSON.stringify(payload, null, 2) + "\n", "utf8");
}

async function main() {
  const token = process.env.GITHUB_TOKEN || null;
  let items;
  try {
    const perLabel = await Promise.all(
      Object.entries(BUCKET_LABELS).map(async ([label, bucket]) => {
        const issues = await fetchIssuesForLabel(label, token);
        return issues.map((issue) => shape(issue, bucket));
      }),
    );
    items = perLabel.flat();
  } catch (e) {
    const empty = emptyRoadmap(`GitHub fetch failed: ${e.message}`);
    writeRoadmap(empty);
    console.warn("[gen-roadmap] GitHub fetch failed —", e.message, "— wrote empty roadmap (build continues)");
    return;
  }
  const payload = {
    generated_at: new Date().toISOString(),
    note: null,
    items: groupByBucket(items),
    milestones: collectMilestones(items),
  };
  writeRoadmap(payload);
  console.log(
    `[gen-roadmap] wrote ${items.length} items (shipped=${payload.items.shipped.length}, in-progress=${payload.items["in-progress"].length}, planned=${payload.items.planned.length}, backlog=${payload.items.backlog.length}) → ${OUT_PATH}`,
  );
}

main();
