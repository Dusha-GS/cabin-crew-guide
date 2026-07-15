// netlify/functions/unsubscribe.js
//
// One-click unsubscribe for the lifecycle emails (legally required for
// promotional mail). The link carries the user id plus an HMAC token so nobody
// can unsubscribe anyone but themselves — no login needed, and the token reveals
// nothing about the signing key. On success it flips lifecycle_unsubscribed in
// the user's Supabase user_metadata, which the scheduled sender always checks.
// Supports GET (link click) and POST (RFC 8058 List-Unsubscribe-Post one-click).
//
// Env required: SUPABASE_URL, SUPABASE_SERVICE_KEY.

import crypto from "node:crypto";

function page(title, msg) {
  return `<!doctype html><html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>${title}</title></head>
  <body style="font-family:Arial,Helvetica,sans-serif;background:#0f172a;color:#e2e8f0;display:flex;min-height:100vh;align-items:center;justify-content:center;margin:0">
    <div style="max-width:460px;padding:32px;text-align:center">
      <div style="font-size:40px;margin-bottom:12px">✈</div>
      <h1 style="color:#fff;font-size:22px;margin:0 0 8px">${title}</h1>
      <p style="color:#94a3b8;line-height:1.6">${msg}</p>
      <p style="margin-top:24px"><a href="https://cabincrewguidebook.com" style="color:#fbbf24">Back to Cabin Crew Guidebook &rarr;</a></p>
    </div>
  </body></html>`;
}
const html = (code, title, msg) => ({
  statusCode: code,
  headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
  body: page(title, msg),
});

function timingSafeEqualHex(a, b) {
  const ba = Buffer.from(a, "hex"), bb = Buffer.from(b, "hex");
  return ba.length === bb.length && crypto.timingSafeEqual(ba, bb);
}

export const handler = async (event) => {
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
  if (!SUPABASE_URL || !SERVICE_KEY) return html(500, "Something went wrong", "This service isn't configured. Please email support@cabincrewguidebook.com.");

  const q = event.queryStringParameters || {};
  const userId = q.u || "";
  const token = q.t || "";
  if (!userId || !token) return html(400, "Invalid link", "This unsubscribe link is incomplete. Please email support@cabincrewguidebook.com and we'll remove you.");

  const expected = crypto.createHmac("sha256", SERVICE_KEY).update(String(userId)).digest("hex");
  let valid = false;
  try { valid = timingSafeEqualHex(token, expected); } catch { valid = false; }
  if (!valid) return html(403, "Invalid link", "This unsubscribe link couldn't be verified. Please email support@cabincrewguidebook.com and we'll remove you.");

  try {
    // Read current metadata, then set the opt-out flag (preserving other fields).
    const r = await fetch(`${SUPABASE_URL}/auth/v1/admin/users/${userId}`, {
      headers: { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}` },
    });
    if (!r.ok) return html(404, "Account not found", "We couldn't find that account. It may already be removed.");
    const user = await r.json();
    const meta = user.user_metadata || {};
    await fetch(`${SUPABASE_URL}/auth/v1/admin/users/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}` },
      body: JSON.stringify({ user_metadata: { ...meta, lifecycle_unsubscribed: true } }),
    });
  } catch {
    return html(500, "Something went wrong", "We couldn't process that just now. Please email support@cabincrewguidebook.com and we'll remove you.");
  }

  return html(200, "You're unsubscribed", "You won't receive any more prep tips or upgrade emails. You'll still get essential account emails (like password resets). Changed your mind? Just reply to any earlier email.");
};
