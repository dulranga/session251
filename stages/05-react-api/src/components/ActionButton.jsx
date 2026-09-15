export function ActionButton({ children, disabled = false }) {
  return <button type="submit" disabled={disabled}>{children}</button>;
}

