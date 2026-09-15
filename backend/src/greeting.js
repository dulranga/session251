export function createGreeting(name) {
  if (typeof name !== "string") {
    return null;
  }

  const normalizedName = name.trim().replace(/\s+/g, " ");

  if (!normalizedName) {
    return null;
  }

  return {
    message: `Hello, ${normalizedName}!`,
    normalizedName,
    characterCount: [...normalizedName].length,
  };
}

