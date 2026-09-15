export function ActionButton({ children, disabled = false, type = "submit", onClick }) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className="w-full cursor-pointer rounded-xl bg-indigo-600 px-5 py-3 font-extrabold text-white transition hover:bg-indigo-700 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-indigo-300 disabled:cursor-wait disabled:opacity-60"
    >
      {children}
    </button>
  );
}

