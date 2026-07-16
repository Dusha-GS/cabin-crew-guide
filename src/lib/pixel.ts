// src/lib/pixel.ts
//
// Meta (Facebook/Instagram) Pixel — for measuring ad campaigns.
//
// CONSENT-GATED on the MARKETING consent category (stricter than analytics:
// ad-tracking is a distinct purpose under GDPR/ePrivacy, so it has its own
// toggle in the cookie banner). No consent -> the script never loads, no
// cookie, no request. Reject after accept -> revoked via fbq('consent').
//
// Activates only when VITE_META_PIXEL_ID is set (staged rollout: ship inert,
// then set the env var in Netlify and redeploy to switch it on).

const PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID as string | undefined;

type Fbq = { (...args: unknown[]): void; queue?: unknown[]; loaded?: boolean };
declare global {
  interface Window { fbq?: Fbq; _fbq?: Fbq; }
}

let loaded = false;

/** True only if the visitor explicitly consented to MARKETING cookies. */
export function hasMarketingConsent(): boolean {
  try {
    const raw = localStorage.getItem("cookie-consent");
    if (!raw) return false;
    return JSON.parse(raw)?.marketing === true;
  } catch {
    return false;
  }
}

function loadPixel(): void {
  if (!PIXEL_ID || loaded || window.fbq) return;
  loaded = true;
  const fbq: Fbq = function (...args: unknown[]) {
    (fbq.queue = fbq.queue || []).push(args);
  };
  window.fbq = fbq;
  window._fbq = fbq;
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);
  try {
    window.fbq("consent", "grant");
    window.fbq("init", PIXEL_ID);
    window.fbq("track", "PageView");
  } catch {
    /* marketing must never break the app */
  }
}

/** Call once on app start. Loads the pixel only if consent is already given. */
export function initPixel(): void {
  if (hasMarketingConsent()) loadPixel();
}

/** Call when the visitor answers the cookie banner. */
export function setMarketingConsent(granted: boolean): void {
  if (granted) {
    loadPixel();
  } else {
    try { window.fbq?.("consent", "revoke"); } catch { /* ignore */ }
  }
}

/** SPA page change. Silently does nothing without consent. */
export function pixelPageView(): void {
  try {
    if (hasMarketingConsent()) window.fbq?.("track", "PageView");
  } catch { /* ignore */ }
}

/** Standard Meta event (e.g. "InitiateCheckout", "CompleteRegistration"). */
export function pixelTrack(event: string, props?: Record<string, unknown>): void {
  try {
    if (hasMarketingConsent()) window.fbq?.("track", event, props);
  } catch { /* ignore */ }
}
