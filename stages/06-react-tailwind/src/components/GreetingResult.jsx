const statusClasses = {
  idle: "bg-slate-50 text-slate-600",
  loading: "bg-blue-50 text-blue-700",
  error: "bg-rose-50 text-rose-700",
  success: "bg-emerald-50 text-emerald-700",
};

export function GreetingResult({ status, greeting, error }) {
  let content = <p>Your server-generated greeting will appear here.</p>;

  if (status === "loading") content = <p>Contacting the server…</p>;
  if (status === "error") content = <p>{error}</p>;
  if (status === "success") {
    content = (
      <>
        <p>{greeting.message}</p>
        <small className="mt-1.5 block">{greeting.normalizedName} has {greeting.characterCount} characters.</small>
      </>
    );
  }

  return (
    <div
      className={`mt-5 min-h-18 rounded-xl p-4 ${statusClasses[status]}`}
      data-status={status}
      aria-live="polite"
    >
      {content}
    </div>
  );
}

