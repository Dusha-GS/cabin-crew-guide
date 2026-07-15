import { useState } from "react";
import { supabase } from "../supabaseClient";
import { sendAccountEmail, validatePassword } from "../hooks/useAuth";

interface Props {
  onDone: () => void;
}

export default function ResetPasswordSection({ onDone }: Props) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const pwErr = validatePassword(password);
    if (pwErr) { setError(pwErr); return; }
    if (password !== confirm) { setError("Passwords do not match."); return; }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    if (error) { setError(error.message); setLoading(false); return; }
    setSuccess(true);
    setLoading(false);
    // Fire the "password changed" security alert (non-fatal).
    sendAccountEmail("password_changed");
    setTimeout(() => onDone(), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-slate-800 border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        <div className="h-1 w-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500" />
        <div className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-slate-900 font-bold text-lg">✈</div>
            <div>
              <p className="text-white font-bold text-sm leading-none">Cabin Crew</p>
              <p className="text-amber-400 text-xs">Interview Guidebook</p>
            </div>
          </div>

          {success ? (
            <div className="text-center py-4">
              <div className="text-5xl mb-4">✅</div>
              <h2 className="text-2xl font-bold text-white mb-2">Password updated!</h2>
              <p className="text-slate-400 text-sm">Redirecting you to the home page...</p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-white mb-1">Set new password</h2>
              <p className="text-slate-400 text-sm mb-6">Choose a strong password for your account.</p>
              <form onSubmit={handleReset} className="space-y-4">
                <div>
                  <label htmlFor="reset-new-password" className="block text-slate-300 text-sm font-medium mb-1.5">New password</label>
                  <div className="relative">
                    <input
                      id="reset-new-password"
                      type={showPass ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={10}
                      placeholder="Min. 10 characters"
                      className="w-full bg-slate-700 border border-white/10 rounded-xl px-4 py-3 pr-10 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 text-sm"
                    />
                    <button type="button" onClick={() => setShowPass(!showPass)} aria-label={showPass ? "Hide password" : "Show password"} aria-pressed={showPass} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 rounded">
                      <span aria-hidden="true">{showPass ? "🙈" : "👁"}</span>
                    </button>
                  </div>
                </div>
                <div>
                  <label htmlFor="reset-confirm-password" className="block text-slate-300 text-sm font-medium mb-1.5">Confirm password</label>
                  <input
                    id="reset-confirm-password"
                    type={showPass ? "text" : "password"}
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    required
                    placeholder="Repeat your password"
                    className="w-full bg-slate-700 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 text-sm"
                  />
                </div>
                {error && <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">{error}</div>}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 font-bold py-3 rounded-xl disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? <><span className="w-4 h-4 border-2 border-slate-900/40 border-t-slate-900 rounded-full animate-spin" />Updating…</> : "Update Password"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
