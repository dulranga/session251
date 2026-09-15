export function setupGreetingApp({ root = document, request = fetch } = {}) {
  const form = root.querySelector("#greeting-form");
  const nameInput = root.querySelector("#name");
  const button = root.querySelector("#submit-button");
  const result = root.querySelector("#result");
  const countOutput = root.querySelector("#count");
  let requestCount = 0;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    requestCount += 1;
    countOutput.textContent = String(requestCount);
    setStatus("loading", "Contacting the server…");
    button.disabled = true;

    try {
      const response = await request("/api/greetings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: nameInput.value }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "The server could not create a greeting.");
      }

      result.dataset.status = "success";
      result.replaceChildren();
      const message = document.createElement("p");
      message.textContent = data.message;
      const detail = document.createElement("small");
      detail.textContent = `${data.normalizedName} has ${data.characterCount} characters.`;
      result.append(message, detail);
    } catch (error) {
      setStatus("error", error.message || "Could not reach the server.");
    } finally {
      button.disabled = false;
    }
  });

  function setStatus(status, message) {
    result.dataset.status = status;
    result.replaceChildren();
    const paragraph = document.createElement("p");
    paragraph.textContent = message;
    result.append(paragraph);
  }
}

