import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { initMonitoring } from "./lib/monitoring";
import { initAnalytics } from "./lib/analytics";

// Error monitoring: always on (no cookies, no personal data).
initMonitoring();
// Product analytics: only loads if the visitor accepted analytics cookies.
initAnalytics();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
