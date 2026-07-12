// netlify/functions/send-email.js
// Sends account emails (welcome, password-changed alert) via Resend.
// Requires a valid Supabase session. Welcome is idempotent — sent once per user
// (tracked in the user's Supabase user_metadata, so no schema change is needed).
// Env required: RESEND_API_KEY, SUPABASE_URL, SUPABASE_SERVICE_KEY

const ALLOWED_ORIGIN = "https://cabincrewguidebook.com";
const FROM = "Cabin Crew Guidebook <no-reply@cabincrewguidebook.com>";

async function sendViaResend(apiKey, to, subject, html) {
  return fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ from: FROM, to: [to], subject, html }),
  });
}

export const handler = async (event) => {
  const cors = {
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers: cors, body: "" };
  if (event.httpMethod !== "POST") return { statusCode: 405, headers: cors, body: "Method Not Allowed" };

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
  if (!RESEND_API_KEY || !SUPABASE_URL || !SERVICE_KEY) {
    return { statusCode: 500, headers: cors, body: JSON.stringify({ error: "Email not configured." }) };
  }

  // ── Require a valid Supabase session ──
  const auth = event.headers.authorization || event.headers.Authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (!token) return { statusCode: 401, headers: cors, body: JSON.stringify({ error: "Authentication required." }) };

  let user;
  try {
    const r = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      headers: { apikey: SERVICE_KEY, Authorization: `Bearer ${token}` },
    });
    if (!r.ok) return { statusCode: 401, headers: cors, body: JSON.stringify({ error: "Invalid session." }) };
    user = await r.json();
  } catch {
    return { statusCode: 401, headers: cors, body: JSON.stringify({ error: "Could not verify session." }) };
  }

  const email = user && user.email;
  if (!email) return { statusCode: 400, headers: cors, body: JSON.stringify({ error: "No email on account." }) };
  const meta = user.user_metadata || {};
  const name = meta.name || meta.full_name || email.split("@")[0];

  let type = null;
  try { type = JSON.parse(event.body || "{}").type; } catch { type = null; }

  try {
    if (type === "welcome") {
      if (meta.welcome_sent) {
        return { statusCode: 200, headers: cors, body: JSON.stringify({ skipped: true }) };
      }
      const html = `<div style="font-family:Arial,sans-serif;line-height:1.6;color:#0f172a">
        <h2>Welcome aboard, ${name}! &#9992;</h2>
        <p>Thanks for joining the <strong>Cabin Crew Interview Guidebook</strong>. Your account is now active.</p>
        <p>You can prepare for Emirates, Etihad, Qatar Airways, flydubai and Air Arabia &mdash; with mock interviews, CV review, and full guides.</p>
        <p><a href="https://cabincrewguidebook.com" style="color:#d97706">Start preparing &rarr;</a></p>
        <p>Good luck with your application!<br/>&mdash; The Cabin Crew Guidebook team</p>
      </div>`;
      const sent = await sendViaResend(RESEND_API_KEY, email, "Welcome to Cabin Crew Interview Guidebook ✈", html);
      if (!sent.ok) {
        const detail = await sent.text();
        return { statusCode: 502, headers: cors, body: JSON.stringify({ error: "Send failed", detail }) };
      }
      // Idempotency flag via admin API (service key)
      await fetch(`${SUPABASE_URL}/auth/v1/admin/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}` },
        body: JSON.stringify({ user_metadata: { ...meta, welcome_sent: true } }),
      });
      return { statusCode: 200, headers: cors, body: JSON.stringify({ sent: true }) };
    }

    if (type === "password_changed") {
      const html = `<div style="font-family:Arial,sans-serif;line-height:1.6;color:#0f172a">
        <h2>Your password was changed</h2>
        <p>Hi ${name}, the password for your Cabin Crew Guidebook account (<strong>${email}</strong>) was just changed.</p>
        <p>If this was you, no action is needed. If you did <strong>not</strong> do this, reset your password immediately and contact
        <a href="mailto:support@cabincrewguidebook.com">support@cabincrewguidebook.com</a>.</p>
      </div>`;
      const sent = await sendViaResend(RESEND_API_KEY, email, "Security alert: your password was changed", html);
      if (!sent.ok) {
        const detail = await sent.text();
        return { statusCode: 502, headers: cors, body: JSON.stringify({ error: "Send failed", detail }) };
      }
      return { statusCode: 200, headers: cors, body: JSON.stringify({ sent: true }) };
    }

    return { statusCode: 400, headers: cors, body: JSON.stringify({ error: "Unknown email type." }) };
  } catch (err) {
    return { statusCode: 500, headers: cors, body: JSON.stringify({ error: err.message || "Internal error" }) };
  }
};
