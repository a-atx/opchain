import { describe, expect, it } from "vitest";
import worker from "../src/index.js";

function req(url, init) {
  return new Request(url, init);
}

function makeKv() {
  const store = new Map();
  return {
    store,
    async get(key) { return store.get(key) ?? null; },
    async put(key, value, _opts) { store.set(key, value); },
  };
}

function envWith(overrides = {}) {
  return {
    ASSETS: { async fetch() { return new Response("", { status: 200 }); } },
    ...overrides,
  };
}

describe("POST /api/votes/:id — ID validation", () => {
  // Ids are bare GitHub issue numbers (asfbay-bit/opchain-skills) — see
  // docs/plans/2026-08-26-roadmap-github-issues.md. 1-6 digits, no prefix.
  it.each([
    ["330", "ordinary issue number"],
    ["1", "shortest issue number"],
    ["999999", "max length"],
  ])("accepts %s (%s)", async (id) => {
    const res = await worker.fetch(
      req(`https://opchain.dev/api/votes/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "{}",
      }),
      envWith({ NOTIFY: makeKv() }),
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);
    expect(body.count).toBe(1);
  });

  it.each([
    ["ADEV-330", "legacy Linear-team-prefix id, no longer valid"],
    ["0330a", "trailing letter"],
    ["1234567", "number too long (7 digits)"],
    ["-330", "leading dash"],
    ["330; DROP TABLE", "injection attempt"],
  ])("400s on invalid id %s (%s)", async (id) => {
    const res = await worker.fetch(
      req(`https://opchain.dev/api/votes/${encodeURIComponent(id)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "{}",
      }),
      envWith({ NOTIFY: makeKv() }),
    );
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.code).toBe("invalid_id");
  });
});

describe("POST /api/votes/:id — counter + per-IP/day dedup", () => {
  it("increments the counter and stores it under vote-count:<id>", async () => {
    const kv = makeKv();
    const res = await worker.fetch(
      req("https://opchain.dev/api/votes/330", {
        method: "POST",
        headers: { "Content-Type": "application/json", "CF-Connecting-IP": "1.2.3.4" },
        body: "{}",
      }),
      envWith({ NOTIFY: kv }),
    );
    expect(res.status).toBe(200);
    expect((await res.json()).count).toBe(1);
    expect(kv.store.get("vote-count:330")).toBe("1");
  });

  it("returns alreadyVoted=true on a second vote from the same IP same day", async () => {
    const kv = makeKv();
    const env = envWith({ NOTIFY: kv });

    const first = await worker.fetch(
      req("https://opchain.dev/api/votes/330", {
        method: "POST",
        headers: { "Content-Type": "application/json", "CF-Connecting-IP": "1.2.3.4" },
        body: "{}",
      }),
      env,
    );
    expect((await first.json()).count).toBe(1);

    const second = await worker.fetch(
      req("https://opchain.dev/api/votes/330", {
        method: "POST",
        headers: { "Content-Type": "application/json", "CF-Connecting-IP": "1.2.3.4" },
        body: "{}",
      }),
      env,
    );
    expect(second.status).toBe(200);
    const body = await second.json();
    expect(body.alreadyVoted).toBe(true);
    expect(body.count).toBe(1);
  });

  it("503s when NOTIFY KV binding is missing", async () => {
    const res = await worker.fetch(
      req("https://opchain.dev/api/votes/330", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "{}",
      }),
      envWith({}),
    );
    expect(res.status).toBe(503);
    expect((await res.json()).code).toBe("kv_not_configured");
  });
});

describe("GET /api/votes — batched counts", () => {
  it("returns counts for valid ids and 0 for unknowns", async () => {
    const kv = makeKv();
    kv.store.set("vote-count:330", "5");
    kv.store.set("vote-count:345", "2");
    const res = await worker.fetch(
      req("https://opchain.dev/api/votes?ids=330,345,999"),
      envWith({ NOTIFY: kv }),
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.counts).toEqual({
      "330": 5,
      "345": 2,
      "999": 0,
    });
  });

  it("silently drops invalid ids from the batch instead of 400ing", async () => {
    const kv = makeKv();
    kv.store.set("vote-count:330", "3");
    const res = await worker.fetch(
      req("https://opchain.dev/api/votes?ids=330,invalid;injection,ADEV-345"),
      envWith({ NOTIFY: kv }),
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.counts).toEqual({ "330": 3 });
  });

  it("returns empty counts when NOTIFY is unbound", async () => {
    const res = await worker.fetch(
      req("https://opchain.dev/api/votes?ids=330"),
      envWith({}),
    );
    expect(res.status).toBe(200);
    // The no-KV path builds headers from corsHeaders() alone — this locks in
    // the API-wide no-store default (the bound-KV path sets it explicitly).
    expect(res.headers.get("Cache-Control")).toBe("no-store");
    expect((await res.json()).counts).toEqual({});
  });
});
