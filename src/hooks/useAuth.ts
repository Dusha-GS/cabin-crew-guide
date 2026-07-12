import { supabase } from "../supabaseClient";

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  tier: MembershipTier;
  tosAccepted: boolean;
  createdAt: string;
};

export type MembershipTier = "free" | "standard" | "premium";

// ── Stripe payment links ─────────────────────────────────────
export const STRIPE_STANDARD_LINK = "https://buy.stripe.com/3cIfZh4KCfXadVm8xVgrS00";
export const STRIPE_PREMIUM_LINK  = "https://buy.stripe.com/8x29ATdh8cKYaJa6pNgrS01";
// Upgrade link: handled by Stripe Customer Portal (coming soon)
export const STRIPE_UPGRADE_LINK  = "";


async function getTierFromSupabase(email: string): Promise<MembershipTier> {
  try {
    const response = await fetch("/.netlify/functions/get-tier", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (!response.ok) return "free";
    const data = await response.json();
    return (data.tier as MembershipTier) || "free";
  } catch {
    return "free";
  }
}

export function getStoredUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem("ccg_user");
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

export function storeUser(user: AuthUser) {
  localStorage.setItem("ccg_user", JSON.stringify(user));
}

export function clearStoredUser() {
  localStorage.removeItem("ccg_user");
}

// Signs the user out reliably. The default supabase.auth.signOut() uses a
// "global" scope that makes a network call to revoke the token — that call can
// hang or fail, and when it does, supabase-js leaves the session in
// localStorage, so a page refresh silently signs the user back in.
// We therefore clear local state directly (guaranteed, no network) and use
// scope:"local" which removes the session from THIS browser without a round-trip.
// Fires an account email (welcome / password-changed alert) through the
// session-protected send-email function. Non-fatal: failures are swallowed so
// they never block the auth UX.
export async function sendAccountEmail(type: "welcome" | "password_changed"): Promise<void> {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;
    if (!token) return;
    await fetch("/.netlify/functions/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ type }),
    });
  } catch {
    /* non-fatal */
  }
}

export async function signOutUser() {
  // 1) Remove our own stored user immediately.
  clearStoredUser();
  // 2) Hard-remove any lingering Supabase session token from this browser.
  try {
    for (const k of Object.keys(localStorage)) {
      if (k.startsWith("sb-") && k.endsWith("-auth-token")) localStorage.removeItem(k);
    }
  } catch { /* ignore */ }
  // 3) Tell Supabase to clear its in-memory session (local scope = no network call).
  try { await supabase.auth.signOut({ scope: "local" }); } catch { /* ignore */ }
}

// Shared builder used by email/password login, registration, and Google sign-in
async function buildUserFromSupabaseUser(supaUser: {
  id: string;
  email?: string | null;
  user_metadata?: Record<string, unknown>;
  created_at: string;
}): Promise<AuthUser> {
  const email = supaUser.email || "";
  const tier = await getTierFromSupabase(email);
  const metaName =
    (supaUser.user_metadata?.name as string | undefined) ||
    (supaUser.user_metadata?.full_name as string | undefined);
  const user: AuthUser = {
    id: supaUser.id,
    email,
    name: metaName || email.split("@")[0] || "Member",
    tier,
    tosAccepted: true,
    createdAt: supaUser.created_at,
  };
  storeUser(user);
  return user;
}

export async function loginUser(email: string, password: string): Promise<AuthUser> {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    // Supabase returns "Email not confirmed" when the account exists but is unverified.
    if (/confirm/i.test(error.message)) {
      throw new Error("Please confirm your email first \u2014 we sent a confirmation link to your inbox.");
    }
    throw new Error("Invalid email or password. Please try again.");
  }

  return buildUserFromSupabaseUser(data.user);
}

// Shared password rule \u2014 mirrors the Supabase policy (min 10 chars, letters + numbers).
export function validatePassword(pw: string): string | null {
  if (pw.length < 10) return "Password must be at least 10 characters.";
  if (!/[A-Za-z]/.test(pw) || !/[0-9]/.test(pw)) return "Password must include at least one letter and one number.";
  return null;
}

// Result of a sign-up attempt. With email confirmation enabled, sign-up does NOT
// create a session \u2014 the user must click the link in their inbox first.
export type RegisterResult =
  | { status: "signed_in"; user: AuthUser }
  | { status: "confirm_email"; email: string }
  | { status: "already_exists" };

export async function registerUser(email: string, password: string, name: string): Promise<RegisterResult> {
  if (!email || !password || !name) throw new Error("All fields are required.");
  const pwErr = validatePassword(password);
  if (pwErr) throw new Error(pwErr);

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } },
  });
  if (error) throw new Error(error.message);
  if (!data.user) throw new Error("Registration failed. Please try again.");

  // Supabase obfuscates duplicate sign-ups: an existing email returns a user with
  // an empty identities array and no session. Treat that as "already exists".
  if (Array.isArray(data.user.identities) && data.user.identities.length === 0) {
    return { status: "already_exists" };
  }

  // Email confirmation on \u2192 no session yet. Do NOT fake a logged-in state.
  if (!data.session) {
    return { status: "confirm_email", email };
  }

  const user = await buildUserFromSupabaseUser(data.user);
  return { status: "signed_in", user };
}

export async function sendPasswordReset(email: string): Promise<void> {
  if (!email.includes("@")) throw new Error("Please enter a valid email address.");
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "https://cabincrewguidebook.com",
  });
  if (error) throw new Error(error.message);
}

// ── Google sign-in ────────────────────────────────────────────
// Redirects the browser to Google, then back to the site once authenticated.
export async function signInWithGoogle(): Promise<void> {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: window.location.origin,
    },
  });
  if (error) throw new Error(error.message);
}

// Checks for an already-active Supabase session (used after the Google
// redirect lands back on the site) and builds an AuthUser from it.
export async function getUserFromActiveSession(): Promise<AuthUser | null> {
  const { data } = await supabase.auth.getSession();
  const supaUser = data.session?.user;
  if (!supaUser || !supaUser.email) return null;
  return buildUserFromSupabaseUser(supaUser);
}
