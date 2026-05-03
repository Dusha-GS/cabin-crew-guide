import { useState, useRef } from "react";
import { type MembershipTier } from "./hooks/useMembership";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import AirlinesSection from "./components/AirlinesSection";
import RequirementsSection from "./components/RequirementsSection";
import DressCodeSection from "./components/DressCodeSection";
import CVGuideSection from "./components/CVGuideSection";
import InterviewQASection from "./components/InterviewQASection";
import GroupDiscussionSection from "./components/GroupDiscussionSection";
import MockExamSection from "./components/MockExamSection";
import CodeOfConductSection from "./components/CodeOfConductSection";
import PremiumSection from "./components/PremiumSection";
import AIMockInterviewSection from "./components/AIMockInterviewSection";
import AICVReviewSection from "./components/AICVReviewSection";
import AskCabinCrewSection from "./components/AskCabinCrewSection";
import TermsOfServiceSection from "./components/TermsOfServiceSection";
import PrivacyPolicySection from "./components/PrivacyPolicySection";
import CookieConsent from "./components/CookieConsent";
import UpgradeGate from "./components/UpgradeGate";

const sectionLabels: Record<string, string> = {
  home: "Home",
  airlines: "Airlines",
  requirements: "Requirements",
  "dress-code": "Dress Code",
  "cv-guide": "CV Guide",
  questions: "Interview Q&A",
  "group-discussion": "Group Discussion",
  "mock-exam": "Mock Exam",
  conduct: "Code of Conduct",
  premium: "Premium",
  "ai-mock-interview": "AI Mock Interview",
  "ai-cv-review": "AI CV Review",
  "ask-cabin-crew": "Ask Cabin Crew",
  terms: "Terms of Service",
  privacy: "Privacy Policy",
};

// Sections that require Standard membership
const STANDARD_SECTIONS = ["airlines", "requirements", "dress-code", "cv-guide", "questions", "group-discussion", "mock-exam", "conduct"];
// Sections that require Premium membership
const PREMIUM_SECTIONS = ["ask-cabin-crew"];

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const historyRef = useRef<string[]>(["home"]);
  const [tier, setTier] = useState<MembershipTier>("free");

  const handleSetSection = (section: string) => {
    historyRef.current.push(section);
    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBack = () => {
    const history = historyRef.current;
    if (history.length > 1) {
      history.pop();
      const previous = history[history.length - 1];
      setActiveSection(previous);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      handleSetSection("home");
    }
  };

  const previousLabel = (() => {
    const h = historyRef.current;
    if (h.length > 1) {
      const prev = h[h.length - 2];
      return sectionLabels[prev] || "Back";
    }
    return "Home";
  })();

  const isStandardGated = STANDARD_SECTIONS.includes(activeSection) && tier === "free";
  const isPremiumGated = PREMIUM_SECTIONS.includes(activeSection) && tier !== "premium";

  const renderSection = () => {
    if (isStandardGated) {
      return (
        <div className="min-h-screen bg-slate-900 py-20 px-4 pt-24">
          <div className="max-w-3xl mx-auto">
            <UpgradeGate
              requiredTier="standard"
              featureName={sectionLabels[activeSection] || "This Section"}
              featureDescription="This content is available to Standard and Premium members. Upgrade to get full access to the complete guidebook."
              onNavigatePremium={() => handleSetSection("premium")}
            />
          </div>
        </div>
      );
    }

    if (isPremiumGated) {
      return (
        <div className="min-h-screen bg-slate-900 py-20 px-4 pt-24">
          <div className="max-w-3xl mx-auto">
            <UpgradeGate
              requiredTier="premium"
              featureName={sectionLabels[activeSection] || "This Section"}
              featureDescription="This feature is exclusively available to Premium members."
              onNavigatePremium={() => handleSetSection("premium")}
            />
          </div>
        </div>
      );
    }

    switch (activeSection) {
      case "home":
        return <HeroSection setActiveSection={handleSetSection} />;
      case "airlines":
        return <AirlinesSection goBack={goBack} previousLabel={previousLabel} />;
      case "requirements":
        return <RequirementsSection goBack={goBack} previousLabel={previousLabel} />;
      case "dress-code":
        return <DressCodeSection goBack={goBack} previousLabel={previousLabel} />;
      case "cv-guide":
        return <CVGuideSection goBack={goBack} previousLabel={previousLabel} />;
      case "questions":
        return <InterviewQASection goBack={goBack} previousLabel={previousLabel} />;
      case "group-discussion":
        return <GroupDiscussionSection goBack={goBack} previousLabel={previousLabel} />;
      case "mock-exam":
        return <MockExamSection goBack={goBack} previousLabel={previousLabel} />;
      case "conduct":
        return <CodeOfConductSection goBack={goBack} previousLabel={previousLabel} />;
      case "premium":
        return <PremiumSection goBack={goBack} previousLabel={previousLabel} setActiveSection={handleSetSection} onPremiumUnlock={() => setTier("premium")} />;
      case "ai-mock-interview":
        return <AIMockInterviewSection goBack={goBack} previousLabel={previousLabel} tier={tier} onNavigatePremium={() => handleSetSection("premium")} />;
      case "ai-cv-review":
        return <AICVReviewSection goBack={goBack} previousLabel={previousLabel} tier={tier} onNavigatePremium={() => handleSetSection("premium")} />;
      case "ask-cabin-crew":
        return <AskCabinCrewSection goBack={goBack} previousLabel={previousLabel} isPremium={tier === "premium"} onUpgrade={() => handleSetSection("premium")} />;
      case "terms":
        return <TermsOfServiceSection goBack={goBack} previousLabel={previousLabel} />;
      case "privacy":
        return <PrivacyPolicySection goBack={goBack} previousLabel={previousLabel} />;
      default:
        return <HeroSection setActiveSection={handleSetSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 font-sans">
      <Header activeSection={activeSection} setActiveSection={handleSetSection} />
      <main>{renderSection()}</main>

      <footer className="bg-slate-950 border-t border-white/5 py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-slate-900 font-bold">✈</div>
                <div>
                  <p className="text-white font-bold text-sm">Cabin Crew Guidebook</p>
                  <p className="text-amber-400 text-xs">Middle Eastern Airlines Edition</p>
                </div>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">Your comprehensive preparation guide for cabin crew interviews at Emirates, Etihad Airways, Qatar Airways, and more.</p>
            </div>
            <div>
              <p className="text-white font-bold text-sm mb-3">Quick Navigation</p>
              <div className="grid grid-cols-2 gap-1">
                {[
                  { id: "ai-mock-interview", label: "AI Interview" },
                  { id: "ai-cv-review", label: "AI CV Review" },
                  { id: "questions", label: "Interview Q&A" },
                  { id: "mock-exam", label: "Mock Exam" },
                  { id: "ask-cabin-crew", label: "Ask Cabin Crew" },
                  { id: "premium", label: "Pricing" },
                  { id: "terms", label: "Terms" },
                  { id: "privacy", label: "Privacy" },
                ].map((item) => (
                  <button key={item.id} onClick={() => handleSetSection(item.id)} className="text-slate-400 hover:text-amber-400 text-sm text-left transition-colors">
                    › {item.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-white font-bold text-sm mb-3">Airlines Covered</p>
              <div className="space-y-1 mb-4">
                {["Emirates (Dubai)", "Etihad Airways (Abu Dhabi)", "Qatar Airways (Doha)", "flydubai (Dubai)", "Air Arabia (Sharjah)"].map((a) => (
                  <p key={a} className="text-slate-400 text-sm flex items-center gap-1.5">
                    <span className="text-amber-400 text-xs">✈</span> {a}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-6">
            <div className="flex flex-wrap justify-center gap-6 mb-4">
              <button onClick={() => handleSetSection("terms")} className="text-slate-400 hover:text-amber-400 text-sm transition-colors">Terms of Service</button>
              <button onClick={() => handleSetSection("privacy")} className="text-slate-400 hover:text-amber-400 text-sm transition-colors">Privacy Policy</button>
              <button onClick={() => { localStorage.removeItem("cookie-consent"); window.location.reload(); }} className="text-slate-400 hover:text-amber-400 text-sm transition-colors">Cookie Preferences</button>
              <button onClick={() => handleSetSection("premium")} className="text-slate-400 hover:text-amber-400 text-sm transition-colors">Pricing Plans</button>
            </div>
            <div className="text-center">
              <p className="text-slate-500 text-sm">© 2024-2025 Cabin Crew Interview Guidebook — Middle Eastern Airlines Edition</p>
              <p className="text-slate-600 text-xs mt-1">For educational purposes only. Not affiliated with any airline. Always verify requirements directly with the airline.</p>
            </div>
          </div>
        </div>
      </footer>

      <CookieConsent onNavigate={handleSetSection} />
    </div>
  );
}