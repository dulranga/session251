import assert from "node:assert/strict";
import test from "node:test";
import request from "supertest";
import { createApp } from "../src/app.js";

const app = createApp();

test("GET /api/health reports that the service is ready", async () => {
  const response = await request(app).get("/api/health");

  assert.equal(response.status, 200);
  assert.deepEqual(response.body, { status: "ok" });
});

test("POST /api/greetings returns a processed greeting", async () => {
  const response = await request(app)
    .post("/api/greetings")
    .send({ name: "  Grace   Hopper " });

  assert.equal(response.status, 200);
  assert.deepEqual(response.body, {
    message: "Hello, Grace Hopper!",
    normalizedName: "Grace Hopper",
    characterCount: 12,
  });
});

for (const body of [{}, { name: "  " }, { name: 42 }]) {
  test(`POST /api/greetings rejects ${JSON.stringify(body)}`, async () => {
    const response = await request(app).post("/api/greetings").send(body);

    assert.equal(response.status, 400);
    assert.deepEqual(response.body, { error: "Name is required." });
  });
}

test("POST /api/greetings rejects malformed JSON", async () => {
  const response = await request(app)
    .post("/api/greetings")
    .set("Content-Type", "application/json")
    .send('{"name":');

  assert.equal(response.status, 400);
  assert.deepEqual(response.body, { error: "Request body must be valid JSON." });
});
