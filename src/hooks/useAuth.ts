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

export const WHOP_STANDARD_LINK = "https://whop.com/cabin-crew-guidebook-through-interview/cabin-crew-interview-guidebook/";
export const WHOP_PREMIUM_LINK = "https://whop.com/cabin-crew-guidebook-through-interview/premium-access-be-74b9/";
export const WHOP_UPGRADE_LINK = "https://whop.com/cabin-crew-guidebook-through-interview/upgrade-to-premium-f2/";

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

export async function loginUser(email: string, password: string): Promise<AuthUser> {
  // Demo account
  if (email === "demo@cabincrew.com" && password === "demo1234") {
    const user: AuthUser = {
      id: "demo-001",
      email,
      name: "Demo User",
      tier: "premium",
      tosAccepted: true,
      createdAt: new Date().toISOString(),
    };
    storeUser(user);
    return user;
  }

  // Real Supabase Auth login
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    throw new Error("Invalid email or password. Please try again.");
  }

  const tier = await getTierFromSupabase(email);
  const user: AuthUser = {
    id: data.user.id,
    email,
    name: data.user.user_metadata?.name || email.split("@")[0],
    tier,
    tosAccepted: true,
    createdAt: data.user.created_at,
  };
  storeUser(user);
  return user;
}

export async function registerUser(email: string, password: string, name: string): Promise<AuthUser> {
  if (!email || !password || !name) throw new Error("All fields are required.");
  if (password.length < 8) throw new Error("Password must be at least 8 characters.");

  // Register with Supabase Auth
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } },
  });

  if (error) {
    throw new Error(error.message);
  }

  if (!data.user) {
    throw new Error("Registration failed. Please try again.");
  }

  const tier = await getTierFromSupabase(email);
  const user: AuthUser = {
    id: data.user.id,
    email,
    name,
    tier,
    tosAccepted: true,
    createdAt: data.user.created_at,
  };
  storeUser(user);
  return user;
}

export async function sendPasswordReset(email: string): Promise<void> {
  if (!email.includes("@")) throw new Error("Please enter a valid email address.");
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "https://cabincrewguidebook.com",
  });
  if (error) throw new Error(error.message);
}
