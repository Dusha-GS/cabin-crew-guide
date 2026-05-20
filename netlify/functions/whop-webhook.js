export const handler = async (event) => {
  const cors = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers: cors, body: "" };
  }
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers: cors, body: "Method Not Allowed" };
  }
  try {
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

    // Log the full raw payload so we can see exactly what Whop sends
    console.log("Raw body:", event.body);

    const payload = JSON.parse(event.body || "{}");
    const { action, data } = payload;

    console.log("Action:", action);
    console.log("Full payload:", JSON.stringify(payload, null, 2));

    async function upsertUser(email, tier, whopUserId, whopMembershipId) {
      console.log(`Upserting user: ${email} with tier: ${tier}`);
      const response = await fetch(`${SUPABASE_URL}/rest/v1/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": SUPABASE_SERVICE_KEY,
          "Authorization": `Bearer ${SUPABASE_SERVICE_KEY}`,
          "Prefer": "resolution=merge-duplicates",
        },
        body: JSON.stringify({
          email,
          tier,
          whop_user_id: whopUserId,
          whop_membership_id: whopMembershipId,
          updated_at: new Date().toISOString(),
        }),
      });
      const responseText = await response.text();
      console.log("Supabase response status:", response.status);
      console.log("Supabase response body:", responseText);
      return response;
    }

    if (action === "membership_activated" || action === "payment.succeeded") {
      const membership = data?.membership || data;
      const email = membership?.user?.email || data?.email;
      const whopUserId = membership?.user?.id || data?.user_id || null;
      const whopMembershipId = membership?.id || null;
      const planId = membership?.product_id || data?.product_id || "";
      const PREMIUM_PRODUCT = "premium-access-be-74b9";
      const tier = planId.includes(PREMIUM_PRODUCT) ? "premium" : "standard";

      console.log(`Email extracted: ${email}`);
      console.log(`Plan ID: ${planId}`);
      console.log(`Tier assigned: ${tier}`);

      if (email) {
        const res = await upsertUser(email, tier, whopUserId, whopMembershipId);
        console.log("Upsert completed with status:", res.status);
      } else {
        console.log("ERROR: No email found in payload!");
      }
    } else {
      console.log("Action not handled:", action);
    }

    if (action === "membership_deactivated") {
      const membership = data?.membership || data;
      const email = membership?.user?.email || data?.email;
      console.log(`Deactivating user: ${email}`);
      if (email) {
        const response = await fetch(
          `${SUPABASE_URL}/rest/v1/users?email=eq.${encodeURIComponent(email)}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "apikey": SUPABASE_SERVICE_KEY,
              "Authorization": `Bearer ${SUPABASE_SERVICE_KEY}`,
            },
            body: JSON.stringify({
              tier: "free",
              updated_at: new Date().toISOString(),
            }),
          }
        );
        const responseText = await response.text();
        console.log("Downgrade response status:", response.status);
        console.log("Downgrade response body:", responseText);
      }
    }

    return {
      statusCode: 200,
      headers: { ...cors, "Content-Type": "application/json" },
      body: JSON.stringify({ received: true }),
    };
  } catch (err) {
    console.error("Webhook error:", err);
    return {
      statusCode: 500,
      headers: cors,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
