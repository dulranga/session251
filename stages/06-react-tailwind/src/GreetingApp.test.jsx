import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { GreetingApp } from "./GreetingApp.jsx";

afterEach(cleanup);

function successfulRequest(message = "Hello, Ada!") {
  return vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ message, normalizedName: "Ada", characterCount: 3 }),
  });
}

describe("React and Tailwind greeting app", () => {
  it("preserves the API request and response behavior", async () => {
    const request = successfulRequest();
    const user = userEvent.setup();
    render(<GreetingApp request={request} />);

    await user.type(screen.getByLabelText("Name"), "Ada");
    await user.click(screen.getByRole("button", { name: "Ask the server" }));

    expect((await screen.findAllByText("Hello, Ada!")).length).toBe(2);
    expect(request).toHaveBeenCalledWith("/api/greetings", expect.objectContaining({
      method: "POST",
      body: JSON.stringify({ name: "Ada" }),
    }));
  });

  it("renders only successful greetings in history and clears them", async () => {
    const request = successfulRequest()
      .mockResolvedValueOnce({ ok: true, json: async () => ({ message: "Hello, Ada!", normalizedName: "Ada", characterCount: 3 }) })
      .mockResolvedValueOnce({ ok: false, json: async () => ({ error: "Name is required." }) });
    const user = userEvent.setup();
    render(<GreetingApp request={request} />);

    await user.click(screen.getByRole("button", { name: "Ask the server" }));
    const history = await screen.findByRole("region", { name: "Greeting history" });
    expect(within(history).getAllByRole("listitem")).toHaveLength(1);

    await user.click(screen.getByRole("button", { name: "Ask the server" }));
    expect(await screen.findByText("Name is required.")).toBeInTheDocument();
    expect(within(history).getAllByRole("listitem")).toHaveLength(1);

    await user.click(screen.getByRole("button", { name: "Clear history" }));
    expect(screen.queryByRole("region", { name: "Greeting history" })).not.toBeInTheDocument();
  });

  it("disables the submit button while loading", async () => {
    const user = userEvent.setup();
    render(<GreetingApp request={() => new Promise(() => {})} />);

    await user.click(screen.getByRole("button", { name: "Ask the server" }));

    expect(screen.getByRole("button", { name: "Contacting server…" })).toBeDisabled();
  });
});

