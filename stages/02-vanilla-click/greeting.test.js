import { beforeEach, describe, expect, it } from "vitest";
import { setupLocalGreeting } from "./greeting.js";

describe("local greeting interaction", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <form id="greeting-form">
        <input id="name" />
        <button type="submit">Generate</button>
      </form>
      <div id="result"></div>
      <span id="count">0</span>
    `;
    setupLocalGreeting(document);
  });

  it("shows an error instead of accepting an empty name", () => {
    document.querySelector("#greeting-form").requestSubmit();

    expect(document.querySelector("#result").textContent).toContain("Please enter a name");
    expect(document.querySelector("#result").dataset.status).toBe("error");
    expect(document.querySelector("#count").textContent).toBe("0");
  });

  it("renders a safe greeting and increments the count", () => {
    const input = document.querySelector("#name");
    input.value = "<Ada>";

    document.querySelector("#greeting-form").requestSubmit();
    document.querySelector("#greeting-form").requestSubmit();

    expect(document.querySelector("#result").textContent).toContain("Hello, <Ada>!");
    expect(document.querySelector("#result strong").textContent).toBe("<Ada>");
    expect(document.querySelector("#count").textContent).toBe("2");
  });
});

