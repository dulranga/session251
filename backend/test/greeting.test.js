import assert from "node:assert/strict";
import test from "node:test";
import { createGreeting } from "../src/greeting.js";

test("creates a greeting and reports the character count", () => {
  assert.deepEqual(createGreeting("Ada"), {
    message: "Hello, Ada!",
    normalizedName: "Ada",
    characterCount: 3,
  });
});

test("trims and collapses whitespace", () => {
  assert.deepEqual(createGreeting("  Ada   Lovelace  "), {
    message: "Hello, Ada Lovelace!",
    normalizedName: "Ada Lovelace",
    characterCount: 12,
  });
});

test("rejects blank and non-string names", () => {
  assert.equal(createGreeting("   "), null);
  assert.equal(createGreeting(undefined), null);
  assert.equal(createGreeting(42), null);
});

