import express from "express";
import { createGreeting } from "./greeting.js";

export function createApp() {
  const app = express();

  app.use(express.json());

  app.get("/api/health", (_request, response) => {
    response.json({ status: "ok" });
  });

  app.post("/api/greetings", (request, response) => {
    const greeting = createGreeting(request.body?.name);

    if (!greeting) {
      return response.status(400).json({ error: "Name is required." });
    }

    return response.json(greeting);
  });

  app.use((error, _request, response, next) => {
    if (error instanceof SyntaxError && "body" in error) {
      return response.status(400).json({ error: "Request body must be valid JSON." });
    }

    return next(error);
  });

  return app;
}

