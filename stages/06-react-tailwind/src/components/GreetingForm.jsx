import { ActionButton } from "./ActionButton.jsx";

export function GreetingForm({ name, loading, onNameChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="grid gap-2">
        <label className="font-bold" htmlFor="name">Name</label>
        <input
          id="name"
          value={name}
          onChange={(event) => onNameChange(event.target.value)}
          placeholder="Grace Hopper"
          autoComplete="name"
          className="w-full rounded-xl border border-slate-400 px-3.5 py-3 text-slate-900 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-indigo-300"
        />
      </div>
      <div className="mt-4">
        <ActionButton disabled={loading}>{loading ? "Contacting server…" : "Ask the server"}</ActionButton>
      </div>
    </form>
  );
}

