// src/lib/analytics.ts
//
// Product analytics (PostHog). Answers the questions you cannot currently
// answer: how many people land, how many sign up, how many actually pay, and
// where the rest drop out.
//
// CONSENT-GATED. PostHog is only ever loaded if the visitor has accepted
// analytics cookies. Reject → nothing loads, no script, no cookie. That makes
// the cookie banner truthful in both directions.
//
// Activates only when VITE_POSTHOG_KEY is set.

const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY as string | undefined;
const POSTHOG_HOST =
  (import.meta.env.VITE_POSTHOG_HOST as string | undefined) || "https://eu.i.posthog.com";

type PostHog = {
  init: (key: string, opts: Record<string, unknown>) => void;
  capture: (event: string, props?: Record<string, unknown>) => void;
  identify: (id: string, props?: Record<string, unknown>) => void;
  reset: () => void;
  opt_out_capturing: () => void;
};

declare global {
  interface Window {
    posthog?: PostHog;
  }
}

let loaded = false;

/** True only if the visitor explicitly consented to analytics cookies. */
export function hasAnalyticsConsent(): boolean {
  try {
    const raw = localStorage.getItem("cookie-consent");
    if (!raw) return false;
    return JSON.parse(raw)?.analytics === true;
  } catch {
    return false;
  }
}

function loadPostHog(): void {
  if (!POSTHOG_KEY || loaded || window.posthog) return;
  loaded = true;

  const script = document.createElement("script");
  script.src = `${POSTHOG_HOST}/static/array.js`;
  script.async = true;
  script.onload = () => {
    try {
      window.posthog?.init(POSTHOG_KEY, {
        api_host: POSTHOG_HOST,
        capture_pageview: true,
        persistence: "localStorage+cookie",
        // We never want CV text or interview answers leaving in an event.
        autocapture: false,
      });
    } catch {
      /* analytics must never break the app */
    }
  };
  document.head.appendChild(script);
}

/** Call once on app start. Loads analytics only if consent is already given. */
export function initAnalytics(): void {
  if (hasAnalyticsConsent()) loadPostHog();
}

/**
 * Call when the visitor answers the cookie banner.
 * Accept → start immediately. Reject → stay off (and stop, if somehow running).
 */
export function setAnalyticsConsent(granted: boolean): void {
  if (granted) {
    loadPostHog();
  } else {
    try { window.posthog?.opt_out_capturing(); } catch { /* ignore */ }
  }
}

/** Track a product event. Silently does nothing without consent. */
export function track(event: string, props?: Record<string, unknown>): void {
  try {
    if (hasAnalyticsConsent()) window.posthog?.capture(event, props);
  } catch {
    /* ignore */
  }
}

/** Tie events to a signed-in user, so we can see a real signup→payment funnel. */
export function identify(userId: string, tier?: string): void {
  try {
    if (hasAnalyticsConsent()) window.posthog?.identify(userId, tier ? { tier } : undefined);
  } catch {
    /* ignore */
  }
}

/** Forget the user on sign-out. */
export function resetAnalytics(): void {
  try { window.posthog?.reset(); } catch { /* ignore */ }
}
