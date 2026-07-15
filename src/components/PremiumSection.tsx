import { useState, useRef } from "react";
import { STRIPE_STANDARD_LINK, STRIPE_PREMIUM_LINK, AuthUser } from "../hooks/useAuth";
import { track } from "../lib/analytics";
import BackButton from "./BackButton";

interface Props {
  goBack: () => void;
  previousLabel: string;
  setActiveSection: (s: string) => void;
  onPremiumUnlock: () => void;
  user?: AuthUser | null;
  onLoginClick?: () => void;
}

export default function PremiumSection({ goBack, previousLabel, setActiveSection, user, onLoginClick }: Props) {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [showTermsError, setShowTermsError] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<"standard" | "premium">("standard");
  const termsRef = useRef<HTMLDivElement>(null);

  const isStandard = user?.tier === "standard";
  const isPremium  = user?.tier === "premium";
  const isLoggedIn = !!user;

  const getStripeLink = (baseLink: string) => {
    if (user?.email) {
      return `${baseLink}?prefilled_email=${encodeURIComponent(user.email)}`;
    }
    return baseLink;
  };

  const handleUnlock = () => {
    if (!isLoggedIn) { onLoginClick?.(); return; }
    if (!termsAccepted || !privacyAccepted) {
      setShowTermsError(true);
      termsRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    const link = selectedPlan === "premium"
      ? getStripeLink(STRIPE_PREMIUM_LINK)
      : getStripeLink(STRIPE_STANDARD_LINK);
    track("checkout_started", { plan: selectedPlan });
    window.open(link, "_blank");
  };

  const handleSelectPlan = (plan: "standard" | "premium") => {
    if (!isLoggedIn) { onLoginClick?.(); return; }
    setSelectedPlan(plan);
    termsRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const comparisonRows = [
    { feature: "Airline Requirements",         free: true,  standard: true,  premium: true  },
    { feature: "1 Mock Interview session",      free: true,  standard: false, premium: false },
    { feature: "Full Mock Exam",                free: false, standard: true,  premium: true  },
    { feature: "Full interview guidebook",      free: false, standard: true,  premium: true  },
    { feature: "CV Guide",                      free: false, standard: true,  premium: true  },
    { feature: "Interview Questions & Answers", free: false, standard: true,  premium: true  },
    { feature: "Mock Interview (unlimited)",    free: false, standard: false, premium: true  },
    { feature: "Ask Cabin Crew (former crew)",  free: false, standard: false, premium: true  },
    { feature: "Group Discussion",              free: false, standard: false, premium: true  },
  ];

  const renderCell = (val: boolean) => val
    ? <span className="text-green-400 font-bold">✓</span>
    : <span className="text-slate-400">—</span>;

  return (
    <div className="min-h-screen bg-slate-900 py-20 px-4 pt-24">
      <div className="max-w-5xl mx-auto">
        <BackButton onClick={goBack} label={`Back to ${previousLabel}`} />

        <div className="text-center mb-12">
          <div className="text-5xl mb-4">⭐</div>
          <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">Plan</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
            Cancel anytime. No long-term commitment. Start with what you need.
          </p>
          {isStandard && (
            <div className="mt-4 inline-block bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm px-4 py-2 rounded-xl">
              ✨ You're on Standard — upgrade to Premium for the full experience
            </div>
          )}
          {isPremium && (
            <div className="mt-4 inline-block bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm px-4 py-2 rounded-xl">
              ⭐ You're on Premium — you have full access!
            </div>
          )}
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-12">

          {/* Free */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6">
            <p className="text-slate-400 font-bold text-sm uppercase tracking-wider mb-3">Free</p>
            <div className="text-4xl font-bold text-white mb-1">$0</div>
            <p className="text-slate-400 text-sm mb-6">No account needed</p>
            <ul className="space-y-2 mb-6">
              <li className="text-slate-300 text-sm flex items-center gap-2"><span className="text-amber-400">✓</span> 1 Mock Interview session</li>
              <li className="text-slate-300 text-sm flex items-center gap-2"><span className="text-amber-400">✓</span> Airline Requirements</li>
              <li className="text-slate-400 text-sm flex items-center gap-2"><span>—</span> No guide access</li>
              <li className="text-slate-400 text-sm flex items-center gap-2"><span>—</span> No forum</li>
            </ul>
            {!isLoggedIn ? (
              <button onClick={onLoginClick} className="w-full bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 font-semibold py-3 rounded-xl text-sm transition-all">
                Create Free Account →
              </button>
            ) : (
              <div className="w-full bg-white/5 border border-white/10 text-slate-400 font-semibold py-3 rounded-xl text-center text-sm">
                {user?.tier === "free" ? "Current plan" : "—"}
              </div>
            )}
          </div>

          {/* Standard */}
          <div
            className={`border-2 rounded-2xl p-4 md:p-6 transition-all ${
              isStandard || isPremium
                ? "border-blue-500/40 bg-blue-500/5"
                : selectedPlan === "standard" && isLoggedIn
                ? "border-blue-500/60 bg-blue-500/10"
                : "border-white/10 bg-white/5 hover:border-blue-500/30"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-blue-400 font-bold text-sm uppercase tracking-wider">Standard</p>
              {isStandard && <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-0.5 rounded-full border border-blue-500/30">Your plan</span>}
              {!isStandard && !isPremium && selectedPlan === "standard" && isLoggedIn && <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-0.5 rounded-full border border-blue-500/30">Selected</span>}
            </div>
            <div className="text-4xl font-bold text-white mb-1">$15</div>
            <p className="text-slate-400 text-sm mb-6">per month · cancel anytime</p>
            <ul className="space-y-2 mb-6">
              <li className="text-slate-300 text-sm flex items-center gap-2"><span className="text-blue-400">✓</span> Full interview guidebook</li>
              <li className="text-slate-300 text-sm flex items-center gap-2"><span className="text-blue-400">✓</span> Full Mock Exam</li>
              <li className="text-slate-300 text-sm flex items-center gap-2"><span className="text-blue-400">✓</span> CV Guide</li>
              <li className="text-slate-300 text-sm flex items-center gap-2"><span className="text-blue-400">✓</span> Interview Questions & Answers</li>
              <li className="text-slate-400 text-sm flex items-center gap-2"><span>—</span> No Mock Interview or forum</li>
            </ul>
            {isStandard ? (
              <div className="w-full bg-blue-500/20 border border-blue-500/30 text-blue-400 font-semibold py-3 rounded-xl text-center text-sm">✓ Current Plan</div>
            ) : isPremium ? (
              <div className="w-full bg-white/5 border border-white/10 text-slate-400 font-semibold py-3 rounded-xl text-center text-sm">Included in Premium</div>
            ) : (
              <button
                onClick={(e) => { e.stopPropagation(); handleSelectPlan("standard"); }}
                className={`w-full font-bold py-3 rounded-xl text-sm transition-all ${
                  selectedPlan === "standard" && isLoggedIn
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                    : "bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10"
                }`}
              >
                {!isLoggedIn ? "Sign in to Subscribe →" : selectedPlan === "standard" ? "✓ Selected — accept terms below ↓" : "Select Standard"}
              </button>
            )}
          </div>

          {/* Premium */}
          <div
            className={`border-2 rounded-2xl p-4 md:p-6 transition-all relative overflow-hidden ${
              isPremium
                ? "border-amber-500/40 bg-amber-500/5"
                : selectedPlan === "premium" && isLoggedIn
                ? "border-amber-500/60 bg-amber-500/10"
                : "border-amber-500/30 bg-amber-500/5 hover:border-amber-500/50"
            }`}
          >
            <div className="absolute top-3 right-3 bg-amber-500 text-slate-900 text-xs font-bold px-2 py-0.5 rounded-full">BEST VALUE</div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-amber-400 font-bold text-sm uppercase tracking-wider">Premium</p>
              {isPremium && <span className="bg-amber-500/20 text-amber-400 text-xs px-2 py-0.5 rounded-full border border-amber-500/30">Your plan</span>}
              {!isPremium && selectedPlan === "premium" && isLoggedIn && <span className="bg-amber-500/20 text-amber-400 text-xs px-2 py-0.5 rounded-full border border-amber-500/30">Selected</span>}
            </div>
            <div className="text-4xl font-bold text-white mb-1">$25</div>
            <p className="text-slate-400 text-sm mb-6">per month · cancel anytime</p>
            <ul className="space-y-2 mb-6">
              <li className="text-slate-300 text-sm flex items-center gap-2"><span className="text-amber-400">✓</span> Everything in Standard</li>
              <li className="text-slate-300 text-sm flex items-center gap-2"><span className="text-amber-400">✓</span> Mock Interview (unlimited)</li>
              <li className="text-slate-300 text-sm flex items-center gap-2"><span className="text-amber-400">✓</span> Ask Cabin Crew (former crew feedback)</li>
              <li className="text-slate-300 text-sm flex items-center gap-2"><span className="text-amber-400">✓</span> Group Discussion access</li>
            </ul>
            {isPremium ? (
              <div className="w-full bg-amber-500/20 border border-amber-500/30 text-amber-400 font-semibold py-3 rounded-xl text-center text-sm">✓ Current Plan</div>
            ) : (
              <button
                onClick={(e) => { e.stopPropagation(); handleSelectPlan("premium"); }}
                className={`w-full font-bold py-3 rounded-xl text-sm transition-all ${
                  selectedPlan === "premium" && isLoggedIn
                    ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900"
                    : "bg-amber-500/20 border border-amber-500/30 text-amber-400 hover:bg-amber-500/30"
                }`}
              >
                {!isLoggedIn ? "Sign in to Subscribe →" : selectedPlan === "premium" ? "✓ Selected — accept terms below ↓" : "Select Premium"}
              </button>
            )}
          </div>
        </div>

        {/* Sign in prompt */}
        {!isLoggedIn && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-10 text-center">
            <div className="text-4xl mb-4">🔐</div>
            <h3 className="text-white font-bold text-xl mb-2">Sign in to subscribe</h3>
            <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">
              Create a free account or sign in first — this links your payment to your account so access is activated automatically after payment.
            </p>
            <button onClick={onLoginClick} className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-900 font-bold px-10 py-4 rounded-xl text-base transition-all hover:scale-[1.01] shadow-lg shadow-amber-500/20">
              Sign in / Create Free Account →
            </button>
          </div>
        )}

        {/* Terms + CTA */}
        {isLoggedIn && !isPremium && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6 mb-10">
            <p className="text-white font-bold text-base mb-4">
              Before subscribing to {selectedPlan === "standard" ? "Standard ($15/mo)" : "Premium ($25/mo)"}:
            </p>

            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-5">
              <p className="text-red-400 text-xs font-bold uppercase tracking-wider mb-2">⚠️ IMPORTANT — PLEASE READ</p>
              <p className="text-slate-300 text-xs leading-relaxed mb-2">
                Payments are processed securely by <strong className="text-white">Stripe</strong>. After payment you will be redirected back to this site — log in with your registered email to access your content.
              </p>
              <p className="text-slate-300 text-xs leading-relaxed">
                <strong className="text-white">Use the same email at checkout</strong> as your account email
                {user?.email && <span className="text-amber-400 font-bold"> ({user.email})</span>}.
                {" "}If you use a different email, your access will not activate automatically. Contact{" "}
                <span className="text-amber-400">support@cabincrewguidebook.com</span> if you have any issues.
              </p>
            </div>

            <div className="space-y-3 mb-5" ref={termsRef}>
              <div className="flex items-start gap-3 group">
                <input id="prem-terms" type="checkbox" checked={termsAccepted} onChange={(e) => { setTermsAccepted(e.target.checked); setShowTermsError(false); }} className="peer sr-only" />
                <label htmlFor="prem-terms" aria-label="I have read and agree to the Terms of Service, including the cancellation and refund policy" className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 cursor-pointer transition-all peer-focus-visible:ring-2 peer-focus-visible:ring-amber-400 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-slate-900 ${termsAccepted ? "bg-amber-500 border-amber-500" : "border-white/30 group-hover:border-amber-500/50"}`}>
                  {termsAccepted && <span className="text-slate-900 text-xs font-bold" aria-hidden="true">✓</span>}
                </label>
                <span className="text-slate-300 text-sm leading-relaxed">
                  <label htmlFor="prem-terms" className="cursor-pointer">I have read and agree to the </label>
                  <button type="button" onClick={() => setActiveSection("terms")} className="text-amber-400 hover:underline font-medium">Terms of Service</button>
                  , including the cancellation and refund policy.
                </span>
              </div>
              <div className="flex items-start gap-3 group">
                <input id="prem-privacy" type="checkbox" checked={privacyAccepted} onChange={(e) => { setPrivacyAccepted(e.target.checked); setShowTermsError(false); }} className="peer sr-only" />
                <label htmlFor="prem-privacy" aria-label="I have read and agree to the Privacy Policy" className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 cursor-pointer transition-all peer-focus-visible:ring-2 peer-focus-visible:ring-amber-400 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-slate-900 ${privacyAccepted ? "bg-amber-500 border-amber-500" : "border-white/30 group-hover:border-amber-500/50"}`}>
                  {privacyAccepted && <span className="text-slate-900 text-xs font-bold" aria-hidden="true">✓</span>}
                </label>
                <span className="text-slate-300 text-sm leading-relaxed">
                  <label htmlFor="prem-privacy" className="cursor-pointer">I have read and agree to the </label>
                  <button type="button" onClick={() => setActiveSection("privacy")} className="text-amber-400 hover:underline font-medium">Privacy Policy</button>.
                </span>
              </div>
              {showTermsError && <p className="text-red-400 text-sm">⚠️ Please accept both the Terms of Service and Privacy Policy to continue.</p>}
            </div>

            {user?.email && (
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-4">
                <p className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">Your account email — use this at checkout</p>
                <div className="bg-slate-900 rounded-lg px-4 py-2 text-center">
                  <span className="text-amber-400 font-bold text-sm">{user.email}</span>
                </div>
              </div>
            )}

            <button
              onClick={handleUnlock}
              className={`w-full font-bold py-4 rounded-xl text-base transition-all ${
                termsAccepted && privacyAccepted
                  ? selectedPlan === "standard"
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 text-white shadow-lg hover:scale-[1.01]"
                    : "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-900 shadow-lg shadow-amber-500/20 hover:scale-[1.01]"
                  : "bg-slate-700 text-slate-400"
              }`}
            >
              {termsAccepted && privacyAccepted
                ? selectedPlan === "standard" ? "Subscribe to Standard — $15/mo →" : "Subscribe to Premium — $25/mo →"
                : "Accept Terms Above to Continue"}
            </button>
            <p className="text-slate-400 text-xs text-center mt-3">Secure payment via Stripe · Cancel anytime · Billed monthly</p>
          </div>
        )}

        {/* Comparison table */}
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden mb-10">
          <div className="p-5 border-b border-white/10">
            <h3 className="text-white font-bold text-lg">Full Feature Comparison</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px]">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-slate-400 text-xs font-bold uppercase tracking-wider p-4">Feature</th>
                  <th className="text-center text-slate-400 text-xs font-bold uppercase tracking-wider p-4">Free</th>
                  <th className="text-center text-blue-400 text-xs font-bold uppercase tracking-wider p-4">Standard<br/><span className="text-slate-400 font-normal normal-case">$15/mo</span></th>
                  <th className="text-center text-amber-400 text-xs font-bold uppercase tracking-wider p-4">Premium<br/><span className="text-slate-400 font-normal normal-case">$25/mo</span></th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={row.feature} className={`border-b border-white/5 ${i % 2 === 0 ? "bg-white/2" : ""}`}>
                    <td className="p-4 text-slate-300 text-sm">{row.feature}</td>
                    <td className="p-4 text-center">{renderCell(row.free)}</td>
                    <td className="p-4 text-center">{renderCell(row.standard)}</td>
                    <td className="p-4 text-center">{renderCell(row.premium)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
