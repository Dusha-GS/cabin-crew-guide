import { useState, useEffect } from "react";
import { setAnalyticsConsent } from "../lib/analytics";

interface Props {
  onNavigate: (section: string) => void;
}

export default function CookieConsent({ onNavigate }: Props) {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [analytics, setAnalytics] = useState(true);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setTimeout(() => setVisible(true), 1500);
    }
  }, []);

  // Save the choice AND honour it immediately — analytics only ever loads
  // after an explicit "yes".
  const save = (analyticsGranted: boolean) => {
    localStorage.setItem(
      "cookie-consent",
      JSON.stringify({ essential: true, analytics: analyticsGranted, timestamp: Date.now() })
    );
    setAnalyticsConsent(analyticsGranted);
    setVisible(false);
  };

  const acceptAll = () => save(true);
  const acceptSelected = () => save(analytics);
  const rejectAll = () => save(false);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="max-w-4xl mx-auto bg-slate-800 border border-amber-500/30 rounded-2xl shadow-2xl shadow-black/50 p-6">
        {!showDetails ? (
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">🍪</span>
                <h3 className="text-white font-bold text-base">We use cookies</h3>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                We use essential cookies to make our platform work, and optional analytics cookies to help us improve it. 
                View our{" "}
                <button onClick={() => onNavigate("privacy")} className="text-amber-400 hover:underline">Privacy Policy</button>
                {" "}and{" "}
                <button onClick={() => onNavigate("terms")} className="text-amber-400 hover:underline">Terms of Service</button>.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 flex-shrink-0">
              <button
                onClick={() => setShowDetails(true)}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 transition-all"
              >
                Manage
              </button>
              <button
                onClick={rejectAll}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 transition-all"
              >
                Reject all
              </button>
              <button
                onClick={acceptAll}
                className="px-4 py-2 rounded-lg text-sm font-bold bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 hover:from-amber-400 transition-all"
              >
                Accept all
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Cookie Preferences</h3>
            <div className="space-y-4 mb-6">
              <div className="flex items-start justify-between gap-4 bg-white/5 rounded-xl p-4">
                <div>
                  <p className="text-white font-semibold text-sm">Essential Cookies</p>
                  <p className="text-slate-400 text-xs mt-1">Required for the platform to function. Cannot be disabled.</p>
                </div>
                <div className="w-10 h-6 bg-amber-500 rounded-full flex items-center justify-end pr-0.5 flex-shrink-0">
                  <div className="w-5 h-5 bg-white rounded-full" />
                </div>
              </div>
              <div className="flex items-start justify-between gap-4 bg-white/5 rounded-xl p-4">
                <div>
                  <p className="text-white font-semibold text-sm">Analytics Cookies</p>
                  <p className="text-slate-400 text-xs mt-1">Help us understand how users interact with the platform so we can improve it.</p>
                </div>
                <button
                  onClick={() => setAnalytics(!analytics)}
                  className={`w-10 h-6 rounded-full flex items-center transition-all flex-shrink-0 ${analytics ? "bg-amber-500 justify-end pr-0.5" : "bg-slate-600 justify-start pl-0.5"}`}
                >
                  <div className="w-5 h-5 bg-white rounded-full" />
                </button>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowDetails(false)} className="px-4 py-2 rounded-lg text-sm bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 transition-all">
                Back
              </button>
              <button onClick={acceptSelected} className="flex-1 px-4 py-2 rounded-lg text-sm font-bold bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 hover:from-amber-400 transition-all">
                Save preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
