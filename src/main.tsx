import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";
import { initMonitoring } from "./lib/monitoring";
import { initAnalytics } from "./lib/analytics";
import { initPixel } from "./lib/pixel";

// Error monitoring: always on (no cookies, no personal data).
initMonitoring();
// Product analytics: only loads if the visitor accepted analytics cookies.
initAnalytics();
initPixel();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
