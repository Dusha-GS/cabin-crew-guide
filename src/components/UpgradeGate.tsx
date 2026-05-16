import { WHOP_STANDARD_LINK, WHOP_PREMIUM_LINK, WHOP_UPGRADE_LINK, AuthUser } from "../hooks/useAuth";

interface Props {
  requiredTier: "standard" | "premium";
  featureName: string;
  featureDescription: string;
  onNavigatePremium: () => void;
  user?: AuthUser | null;
}

export default function UpgradeGate({ requiredTier, featureName, featureDescription, onNavigatePremium, user }: Props) {
  const isStandard = user?.tier === "standard";
  const premiumLink = isStandard ? WHOP_UPGRADE_LINK : WHOP_PREMIUM_LINK;
  const premiumPrice = isStandard ? "$10.99" : "$25";
  const premiumButtonLabel = isStandard ? "Upgrade to Premium — $10.99/month →" : "Get Premium — $25/month →";

  const standardFeatures = ["Full interview guidebook", "Full Mock Exam", "CV Guide", "Interview Questions & Answers"];
  const premiumFeatures = ["Everything in Standard", "AI Interview (unlimited)", "Ask Cabin Crew (former crew feedback)", "Group Discussion access"];

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div className="text-5xl mb-4">🔒</div>
        <h3 className="text-2xl font-bold text-white mb-3">{featureName}</h3>
        <p className="text-slate-400 mb-8 leading-relaxed">{featureDescription}</p>

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
              <a href={WHOP_STANDARD_LINK} target="_blank" rel="noopener noreferrer" className="block w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 text-white font-bold py-3 rounded-xl transition-all hover:scale-[1.01]">
                Get Standard — $15/month →
              </a>
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
            <a href={premiumLink} target="_blank" rel="noopener noreferrer" className="block w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-900 font-bold py-3 rounded-xl transition-all hover:scale-[1.01]">
              {premiumButtonLabel}
            </a>
          </div>
        </div>

        <button onClick={onNavigatePremium} className="mt-4 text-slate-500 hover:text-slate-300 text-sm transition-colors">
          View full comparison →
        </button>
      </div>
    </div>
  );
}
