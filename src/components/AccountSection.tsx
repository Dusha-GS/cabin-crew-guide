import { AuthUser } from "../hooks/useAuth";
import { sendPasswordReset, openBillingPortal, deleteAccount } from "../hooks/useAuth";
import BackButton from "./BackButton";
import { useState } from "react";

interface Props {
  user: AuthUser;
  goBack: () => void;
  previousLabel: string;
  onLogout: () => void;
  onNavigatePremium: () => void;
}

export default function AccountSection({ user, goBack, previousLabel, onLogout, onNavigatePremium }: Props) {
  const [resetSent, setResetSent] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [resetError, setResetError] = useState("");
  const [portalLoading, setPortalLoading] = useState(false);
  const [portalError, setPortalError] = useState("");

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const handleDeleteAccount = async () => {
    setDeleteLoading(true);
    setDeleteError("");
    try {
      await deleteAccount();
      onLogout(); // account is gone — clear the session and return home
    } catch (e: any) {
      setDeleteError(e.message || "Could not delete your account.");
      setDeleteLoading(false);
    }
  };

  const handleManageSubscription = async () => {
    setPortalLoading(true);
    setPortalError("");
    try {
      await openBillingPortal(); // redirects on success
    } catch (e: any) {
      setPortalError(e.message || "Could not open the subscription portal.");
      setPortalLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    setResetLoading(true);
    setResetError("");
    try {
      await sendPasswordReset(user.email);
      setResetSent(true);
    } catch (e: any) {
      setResetError(e.message || "Something went wrong.");
    } finally {
      setResetLoading(false);
    }
  };

  const tierColors = {
    free: "text-slate-400 bg-slate-500/10 border-slate-500/30",
    standard: "text-blue-400 bg-blue-500/10 border-blue-500/30",
    premium: "text-amber-400 bg-amber-500/10 border-amber-500/30",
  };

  const tierLabels = {
    free: "Free",
    standard: "Standard",
    premium: "Premium",
  };


  return (
    <div className="min-h-screen bg-slate-900 pt-24 pb-20 px-4">
      <div className="max-w-xl mx-auto">
        <BackButton onClick={goBack} label={`Back to ${previousLabel}`} />

        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1">My Account</h2>
          <p className="text-slate-400 text-sm">Manage your profile and subscription</p>
        </div>

        {/* Profile card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-4">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-slate-900 font-bold text-xl flex-shrink-0">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-white font-bold text-lg leading-tight truncate">{user.name}</p>
              <p className="text-slate-400 text-sm truncate">{user.email}</p>
            </div>
          </div>

          <div className="border-t border-white/5 pt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-sm">Plan</span>
              <span className={`text-xs font-bold px-3 py-1 rounded-full border capitalize ${tierColors[user.tier]}`}>
                {tierLabels[user.tier]}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-sm">Member since</span>
              <span className="text-slate-300 text-sm">
                {new Date(user.createdAt).toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-sm">Email</span>
              <span className="text-slate-300 text-sm truncate max-w-[200px]">{user.email}</span>
            </div>
          </div>
        </div>

        {/* Upgrade banner — only for free and standard */}
        {user.tier !== "premium" && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5 mb-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-amber-400 font-bold text-sm mb-1">
                  {user.tier === "standard" ? "Upgrade to Premium" : "Unlock Full Access"}
                </p>
                <p className="text-slate-400 text-xs leading-relaxed">
                  {user.tier === "standard"
                    ? "Add AI Interview, Ask Cabin Crew forum, and Group Discussion — Premium at $25/mo."
                    : "Get the full guidebook, mock exam, CV guide, and AI interview tools."}
                </p>
              </div>
              <span className="text-amber-400 font-bold text-sm flex-shrink-0">
                {"$25/mo"}
              </span>
            </div>
            <div className="flex gap-3 mt-4">
              
                <button
                onClick={onNavigatePremium}
                className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 font-bold py-2.5 rounded-xl text-sm text-center transition-all hover:scale-[1.01]"
              >
                {user.tier === "standard" ? "Upgrade to Premium →" : "Get Premium →"}
              </button>
              <button
                onClick={onNavigatePremium}
                className="px-4 py-2.5 bg-white/5 border border-white/10 text-slate-400 rounded-xl text-sm hover:text-white transition-colors"
              >
                Compare plans
              </button>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden mb-4">
          <div className="p-5 border-b border-white/5">
            <p className="text-white font-bold text-sm">Account Actions</p>
          </div>

          {/* Password reset */}
          <div className="p-5 border-b border-white/5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-slate-300 text-sm font-medium">Change Password</p>
                <p className="text-slate-400 text-xs mt-0.5">We'll send a reset link to your email</p>
              </div>
              {resetSent ? (
                <span className="text-green-400 text-xs font-medium bg-green-500/10 border border-green-500/20 px-3 py-1.5 rounded-lg flex-shrink-0">
                  ✓ Email sent
                </span>
              ) : (
                <button
                  onClick={handlePasswordReset}
                  disabled={resetLoading}
                  className="text-amber-400 text-xs font-medium bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-lg hover:bg-amber-500/20 transition-colors flex-shrink-0 disabled:opacity-50"
                >
                  {resetLoading ? "Sending..." : "Send reset link"}
                </button>
              )}
            </div>
            {resetError && <p className="text-red-400 text-xs mt-2">{resetError}</p>}
          </div>

          {/* Manage subscription (paying members only) */}
          {user.tier !== "free" && (
            <div className="p-5 border-b border-white/5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-slate-300 text-sm font-medium">Manage Subscription</p>
                  <p className="text-slate-400 text-xs mt-0.5">Upgrade, update payment, or cancel &mdash; self-service</p>
                </div>
                <button
                  onClick={handleManageSubscription}
                  disabled={portalLoading}
                  className="text-amber-400 text-xs font-medium bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-lg hover:bg-amber-500/20 transition-colors flex-shrink-0 disabled:opacity-50"
                >
                  {portalLoading ? "Opening..." : "Open portal"}
                </button>
              </div>
              {portalError && <p className="text-red-400 text-xs mt-2">{portalError}</p>}
            </div>
          )}

          {/* Sign out */}
          <div className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-300 text-sm font-medium">Sign Out</p>
                <p className="text-slate-400 text-xs mt-0.5">You can sign back in anytime</p>
              </div>
              <button
                onClick={onLogout}
                className="text-red-400 text-xs font-medium bg-red-500/10 border border-red-500/20 px-3 py-1.5 rounded-lg hover:bg-red-500/20 transition-colors"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>

        {/* Danger zone — delete account (GDPR right to erasure) */}
        <div className="bg-red-500/5 border border-red-500/20 rounded-2xl overflow-hidden mb-4">
          <div className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-red-400 font-bold text-sm">Delete Account</p>
                <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">
                  Permanently erase your account and personal data. This cannot be undone.
                </p>
              </div>
              {!deleteOpen && (
                <button
                  onClick={() => setDeleteOpen(true)}
                  className="text-red-400 text-xs font-medium bg-red-500/10 border border-red-500/20 px-3 py-1.5 rounded-lg hover:bg-red-500/20 transition-colors flex-shrink-0"
                >
                  Delete account
                </button>
              )}
            </div>

            {deleteOpen && (
              <div className="mt-4 pt-4 border-t border-red-500/10">
                <p className="text-slate-300 text-xs leading-relaxed mb-3">
                  This will permanently delete your account, your saved data, and your usage history.
                  {user.tier !== "free" && (
                    <>
                      {" "}
                      <strong className="text-white">Your subscription will be cancelled immediately</strong> and
                      you will lose access straight away — the remainder of the current billing period is not refunded.
                    </>
                  )}{" "}
                  You cannot undo this.
                </p>
                <label htmlFor="delete-confirm" className="block text-slate-400 text-xs mb-1.5">
                  Type <strong className="text-white">DELETE</strong> to confirm
                </label>
                <input
                  id="delete-confirm"
                  type="text"
                  value={deleteConfirm}
                  onChange={(e) => setDeleteConfirm(e.target.value)}
                  placeholder="DELETE"
                  aria-label="Type DELETE to confirm account deletion"
                  className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder:text-slate-400 focus:outline-none focus:border-red-500/50 mb-3"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleDeleteAccount}
                    disabled={deleteConfirm !== "DELETE" || deleteLoading}
                    className="flex-1 bg-red-500/90 text-white font-bold py-2.5 rounded-xl text-sm transition-colors hover:bg-red-500 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {deleteLoading ? "Deleting..." : "Permanently delete my account"}
                  </button>
                  <button
                    onClick={() => { setDeleteOpen(false); setDeleteConfirm(""); setDeleteError(""); }}
                    disabled={deleteLoading}
                    className="px-4 py-2.5 bg-white/5 border border-white/10 text-slate-400 rounded-xl text-sm hover:text-white transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </div>
                {deleteError && <p className="text-red-400 text-xs mt-2">{deleteError}</p>}
              </div>
            )}
          </div>
        </div>

        {/* Manage subscription note */}
        <p className="text-slate-400 text-xs text-center leading-relaxed">
          Upgrade or cancel anytime via <span className="text-slate-400">Manage Subscription</span> above. Need help? Email{" "}
          <a href="mailto:support@cabincrewguidebook.com" className="text-slate-400 hover:text-slate-400 underline">
            support@cabincrewguidebook.com
          </a>.
        </p>
      </div>
    </div>
  );
}
