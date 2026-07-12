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

// Ends the Supabase session (server-side) and clears the local copy.
// Without the signOut() call, the Supabase session lingers and the user
// gets silently re-logged-in on the next page load.
export async function signOutUser() {
  try { await supabase.auth.signOut(); } catch { /* ignore network errors */ }
  clearStoredUser();
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
  if (error) throw new Error("Invalid email or password. Please try again.");

  return buildUserFromSupabaseUser(data.user);
}

export async function registerUser(email: string, password: string, name: string): Promise<AuthUser> {
  if (!email || !password || !name) throw new Error("All fields are required.");
  if (password.length < 8) throw new Error("Password must be at least 8 characters.");

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } },
  });
  if (error) throw new Error(error.message);
  if (!data.user) throw new Error("Registration failed. Please try again.");

  return buildUserFromSupabaseUser(data.user);
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
