import { useState } from "react";

function ActionButton({ children, type = "button", variant = "primary", onClick }) {
  return (
    <button type={type} className={`button button--${variant}`} onClick={onClick}>
      {children}
    </button>
  );
}

export function GreetingDemo() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("Your greeting will appear here.");
  const [status, setStatus] = useState("idle");
  const [count, setCount] = useState(0);

  function handleSubmit(event) {
    event.preventDefault();
    const cleanName = name.trim();

    if (!cleanName) {
      setMessage("Please enter a name.");
      setStatus("error");
      return;
    }

    setMessage(`Hello, ${cleanName}!`);
    setStatus("success");
    setCount((currentCount) => currentCount + 1);
  }

  function handleReset() {
    setName("");
    setMessage("Your greeting will appear here.");
    setStatus("idle");
    setCount(0);
  }

  return (
    <main className="page-shell">
      <section className="greeting-card" aria-labelledby="page-title">
        <p className="eyebrow">Checkpoint 04 · First React component</p>
        <h1 id="page-title">Greeting Generator</h1>
        <p className="intro">State describes the UI; React keeps the DOM in sync.</p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Katherine Johnson"
              autoComplete="name"
            />
          </div>
          <div className="actions">
            <ActionButton type="submit">Generate greeting</ActionButton>
            <ActionButton variant="secondary" onClick={handleReset}>Reset</ActionButton>
          </div>
        </form>

        <div className="result" data-status={status} aria-live="polite">
          <p>{message}</p>
        </div>
        <p className="counter">Greetings generated: <strong>{count}</strong></p>
      </section>
    </main>
  );
}

