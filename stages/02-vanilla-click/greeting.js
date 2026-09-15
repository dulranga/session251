export function setupLocalGreeting(root = document) {
  const form = root.querySelector("#greeting-form");
  const nameInput = root.querySelector("#name");
  const result = root.querySelector("#result");
  const countOutput = root.querySelector("#count");
  let count = 0;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = nameInput.value.trim();

    if (!name) {
      result.dataset.status = "error";
      result.innerHTML = "<p>Please enter a name.</p>";
      nameInput.focus();
      return;
    }

    count += 1;
    result.dataset.status = "success";
    result.innerHTML = `<p>Hello, <strong>${escapeHtml(name)}</strong>!</p>`;
    countOutput.textContent = String(count);
  });
}

function escapeHtml(value) {
  const element = document.createElement("div");
  element.textContent = value;
  return element.innerHTML;
}

