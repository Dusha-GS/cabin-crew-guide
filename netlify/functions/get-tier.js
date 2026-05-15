export const handler = async (event) => {
  const cors = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers: cors, body: "" };
  }

  const { email } = JSON.parse(event.body || "{}");
  if (!email) return { statusCode: 400, headers: cors, body: JSON.stringify({ tier: "free" }) };

  const response = await fetch(
    `${process.env.SUPABASE_URL}/rest/v1/users?email=eq.${encodeURIComponent(email)}&select=tier`,
    {
      headers: {
        "apikey": process.env.SUPABASE_SERVICE_KEY,
        "Authorization": `Bearer ${process.env.SUPABASE_SERVICE_KEY}`,
      },
    }
  );

  const data = await response.json();
  const tier = data?.[0]?.tier || "free";

  return {
    statusCode: 200,
    headers: { ...cors, "Content-Type": "application/json" },
    body: JSON.stringify({ tier }),
  };
};
