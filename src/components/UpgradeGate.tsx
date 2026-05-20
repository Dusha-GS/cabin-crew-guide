import { useState } from "react";
import { WHOP_STANDARD_LINK, WHOP_PREMIUM_LINK, WHOP_UPGRADE_LINK, AuthUser } from "../hooks/useAuth";

interface Props {
  requiredTier: "standard" | "premium";
  featureName: string;
  featureDescription: string;
  onNavigatePremium: () => void;
  user?: AuthUser | null;
}

export default function UpgradeGate({ requiredTier, featureName, featureDescription, onNavigatePremium, user }: Props) {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [showError, setShowError] = useState(false);

  const isStandard = user?.tier === "standard";

  const getWhopLink = (baseLink: string) => {
    if (user?.email) return `${baseLink}?email=${encodeURIComponent(user.email)}`;
    return baseLink;
  };

  const premiumLink = getWhopLink(isStandard ? WHOP_UPGRADE_LINK : WHOP_PREMIUM_LINK);
  const standardLink = getWhopLink(WHOP_STANDARD_LINK);
  const premiumPrice = isStandard ? "$10.99" : "$25";
  const premiumButtonLabel = isStandard ? "Upgrade to Premium — $10.99/mo →" : "Get Premium — $25/mo →";

  const standardFeatures = ["Full interview guidebook", "Full Mock Exam", "CV Guide", "Interview Questions & Answers"];
  const premiumFeatures = ["Everything in Standard", "AI Interview (unlimited)", "Ask Cabin Crew (former crew feedback)", "Group Discussion access"];

  const handlePay = (link: string) => {
    if (!termsAccepted || !privacyAccepted) {
      setShowError(true);
      return;
    }
    window.open(link, "_blank");
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div className="text-5xl mb-4">🔒</div>
        <h3 className="text-2xl font-bold text-white mb-3">{featureName}</h3>
        <p className="text-slate-400 mb-6 leading-relaxed">{featureDescription}</p>

        {/* PAYMENT DISCLAIMER */}
        <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 mb-4 text-left">
          <p className="text-red-400 text-xs font-bold uppercase tracking-wider mb-2">⚠️ PAYMENT NOTICE — PLEASE READ</p>
          <p className="text-slate-300 text-xs leading-relaxed mb-2">
            All payments are processed securely via Whop. If you already have a Whop account, make sure you are logged in with the same email address you used to register on this site
            {user?.email && <span className="text-amber-400 font-bold"> ({user.email})</span>}.
            {" "}If your Whop account uses a different email, <span className="text-white font-semibold">please log out of Whop before proceeding to payment</span> — otherwise your access will not be activated automatically.
          </p>
          <p className="text-slate-300 text-xs leading-relaxed">
            After payment, Whop will send a confirmation email to your address. <span className="text-white font-semibold">Keep this email</span> — it contains your subscription management link to pause or cancel your subscription anytime. No separate Whop account registration is required.
          </p>
        </div>

        {/* Terms checkboxes */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-6 text-left space-y-3">
          <div className="flex items-start gap-3 cursor-pointer group" onClick={() => { setTermsAccepted(!termsAccepted); setShowError(false); }}>
            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${termsAccepted ? "bg-amber-500 border-amber-500" : "border-white/30 group-hover:border-amber-500/50"}`}>
              {termsAccepted && <span className="text-slate-900 text-xs font-bold">✓</span>}
            </div>
            <span className="text-slate-300 text-sm leading-relaxed">
              I agree to the <button onClick={(e) => { e.stopPropagation(); onNavigatePremium(); }} className="text-amber-400 hover:underline font-medium">Terms of Service</button> and cancellation policy.
            </span>
          </div>
          <div className="flex items-start gap-3 cursor-pointer group" onClick={() => { setPrivacyAccepted(!privacyAccepted); setShowError(false); }}>
            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${privacyAccepted ? "bg-amber-500 border-amber-500" : "border-white/30 group-hover:border-amber-500/50"}`}>
              {privacyAccepted && <span className="text-slate-900 text-xs font-bold">✓</span>}
            </div>
            <span className="text-slate-300 text-sm leading-relaxed">
              I agree to the <span className="text-amber-400 font-medium">Privacy Policy</span>.
            </span>
          </div>
          {showError && <p className="text-red-400 text-xs">⚠️ Please accept both to continue.</p>}
        </div>

        <div className="space-y-4">
          {requiredTier === "standard" && !isStandard && (
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="text-left">
                  <p className="text-white font-bold text-lg">Standard</p>
                  <p className="text-slate-400 text-sm">Full guide + exam tools</p>
                </div>
                <div className="text-right">
                  <p className="text-blue-400 font-bold text-2xl">$15</p>
                  <p className="text-slate-500 text-xs">per month</p>
                </div>
              </div>
              <ul className="text-left space-y-1.5 mb-4">
                {standardFeatures.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                    <span className="text-blue-400">✓</span> {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handlePay(standardLink)}
                className="block w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 text-white font-bold py-3 rounded-xl transition-all hover:scale-[1.01]"
              >
                Get Standard — $15/mo →
              </button>
            </div>
          )}

          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="text-left">
                <p className="text-white font-bold text-lg">Premium</p>
                <p className="text-slate-400 text-sm">Everything + AI Interview & Forum</p>
              </div>
              <div className="text-right">
                <p className="text-amber-400 font-bold text-2xl">{premiumPrice}</p>
                {isStandard && <p className="text-slate-500 text-xs line-through">$25</p>}
                <p className="text-slate-500 text-xs">per month</p>
              </div>
            </div>
            {isStandard && (
              <p className="text-amber-400 text-xs mb-3 text-left">✨ Special upgrade price for Standard members!</p>
            )}
            <ul className="text-left space-y-1.5 mb-4">
              {premiumFeatures.map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                  <span className="text-amber-400">✓</span> {f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handlePay(premiumLink)}
              className="block w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-900 font-bold py-3 rounded-xl transition-all hover:scale-[1.01]"
            >
              {premiumButtonLabel}
            </button>
          </div>
        </div>

        <button onClick={onNavigatePremium} className="mt-4 text-slate-500 hover:text-slate-300 text-sm transition-colors">
          View full comparison →
        </button>
      </div>
    </div>
  );
}
