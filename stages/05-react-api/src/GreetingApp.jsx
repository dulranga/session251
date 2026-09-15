import { useState } from "react";
import { GreetingForm } from "./components/GreetingForm.jsx";
import { GreetingResult } from "./components/GreetingResult.jsx";

export function GreetingApp({ request = fetch }) {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("idle");
  const [greeting, setGreeting] = useState(null);
  const [error, setError] = useState("");
  const [requestCount, setRequestCount] = useState(0);

  async function handleSubmit(event) {
    event.preventDefault();
    setRequestCount((count) => count + 1);
    setStatus("loading");
    setError("");

    try {
      const response = await request("/api/greetings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "The server could not create a greeting.");

      setGreeting(data);
      setStatus("success");
    } catch (requestError) {
      setError(requestError.message || "Could not reach the server.");
      setStatus("error");
    }
  }

  return (
    <main className="page-shell">
      <section className="greeting-card" aria-labelledby="page-title">
        <p className="eyebrow">Checkpoint 05 · React + Node API</p>
        <h1 id="page-title">Greeting Generator</h1>
        <p className="intro">Components render every request state from JavaScript values.</p>
        <GreetingForm name={name} loading={status === "loading"} onNameChange={setName} onSubmit={handleSubmit} />
        <GreetingResult status={status} greeting={greeting} error={error} />
        <p className="counter">Requests attempted: <strong>{requestCount}</strong></p>
      </section>
    </main>
  );
}

