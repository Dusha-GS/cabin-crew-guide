// netlify/functions/lifecycle-emails.js
//
// LIFECYCLE / WELCOME-SEQUENCE EMAILS (T3).
// Runs daily on Netlify's servers (see [functions."lifecycle-emails"] in
// netlify.toml). The immediate welcome email is sent by send-email.js on signup;
// this function sends the two DELAYED emails:
//   • Email 2 (day 2)  — "free win": the free Rejection Decoded reasons.
//   • Email 3 (day 5)  — upgrade nudge to Premium (free-tier users only).
//
// Idempotent: each send sets a flag in the user's Supabase user_metadata, so a
// user never gets the same email twice (no schema change needed). Only users
// inside a short age window are ever touched, so switching this on does NOT blast
// the existing user base. Promotional emails carry a one-click unsubscribe.
//
// Env required: RESEND_API_KEY, SUPABASE_URL, SUPABASE_SERVICE_KEY (all already set).

import crypto from "node:crypto";

const FROM = "Cabin Crew Guidebook <no-reply@cabincrewguidebook.com>";
const SITE = "https://cabincrewguidebook.com";
const MAX_SENDS_PER_RUN = 300; // safety cap

function unsubToken(userId, secret) {
  return crypto.createHmac("sha256", secret).update(String(userId)).digest("hex");
}
function unsubUrl(userId, secret) {
  return `${SITE}/.netlify/functions/unsubscribe?u=${encodeURIComponent(userId)}&t=${unsubToken(userId, secret)}`;
}

async function sendViaResend(apiKey, to, subject, html, unsubscribe) {
  return fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      from: FROM, to: [to], subject, html,
      headers: {
        "List-Unsubscribe": `<${unsubscribe}>`,
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
      },
    }),
  });
}

function shell(bodyHtml, unsubscribe) {
  return `<div style="font-family:Arial,Helvetica,sans-serif;line-height:1.6;color:#0f172a;max-width:560px;margin:0 auto">
    ${bodyHtml}
    <hr style="border:none;border-top:1px solid #e2e8f0;margin:28px 0 12px"/>
    <p style="font-size:12px;color:#64748b;margin:0">
      You're receiving this because you created a free Cabin Crew Guidebook account.
      <a href="${unsubscribe}" style="color:#64748b">Unsubscribe from these tips</a>.
    </p>
  </div>`;
}

function email2(name, unsubscribe) {
  const body = `
    <h2 style="color:#0f172a">Most cabin crew rejections come down to a handful of reasons, ${name}.</h2>
    <p>And almost none of the airlines will ever tell you which one cost you the job.</p>
    <p>We broke down the real reasons candidates get rejected by Emirates, Qatar Airways, Etihad, flydubai and Air Arabia &mdash; from the ATS that filters your CV before a human sees it, to the grooming check that happens before you say a word.</p>
    <p><strong>Two of them are free to read right now:</strong></p>
    <p style="margin:24px 0">
      <a href="${SITE}/#rejection-decoded" style="background:#f59e0b;color:#0f172a;font-weight:bold;text-decoration:none;padding:12px 22px;border-radius:10px;display:inline-block">Read Rejection Decoded &rarr;</a>
    </p>
    <p>Knowing exactly where candidates slip up &mdash; and fixing it before your assessment day &mdash; is the difference between a rejection email and a golden call.</p>
    <p>You've got this.<br/>&mdash; The Cabin Crew Guidebook team</p>`;
  return { subject: "The real reasons cabin crew applications get rejected", html: shell(body, unsubscribe) };
}

function email3(name, unsubscribe) {
  const body = `
    <h2 style="color:#0f172a">Ready to go all-in on your cabin crew dream, ${name}?</h2>
    <p>You've had a look around. Here's what unlocks when you go Premium &mdash; everything you need to walk into your assessment day genuinely prepared:</p>
    <ul style="padding-left:18px">
      <li><strong>Unlimited AI mock interviews</strong> &mdash; practise with a recruiter-style interviewer for your specific airline, as many times as you want.</li>
      <li><strong>Ask Cabin Crew</strong> &mdash; real feedback from people who've done the job.</li>
      <li><strong>Group Discussion practice</strong> &mdash; the stage most candidates misunderstand and fail.</li>
      <li><strong>The full guidebook</strong> &mdash; every interview question, the CV guide, the complete mock exam, and the full Rejection Decoded breakdown.</li>
    </ul>
    <p style="margin:24px 0">
      <a href="${SITE}/#premium" style="background:#f59e0b;color:#0f172a;font-weight:bold;text-decoration:none;padding:12px 22px;border-radius:10px;display:inline-block">Go Premium &mdash; $25/month &rarr;</a>
    </p>
    <p style="font-size:14px;color:#475569">Cancel anytime, self-service. One month of Premium costs less than a single coaching session &mdash; and it's built specifically for the Gulf airlines.</p>
    <p>Whatever you decide, we're rooting for you.<br/>&mdash; The Cabin Crew Guidebook team</p>`;
  return { subject: "Ready to go all-in on your cabin crew dream?", html: shell(body, unsubscribe) };
}

async function getTier(SUPABASE_URL, SERVICE_KEY, email) {
  try {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/users?email=eq.${encodeURIComponent(email)}&select=tier`, {
      headers: { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}` },
    });
    const rows = await r.json();
    return (rows && rows[0] && rows[0].tier) || "free";
  } catch { return "free"; }
}

async function setMeta(SUPABASE_URL, SERVICE_KEY, id, meta) {
  await fetch(`${SUPABASE_URL}/auth/v1/admin/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}` },
    body: JSON.stringify({ user_metadata: meta }),
  });
}

export const handler = async () => {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
  if (!RESEND_API_KEY || !SUPABASE_URL || !SERVICE_KEY) {
    return { statusCode: 500, body: "Not configured." };
  }

  const now = Date.now();
  const DAY = 86400000;
  let sent2 = 0, sent3 = 0, budget = MAX_SENDS_PER_RUN;

  // Page through auth users.
  for (let page = 1; page <= 50 && budget > 0; page++) {
    let users = [];
    try {
      const r = await fetch(`${SUPABASE_URL}/auth/v1/admin/users?page=${page}&per_page=200`, {
        headers: { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}` },
      });
      const data = await r.json();
      users = Array.isArray(data) ? data : (data.users || []);
    } catch { break; }
    if (!users.length) break;

    for (const u of users) {
      if (budget <= 0) break;
      try {
        const email = u.email;
        if (!email || !u.created_at) continue;
        const meta = u.user_metadata || {};
        if (meta.lifecycle_unsubscribed) continue;
        const ageDays = (now - new Date(u.created_at).getTime()) / DAY;
        const name = meta.name || meta.full_name || email.split("@")[0];
        const unsub = unsubUrl(u.id, SERVICE_KEY);

        // Email 2 — day 2, within a 7-day window so a missed run still catches up,
        // and existing (older) accounts are never blasted.
        if (!meta.email2_sent && ageDays >= 2 && ageDays <= 9) {
          const { subject, html } = email2(name, unsub);
          const res = await sendViaResend(RESEND_API_KEY, email, subject, html, unsub);
          if (res.ok) { await setMeta(SUPABASE_URL, SERVICE_KEY, u.id, { ...meta, email2_sent: true }); sent2++; budget--; }
          continue;
        }

        // Email 3 — day 5, Premium nudge, free-tier only. Payers are marked done so
        // we don't keep re-checking them.
        if (!meta.email3_sent && ageDays >= 5 && ageDays <= 12) {
          const tier = await getTier(SUPABASE_URL, SERVICE_KEY, email);
          if (tier !== "free") {
            await setMeta(SUPABASE_URL, SERVICE_KEY, u.id, { ...meta, email3_sent: true });
            continue;
          }
          const { subject, html } = email3(name, unsub);
          const res = await sendViaResend(RESEND_API_KEY, email, subject, html, unsub);
          if (res.ok) { await setMeta(SUPABASE_URL, SERVICE_KEY, u.id, { ...meta, email3_sent: true }); sent3++; budget--; }
        }
      } catch { /* never let one user crash the whole scheduled run */ }
    }
    if (users.length < 200) break;
  }

  return { statusCode: 200, body: JSON.stringify({ ok: true, email2_sent: sent2, email3_sent: sent3 }) };
};
