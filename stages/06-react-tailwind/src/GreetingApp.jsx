import { useState } from "react";
import { GreetingForm } from "./components/GreetingForm.jsx";
import { GreetingHistory } from "./components/GreetingHistory.jsx";
import { GreetingResult } from "./components/GreetingResult.jsx";

export function GreetingApp({ request = fetch }) {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("idle");
  const [greeting, setGreeting] = useState(null);
  const [error, setError] = useState("");
  const [requestCount, setRequestCount] = useState(0);
  const [history, setHistory] = useState([]);

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
      setHistory((currentHistory) => [...currentHistory, data.message]);
      setStatus("success");
    } catch (requestError) {
      setError(requestError.message || "Could not reach the server.");
      setStatus("error");
    }
  }

  return (
    <main className="grid min-h-screen min-w-80 place-items-center bg-indigo-50 px-3 py-6 font-sans text-slate-900 sm:px-6">
      <section className="w-full max-w-lg rounded-2xl border border-indigo-200 bg-white p-6 shadow-xl shadow-indigo-950/10 sm:p-8" aria-labelledby="page-title">
        <p className="mb-2 text-xs font-extrabold tracking-widest text-indigo-600 uppercase">Checkpoint 06 · React + Tailwind</p>
        <h1 id="page-title" className="text-4xl leading-none font-bold sm:text-5xl">Greeting Generator</h1>
        <p className="my-4 mb-6 leading-relaxed text-slate-600">The behavior is unchanged; utility classes now describe each component's styles.</p>
        <GreetingForm name={name} loading={status === "loading"} onNameChange={setName} onSubmit={handleSubmit} />
        <GreetingResult status={status} greeting={greeting} error={error} />
        <p className="mt-3 text-center text-sm text-slate-500">Requests attempted: <strong>{requestCount}</strong></p>
        <GreetingHistory greetings={history} onClear={() => setHistory([])} />
      </section>
    </main>
  );
}

