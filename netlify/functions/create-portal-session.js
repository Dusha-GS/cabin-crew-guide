// netlify/functions/create-portal-session.js
// Creates a Stripe Customer Portal session for the logged-in user so they can
// upgrade, update payment, or cancel their subscription — self-service.
// Requires a valid Supabase session. Env: STRIPE_SECRET_KEY, SUPABASE_URL, SUPABASE_SERVICE_KEY

const ALLOWED_ORIGIN = "https://cabincrewguidebook.com";
const RETURN_URL = "https://cabincrewguidebook.com/#account";

export const handler = async (event) => {
  const cors = {
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers: cors, body: "" };
  if (event.httpMethod !== "POST") return { statusCode: 405, headers: cors, body: "Method Not Allowed" };

  const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
  if (!STRIPE_SECRET_KEY || !SUPABASE_URL || !SERVICE_KEY) {
    return { statusCode: 500, headers: cors, body: JSON.stringify({ error: "Billing not configured." }) };
  }

  // ── Require a valid Supabase session ──
  const authHeader = event.headers.authorization || event.headers.Authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  if (!token) return { statusCode: 401, headers: cors, body: JSON.stringify({ error: "Authentication required." }) };

  let email;
  try {
    const r = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      headers: { apikey: SERVICE_KEY, Authorization: `Bearer ${token}` },
    });
    if (!r.ok) return { statusCode: 401, headers: cors, body: JSON.stringify({ error: "Invalid session." }) };
    const u = await r.json();
    email = u && u.email;
  } catch {
    return { statusCode: 401, headers: cors, body: JSON.stringify({ error: "Could not verify session." }) };
  }
  if (!email) return { statusCode: 400, headers: cors, body: JSON.stringify({ error: "No email on account." }) };

  try {
    // Look up the Stripe customer id saved by the webhook
    const lookup = await fetch(
      `${SUPABASE_URL}/rest/v1/users?email=eq.${encodeURIComponent(email)}&select=stripe_customer_id`,
      { headers: { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}` } }
    );
    const rows = await lookup.json();
    const customerId = rows && rows[0] && rows[0].stripe_customer_id;
    if (!customerId) {
      return { statusCode: 404, headers: cors, body: JSON.stringify({ error: "No active subscription found for this account." }) };
    }

    // Create the portal session
    const body = new URLSearchParams({ customer: customerId, return_url: RETURN_URL });
    const res = await fetch("https://api.stripe.com/v1/billing_portal/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
    });
    const data = await res.json();
    if (!res.ok || !data.url) {
      return { statusCode: 502, headers: cors, body: JSON.stringify({ error: data.error?.message || "Could not create portal session." }) };
    }
    return { statusCode: 200, headers: { ...cors, "Content-Type": "application/json" }, body: JSON.stringify({ url: data.url }) };
  } catch (err) {
    return { statusCode: 500, headers: cors, body: JSON.stringify({ error: err.message || "Internal error" }) };
  }
};
