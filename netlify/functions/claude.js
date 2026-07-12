// netlify/functions/claude.js
// Secure server-side proxy to Anthropic. Requires an authenticated Supabase
// user so the endpoint can't be abused anonymously to burn the API key.
// Env required: ANTHROPIC_API_KEY, SUPABASE_URL, SUPABASE_SERVICE_KEY

const ALLOWED_ORIGIN = "https://cabincrewguidebook.com";
const MAX_TOKENS_CAP = 2048;

export const handler = async (event) => {
  const cors = {
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers: cors, body: "" };
  if (event.httpMethod !== "POST") return { statusCode: 405, headers: cors, body: "Method Not Allowed" };

  const apiKey = process.env.ANTHROPIC_API_KEY;
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
  if (!apiKey || !SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    return { statusCode: 500, headers: cors, body: JSON.stringify({ error: "Server not configured." }) };
  }

  // ── Require a valid Supabase session ──────────────────────────
  const authHeader = event.headers.authorization || event.headers.Authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  if (!token) {
    return { statusCode: 401, headers: cors, body: JSON.stringify({ error: "Please sign in to use AI features." }) };
  }
  try {
    const userRes = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      headers: { apikey: SUPABASE_SERVICE_KEY, Authorization: `Bearer ${token}` },
    });
    if (!userRes.ok) {
      return { statusCode: 401, headers: cors, body: JSON.stringify({ error: "Your session has expired. Please sign in again." }) };
    }
    const supaUser = await userRes.json();
    if (!supaUser || !supaUser.email) {
      return { statusCode: 401, headers: cors, body: JSON.stringify({ error: "Invalid session." }) };
    }
  } catch {
    return { statusCode: 401, headers: cors, body: JSON.stringify({ error: "Could not verify your session." }) };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    if (!Array.isArray(body.messages) || body.messages.length === 0) {
      return { statusCode: 400, headers: cors, body: JSON.stringify({ error: "No messages provided." }) };
    }
    const maxTokens = Math.min(Number(body.max_tokens) || 1024, MAX_TOKENS_CAP);

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: maxTokens,
        system: typeof body.system === "string" ? body.system : "",
        messages: body.messages,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      return { statusCode: response.status, headers: cors, body: JSON.stringify({ error: data.error?.message || "Anthropic API error" }) };
    }
    return { statusCode: 200, headers: { ...cors, "Content-Type": "application/json" }, body: JSON.stringify(data) };
  } catch (err) {
    return { statusCode: 500, headers: cors, body: JSON.stringify({ error: err.message || "Internal server error" }) };
  }
};
