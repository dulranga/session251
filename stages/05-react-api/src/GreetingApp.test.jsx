import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { GreetingApp } from "./GreetingApp.jsx";

afterEach(cleanup);

describe("React API greeting app", () => {
  it("posts a name and renders the response", async () => {
    const request = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ message: "Hello, Ada!", normalizedName: "Ada", characterCount: 3 }),
    });
    const user = userEvent.setup();
    render(<GreetingApp request={request} />);

    await user.type(screen.getByLabelText("Name"), "Ada");
    await user.click(screen.getByRole("button", { name: "Ask the server" }));

    expect(await screen.findByText("Hello, Ada!")).toBeInTheDocument();
    expect(request).toHaveBeenCalledWith("/api/greetings", expect.objectContaining({
      method: "POST",
      body: JSON.stringify({ name: "Ada" }),
    }));
    expect(screen.getByText("1", { selector: "strong" })).toBeInTheDocument();
  });

  it("renders backend validation errors and restores the button", async () => {
    const request = vi.fn().mockResolvedValue({ ok: false, json: async () => ({ error: "Name is required." }) });
    const user = userEvent.setup();
    render(<GreetingApp request={request} />);

    await user.click(screen.getByRole("button", { name: "Ask the server" }));

    expect(await screen.findByText("Name is required.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Ask the server" })).toBeEnabled();
  });

  it("shows a loading state while waiting", async () => {
    const user = userEvent.setup();
    render(<GreetingApp request={() => new Promise(() => {})} />);

    await user.click(screen.getByRole("button", { name: "Ask the server" }));

    expect(screen.getByRole("button", { name: "Contacting server…" })).toBeDisabled();
    expect(screen.getByText("Contacting the server…")).toBeInTheDocument();
  });

  it("allows repeated requests and counts each attempt", async () => {
    const request = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ message: "Hello, Ada!", normalizedName: "Ada", characterCount: 3 }),
    });
    const user = userEvent.setup();
    render(<GreetingApp request={request} />);

    await user.click(screen.getByRole("button", { name: "Ask the server" }));
    await screen.findByText("Hello, Ada!");
    await user.click(screen.getByRole("button", { name: "Ask the server" }));

    expect(await screen.findByText("2", { selector: "strong" })).toBeInTheDocument();
    expect(request).toHaveBeenCalledTimes(2);
  });
});

