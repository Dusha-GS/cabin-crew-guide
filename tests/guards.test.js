// tests/guards.test.js
//
// Guards against the regressions that would actually cost money or trust.
// No dependencies — Node's built-in test runner. Runs in seconds.
//
//   npm test          (after `npm run build`, which produces dist/)
//
// Each of these encodes a bug we have ALREADY had, or a protection we paid for.

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const read = (p) => readFileSync(p, "utf8");
const ROOT = process.cwd();

/**
 * Strip // line comments and block comments before asserting.
 * Without this, a guard can "pass" by matching a comment that DESCRIBES the
 * safe behaviour while the actual code does the unsafe thing. That happened.
 */
const stripComments = (src) =>
  src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");

// ---------------------------------------------------------------------------
// 1. THE REVENUE LEAK. Paid content must never be in the client bundle again.
// ---------------------------------------------------------------------------
test("paid content is NOT shipped in the client bundle", () => {
  const distAssets = join(ROOT, "dist", "assets");
  assert.ok(existsSync(distAssets), "dist/ missing — run `npm run build` first");

  const bundle = readdirSync(distAssets)
    .filter((f) => f.endsWith(".js"))
    .map((f) => read(join(distAssets, f)))
    .join("\n");

  // Real prose lifted from the paid material in netlify/functions/get-content.js.
  const paidStrings = [
    "Tell me about yourself",
    "Desert Island Survival",
    "A high-quality professional headshot is MANDATORY",
    "Recruiters test this specifically",
    "Release seatbelts, leave everything",  // mock-exam (paid)
    "Speak at 75% of your normal speed",     // rejection-decoded (paid)
    "Keep your current job until both are in hand", // after-the-interview (paid)
  ];

  for (const s of paidStrings) {
    assert.ok(
      !bundle.includes(s),
      `LEAK: paid content "${s}" is in the client bundle — a non-paying visitor can read it from the page source.`
    );
  }
});

test("free content IS still shipped (we didn't gate the lead magnets by mistake)", () => {
  const distAssets = join(ROOT, "dist", "assets");
  const bundle = readdirSync(distAssets)
    .filter((f) => f.endsWith(".js"))
    .map((f) => read(join(distAssets, f)))
    .join("\n");

  assert.ok(bundle.includes("Emirates"), "free airline content vanished from the bundle");
});

test("paid content lives server-side, behind the function", () => {
  const fn = read(join(ROOT, "netlify/functions/get-content.js"));
  assert.ok(fn.includes("Tell me about yourself"), "paid content missing from get-content.js");
  assert.match(fn, /auth\/v1\/user/, "get-content must verify the session");
  assert.match(fn, /TIER_RANK/, "get-content must check the tier server-side");
});

// ---------------------------------------------------------------------------
// 2. AUTHENTICATION. Every endpoint that touches user data or money must
//    verify the session server-side. This is how the get-tier oracle happened.
// ---------------------------------------------------------------------------
test("every sensitive function verifies a Supabase session", () => {
  const mustAuth = [
    "claude.js",          // costs money (Anthropic)
    "get-content.js",     // serves paid content
    "get-tier.js",        // leaked the customer list when it didn't
    "delete-account.js",  // destroys data
    "create-portal-session.js", // billing
    "send-email.js",      // sends mail as us
  ];

  for (const f of mustAuth) {
    const src = read(join(ROOT, "netlify/functions", f));
    assert.match(src, /auth\/v1\/user/, `${f} must verify the session against Supabase`);
    assert.match(src, /authorization|Authorization/, `${f} must read the Authorization header`);
  }
});

test("no function accepts a wildcard CORS origin", () => {
  const dir = join(ROOT, "netlify/functions");
  for (const f of readdirSync(dir).filter((f) => f.endsWith(".js"))) {
    const src = read(join(dir, f));
    if (f === "stripe-webhook.js" || f === "whop-webhook.js") continue; // called by Stripe, not browsers
    assert.ok(
      !src.includes('"Access-Control-Allow-Origin": "*"'),
      `${f} allows any origin — a lookup endpoint with CORS:* is callable from any website.`
    );
  }
});

test("AI endpoint enforces cost controls", () => {
  const src = read(join(ROOT, "netlify/functions/claude.js"));
  assert.match(src, /RATE_LIMIT_PER_HOUR/, "AI rate limit removed — one account could run up an unbounded bill");
  assert.match(src, /FREE_LIFETIME_CAPS/, "free-tier caps removed — free users could farm the AI");
  assert.match(src, /MAX_TOKENS_CAP/, "token cap removed");
});

test("Stripe webhook verifies its signature", () => {
  const src = read(join(ROOT, "netlify/functions/stripe-webhook.js"));
  assert.match(src, /timingSafeEqual/, "webhook must use a timing-safe signature comparison");
  assert.match(src, /STRIPE_WEBHOOK_SECRET/, "webhook must verify against the signing secret");
});

// ---------------------------------------------------------------------------
// 3. ACCESS CONTROL. The gating lists are what stand between free users and
//    paid features.
// ---------------------------------------------------------------------------
test("paid sections are still gated in App.tsx", () => {
  const app = read(join(ROOT, "src/App.tsx"));
  for (const s of ["questions", "cv-guide"]) {
    assert.ok(app.includes(`"${s}"`), `${s} missing from the gating lists`);
  }
  assert.match(app, /STANDARD_SECTIONS/, "STANDARD_SECTIONS gate removed");
  assert.match(app, /PREMIUM_SECTIONS/, "PREMIUM_SECTIONS gate removed");
  assert.match(app, /LOGIN_REQUIRED_SECTIONS/, "login gate removed");
});

test("logout actually clears the session (the bug that re-logged users in)", () => {
  // Strip comments first — an earlier version of this test passed because the
  // string it looked for appeared in a COMMENT, not in the code. A guard that
  // reads comments is worse than no guard: it gives false confidence.
  const auth = stripComments(read(join(ROOT, "src/hooks/useAuth.ts")));

  assert.match(
    auth,
    /signOut\(\s*\{\s*scope:\s*"local"\s*\}\s*\)/,
    'signOut must be called with scope:"local" — the default global scope makes a network call that hangs, leaving the session in the browser and silently re-logging users in on refresh'
  );
  assert.ok(
    !/scope:\s*"global"/.test(auth),
    'signOut must not use the global scope'
  );
  assert.match(auth, /startsWith\("sb-"\)/, "logout must remove the Supabase token from localStorage");
});

test("no demo backdoor has crept back in", () => {
  const auth = read(join(ROOT, "src/hooks/useAuth.ts"));
  assert.ok(!/demo@cabincrew\.com/i.test(auth), "the hardcoded demo premium login is back");
});

// ---------------------------------------------------------------------------
// 4. PRIVACY & COMPLIANCE.
// ---------------------------------------------------------------------------
test("analytics consent is opt-IN, not pre-ticked (GDPR)", () => {
  // Must match the ANALYTICS state specifically. An earlier version of this
  // test just looked for `useState(false)` anywhere — which matched the
  // unrelated `visible` and `showDetails` state and passed even when analytics
  // was pre-ticked.
  const c = stripComments(read(join(ROOT, "src/components/CookieConsent.tsx")));

  const m = c.match(/\[\s*analytics\s*,\s*setAnalytics\s*\]\s*=\s*useState\(\s*(\w+)\s*\)/);
  assert.ok(m, "could not find the analytics consent state — did the component change?");
  assert.equal(
    m[1],
    "false",
    "the analytics toggle is pre-ticked. A pre-ticked box is not valid consent under GDPR (Planet49) — it must default to false."
  );
});

test("analytics only loads with consent", () => {
  const a = read(join(ROOT, "src/lib/analytics.ts"));
  assert.match(a, /hasAnalyticsConsent/, "consent gate removed from analytics");
  assert.match(a, /autocapture:\s*false/, "autocapture must stay off — it could send CV text to a third party");
});

// ---------------------------------------------------------------------------
// 5. SECURITY HEADERS & SEO. One config file; easy to delete by accident.
// ---------------------------------------------------------------------------
test("security headers are configured", () => {
  const toml = read(join(ROOT, "netlify.toml"));
  for (const h of [
    "X-Frame-Options",
    "Content-Security-Policy",
    "X-Content-Type-Options",
    "Referrer-Policy",
    "Strict-Transport-Security",
  ]) {
    assert.ok(toml.includes(h), `${h} missing — clickjacking / injection protection lost`);
  }
  assert.match(toml, /X-Frame-Options\s*=\s*"DENY"/, "the site must not be framable");
});

test("robots.txt and sitemap.xml are real files, not the SPA fallback", () => {
  assert.ok(existsSync(join(ROOT, "dist/robots.txt")), "robots.txt not emitted — Googlebot gets the HTML app instead");
  assert.ok(existsSync(join(ROOT, "dist/sitemap.xml")), "sitemap.xml not emitted");
  assert.match(read(join(ROOT, "dist/robots.txt")), /^User-agent/, "robots.txt is not a robots file");
});

test("social sharing tags are present", () => {
  const html = read(join(ROOT, "dist/index.html"));
  for (const tag of ['property="og:title"', 'property="og:image"', 'property="og:description"', 'rel="canonical"']) {
    assert.ok(html.includes(tag), `${tag} missing — shared links render as a naked URL`);
  }
});

// ---------------------------------------------------------------------------
// 6. RESILIENCE.
// ---------------------------------------------------------------------------
test("an error boundary wraps the app", () => {
  const main = read(join(ROOT, "src/main.tsx"));
  assert.match(main, /ErrorBoundary/, "no error boundary — one render crash gives the user a white screen");
});

// ---------------------------------------------------------------------------
// 7. BOT PROTECTION. The captcha wiring must stay attached to the auth forms.
// ---------------------------------------------------------------------------
test("auth forms are wired for Turnstile bot protection", () => {
  const modal = read(join(ROOT, "src/components/AuthModal.tsx"));
  assert.match(modal, /TurnstileWidget/, "AuthModal must render the Turnstile widget");
  assert.match(modal, /captchaBlocking/, "submit must be gated on a captcha token when enabled");

  const auth = read(join(ROOT, "src/hooks/useAuth.ts"));
  // All three protected flows must forward the captcha token.
  assert.match(auth, /loginUser\([^)]*captchaToken/, "loginUser must accept a captchaToken");
  assert.match(auth, /registerUser\([^)]*captchaToken/, "registerUser must accept a captchaToken");
  assert.match(auth, /sendPasswordReset\([^)]*captchaToken/, "sendPasswordReset must accept a captchaToken");

  // The CSP MUST allow Cloudflare Turnstile — otherwise the header silently
  // blocks the widget and every login breaks (this actually happened once).
  const toml = read(join(ROOT, "netlify.toml"));
  const csp = (toml.match(/Content-Security-Policy\s*=\s*"([^"]*)"/) || [])[1] || "";
  const scriptSrc = (csp.match(/script-src[^;]*/) || [""])[0];
  const frameSrc = (csp.match(/frame-src[^;]*/) || [""])[0];
  const connectSrc = (csp.match(/connect-src[^;]*/) || [""])[0];
  assert.ok(scriptSrc.includes("challenges.cloudflare.com"), "CSP script-src must allow challenges.cloudflare.com (Turnstile)");
  assert.ok(frameSrc.includes("challenges.cloudflare.com"), "CSP frame-src must allow challenges.cloudflare.com (Turnstile iframe)");
  assert.ok(connectSrc.includes("challenges.cloudflare.com"), "CSP connect-src must allow challenges.cloudflare.com (Turnstile API)");
});


// ---------------------------------------------------------------------------
// 8. ACCESSIBILITY (WCAG 2.2 AA). Keyboard operability, accessible names,
//    and a visible focus indicator. These regressed silently before.
// ---------------------------------------------------------------------------
test("a global keyboard focus indicator and reduced-motion support exist", () => {
  const css = read(join(ROOT, "src/index.css"));
  assert.match(css, /:focus-visible/, "no :focus-visible ring — keyboard users cannot see which control has focus");
  assert.match(css, /prefers-reduced-motion/, "no reduced-motion handling — a WCAG 2.3.3 concern");
});

test("the auth modal is a labelled dialog that closes on Escape with real checkboxes", () => {
  const m = stripComments(read(join(ROOT, "src/components/AuthModal.tsx")));
  assert.match(m, /role="dialog"/, "AuthModal must expose role=dialog");
  assert.match(m, /aria-modal="true"/, "AuthModal must set aria-modal");
  assert.match(m, /"Escape"/, "AuthModal must close on the Escape key (keyboard users can't click the backdrop)");
  assert.match(m, /type="checkbox"/, "agreement toggles must be real checkboxes, not keyboard-inaccessible clickable divs");
});

test("terms/privacy agreements are real checkboxes, not clickable divs", () => {
  for (const f of ["PremiumSection.tsx", "UpgradeGate.tsx"]) {
    const src = read(join(ROOT, "src/components", f));
    assert.match(src, /type="checkbox"/, `${f} must use a real checkbox for the agreement toggle — a div onClick is not keyboard-operable`);
  }
});

test("icon-only buttons expose an accessible name", () => {
  const mock = read(join(ROOT, "src/components/AIMockInterviewSection.tsx"));
  assert.match(mock, /aria-label="Send answer"/, "mock-interview send button lost its aria-label");
  const modal = read(join(ROOT, "src/components/AuthModal.tsx"));
  assert.match(modal, /aria-label="Close"/, "modal close button lost its aria-label");
  assert.match(modal, /aria-label=\{showPass \? "Hide password" : "Show password"\}/, "password show/hide toggle lost its aria-label");
});


test("body text meets the WCAG contrast minimum (no text-slate-500 as content)", () => {
  // text-slate-500 on this app's dark surfaces is ~3.1-3.75:1 — below the 4.5:1
  // AA minimum for normal text. It was replaced with text-slate-400 (>=5.7:1).
  // Remaining slate-600/700 are locked/disabled or decorative (WCAG-exempt).
  const dir = join(ROOT, "src/components");
  const offenders = readdirSync(dir)
    .filter((f) => f.endsWith(".tsx"))
    .filter((f) => read(join(dir, f)).includes("text-slate-500"));
  assert.equal(offenders.length, 0, `low-contrast text-slate-500 reintroduced in: ${offenders.join(", ")}`);
});


// ---------------------------------------------------------------------------
// 9. LIFECYCLE EMAILS (T3). Delayed welcome-sequence sends must stay idempotent,
//    windowed (so they never blast the existing base), and unsubscribable.
// ---------------------------------------------------------------------------
test("lifecycle emails are idempotent, windowed, and unsubscribable", () => {
  const fn = read(join(ROOT, "netlify/functions/lifecycle-emails.js"));
  assert.match(fn, /email2_sent/, "email 2 must set an idempotency flag");
  assert.match(fn, /email3_sent/, "email 3 must set an idempotency flag");
  assert.match(fn, /lifecycle_unsubscribed/, "sender must skip unsubscribed users");
  assert.match(fn, /ageDays\s*<=\s*\d+/, "sends must be age-windowed so existing users aren't blasted");
  assert.match(fn, /List-Unsubscribe/, "promotional emails must carry a List-Unsubscribe header");
  assert.match(fn, /tier\s*!==\s*"free"/, "the upgrade nudge must be free-tier only (don't upsell payers)");
  assert.match(fn, /next_run/, "sender must be scheduled-only (reject public HTTP triggers)");

  const toml = read(join(ROOT, "netlify.toml"));
  assert.match(toml, /\[functions\."lifecycle-emails"\]/, "lifecycle-emails must be registered as a scheduled function");
});

test("the unsubscribe endpoint verifies a signed token (can't unsubscribe others)", () => {
  const u = read(join(ROOT, "netlify/functions/unsubscribe.js"));
  assert.match(u, /createHmac/, "unsubscribe must verify an HMAC token, not trust a raw user id");
  assert.match(u, /timingSafeEqual/, "token comparison must be timing-safe");
  assert.match(u, /lifecycle_unsubscribed/, "unsubscribe must set the opt-out flag");
});


// ---------------------------------------------------------------------------
// 10. PERFORMANCE. Route sections must stay code-split (React.lazy), or the
//     whole app collapses back into one big bundle and mobile first-load suffers.
// ---------------------------------------------------------------------------
test("route sections are code-split (lazy-loaded), not bundled into the initial load", () => {
  const app = read(join(ROOT, "src/App.tsx"));
  assert.match(app, /lazy\(\(\) => import\(/, "sections must be React.lazy()-loaded to keep the initial bundle small");
  assert.match(app, /Suspense/, "a Suspense boundary must wrap the lazily-loaded sections");
  for (const c of ["AfterTheInterviewSection", "RejectionDecodedSection", "OpenDaysSection"]) {
    assert.ok(!app.includes(`import ${c} from`), `${c} is statically imported again — it must stay lazy-loaded`);
  }
});
