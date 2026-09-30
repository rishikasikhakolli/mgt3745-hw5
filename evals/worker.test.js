// evals/worker.test.js
// The code eval. Run with:   API=https://mgt3745-hw4.travlr.workers.dev npm test
// Each test names the EARS row it checks. Add at least one for your new feature.
import { test } from "node:test";
import assert from "node:assert/strict";

const API = process.env.API;
if (!API) throw new Error("Set API to your deployed Worker URL: API=https://... npm test");

test("EARS: THE SYSTEM SHALL return all entries in creation order (GET /entries is 200 + array)", async () => {
  const res = await fetch(API + "/entries");
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.ok(Array.isArray(body));
  for (let i = 1; i < body.length; i++) assert.ok(body[i].id > body[i - 1].id, "ids ascending");
});

test("EARS: IF the entry text is missing, THEN THE SYSTEM SHALL reject it (POST {} is 400)", async () => {
  const res = await fetch(API + "/entries", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: "{}",
  });
  assert.equal(res.status, 400);
  assert.ok((await res.text()).length > 0, "400 carries a reason");
});

test("EARS: WHEN a valid entry is submitted, THE SYSTEM SHALL store it (POST then GET shows it)", async () => {
  const marker = "eval-" + Date.now();
  const post = await fetch(API + "/entries", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ text: marker, category: "Food" }),
  });
  assert.equal(post.status, 201);
  const list = await (await fetch(API + "/entries")).json();
  assert.ok(list.some(e => e.text === marker), "posted entry appears in GET");
});

test("EARS: THE SYSTEM SHALL store the selected category with its entry and display it (POST then GET shows category)", async () => {
  const marker = "eval-cat-" + Date.now();
  const post = await fetch(API + "/entries", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ text: marker, category: "Landmark" }),
  });
  assert.equal(post.status, 201);
  const list = await (await fetch(API + "/entries")).json();
  const found = list.find(e => e.text === marker);
  assert.ok(found, "posted entry appears in GET");
  assert.equal(found.category, "Landmark", "category persisted and returned");
});

test("EARS: IF the category is missing or outside the allowed set, THEN THE SYSTEM SHALL reject it with a 400 naming the allowed categories (POST bad category is 400)", async () => {
  const res = await fetch(API + "/entries", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ text: "eval-bad-cat", category: "Nonsense" }),
  });
  assert.equal(res.status, 400);
  const reason = await res.text();
  assert.match(reason, /Food/, "400 names the allowed categories");
});

test("DDR-002 regression: entries keep distinct, stable ids so client metadata never drifts (two POSTs return two different ids)", async () => {
  const postA = await fetch(API + "/entries", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ text: "eval-regress-a-" + Date.now(), category: "Views" }),
  });
  const { id: idA } = await postA.json();
  const postB = await fetch(API + "/entries", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ text: "eval-regress-b-" + Date.now(), category: "Activity" }),
  });
  const { id: idB } = await postB.json();
  assert.notEqual(idA, idB, "each entry gets a unique server-assigned id");
});
// TODO (HW5 Part 5): one test for your delegated feature's endpoint or its
// effect on GET /entries. Name the EARS row in the title.
