// netlify/functions/health-check.js
//
// SERVER-SIDE UPTIME + INTEGRITY MONITOR.
//
// Runs on Netlify's servers on a schedule (see the [functions."health-check"]
// block in netlify.toml) — independently of whether anyone's laptop is on.
// Emails a daily report via Resend.
//
// It checks the things that would silently cost money or trust:
//   - is the site up and serving the app?
//   - has paid content leaked back into the public JS bundle?
//   - do the money/data endpoints still refuse anonymous callers?
//   - are the security headers still in place?
//
// Env: RESEND_API_KEY, HEALTHCHECK_TO (recipient), optional HEALTHCHECK_ALWAYS_EMAIL

const SITE = "https://cabincrewguidebook.com";
const FROM = "Cabin Crew Guidebook <no-reply@cabincrewguidebook.com>";

// Real prose from the paid material. If any of these appear in the public
// bundle, non-payers can read paid content from the page source.
const PAID_STRINGS = ["Tell me about yourself", "Desert Island Survival"];

async function sendEmail(apiKey, to, subject, html) {
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ from: FROM, to: [to], subject, html }),
  });
}

async function status(path, opts) {
  try {
    const r = await fetch(SITE + path, opts);
    return r.status;
  } catch {
    return 0; // unreachable
  }
}

export const handler = async () => {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const TO = process.env.HEALTHCHECK_TO;
  const ALWAYS = process.env.HEALTHCHECK_ALWAYS_EMAIL !== "false"; // default: email daily
  if (!RESEND_API_KEY || !TO) {
    return { statusCode: 500, body: "health-check not configured (RESEND_API_KEY / HEALTHCHECK_TO)" };
  }

  const problems = [];
  const lines = [];
  const ok = (label, good, detail) => {
    lines.push(`${good ? "✅" : "❌"} ${label}: ${detail}`);
    if (!good) problems.push(`${label} — ${detail}`);
  };

  // 1. Site up + serving the real app (not an error page)?
  let homeHtml = "";
  let homeStatus = 0;
  try {
    const r = await fetch(SITE);
    homeStatus = r.status;
    homeHtml = await r.text();
  } catch { /* homeStatus stays 0 */ }
  ok("Site reachable", homeStatus === 200, `HTTP ${homeStatus || "unreachable"}`);

  const h = {};
  try {
    const r = await fetch(SITE);
    r.headers.forEach((v, k) => (h[k] = v));
  } catch { /* ignore */ }

  // 2. Paid content leaked into the public bundle?
  let bundleLeak = [];
  try {
    const m = homeHtml.match(/\/assets\/index-[A-Za-z0-9_-]+\.js/);
    if (m) {
      const js = await fetch(SITE + m[0]).then((r) => r.text());
      bundleLeak = PAID_STRINGS.filter((s) => js.includes(s));
    }
  } catch { /* ignore */ }
  ok(
    "Paid content protected",
    bundleLeak.length === 0,
    bundleLeak.length === 0 ? "not in public bundle" : `LEAKED: ${bundleLeak.join(", ")}`
  );

  // 3. Money/data endpoints must refuse anonymous callers (expect 401).
  const aiStatus = await status("/.netlify/functions/claude", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: [{ role: "user", content: "x" }] }),
  });
  ok("AI endpoint refuses anon", aiStatus === 401, `HTTP ${aiStatus} (want 401)`);

  const contentStatus = await status("/.netlify/functions/get-content", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ key: "interview-questions" }),
  });
  ok("Content endpoint refuses anon", contentStatus === 401, `HTTP ${contentStatus} (want 401)`);

  const tierStatus = await status("/.netlify/functions/get-tier", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "someone@example.com" }),
  });
  ok("Tier endpoint refuses anon", tierStatus === 401, `HTTP ${tierStatus} (want 401)`);

  // 4. Security headers present?
  ok("X-Frame-Options", h["x-frame-options"] === "DENY", h["x-frame-options"] || "MISSING");
  ok("Content-Security-Policy", !!h["content-security-policy"], h["content-security-policy"] ? "present" : "MISSING");

  const healthy = problems.length === 0;
  if (!healthy || ALWAYS) {
    const subject = healthy
      ? "✅ Cabin Crew Guidebook — all systems healthy"
      : `🔴 Cabin Crew Guidebook — ${problems.length} issue${problems.length > 1 ? "s" : ""} detected`;
    const intro = healthy
      ? "<p>Daily automated check — everything is working as expected.</p>"
      : `<p style="color:#b91c1c;font-weight:bold">Action needed. The following checks failed:</p><ul>${problems
          .map((p) => `<li>${p}</li>`)
          .join("")}</ul>`;
    const html = `
      <div style="font-family:system-ui,sans-serif;font-size:14px;line-height:1.6;color:#0f172a">
        <h2 style="margin:0 0 8px">Cabin Crew Guidebook — health check</h2>
        <p style="color:#64748b;margin:0 0 16px">${new Date().toUTCString()}</p>
        ${intro}
        <pre style="background:#f1f5f9;padding:12px;border-radius:8px;white-space:pre-wrap">${lines.join("\n")}</pre>
        <p style="color:#94a3b8;font-size:12px">Automated monitor · cabincrewguidebook.com</p>
      </div>`;
    try {
      await sendEmail(RESEND_API_KEY, TO, subject, html);
    } catch { /* don't let a mail failure crash the scheduled run */ }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ healthy, problems, checks: lines }),
  };
};
