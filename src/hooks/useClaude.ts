// src/hooks/useClaude.ts
// Central hook for all Anthropic API calls.
// In production (Netlify), calls go through /.netlify/functions/claude (server-side, key hidden).
// In local dev, you can set VITE_ANTHROPIC_API_KEY in .env.local for direct calls.

export interface ClaudeMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ClaudeOptions {
  system?: string;
  max_tokens?: number;
}

const IS_PROD = import.meta.env.PROD;
const LOCAL_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;

export async function callClaude(
  messages: ClaudeMessage[],
  options: ClaudeOptions = {}
): Promise<string> {
  const payload = {
    messages,
    system: options.system || "",
    max_tokens: options.max_tokens || 1024,
  };

  let response: Response;

  if (IS_PROD || !LOCAL_KEY) {
    // Production: use Netlify serverless function (API key stays server-side)
    response = await fetch("/.netlify/functions/claude", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } else {
    // Local dev: direct call with key from .env.local
    response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": LOCAL_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        ...payload,
      }),
    });
  }

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || `API error ${response.status}`);
  }

  const data = await response.json();
  const textBlock = data.content?.find((b: { type: string }) => b.type === "text");
  return textBlock?.text || "";
}
