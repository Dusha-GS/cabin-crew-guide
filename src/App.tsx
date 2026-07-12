import { useState, useRef, useEffect } from "react";
import { AuthUser, getStoredUser, signOutUser, getUserFromActiveSession, sendAccountEmail } from "./hooks/useAuth";
import { supabase } from "./supabaseClient";
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
import OpenDaysSection from "./components/OpenDaysSection";
import TermsOfServiceSection from "./components/TermsOfServiceSection";
import PrivacyPolicySection from "./components/PrivacyPolicySection";
import CookieConsent from "./components/CookieConsent";
import UpgradeGate from "./components/UpgradeGate";
import AuthModal from "./components/AuthModal";
import ResetPasswordSection from "./components/ResetPasswordSection";
import AccountSection from "./components/AccountSection";
import RejectionDecodedSection from "./components/RejectionDecodedSection";
import AfterTheInterviewSection from "./components/AfterTheInterviewSection";

const sectionLabels: Record<string, string> = {
  home: "Home", airlines: "Airlines", requirements: "Requirements",
  "dress-code": "Dress Code", "cv-guide": "CV Guide", questions: "Interview Q&A",
  "group-discussion": "Group Discussion", "mock-exam": "Mock Exam",
  conduct: "Code of Conduct", premium: "Premium",
  "mock-interview": "Mock Interview", "cv-review": "CV Review",
  "ask-cabin-crew": "Ask Cabin Crew", "open-days": "Open Days",
  terms: "Terms of Service", privacy: "Privacy Policy",
  account: "My Account",
};

// Prepare section is free for all users (no account needed)
// Interview Q&A requires Standard or above
const STANDARD_SECTIONS = ["questions"];
const PREMIUM_SECTIONS = ["ask-cabin-crew", "group-discussion", "mock-interview"];

// All sections that require at least a free account to access
// cv-review included: free users get 1 trial review, but must be logged in first
const LOGIN_REQUIRED_SECTIONS = [...STANDARD_SECTIONS, ...PREMIUM_SECTIONS, "cv-review"];

export default function App() {
  const [activeSection, setActiveSection] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    return hash || "home";
  });
  const historyRef = useRef<string[]>(["home"]);
  const [user, setUser] = useState<AuthUser | null>(() => getStoredUser());
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [authNotice, setAuthNotice] = useState<string | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        sessionStorage.setItem("ccg_recovery", "1");
        setShowResetPassword(true);
      }
      if (event === "SIGNED_IN") {
        // Covers Google sign-in: builds the AuthUser once Supabase confirms the session.
        // Also fires the welcome email once per user (idempotent server-side).
        getUserFromActiveSession().then((u) => { if (u) { setUser(u); sendAccountEmail("welcome"); } });
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  // Catches the case where the Google redirect already completed and the
  // session exists before this component's listener attached (e.g. after
  // a full page reload back from Google).
  useEffect(() => {
    if (!user) {
      getUserFromActiveSession().then((u) => { if (u) setUser(u); });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Surface auth-callback errors (expired/used confirmation or reset links) and
  // keep the password-reset screen visible even if the page is reloaded.
  useEffect(() => {
    const raw = window.location.hash.replace(/^#/, "") || window.location.search.replace(/^\?/, "");
    const params = new URLSearchParams(raw);
    const errCode = params.get("error_code") || params.get("error");
    if (errCode) {
      const expired = /expired/i.test(errCode);
      setAuthNotice(
        expired
          ? "That link has expired or was already used. Please request a new one."
          : "We couldn't complete that request. Please try again or request a new link."
      );
      window.history.replaceState(null, "", window.location.pathname);
    }
    if (sessionStorage.getItem("ccg_recovery") === "1") {
      setShowResetPassword(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync browser back/forward buttons with app state
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.replace("#", "");
      setActiveSection(hash || "home");
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleSetSection = (section: string) => {
    historyRef.current.push(section);
    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (section === "home") {
      window.history.pushState(null, "", window.location.pathname);
    } else {
      window.history.pushState(null, "", "#" + section);
    }
  };

  const goBack = () => {
    const history = historyRef.current;
    if (history.length > 1) {
      history.pop();
      const prev = history[history.length - 1];
      setActiveSection(prev);
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (prev === "home") {
        window.history.pushState(null, "", window.location.pathname);
      } else {
        window.history.pushState(null, "", "#" + prev);
      }
    } else {
      handleSetSection("home");
    }
  };

  const previousLabel = (() => {
    const h = historyRef.current;
    return h.length > 1 ? sectionLabels[h[h.length - 2]] || "Back" : "Home";
  })();

  const handleLoginSuccess = (loggedInUser: AuthUser) => setUser(loggedInUser);
  const handleLogout = async () => { await signOutUser(); setUser(null); handleSetSection("home"); };
  const openLogin = () => setShowAuthModal(true);

  // If not logged in, show login modal first — never send anonymous users straight to payment
  const navigateToPremium = () => user ? handleSetSection("premium") : openLogin();

  const tier = user?.tier ?? "free";
  const needsLogin = !user && LOGIN_REQUIRED_SECTIONS.includes(activeSection);
  const isStandardGated = !!user && STANDARD_SECTIONS.includes(activeSection) && tier === "free";
  const isPremiumGated = !!user && PREMIUM_SECTIONS.includes(activeSection) && tier !== "premium";

  if (showResetPassword) {
    return (
      <ResetPasswordSection onDone={() => { sessionStorage.removeItem("ccg_recovery"); setShowResetPassword(false); handleSetSection("home"); }} />
    );
  }

  const renderSection = () => {
    // Not logged in — prompt to sign in before any gated content
    if (needsLogin) return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 pt-16">
        <div className="max-w-md w-full text-center">
          <div className="text-6xl mb-5">🔐</div>
          <h2 className="text-2xl font-bold text-white mb-3">Sign in to continue</h2>
          <p className="text-slate-400 mb-2 leading-relaxed">
            Create a free account or sign in to access{" "}
            <span className="text-white font-medium">{sectionLabels[activeSection] || "this section"}</span>.
          </p>
          <p className="text-slate-500 text-sm mb-8">Free accounts unlock Interview Q&amp;A, Mock Exam preview, and more.</p>
          <button
            onClick={openLogin}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-900 font-bold py-4 rounded-xl text-lg transition-all hover:scale-[1.01] shadow-lg shadow-amber-500/20 mb-4"
          >
            Sign in / Create Free Account →
          </button>
          <button
            onClick={() => handleSetSection("home")}
            className="text-slate-400 hover:text-white text-sm transition-colors"
          >
            ← Back to home
          </button>
        </div>
      </div>
    );

    if (isStandardGated) return (
      <div className="min-h-screen bg-slate-900 py-20 px-4 pt-24"><div className="max-w-3xl mx-auto">
        <UpgradeGate
          requiredTier="standard"
          featureName={sectionLabels[activeSection] || "This Section"}
          featureDescription="This content is available to Standard and Premium members."
          onNavigatePremium={navigateToPremium}
          user={user}
        />
      </div></div>
    );
    if (isPremiumGated) return (
      <div className="min-h-screen bg-slate-900 py-20 px-4 pt-24"><div className="max-w-3xl mx-auto">
        <UpgradeGate
          requiredTier="premium"
          featureName={sectionLabels[activeSection] || "This Section"}
          featureDescription="This feature is exclusively available to Premium members."
          onNavigatePremium={navigateToPremium}
          user={user}
        />
      </div></div>
    );
    switch (activeSection) {
      case "home": return <HeroSection setActiveSection={handleSetSection} />;
      case "airlines": return <AirlinesSection goBack={goBack} previousLabel={previousLabel} />;
      case "requirements": return <RequirementsSection goBack={goBack} previousLabel={previousLabel} />;
      case "dress-code": return <DressCodeSection goBack={goBack} previousLabel={previousLabel} />;
      case "cv-guide": return <CVGuideSection goBack={goBack} previousLabel={previousLabel} />;
      case "questions": return <InterviewQASection goBack={goBack} previousLabel={previousLabel} />;
      case "group-discussion": return <GroupDiscussionSection goBack={goBack} previousLabel={previousLabel} />;
      case "mock-exam": return <MockExamSection goBack={goBack} previousLabel={previousLabel} tier={tier} onNavigatePremium={navigateToPremium} />;
      case "conduct": return <CodeOfConductSection goBack={goBack} previousLabel={previousLabel} />;
      case "premium": return <PremiumSection goBack={goBack} previousLabel={previousLabel} setActiveSection={handleSetSection} onPremiumUnlock={() => {}} user={user} onLoginClick={openLogin} />;
      case "mock-interview": return <AIMockInterviewSection goBack={goBack} previousLabel={previousLabel} tier={tier} onNavigatePremium={navigateToPremium} />;
      case "cv-review": return <AICVReviewSection goBack={goBack} previousLabel={previousLabel} tier={tier} onNavigatePremium={navigateToPremium} />;
      case "ask-cabin-crew": return <AskCabinCrewSection goBack={goBack} previousLabel={previousLabel} isPremium={tier === "premium"} onUpgrade={navigateToPremium} />;
      case "open-days": return <OpenDaysSection goBack={goBack} previousLabel={previousLabel} />;
      case "terms": return <TermsOfServiceSection goBack={goBack} previousLabel={previousLabel} />;
      case "privacy": return <PrivacyPolicySection goBack={goBack} previousLabel={previousLabel} />;
      case "rejection-decoded": return <RejectionDecodedSection goBack={goBack} previousLabel={previousLabel} tier={tier} onNavigatePremium={navigateToPremium} />;
      case "after-interview": return <AfterTheInterviewSection goBack={goBack} previousLabel={previousLabel} tier={tier} onNavigatePremium={navigateToPremium} />;
      case "account": return user
        ? <AccountSection user={user} goBack={goBack} previousLabel={previousLabel} onLogout={handleLogout} onNavigatePremium={navigateToPremium} />
        : <HeroSection setActiveSection={handleSetSection} />;
      default: return <HeroSection setActiveSection={handleSetSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 font-sans">
      {authNotice && (
        <div className="fixed top-0 inset-x-0 z-[200] bg-amber-500/95 text-slate-900 text-sm text-center px-4 py-2 font-medium">
          {authNotice}
          <button onClick={() => setAuthNotice(null)} className="ml-3 underline">Dismiss</button>
        </div>
      )}
      <Header activeSection={activeSection} setActiveSection={handleSetSection} user={user} onLoginClick={openLogin} onLogout={handleLogout} />
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
                  { id: "mock-interview", label: "Mock Interview" },
                  { id: "cv-review", label: "CV Review" },
                  { id: "questions", label: "Interview Q&A" },
                  { id: "mock-exam", label: "Mock Exam" },
                  { id: "open-days", label: "Open Days" },
                  { id: "ask-cabin-crew", label: "Ask Cabin Crew" },
                  { id: "premium", label: "Pricing" },
                  { id: "terms", label: "Terms" },
                  { id: "privacy", label: "Privacy" },
                ].map((item) => (
                  <button key={item.id} onClick={() => handleSetSection(item.id)} className="text-slate-400 hover:text-amber-400 text-sm text-left transition-colors">› {item.label}</button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-white font-bold text-sm mb-3">Airlines Covered</p>
              <div className="space-y-1 mb-4">
                {["Emirates (Dubai)", "Etihad Airways (Abu Dhabi)", "Qatar Airways (Doha)", "flydubai (Dubai)", "Air Arabia (Sharjah)"].map((a) => (
                  <p key={a} className="text-slate-400 text-sm flex items-center gap-1.5"><span className="text-amber-400 text-xs">✈</span> {a}</p>
                ))}
              </div>
              {!user && <button onClick={openLogin} className="text-amber-400 hover:text-amber-300 text-sm border border-amber-500/30 px-3 py-1.5 rounded-lg hover:bg-amber-500/10">Sign in / Register →</button>}
            </div>
          </div>
          <div className="border-t border-white/5 pt-6">
            <div className="flex flex-wrap justify-center gap-6 mb-4">
              <button onClick={() => handleSetSection("terms")} className="text-slate-400 hover:text-amber-400 text-sm">Terms of Service</button>
              <button onClick={() => handleSetSection("privacy")} className="text-slate-400 hover:text-amber-400 text-sm">Privacy Policy</button>
              <button onClick={() => { localStorage.removeItem("cookie-consent"); window.location.reload(); }} className="text-slate-400 hover:text-amber-400 text-sm">Cookie Preferences</button>
              <button onClick={() => handleSetSection("premium")} className="text-slate-400 hover:text-amber-400 text-sm">Pricing Plans</button>
            </div>
            <div className="text-center">
              <p className="text-slate-500 text-sm">© 2024–2025 Cabin Crew Interview Guidebook — Middle Eastern Airlines Edition</p>
              <p className="text-slate-600 text-xs mt-1">For educational purposes only. Not affiliated with any airline.</p>
            </div>
          </div>
        </div>
      </footer>

      <CookieConsent onNavigate={handleSetSection} />

      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} onSuccess={handleLoginSuccess}
          onNavigate={(section) => { setShowAuthModal(false); handleSetSection(section); }} />
      )}
    </div>
  );
}
