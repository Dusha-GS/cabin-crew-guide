// netlify/functions/delete-account.js
// Permanently deletes the signed-in user's account and personal data (GDPR
// "right to erasure" / Privacy Policy s.7).
//
// Order matters: cancel billing FIRST, so a deleted account can never keep
// being charged. Then erase data, then remove the login itself.
//
// Requires a valid Supabase session — a user can only ever delete themselves.
// Env: STRIPE_SECRET_KEY, SUPABASE_URL, SUPABASE_SERVICE_KEY

const ALLOWED_ORIGIN = "https://cabincrewguidebook.com";

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

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
  const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
  if (!SUPABASE_URL || !SERVICE_KEY) {
    return json(500, { error: "Server not configured." });
  }

  const sbHeaders = {
    apikey: SERVICE_KEY,
    Authorization: `Bearer ${SERVICE_KEY}`,
    "Content-Type": "application/json",
  };

  // ── 1. Identify the caller from their own session. No id is accepted from
  //       the client — you can only ever delete yourself. ────────────────────
  const authHeader = event.headers.authorization || event.headers.Authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  if (!token) return json(401, { error: "Please sign in." });

  let userId, email;
  try {
    const r = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      headers: { apikey: SERVICE_KEY, Authorization: `Bearer ${token}` },
    });
    if (!r.ok) return json(401, { error: "Your session has expired. Please sign in again." });
    const u = await r.json();
    userId = u?.id;
    email = u?.email;
    if (!userId || !email) return json(401, { error: "Invalid session." });
  } catch {
    return json(401, { error: "Could not verify your session." });
  }

  // ── 2. Cancel any Stripe subscription FIRST. Deleting the account must never
  //       leave a live subscription billing a person who no longer exists. ───
  if (STRIPE_SECRET_KEY) {
    try {
      const lookup = await fetch(
        `${SUPABASE_URL}/rest/v1/users?email=eq.${encodeURIComponent(email)}&select=stripe_customer_id`,
        { headers: sbHeaders }
      );
      const rows = await lookup.json();
      const customerId = rows?.[0]?.stripe_customer_id;

      if (customerId) {
        const subsRes = await fetch(
          `https://api.stripe.com/v1/subscriptions?customer=${encodeURIComponent(customerId)}&status=active&limit=100`,
          { headers: { Authorization: `Bearer ${STRIPE_SECRET_KEY}` } }
        );
        const subs = await subsRes.json();
        for (const sub of subs?.data || []) {
          await fetch(`https://api.stripe.com/v1/subscriptions/${sub.id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${STRIPE_SECRET_KEY}` },
          });
        }
      }
    } catch {
      // Billing must be verifiably stopped before we erase the account, or we
      // lose the ability to find it. Fail loudly rather than orphan a charge.
      return json(500, {
        error:
          "We couldn't cancel your subscription automatically, so we haven't deleted your account. " +
          "Please contact support@cabincrewguidebook.com and we'll handle it.",
      });
    }
  }

  // ── 3. Erase personal data. ───────────────────────────────────────────────
  try {
    await fetch(`${SUPABASE_URL}/rest/v1/ai_usage?email=eq.${encodeURIComponent(email)}`, {
      method: "DELETE",
      headers: sbHeaders,
    });
    await fetch(`${SUPABASE_URL}/rest/v1/users?email=eq.${encodeURIComponent(email)}`, {
      method: "DELETE",
      headers: sbHeaders,
    });
  } catch {
    return json(500, { error: "Could not delete your data. Please contact support@cabincrewguidebook.com." });
  }

  // ── 4. Remove the login itself. This is the irreversible step. ────────────
  try {
    const del = await fetch(`${SUPABASE_URL}/auth/v1/admin/users/${userId}`, {
      method: "DELETE",
      headers: { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}` },
    });
    if (!del.ok) {
      return json(500, {
        error: "Could not delete your login. Please contact support@cabincrewguidebook.com.",
      });
    }
  } catch {
    return json(500, { error: "Could not delete your login. Please contact support@cabincrewguidebook.com." });
  }

  return json(200, { deleted: true });
};
