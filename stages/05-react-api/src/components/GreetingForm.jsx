import { ActionButton } from "./ActionButton.jsx";

export function GreetingForm({ name, loading, onNameChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="field">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          value={name}
          onChange={(event) => onNameChange(event.target.value)}
          placeholder="Grace Hopper"
          autoComplete="name"
        />
      </div>
      <ActionButton disabled={loading}>{loading ? "Contacting server…" : "Ask the server"}</ActionButton>
    </form>
  );
}

