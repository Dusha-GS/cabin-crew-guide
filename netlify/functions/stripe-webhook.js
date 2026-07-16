import { createHmac, timingSafeEqual } from "crypto";

const STANDARD_PRICE_ID = "price_1TpNjNFAbhxH3P83QsOjMtgO";
const PREMIUM_PRICE_ID  = "price_1TpNk1FAbhxH3P83BwYiZ1ER";

function verifyStripeSignature(rawBody, sigHeader, secret) {
  const parts = sigHeader.split(",");
  let timestamp = null;
  const signatures = [];

  for (const part of parts) {
    const eqIdx = part.indexOf("=");
    const key   = part.slice(0, eqIdx).trim();
    const value = part.slice(eqIdx + 1).trim();
    if (key === "t")  timestamp = value;
    if (key === "v1") signatures.push(value);
  }

  if (!timestamp || signatures.length === 0) {
    throw new Error("Invalid stripe-signature header");
  }

  // Reject webhooks older than 5 minutes
  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - parseInt(timestamp)) > 300) {
    throw new Error("Webhook timestamp too old — possible replay attack");
  }

  const signedPayload = `${timestamp}.${rawBody}`;
  const expectedSig   = createHmac("sha256", secret)
    .update(signedPayload, "utf8")
    .digest("hex");

  const isValid = signatures.some((sig) => {
    try {
      return timingSafeEqual(
        Buffer.from(sig, "hex"),
        Buffer.from(expectedSig, "hex")
      );
    } catch {
      return false;
    }
  });

  if (!isValid) throw new Error("Stripe signature verification failed");
  return JSON.parse(rawBody);
}

async function stripeGet(path) {
  const res = await fetch(`https://api.stripe.com/v1${path}`, {
    headers: { Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}` },
  });
  return res.json();
}

// The single source of truth: derive a customer's entitled tier from their
// CURRENT subscriptions in Stripe. Covers new/upgrade/downgrade/cancel uniformly.
// Active, trialing and past_due (grace while Stripe retries) all keep access.
// A plan scheduled to cancel at period end is still active until it actually ends.
async function tierForCustomer(customerId) {
  const res = await stripeGet(`/subscriptions?customer=${customerId}&status=all&limit=100`);
  let tier = "free";
  for (const sub of res?.data || []) {
    if (!["active", "trialing", "past_due"].includes(sub.status)) continue;
    const priceId = sub.items?.data?.[0]?.price?.id;
    if (priceId === PREMIUM_PRICE_ID) return "premium";       // highest tier wins
    if (priceId === STANDARD_PRICE_ID) tier = "standard";
    else if (tier === "free") tier = "standard";              // unknown paid price → at least standard
  }
  return tier;
}

// Look up the auth user's id (the public.users primary key) by email.
async function findAuthUserId(supabaseUrl, supabaseKey, email) {
  const target = email.toLowerCase();
  for (let page = 1; page <= 20; page++) {
    const r = await fetch(`${supabaseUrl}/auth/v1/admin/users?page=${page}&per_page=200`, {
      headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` },
    });
    if (!r.ok) return null;
    const data = await r.json();
    const users = Array.isArray(data) ? data : (data.users || []);
    if (!users.length) return null;
    const hit = users.find((u) => (u.email || "").toLowerCase() === target);
    if (hit) return hit.id;
    if (users.length < 200) return null;
  }
  return null;
}

// Activate a paid tier for a user. Returns { ok, detail }.
// public.users is keyed by the auth user's id (a NOT NULL primary key), so the
// old email-only POST-upsert could never match and silently failed. We now
// UPDATE the existing row by email (created at signup); if there is genuinely no
// row yet, we look up the auth id and INSERT with it. Any real failure is
// surfaced (returned false) so the handler can 500 and Stripe will retry.
async function activateTier(supabaseUrl, supabaseKey, email, tier, stripeCustomerId) {
  console.log(`Activating tier: ${email} → ${tier}`);
  // The users table has a `tier` column only — do NOT send columns it doesn't
  // have (stripe_customer_id / updated_at) or PostgREST 400s the whole write.
  const patchBody = { tier };

  // 1) Update the existing row by email.
  const patchRes = await fetch(
    `${supabaseUrl}/rest/v1/users?email=eq.${encodeURIComponent(email)}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        Prefer: "return=representation",
      },
      body: JSON.stringify(patchBody),
    }
  );
  const patchText = await patchRes.text();
  let patchedRows = [];
  try { patchedRows = JSON.parse(patchText); } catch { patchedRows = []; }
  console.log("Tier PATCH status:", patchRes.status, "| rows:", Array.isArray(patchedRows) ? patchedRows.length : "?");
  if (patchRes.ok && Array.isArray(patchedRows) && patchedRows.length > 0) {
    return { ok: true, detail: "updated existing row" };
  }

  // 2) No row updated — insert one, keyed by the auth user id.
  const userId = await findAuthUserId(supabaseUrl, supabaseKey, email);
  const insertBody = { email, tier };
  if (userId) insertBody.id = userId;

  const insRes = await fetch(`${supabaseUrl}/rest/v1/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      Prefer: "resolution=merge-duplicates",
    },
    body: JSON.stringify(insertBody),
  });
  const insText = await insRes.text();
  console.log("Tier INSERT status:", insRes.status, insText, "| id used:", userId ? "yes" : "NONE");
  return { ok: insRes.ok, detail: `insert ${insRes.status}: ${insText}` };
}

export const handler = async (event) => {
  const cors = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers: cors, body: "" };
  if (event.httpMethod !== "POST")   return { statusCode: 405, headers: cors, body: "Method Not Allowed" };

  const SUPABASE_URL        = process.env.SUPABASE_URL;
  const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
  const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

  try {
    const sig = event.headers["stripe-signature"];
    if (!sig) return { statusCode: 400, headers: cors, body: "Missing stripe-signature header" };

    const stripeEvent = verifyStripeSignature(event.body, sig, STRIPE_WEBHOOK_SECRET);
    console.log("Stripe event:", stripeEvent.type);

    // ── Any subscription lifecycle change → recompute the tier from Stripe ──
    // new purchase, upgrade, downgrade, and cancellation all funnel through the
    // same source-of-truth logic, so the account can never drift from billing.
    const SUB_EVENTS = new Set([
      "checkout.session.completed",
      "customer.subscription.created",
      "customer.subscription.updated",
      "customer.subscription.deleted",
    ]);

    if (SUB_EVENTS.has(stripeEvent.type)) {
      const obj = stripeEvent.data.object;
      const customerId = obj.customer;
      if (!customerId) {
        console.error("No customer id on event — skipping");
        return { statusCode: 200, headers: cors, body: JSON.stringify({ received: true }) };
      }

      const customer = await stripeGet(`/customers/${customerId}`);
      const email = customer?.email || obj.customer_details?.email || obj.customer_email;
      if (!email) {
        console.error("No email for customer — skipping");
        return { statusCode: 200, headers: cors, body: JSON.stringify({ received: true }) };
      }

      const tier = await tierForCustomer(customerId);
      console.log(`Recomputed tier for ${email} → ${tier} (event: ${stripeEvent.type})`);

      const result = await activateTier(SUPABASE_URL, SUPABASE_SERVICE_KEY, email, tier);
      if (!result.ok) {
        console.error("Tier write FAILED:", result.detail);
        // 500 → Stripe retries and the failure stays visible (never a hidden 200).
        return { statusCode: 500, headers: cors, body: JSON.stringify({ error: "tier write failed", detail: result.detail }) };
      }
    }

    // ── Payment failed → log only; Stripe retries, and a real cancellation
    //    later fires subscription.deleted which recomputes to free. ──────────
    else if (stripeEvent.type === "invoice.payment_failed") {
      const invoice = stripeEvent.data.object;
      console.log("Payment failed — customer:", invoice.customer, "| attempt:", invoice.attempt_count);
    }

    else {
      console.log("Unhandled event type:", stripeEvent.type);
    }

    return {
      statusCode: 200,
      headers: { ...cors, "Content-Type": "application/json" },
      body: JSON.stringify({ received: true }),
    };

  } catch (err) {
    console.error("Stripe webhook error:", err.message);
    return {
      statusCode: 400,
      headers: cors,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
