import { AuthUser, WHOP_UPGRADE_LINK, WHOP_PREMIUM_LINK } from "../hooks/useAuth";
import { sendPasswordReset } from "../hooks/useAuth";
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

  const upgradeLink = user.tier === "standard" ? WHOP_UPGRADE_LINK : WHOP_PREMIUM_LINK;

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
                    ? "Add AI Interview, Ask Cabin Crew forum, and Group Discussion for just $10.99/mo."
                    : "Get the full guidebook, mock exam, CV guide, and AI interview tools."}
                </p>
              </div>
              <span className="text-amber-400 font-bold text-sm flex-shrink-0">
                {user.tier === "standard" ? "$10.99/mo" : "$25/mo"}
              </span>
            </div>
            <div className="flex gap-3 mt-4">
              
                <a href={upgradeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 font-bold py-2.5 rounded-xl text-sm text-center transition-all hover:scale-[1.01]"
              >
                {user.tier === "standard" ? "Upgrade to Premium →" : "Get Premium →"}
              </a>
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
                <p className="text-slate-500 text-xs mt-0.5">We'll send a reset link to your email</p>
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

          {/* Sign out */}
          <div className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-300 text-sm font-medium">Sign Out</p>
                <p className="text-slate-500 text-xs mt-0.5">You can sign back in anytime</p>
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

        {/* Manage subscription note */}
        <p className="text-slate-600 text-xs text-center leading-relaxed">
          To cancel your subscription, visit{" "}
          <a href="https://whop.com" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-400 underline">
            whop.com
          </a>{" "}
          and manage your membership there.
        </p>
      </div>
    </div>
  );
}
