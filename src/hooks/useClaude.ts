import { supabase } from "../supabaseClient";

export interface ClaudeMessage {
  role: "user" | "assistant";
  content: string;
}

/** Which paid feature this call belongs to. The server enforces the limits. */
export type ClaudeFeature = "mock-interview" | "cv-review" | "mock-exam";

export interface ClaudeOptions {
  system?: string;
  max_tokens?: number;
  feature?: ClaudeFeature;
}

export async function callClaude(
  messages: ClaudeMessage[],
  options: ClaudeOptions = {}
): Promise<string> {
  const payload = {
    messages,
    system: options.system || "",
    max_tokens: options.max_tokens || 1024,
    feature: options.feature,
  };

  const { data: { session } } = await supabase.auth.getSession();
  const token = session?.access_token;
  if (!token) {
    throw new Error("Please sign in to use AI features.");
  }

  const response = await fetch("/.netlify/functions/claude", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error((err as {error?: string}).error || `API error ${response.status}`);
  }

  const data = await response.json() as {content?: Array<{type: string; text?: string}>};
  const textBlock = data.content?.find((b) => b.type === "text");
  return textBlock?.text || "";
}
