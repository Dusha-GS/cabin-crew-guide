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
  if (!email) return { statusCode: 400, headers: cors, body: JSON.stringify({ tier: "free", error: "no email" }) };

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

  const url = `${supabaseUrl}/rest/v1/users?email=eq.${encodeURIComponent(email)}&select=tier`;
  
  const response = await fetch(url, {
    headers: {
      "apikey": supabaseKey,
      "Authorization": `Bearer ${supabaseKey}`,
    },
  });

  const text = await response.text();
  
  return {
    statusCode: 200,
    headers: { ...cors, "Content-Type": "application/json" },
    body: JSON.stringify({ 
      tier: JSON.parse(text)?.[0]?.tier || "free",
      debug_status: response.status,
      debug_response: text,
      debug_url: url,
      has_key: !!supabaseKey,
      has_url: !!supabaseUrl,
    }),
  };
};
