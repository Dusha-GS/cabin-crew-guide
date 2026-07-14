// src/lib/monitoring.ts
//
// Error monitoring (Sentry). Tells us when a REAL user hits a crash — a failed
// checkout, a broken signup — instead of us finding out never.
//
// Loaded from Sentry's CDN so we don't add a build dependency.
// Activates only when VITE_SENTRY_DSN is set, so local/dev builds stay silent.
//
// No cookies, no analytics, no personal data (sendDefaultPii: false). This is
// operational error reporting, not tracking — it does not require consent.

const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN as string | undefined;
const SENTRY_CDN = "https://browser.sentry-cdn.com/7.120.0/bundle.tracing.min.js";

declare global {
  interface Window {
    Sentry?: {
      init: (opts: Record<string, unknown>) => void;
      captureException: (e: unknown) => void;
      setUser: (u: Record<string, unknown> | null) => void;
    };
  }
}

export function initMonitoring(): void {
  if (!SENTRY_DSN) return;          // not configured — do nothing
  if (window.Sentry) return;        // already loaded

  const script = document.createElement("script");
  script.src = SENTRY_CDN;
  script.crossOrigin = "anonymous";
  script.async = true;

  script.onload = () => {
    try {
      window.Sentry?.init({
        dsn: SENTRY_DSN,
        environment: "production",
        // Don't ship personal data to a third party.
        sendDefaultPii: false,
        // Sample a slice of traffic for performance data; errors are always sent.
        tracesSampleRate: 0.1,
        // Ignore noise we can't act on (browser extensions, network blips).
        ignoreErrors: [
          "ResizeObserver loop limit exceeded",
          "Non-Error promise rejection captured",
          "Failed to fetch",
          "NetworkError",
          "Load failed",
        ],
      });
    } catch {
      /* monitoring must never break the app */
    }
  };

  document.head.appendChild(script);
}

/** Report a handled error we care about (e.g. a checkout that failed). */
export function reportError(error: unknown, context?: Record<string, unknown>): void {
  try {
    if (window.Sentry) {
      window.Sentry.captureException(error);
    } else if (import.meta.env.DEV) {
      console.error("[monitoring]", error, context);
    }
  } catch {
    /* never throw from the error reporter */
  }
}
