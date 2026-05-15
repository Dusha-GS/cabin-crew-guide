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

  // Not in localStorage — check Supabase
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
