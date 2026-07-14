// netlify/functions/get-tier.js
//
// Returns the subscription tier of the CALLER — and only the caller.
//
// This endpoint used to accept any email address, from any origin, with no
// authentication. That made it a customer-lookup oracle: anyone could POST a
// list of emails and learn who had an account and who was paying. Fixed.
//
// The email is now taken from the verified session, never from the request body.
// Env: SUPABASE_URL, SUPABASE_SERVICE_KEY

const ALLOWED_ORIGIN = "https://cabincrewguidebook.com";

export const handler = async (event) => {
  const cors = {
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
  const json = (statusCode, body) => ({
    statusCode,
    headers: { ...cors, "Content-Type": "application/json", "Cache-Control": "private, no-store" },
    body: JSON.stringify(body),
  });

  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers: cors, body: "" };
  if (event.httpMethod !== "POST") return json(405, { error: "Method Not Allowed" });

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
  if (!SUPABASE_URL || !SERVICE_KEY) return json(500, { tier: "free" });

  // ── Identify the caller from their own session. No email is accepted from
  //    the client — you can only ever read your own tier. ───────────────────
  const authHeader = event.headers.authorization || event.headers.Authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  if (!token) return json(401, { error: "Please sign in.", tier: "free" });

  let email;
  try {
    const r = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      headers: { apikey: SERVICE_KEY, Authorization: `Bearer ${token}` },
    });
    if (!r.ok) return json(401, { error: "Session expired.", tier: "free" });
    const u = await r.json();
    email = u?.email;
    if (!email) return json(401, { error: "Invalid session.", tier: "free" });
  } catch {
    return json(401, { error: "Could not verify session.", tier: "free" });
  }

  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/users?email=eq.${encodeURIComponent(email)}&select=tier`,
      { headers: { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}` } }
    );
    const rows = await res.json();
    return json(200, { tier: rows?.[0]?.tier || "free" });
  } catch {
    return json(500, { tier: "free" });
  }
};
