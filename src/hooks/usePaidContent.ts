import { useCallback, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

/**
 * Paid content is NOT bundled into the app any more. It lives server-side in
 * netlify/functions/get-content.js and is only released to a caller who has a
 * valid Supabase session AND whose tier (checked server-side) covers it.
 */
export type ContentKey = "cv-guide" | "interview-questions" | "group-discussion" | "mock-exam" | "rejection-decoded";

export function usePaidContent<T>(key: ContentKey) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setLoading(true);
      setError(null);

      try {
        const { data: { session } } = await supabase.auth.getSession();
        const token = session?.access_token;
        if (!token) throw new Error("Please sign in to view this content.");

        const res = await fetch("/.netlify/functions/get-content", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ key }),
        });

        const body = await res.json().catch(() => ({} as Record<string, unknown>));

        if (!res.ok) {
          if (res.status === 403) {
            const plan = body.requires === "premium" ? "Premium" : "Standard";
            throw new Error(`This is a ${plan} feature. Upgrade your membership to unlock it.`);
          }
          throw new Error(
            (body.error as string) || "We couldn't load this content. Please try again."
          );
        }

        if (!cancelled) setData(body.content as T);
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "We couldn't load this content.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, [key, attempt]);

  return { data, loading, error, retry };
}
