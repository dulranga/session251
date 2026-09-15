export function GreetingResult({ status, greeting, error }) {
  let content = <p>Your server-generated greeting will appear here.</p>;

  if (status === "loading") content = <p>Contacting the server…</p>;
  if (status === "error") content = <p>{error}</p>;
  if (status === "success") {
    content = (
      <>
        <p>{greeting.message}</p>
        <small>{greeting.normalizedName} has {greeting.characterCount} characters.</small>
      </>
    );
  }

  return <div className="result" data-status={status} aria-live="polite">{content}</div>;
}

