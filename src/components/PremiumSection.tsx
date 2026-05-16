import { useState } from "react";
import { WHOP_STANDARD_LINK, WHOP_PREMIUM_LINK, WHOP_UPGRADE_LINK, AuthUser } from "../hooks/useAuth";
import BackButton from "./BackButton";

interface Props {
  goBack: () => void;
  previousLabel: string;
  setActiveSection: (s: string) => void;
  onPremiumUnlock: () => void;
  user?: AuthUser | null;
  onLoginClick?: () => void;
}

export default function PremiumSection({ goBack, previousLabel, setActiveSection, user }: Props) {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [showTermsError, setShowTermsError] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<"standard" | "premium">("standard");

  const isStandard = user?.tier === "standard";
  const isPremium = user?.tier === "premium";

  const handleUnlock = () => {
    if (!termsAccepted || !privacyAccepted) {
      setShowTermsError(true);
      return;
    }
    let link = WHOP_STANDARD_LINK;
    if (selectedPlan === "premium") {
      link = isStandard ? WHOP_UPGRADE_LINK : WHOP_PREMIUM_LINK;
    }
    window.open(link, "_blank");
  };

  const comparisonRows = [
    { feature: "Full interview guidebook", free: false, standard: true, premium: true },
    { feature: "AI Mock Interview", free: "1 session", standard: "Unlimited", premium: "Unlimited" },
    { feature: "AI CV Review (text paste)", free: false, standard: true, premium: true },
    { feature: "CV File Upload (PDF/Word)", free: false, standard: true, premium: true },
    { feature: "Mock Exam with AI scoring", free: false, standard: true, premium: true },
    { feature: "AI Essay Assessment", free: false, standard: true, premium: true },
    { feature: "Aviation Math Practice", free: false, standard: true, premium: true },
    { feature: "AI Interview", free: false, standard: false, premium: true },
    { feature: "Ask Cabin Crew (former crew feedback)", free: false, standard: false, premium: true },
    { feature: "Group Discussion", free: false, standard: false, premium: true },
  ];

  const renderCell = (val: boolean | string) => {
    if (val === true) return <span className="text-green-400 font-bold">✓</span>;
    if (val === false) return <span className="text-slate-600">—</span>;
    return <span className="text-amber-400 text-xs font-medium">{val}</span>;
  };

  const premiumPrice = isStandard ? "$10.99" : "$25";
  const premiumLabel = isStandard ? "Upgrade to Premium — $10.99/month →" : "Subscribe to Premium — $25/month →";

  return (
    <div className="min-h-screen bg-slate-900 py-20 px-4 pt-24">
      <div className="max-w-5xl mx-auto">
        <BackButton onClick={goBack} label={`Back to ${previousLabel}`} />

        <div className="text-center mb-12">
          <div className="text-5xl mb-4">⭐</div>
          <h2 className="text-4xl font-bold text-white mb-4">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">Plan</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Cancel anytime. No long-term commitment. Start with what you need.
          </p>
          {isStandard && (
            <div className="mt-4 inline-block bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm px-4 py-2 rounded-xl">
              ✨ You're on Standard — upgrade to Premium for just <strong>$10.99/month</strong> (you save $14!)
            </div>
          )}
          {isPremium && (
            <div className="mt-4 inline-block bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm px-4 py-2 rounded-xl">
              ⭐ You're on Premium — you have full access!
            </div>
          )}
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Free */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <p className="text-slate-400 font-bold text-sm uppercase tracking-wider mb-3">Free</p>
            <div className="text-4xl font-bold text-white mb-1">$0</div>
            <p className="text-slate-500 text-sm mb-6">No account needed</p>
            <ul className="space-y-2 mb-6">
              <li className="text-slate-300 text-sm flex items-center gap-2"><span className="text-amber-400">✓</span> 1 AI Mock Interview session</li>
              
              <li className="text-slate-500 text-sm flex items-center gap-2"><span>—</span> No guide access</li>
              <li className="text-slate-500 text-sm flex items-center gap-2"><span>—</span> No forum</li>
            </ul>
            <div className="w-full bg-white/5 border border-white/10 text-slate-400 font-semibold py-3 rounded-xl text-center text-sm">
              {user?.tier === "free" || !user ? "Current plan" : "—"}
            </div>
          </div>

          {/* Standard */}
          <div
            onClick={() => !isStandard && !isPremium && setSelectedPlan("standard")}
            className={`border-2 rounded-2xl p-6 transition-all ${
              isStandard || isPremium
                ? "border-blue-500/40 bg-blue-500/5 cursor-default"
                : selectedPlan === "standard"
                ? "border-blue-500/60 bg-blue-500/10 cursor-pointer"
                : "border-white/10 bg-white/5 hover:border-blue-500/30 cursor-pointer"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-blue-400 font-bold text-sm uppercase tracking-wider">Standard</p>
              {isStandard && <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-0.5 rounded-full border border-blue-500/30">Your plan</span>}
              {!isStandard && !isPremium && selectedPlan === "standard" && <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-0.5 rounded-full border border-blue-500/30">Selected</span>}
            </div>
            <div className="text-4xl font-bold text-white mb-1">$15</div>
            <p className="text-slate-500 text-sm mb-6">per month · cancel anytime</p>
            <ul className="space-y-2 mb-6">
              <li className="text-slate-300 text-sm flex items-center gap-2"><span className="text-blue-400">✓</span> Full interview guidebook</li>
              <li className="text-slate-300 text-sm flex items-center gap-2"><span className="text-blue-400">✓</span> Unlimited AI Mock Interviews</li>
              <li className="text-slate-300 text-sm flex items-center gap-2"><span className="text-blue-400">✓</span> CV file upload + AI review</li>
              <li className="text-slate-300 text-sm flex items-center gap-2"><span className="text-blue-400">✓</span> Mock Exam, Essay, Math tools</li>
              <li className="text-slate-500 text-sm flex items-center gap-2"><span>—</span> No AI Interview or forum</li>
            </ul>
            {isStandard ? (
              <div className="w-full bg-blue-500/20 border border-blue-500/30 text-blue-400 font-semibold py-3 rounded-xl text-center text-sm">
                ✓ Current Plan
              </div>
            ) : isPremium ? (
              <div className="w-full bg-white/5 border border-white/10 text-slate-500 font-semibold py-3 rounded-xl text-center text-sm">
                Included in Premium
              </div>
            ) : (
              <button
                onClick={(e) => { e.stopPropagation(); setSelectedPlan("standard"); }}
                className={`w-full font-bold py-3 rounded-xl text-sm transition-all ${
                  selectedPlan === "standard"
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                    : "bg-white/5 border border-white/10 text-slate-300"
                }`}
              >
                {selectedPlan === "standard" ? "✓ Selected" : "Select Standard"}
              </button>
            )}
          </div>

          {/* Premium */}
          <div
            onClick={() => !isPremium && setSelectedPlan("premium")}
            className={`border-2 rounded-2xl p-6 transition-all relative overflow-hidden ${
              isPremium
                ? "border-amber-500/40 bg-amber-500/5 cursor-default"
                : selectedPlan === "premium"
                ? "border-amber-500/60 bg-amber-500/10 cursor-pointer"
                : "border-amber-500/30 bg-amber-500/5 hover:border-amber-500/50 cursor-pointer"
            }`}
          >
            <div className="absolute top-3 right-3 bg-amber-500 text-slate-900 text-xs font-bold px-2 py-0.5 rounded-full">BEST VALUE</div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-amber-400 font-bold text-sm uppercase tracking-wider">Premium</p>
              {isPremium && <span className="bg-amber-500/20 text-amber-400 text-xs px-2 py-0.5 rounded-full border border-amber-500/30">Your plan</span>}
              {!isPremium && selectedPlan === "premium" && <span className="bg-amber-500/20 text-amber-400 text-xs px-2 py-0.5 rounded-full border border-amber-500/30">Selected</span>}
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <div className="text-4xl font-bold text-white">{premiumPrice}</div>
              {isStandard && <div className="text-slate-500 text-sm line-through">$25</div>}
            </div>
            {isStandard && <p className="text-amber-400 text-xs mb-1">Special upgrade price for Standard members!</p>}
            <p className="text-slate-500 text-sm mb-6">per month · cancel anytime</p>
            <ul className="space-y-2 mb-6">
              <li className="text-slate-300 text-sm flex items-center gap-2"><span className="text-amber-400">✓</span> Everything in Standard</li>
              <li className="text-slate-300 text-sm flex items-center gap-2"><span className="text-amber-400">✓</span> AI Interview (unlimited)</li>
              <li className="text-slate-300 text-sm flex items-center gap-2"><span className="text-amber-400">✓</span> Ask Cabin Crew (former crew feedback)</li>
              <li className="text-slate-300 text-sm flex items-center gap-2"><span className="text-amber-400">✓</span> Group Discussion access</li>
            </ul>
            {isPremium ? (
              <div className="w-full bg-amber-500/20 border border-amber-500/30 text-amber-400 font-semibold py-3 rounded-xl text-center text-sm">
                ✓ Current Plan
              </div>
            ) : (
              <button
                onClick={(e) => { e.stopPropagation(); setSelectedPlan("premium"); }}
                className={`w-full font-bold py-3 rounded-xl text-sm transition-all ${
                  selectedPlan === "premium"
                    ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900"
                    : "bg-amber-500/20 border border-amber-500/30 text-amber-400"
                }`}
              >
                {selectedPlan === "premium" ? "✓ Selected" : isStandard ? `Upgrade for ${premiumPrice}/mo` : "Select Premium"}
              </button>
            )}
          </div>
        </div>

        {/* Terms + CTA */}
        {!isPremium && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-10">
            <p className="text-white font-bold text-base mb-4">
              {isStandard && selectedPlan === "premium"
                ? `Upgrade to Premium — $10.99/month (Standard members price):`
                : `Before subscribing to ${selectedPlan === "standard" ? "Standard ($15/month)" : "Premium ($25/month)"}:`}
            </p>
            <div className="space-y-3 mb-5">
              <div className="flex items-start gap-3 cursor-pointer group" onClick={() => { setTermsAccepted(!termsAccepted); setShowTermsError(false); }}>
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${termsAccepted ? "bg-amber-500 border-amber-500" : "border-white/30 group-hover:border-amber-500/50"}`}>
                  {termsAccepted && <span className="text-slate-900 text-xs font-bold">✓</span>}
                </div>
                <span className="text-slate-300 text-sm leading-relaxed">
                  I have read and agree to the{" "}
                  <button onClick={(e) => { e.stopPropagation(); setActiveSection("terms"); }} className="text-amber-400 hover:underline font-medium">Terms of Service</button>
                  , including the cancellation and refund policy.
                </span>
              </div>
              <div className="flex items-start gap-3 cursor-pointer group" onClick={() => { setPrivacyAccepted(!privacyAccepted); setShowTermsError(false); }}>
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${privacyAccepted ? "bg-amber-500 border-amber-500" : "border-white/30 group-hover:border-amber-500/50"}`}>
                  {privacyAccepted && <span className="text-slate-900 text-xs font-bold">✓</span>}
                </div>
                <span className="text-slate-300 text-sm leading-relaxed">
                  I have read and agree to the{" "}
                  <button onClick={(e) => { e.stopPropagation(); setActiveSection("privacy"); }} className="text-amber-400 hover:underline font-medium">Privacy Policy</button>.
                </span>
              </div>
              {showTermsError && <p className="text-red-400 text-sm">⚠️ Please accept both the Terms of Service and Privacy Policy to continue.</p>}
            </div>
            <button
              onClick={handleUnlock}
              className={`w-full font-bold py-4 rounded-xl text-lg transition-all ${
                termsAccepted && privacyAccepted
                  ? selectedPlan === "standard"
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 text-white shadow-lg hover:scale-[1.01]"
                    : "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-900 shadow-lg shadow-amber-500/20 hover:scale-[1.01]"
                  : "bg-slate-700 text-slate-400"
              }`}
            >
              {termsAccepted && privacyAccepted
                ? selectedPlan === "standard"
                  ? "Subscribe to Standard — $15/month →"
                  : premiumLabel
                : "Accept Terms Above to Continue"}
            </button>
            <p className="text-slate-500 text-xs text-center mt-3">Secure payment via Whop · Cancel anytime · Billed monthly</p>
          </div>
        )}

        {/* Comparison table */}
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden mb-10">
          <div className="p-5 border-b border-white/10">
            <h3 className="text-white font-bold text-lg">Full Feature Comparison</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-slate-400 text-xs font-bold uppercase tracking-wider p-4">Feature</th>
                  <th className="text-center text-slate-400 text-xs font-bold uppercase tracking-wider p-4">Free</th>
                  <th className="text-center text-blue-400 text-xs font-bold uppercase tracking-wider p-4">Standard<br/><span className="text-slate-500 font-normal normal-case">$15/mo</span></th>
                  <th className="text-center text-amber-400 text-xs font-bold uppercase tracking-wider p-4">Premium<br/><span className="text-slate-500 font-normal normal-case">$25/mo</span></th>
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

        {/* Social proof */}
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { quote: "Got my Emirates offer after 2 weeks of using this guidebook.", name: "Sarah M., Dubai" },
            { quote: "The AI mock interview was scary-realistic. Prepared me perfectly.", name: "Aisha K., London" },
            { quote: "Worth every dirham. The forum alone is gold.", name: "Priya R., Mumbai" },
          ].map((t, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <div className="text-amber-400 text-lg mb-3">★★★★★</div>
              <p className="text-slate-300 text-sm italic leading-relaxed mb-3">"{t.quote}"</p>
              <p className="text-slate-500 text-xs">— {t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
