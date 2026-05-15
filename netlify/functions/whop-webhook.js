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
    const payload = JSON.parse(event.body || "{}");
    const { action, data } = payload;

    console.log("Whop webhook received:", action, JSON.stringify(data));

    // membership_activated = someone just paid and subscribed
    if (action === "membership_activated" || action === "payment.succeeded") {
      const membership = data?.membership || data;
      const email = membership?.user?.email || data?.email;
      const planId = membership?.product_id || data?.product_id || "";

      // Determine tier based on which Whop product they bought
      const PREMIUM_PRODUCT = "premium-access-be-74b9";
      const tier = planId.includes(PREMIUM_PRODUCT) ? "premium" : "standard";

      console.log(`User ${email} activated ${tier} membership`);

      // In production: save to database here
      // For now: log it so you can see it in Netlify logs
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
