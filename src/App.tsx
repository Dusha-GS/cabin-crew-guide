import { useState, useRef } from "react";
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
// AI-powered sections (new — replacing Arena.ai features)
import AIMockInterviewSection from "./components/AIMockInterviewSection";
import AICVReviewSection from "./components/AICVReviewSection";

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
};

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const historyRef = useRef<string[]>(["home"]);

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

  const renderSection = () => {
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
        return <PremiumSection goBack={goBack} previousLabel={previousLabel} setActiveSection={handleSetSection} />;
      case "ai-mock-interview":
        return <AIMockInterviewSection goBack={goBack} previousLabel={previousLabel} />;
      case "ai-cv-review":
        return <AICVReviewSection goBack={goBack} previousLabel={previousLabel} />;
      default:
        return <HeroSection setActiveSection={handleSetSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 font-sans">
      <Header activeSection={activeSection} setActiveSection={handleSetSection} />
      <main>{renderSection()}</main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-white/5 py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-slate-900 font-bold">
                  ✈
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Cabin Crew Guidebook</p>
                  <p className="text-amber-400 text-xs">Middle Eastern Airlines Edition</p>
                </div>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                Your comprehensive preparation guide for cabin crew interviews at Emirates, Etihad Airways, Qatar Airways, and more.
              </p>
            </div>
            <div>
              <p className="text-white font-bold text-sm mb-3">Quick Navigation</p>
              <div className="grid grid-cols-2 gap-1">
                {[
                  { id: "airlines", label: "Airlines" },
                  { id: "requirements", label: "Requirements" },
                  { id: "dress-code", label: "Dress Code" },
                  { id: "cv-guide", label: "CV Guide" },
                  { id: "questions", label: "Interview Q&A" },
                  { id: "mock-exam", label: "Mock Exam" },
                  { id: "ai-mock-interview", label: "AI Mock Interview" },
                  { id: "premium", label: "Premium" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSetSection(item.id)}
                    className="text-slate-400 hover:text-amber-400 text-sm text-left transition-colors"
                  >
                    › {item.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-white font-bold text-sm mb-3">Airlines Covered</p>
              <div className="space-y-1">
                {["Emirates (Dubai)", "Etihad Airways (Abu Dhabi)", "Qatar Airways (Doha)", "flydubai (Dubai)", "Air Arabia (Sharjah)"].map((a) => (
                  <p key={a} className="text-slate-400 text-sm flex items-center gap-1.5">
                    <span className="text-amber-400 text-xs">✈</span> {a}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 pt-6 text-center">
            <p className="text-slate-500 text-sm">
              © 2024-2025 Cabin Crew Interview Guidebook — Middle Eastern Airlines Edition
            </p>
            <p className="text-slate-600 text-xs mt-1">
              For educational purposes. Always verify requirements directly with the airline.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
