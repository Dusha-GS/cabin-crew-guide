// src/hooks/useClaude.ts

export interface ClaudeMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ClaudeOptions {
  system?: string;
  max_tokens?: number;
}

export async function callClaude(
  messages: ClaudeMessage[],
  options: ClaudeOptions = {}
): Promise<string> {
  const payload = {
    messages,
    system: options.system || "",
    max_tokens: options.max_tokens || 1024,
  };

  const response = await fetch("/.netlify/functions/claude", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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
