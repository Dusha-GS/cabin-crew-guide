import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

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
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY
    );

    const payload = JSON.parse(event.body || "{}");
    const { action, data } = payload;
    console.log("Whop webhook received:", action, JSON.stringify(data));

    if (action === "membership_activated" || action === "payment.succeeded") {
      const membership = data?.membership || data;
      const email = membership?.user?.email || data?.email;
      const whopUserId = membership?.user?.id || data?.user_id || null;
      const whopMembershipId = membership?.id || null;
      const planId = membership?.product_id || data?.product_id || "";

      const PREMIUM_PRODUCT = "premium-access-be-74b9";
      const tier = planId.includes(PREMIUM_PRODUCT) ? "premium" : "standard";

      console.log(`User ${email} activated ${tier} membership`);

      if (email) {
        const { error } = await supabase
          .from("users")
          .upsert(
            {
              email,
              tier,
              whop_user_id: whopUserId,
              whop_membership_id: whopMembershipId,
              updated_at: new Date().toISOString(),
            },
            { onConflict: "email" }
          );

        if (error) {
          console.error("Supabase error:", error);
        } else {
          console.log(`Saved ${email} as ${tier} in Supabase`);
        }
      }
    }

    if (action === "membership_deactivated") {
      const membership = data?.membership || data;
      const email = membership?.user?.email || data?.email;

      if (email) {
        const { error } = await supabase
          .from("users")
          .update({ tier: "free", updated_at: new Date().toISOString() })
          .eq("email", email);

        if (error) {
          console.error("Supabase error on deactivate:", error);
        } else {
          console.log(`Downgraded ${email} to free in Supabase`);
        }
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
