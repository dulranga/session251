import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { GreetingDemo } from "./GreetingDemo.jsx";

afterEach(cleanup);

describe("first React greeting component", () => {
  it("renders a greeting and updates its count", async () => {
    const user = userEvent.setup();
    render(<GreetingDemo />);

    await user.type(screen.getByLabelText("Name"), "Katherine Johnson");
    await user.click(screen.getByRole("button", { name: "Generate greeting" }));

    expect(screen.getByText("Hello, Katherine Johnson!")).toBeInTheDocument();
    expect(screen.getByText("1", { selector: "strong" })).toBeInTheDocument();
  });

  it("validates blank input", async () => {
    const user = userEvent.setup();
    render(<GreetingDemo />);

    await user.click(screen.getByRole("button", { name: "Generate greeting" }));

    expect(screen.getByText("Please enter a name.")).toBeInTheDocument();
  });

  it("resets input, message, and count", async () => {
    const user = userEvent.setup();
    render(<GreetingDemo />);
    const input = screen.getByLabelText("Name");

    await user.type(input, "Ada");
    await user.click(screen.getByRole("button", { name: "Generate greeting" }));
    await user.click(screen.getByRole("button", { name: "Reset" }));

    expect(input).toHaveValue("");
    expect(screen.getByText("Your greeting will appear here.")).toBeInTheDocument();
    expect(screen.getByText("0", { selector: "strong" })).toBeInTheDocument();
  });
});

