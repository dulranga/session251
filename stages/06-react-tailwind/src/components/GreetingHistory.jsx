export function GreetingHistory({ greetings, onClear }) {
  if (greetings.length === 0) return null;

  return (
    <section className="mt-6 border-t border-slate-200 pt-5" aria-labelledby="history-title">
      <div className="flex items-center justify-between gap-4">
        <h2 id="history-title" className="text-lg font-bold">Greeting history</h2>
        <button
          type="button"
          onClick={onClear}
          className="rounded-lg px-2 py-1 text-sm font-semibold text-indigo-700 hover:bg-indigo-50 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-indigo-300"
        >
          Clear history
        </button>
      </div>
      <ul className="mt-3 grid gap-2 pl-5 text-slate-600">
        {greetings.map((message, index) => <li key={`${message}-${index}`}>{message}</li>)}
      </ul>
    </section>
  );
}

