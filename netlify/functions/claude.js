// netlify/functions/claude.js
// Secure server-side proxy to Anthropic.
//
// The browser is NOT trusted. This function independently:
//   1. verifies the Supabase session,
//   2. reads the user's tier server-side (service key),
//   3. enforces feature entitlement + free-tier lifetime limits,
//   4. enforces a per-user hourly rate limit,
//   5. records every call in public.ai_usage.
//
// Env required: ANTHROPIC_API_KEY, SUPABASE_URL, SUPABASE_SERVICE_KEY

const ALLOWED_ORIGIN = "https://cabincrewguidebook.com";
const MAX_TOKENS_CAP = 2048;

// Safety net against a runaway or abusive account (applies to EVERY tier).
// A real user never gets near this: a full mock interview is ~10-15 calls.
const RATE_LIMIT_PER_HOUR = 40;

// Free tier: a taste, then they pay. Counted per ACCOUNT, for life —
// clearing localStorage or using incognito no longer resets anything.
// Caps are in API calls, sized to allow one complete session plus headroom.
const FREE_LIFETIME_CAPS = {
  "mock-interview": 25, // ~1 full interview (10-15 calls) + headroom
  "cv-review": 2,       // 1 review + 1 retry
};

// Features that require a paid tier outright.
const FEATURE_MIN_TIER = {
  "mock-exam": "standard",
};

const TIER_RANK = { free: 0, standard: 1, premium: 2 };
const KNOWN_FEATURES = ["mock-interview", "cv-review", "mock-exam"];

export const handler = async (event) => {
  const cors = {
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
  const json = (statusCode, body) => ({
    statusCode,
    headers: { ...cors, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers: cors, body: "" };
  if (event.httpMethod !== "POST") return json(405, { error: "Method Not Allowed" });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
  if (!apiKey || !SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    return json(500, { error: "Server not configured." });
  }

  const sb = (path, init = {}) =>
    fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
      ...init,
      headers: {
        apikey: SUPABASE_SERVICE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
        "Content-Type": "application/json",
        ...(init.headers || {}),
      },
    });

  // ── 1. Require a valid Supabase session ───────────────────────────────
  const authHeader = event.headers.authorization || event.headers.Authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  if (!token) return json(401, { error: "Please sign in to use AI features." });

  let email;
  try {
    const userRes = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      headers: { apikey: SUPABASE_SERVICE_KEY, Authorization: `Bearer ${token}` },
    });
    if (!userRes.ok) return json(401, { error: "Your session has expired. Please sign in again." });
    const supaUser = await userRes.json();
    email = supaUser?.email;
    if (!email) return json(401, { error: "Invalid session." });
  } catch {
    return json(401, { error: "Could not verify your session." });
  }

  // ── 2. Parse the request ──────────────────────────────────────────────
  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return json(400, { error: "Bad request." });
  }
  if (!Array.isArray(body.messages) || body.messages.length === 0) {
    return json(400, { error: "No messages provided." });
  }
  const feature = KNOWN_FEATURES.includes(body.feature) ? body.feature : "other";
  const maxTokens = Math.min(Number(body.max_tokens) || 1024, MAX_TOKENS_CAP);

  // ── 3. Read the tier SERVER-SIDE. Never trust a tier from the client. ──
  let tier = "free";
  try {
    const tierRes = await sb(`users?email=eq.${encodeURIComponent(email)}&select=tier`);
    const rows = await tierRes.json();
    tier = rows?.[0]?.tier || "free";
  } catch {
    return json(500, { error: "Could not verify your membership." });
  }

  // ── 4. Feature entitlement ────────────────────────────────────────────
  const minTier = FEATURE_MIN_TIER[feature];
  if (minTier && (TIER_RANK[tier] ?? 0) < TIER_RANK[minTier]) {
    return json(403, {
      error: "This is a paid feature. Upgrade your membership to unlock it.",
      requires: minTier,
    });
  }

  // ── 5. Hourly rate limit (all tiers) ──────────────────────────────────
  const hourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  try {
    const res = await sb(
      `ai_usage?email=eq.${encodeURIComponent(email)}&created_at=gte.${hourAgo}` +
        `&select=id&limit=${RATE_LIMIT_PER_HOUR + 1}`
    );
    const rows = await res.json();
    if (Array.isArray(rows) && rows.length >= RATE_LIMIT_PER_HOUR) {
      return json(429, {
        error: "You've made a lot of AI requests in a short time. Please wait a few minutes and try again.",
      });
    }
  } catch {
    // If the usage table can't be read, fail closed rather than hand out free AI.
    return json(500, { error: "Could not check your usage. Please try again shortly." });
  }

  // ── 6. Free-tier lifetime cap, per account ────────────────────────────
  const freeCap = FREE_LIFETIME_CAPS[feature];
  if (tier === "free" && freeCap) {
    try {
      const res = await sb(
        `ai_usage?email=eq.${encodeURIComponent(email)}&feature=eq.${encodeURIComponent(feature)}` +
          `&select=id&limit=${freeCap + 1}`
      );
      const rows = await res.json();
      if (Array.isArray(rows) && rows.length >= freeCap) {
        const what =
          feature === "cv-review"
            ? "You've used your free AI CV review. Upgrade for unlimited reviews."
            : "You've used your free AI mock interview. Upgrade to keep practising.";
        return json(403, { error: what, requires: "standard" });
      }
    } catch {
      return json(500, { error: "Could not check your usage. Please try again shortly." });
    }
  }

  // ── 7. Record the call BEFORE spending money, so parallel requests
  //       can't slip past the limits above.
  try {
    await sb("ai_usage", {
      method: "POST",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify({ email, feature }),
    });
  } catch {
    return json(500, { error: "Could not record your usage. Please try again shortly." });
  }

  // ── 8. Call Anthropic ─────────────────────────────────────────────────
  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: maxTokens,
        system: typeof body.system === "string" ? body.system : "",
        messages: body.messages,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      return json(response.status, { error: data.error?.message || "Anthropic API error" });
    }
    return json(200, data);
  } catch (err) {
    return json(500, { error: err.message || "Internal server error" });
  }
};
