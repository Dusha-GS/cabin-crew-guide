import { useState } from "react";
import { loginUser, registerUser, sendPasswordReset, AuthUser } from "../hooks/useAuth";

type ModalView = "login" | "register" | "forgot" | "forgot-sent";

interface Props {
  onClose: () => void;
  onSuccess: (user: AuthUser) => void;
  onNavigate: (section: string) => void;
  initialView?: ModalView;
}

export default function AuthModal({ onClose, onSuccess, onNavigate, initialView = "login" }: Props) {
  const [view, setView] = useState<ModalView>(initialView);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [tosAccepted, setTosAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const switchView = (v: ModalView) => { setError(""); setLoading(false); setView(v); };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); setError(""); setLoading(true);
    try { const user = await loginUser(email, password); onSuccess(user); onClose(); }
    catch (err: unknown) { setError(err instanceof Error ? err.message : "Login failed"); }
    finally { setLoading(false); }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault(); setError("");
    if (!tosAccepted || !privacyAccepted) { setError("You must agree to the Terms of Service and Privacy Policy."); return; }
    setLoading(true);
    try { const user = await registerUser(email, password, name); onSuccess(user); onClose(); }
    catch (err: unknown) { setError(err instanceof Error ? err.message : "Registration failed"); }
    finally { setLoading(false); }
  };

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault(); setError(""); setLoading(true);
    try { await sendPasswordReset(email); setView("forgot-sent"); }
    catch (err: unknown) { setError(err instanceof Error ? err.message : "Failed to send email"); }
    finally { setLoading(false); }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative w-full max-w-md bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-1 w-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500" />
        <div className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-slate-900 font-bold text-lg">✈</div>
            <div>
              <p className="text-white font-bold text-sm leading-none">Cabin Crew</p>
              <p className="text-amber-400 text-xs">Interview Guidebook</p>
            </div>
            <button onClick={onClose} className="ml-auto text-slate-400 hover:text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          {view === "login" && (
            <>
              <h2 className="text-2xl font-bold text-white mb-1">Welcome back</h2>
              <p className="text-slate-400 text-sm mb-6">Sign in to access your guidebook</p>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-1.5">Email</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 text-sm" />
                </div>
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-1.5">Password</label>
                  <div className="relative">
                    <input type={showPass ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 pr-10 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 text-sm" />
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">{showPass ? "🙈" : "👁"}</button>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button type="button" onClick={() => switchView("forgot")} className="text-amber-400 hover:text-amber-300 text-sm">Forgot password?</button>
                </div>
                {error && <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">{error}</div>}
                <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 font-bold py-3 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                  {loading ? <><span className="w-4 h-4 border-2 border-slate-900/40 border-t-slate-900 rounded-full animate-spin" />Signing in…</> : "Sign In"}
                </button>
              </form>
              <p className="text-center text-slate-400 text-sm mt-4">No account? <button onClick={() => switchView("register")} className="text-amber-400 font-medium">Create one free</button></p>
            </>
          )}

          {view === "register" && (
            <>
              <h2 className="text-2xl font-bold text-white mb-1">Create account</h2>
              <p className="text-slate-400 text-sm mb-6">Start free — upgrade anytime</p>
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-1.5">Full name</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Your name" className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 text-sm" />
                </div>
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-1.5">Email</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 text-sm" />
                </div>
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-1.5">Password <span className="text-slate-500 font-normal">(min. 8 characters)</span></label>
                  <div className="relative">
                    <input type={showPass ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} placeholder="••••••••" className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 pr-10 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 text-sm" />
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">{showPass ? "🙈" : "👁"}</button>
                  </div>
                </div>
                <div className="space-y-3 bg-slate-800/50 border border-white/5 rounded-xl p-4">
                  <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Required agreements</p>
                  <div className="flex items-start gap-3 cursor-pointer" onClick={() => setTosAccepted(!tosAccepted)}>
                    <div className={`mt-0.5 w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center ${tosAccepted ? "bg-amber-500 border-amber-500" : "border-slate-600"}`}>
                      {tosAccepted && <svg className="w-3 h-3 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                    </div>
                    <span className="text-slate-300 text-sm">I agree to the <button type="button" onClick={(e) => { e.stopPropagation(); onNavigate("terms"); }} className="text-amber-400 hover:underline">Terms of Service</button></span>
                  </div>
                  <div className="flex items-start gap-3 cursor-pointer" onClick={() => setPrivacyAccepted(!privacyAccepted)}>
                    <div className={`mt-0.5 w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center ${privacyAccepted ? "bg-amber-500 border-amber-500" : "border-slate-600"}`}>
                      {privacyAccepted && <svg className="w-3 h-3 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                    </div>
                    <span className="text-slate-300 text-sm">I agree to the <button type="button" onClick={(e) => { e.stopPropagation(); onNavigate("privacy"); }} className="text-amber-400 hover:underline">Privacy Policy</button></span>
                  </div>
                </div>
                {error && <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">{error}</div>}
                <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 font-bold py-3 rounded-xl disabled:opacity-50 flex items-center justify-center gap-2">
                  {loading ? <><span className="w-4 h-4 border-2 border-slate-900/40 border-t-slate-900 rounded-full animate-spin" />Creating account…</> : "Create Free Account"}
                </button>
              </form>
              <p className="text-center text-slate-400 text-sm mt-4">Already have an account? <button onClick={() => switchView("login")} className="text-amber-400 font-medium">Sign in</button></p>
            </>
          )}

          {view === "forgot" && (
            <>
              <button onClick={() => switchView("login")} className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm mb-5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>Back to sign in
              </button>
              <h2 className="text-2xl font-bold text-white mb-1">Reset your password</h2>
              <p className="text-slate-400 text-sm mb-6">Enter your email and we'll send you a reset link</p>
              <form onSubmit={handleForgot} className="space-y-4">
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-1.5">Email address</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 text-sm" />
                </div>
                {error && <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">{error}</div>}
                <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 font-bold py-3 rounded-xl disabled:opacity-50 flex items-center justify-center gap-2">
                  {loading ? <><span className="w-4 h-4 border-2 border-slate-900/40 border-t-slate-900 rounded-full animate-spin" />Sending…</> : "Send Reset Link"}
                </button>
              </form>
            </>
          )}

          {view === "forgot-sent" && (
            <div className="text-center py-4">
              <div className="text-5xl mb-4">📬</div>
              <h2 className="text-2xl font-bold text-white mb-2">Check your inbox</h2>
              <p className="text-slate-400 text-sm mb-6">We sent a reset link to <span className="text-white font-medium">{email}</span></p>
              <button onClick={() => switchView("login")} className="text-amber-400 hover:text-amber-300 text-sm">← Back to sign in</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
