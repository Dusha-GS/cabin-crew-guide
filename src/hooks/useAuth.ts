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
    const user: AuthUser = { id: "demo-001", email, name: "Demo User", tier: "standard", tosAccepted: true, createdAt: new Date().toISOString() };
    storeUser(user);
    return user;
  }
  const stored = getStoredUser();
  if (stored && stored.email === email) {
    storeUser(stored);
    return stored;
  }
  throw new Error("Invalid email or password. Please try again.");
}

export async function registerUser(email: string, password: string, name: string): Promise<AuthUser> {
  await new Promise((r) => setTimeout(r, 900));
  if (!email || !password || !name) throw new Error("All fields are required.");
  if (password.length < 8) throw new Error("Password must be at least 8 characters.");
  const user: AuthUser = { id: `user-${Date.now()}`, email, name, tier: "free", tosAccepted: true, createdAt: new Date().toISOString() };
  storeUser(user);
  return user;
}

export async function sendPasswordReset(email: string): Promise<void> {
  await new Promise((r) => setTimeout(r, 700));
  if (!email.includes("@")) throw new Error("Please enter a valid email address.");
}
