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
  await new Promise((r) => setTimeout(r, 800));

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

  // Check localStorage first
  const stored = getStoredUser();
  if (stored && stored.email === email) {
    const tier = await getTierFromSupabase(email);
    const updated = { ...stored, tier };
    storeUser(updated);
    return updated;
  }

  // Not in localStorage — check Supabase via function
  const tier = await getTierFromSupabase(email);
  const user: AuthUser = {
    id: `user-${Date.now()}`,
    email,
    name: email.split("@")[0],
    tier,
    tosAccepted: true,
    createdAt: new Date().toISOString(),
  };
  storeUser(user);
  return user;
}

export async function registerUser(email: string, password: string, name: string): Promise<AuthUser> {
  await new Promise((r) => setTimeout(r, 900));
  if (!email || !password || !name) throw new Error("All fields are required.");
  if (password.length < 8) throw new Error("Password must be at least 8 characters.");

  const tier = await getTierFromSupabase(email);

  const user: AuthUser = {
    id: `user-${Date.now()}`,
    email,
    name,
    tier,
    tosAccepted: true,
    createdAt: new Date().toISOString(),
  };
  storeUser(user);
  return user;
}

export async function sendPasswordReset(email: string): Promise<void> {
  await new Promise((r) => setTimeout(r, 700));
  if (!email.includes("@")) throw new Error("Please enter a valid email address.");
}
