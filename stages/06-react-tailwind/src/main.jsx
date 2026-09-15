import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GreetingApp } from "./GreetingApp.jsx";
import "./styles.css";

createRoot(document.getElementById("root")).render(
  <StrictMode><GreetingApp /></StrictMode>,
);

