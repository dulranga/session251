import { beforeEach, describe, expect, it, vi } from "vitest";
import { setupGreetingApp } from "./greeting-app.js";

function renderApp() {
  document.body.innerHTML = `
    <form id="greeting-form"><input id="name" /><button id="submit-button">Send</button></form>
    <div id="result"></div><span id="count">0</span>
  `;
}

describe("vanilla API greeting app", () => {
  beforeEach(renderApp);

  it("posts the name and renders the server response", async () => {
    const request = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        message: "Hello, Ada Lovelace!",
        normalizedName: "Ada Lovelace",
        characterCount: 12,
      }),
    });
    setupGreetingApp({ root: document, request });
    document.querySelector("#name").value = " Ada Lovelace ";

    document.querySelector("#greeting-form").requestSubmit();
    await vi.waitFor(() => expect(document.querySelector("#result").dataset.status).toBe("success"));

    expect(request).toHaveBeenCalledWith("/api/greetings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: " Ada Lovelace " }),
    });
    expect(document.querySelector("#result").textContent).toContain("Hello, Ada Lovelace!");
    expect(document.querySelector("#count").textContent).toBe("1");
    expect(document.querySelector("#submit-button").disabled).toBe(false);
  });

  it("shows loading while the request is pending", () => {
    setupGreetingApp({ root: document, request: () => new Promise(() => {}) });

    document.querySelector("#greeting-form").requestSubmit();

    expect(document.querySelector("#result").dataset.status).toBe("loading");
    expect(document.querySelector("#submit-button").disabled).toBe(true);
  });

  it("renders an API error and re-enables the button", async () => {
    const request = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ error: "Name is required." }),
    });
    setupGreetingApp({ root: document, request });

    document.querySelector("#greeting-form").requestSubmit();
    await vi.waitFor(() => expect(document.querySelector("#result").dataset.status).toBe("error"));

    expect(document.querySelector("#result").textContent).toContain("Name is required.");
    expect(document.querySelector("#submit-button").disabled).toBe(false);
  });

  it("handles a network failure", async () => {
    setupGreetingApp({ root: document, request: vi.fn().mockRejectedValue(new Error("Network unavailable")) });

    document.querySelector("#greeting-form").requestSubmit();
    await vi.waitFor(() => expect(document.querySelector("#result").textContent).toContain("Network unavailable"));
  });
});

