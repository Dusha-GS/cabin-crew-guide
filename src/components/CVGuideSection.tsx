import { useState } from "react";
import BackButton from "./BackButton";
import { usePaidContent } from "../hooks/usePaidContent";
import { ContentLoading, ContentError } from "./ContentState";

interface Props { goBack: () => void; previousLabel: string; }

interface CVSection {
  section: string;
  description: string;
  example?: string;
  tips?: string[];
  items?: string[];
  levels?: string[];
  examples?: string[];
}
interface CVGuide {
  structure: CVSection[];
  dosDonts: { dos: string[]; donts: string[] };
}

export default function CVGuideSection({ goBack, previousLabel }: Props) {
  const [activeSection, setActiveSection] = useState(0);

  const { data: cvGuide, loading, error, retry } = usePaidContent<CVGuide>("cv-guide");

  if (loading) return <ContentLoading goBack={goBack} previousLabel={previousLabel} />;
  if (error || !cvGuide) {
    return (
      <ContentError
        goBack={goBack}
        previousLabel={previousLabel}
        message={error || "We couldn't load the CV guide."}
        onRetry={retry}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 py-20 px-4 pt-24">
      <div className="max-w-6xl mx-auto">
        <BackButton onClick={goBack} label={`Back to ${previousLabel}`} />
        <div className="text-center mb-12">
          <span className="inline-block bg-green-500/20 text-green-400 text-sm font-medium px-4 py-1.5 rounded-full mb-4 border border-green-500/30">
            📄 CV Profile Guide
          </span>
          <h2 className="text-4xl font-bold text-white mb-4">Craft a Winning CV</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Your CV is your first impression. Gulf airlines receive thousands of applications — make yours stand out.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="bg-slate-800/50 border border-slate-700/40 rounded-xl px-5 py-4 mb-8 flex items-start gap-3">
          <span className="text-slate-500 text-base flex-shrink-0 mt-0.5">ℹ️</span>
          <p className="text-slate-500 text-xs leading-relaxed">
            CV guidance on this page is based on publicly available airline application requirements and candidate-reported experiences. Best practices are subject to change — always check the specific airline's application portal for current requirements before submitting. The personal details guidance applies specifically to Middle Eastern airline applications; conventions differ in other regions.
          </p>
        </div>

        {/* CV Template Preview */}
        <div className="bg-white rounded-2xl p-8 mb-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500" />
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1 space-y-6">
              <div className="bg-slate-100 rounded-xl aspect-[3/4] flex items-center justify-center border-2 border-dashed border-slate-300">
                <div className="text-center">
                  <div className="text-4xl mb-2">📸</div>
                  <p className="text-slate-400 text-xs font-medium">Professional Headshot</p>
                  <p className="text-slate-300 text-xs mt-1">White background</p>
                </div>
              </div>
              <div>
                <div className="h-0.5 bg-gradient-to-r from-amber-400 to-transparent mb-3" />
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Contact</p>
                <div className="space-y-1 text-slate-600 text-xs">
                  <p>📧 yourname@email.com</p>
                  <p>📱 +971 XX XXX XXXX</p>
                  <p>🌍 Dubai, UAE</p>
                  <p>🛂 Passport: Expiry DD/MM/YYYY</p>
                </div>
              </div>
              <div>
                <div className="h-0.5 bg-gradient-to-r from-amber-400 to-transparent mb-3" />
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Languages</p>
                <div className="space-y-2">
                  {[
                    { lang: "English", level: "Fluent", width: "95%" },
                    { lang: "Arabic", level: "Intermediate", width: "65%" },
                    { lang: "French", level: "Basic", width: "35%" },
                  ].map((l) => (
                    <div key={l.lang}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-700 font-medium">{l.lang}</span>
                        <span className="text-slate-400">{l.level}</span>
                      </div>
                      <div className="bg-slate-100 rounded-full h-1.5">
                        <div
                          className="bg-gradient-to-r from-amber-400 to-amber-500 h-1.5 rounded-full"
                          style={{ width: l.width }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="md:col-span-2 space-y-5">
              <div>
                <h3 className="text-3xl font-bold text-slate-800 leading-tight">YOUR FULL NAME</h3>
                <p className="text-amber-600 font-semibold text-sm tracking-widest uppercase mt-1">
                  Aspiring Cabin Crew | Customer Service Professional
                </p>
              </div>
              <div className="h-0.5 bg-gradient-to-r from-amber-400 to-transparent" />
              <div>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Professional Profile</p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Enthusiastic and customer-focused professional with [X] years of experience delivering
                  exceptional service in multicultural environments. Fluent in English and Arabic, with a
                  genuine passion for creating meaningful experiences for every guest.
                </p>
              </div>
              <div>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-3">Work Experience</p>
                <div className="border-l-2 border-amber-400 pl-4">
                  <p className="text-slate-800 font-bold text-sm">Senior Customer Service Representative</p>
                  <p className="text-amber-600 text-xs font-medium">Company Name | 2022 – Present</p>
                  <ul className="mt-2 space-y-1 text-slate-600 text-xs">
                    <li>• Delivered exceptional service to 100+ daily customers</li>
                    <li>• Resolved complex complaints achieving 95% customer satisfaction</li>
                    <li>• Collaborated with multicultural team of 15+ colleagues</li>
                  </ul>
                </div>
              </div>
              <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-slate-400 text-xs">Nationality</p>
                    <p className="text-slate-700 text-xs font-bold">Your Country</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs">Height</p>
                    <p className="text-slate-700 text-xs font-bold">Your height</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs">DOB</p>
                    <p className="text-slate-700 text-xs font-bold">DD/MM/YYYY</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CV Structure Guide — Section Tabs */}
        <div className="grid md:grid-cols-4 gap-3 mb-10">
          {cvGuide.structure.map((section: CVSection, index: number) => (
            <button
              key={index}
              onClick={() => setActiveSection(index)}
              className={`p-4 rounded-xl border text-left transition-all duration-200 ${
                activeSection === index
                  ? "bg-green-500/20 border-green-500/40 shadow-lg"
                  : "bg-white/5 border-white/10 hover:bg-white/10"
              }`}
            >
              <p className={`font-semibold text-sm ${activeSection === index ? "text-green-400" : "text-white"}`}>
                {section.section}
              </p>
            </button>
          ))}
        </div>

        {/* Active Section Detail */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-10">
          <h4 className="text-2xl font-bold text-white mb-2">
            {cvGuide.structure[activeSection].section}
          </h4>
          <p className="text-slate-400 mb-5 leading-relaxed">
            {cvGuide.structure[activeSection].description}
          </p>
          {cvGuide.structure[activeSection].example && (
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 mb-4">
              <p className="text-green-400 font-bold text-sm mb-2">✍️ Example Profile:</p>
              <p className="text-slate-300 text-sm italic leading-relaxed">
                "{cvGuide.structure[activeSection].example}"
              </p>
              <p className="text-slate-500 text-xs mt-2">
                ↑ This is a template example only — tailor every word to the specific airline you are applying to.
              </p>
            </div>
          )}
          {cvGuide.structure[activeSection].tips && (
            <div>
              <p className="text-amber-400 font-bold text-sm mb-3">💡 Tips:</p>
              <ul className="space-y-2">
                {cvGuide.structure[activeSection].tips!.map((tip: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-amber-400 mt-0.5">◆</span>
                    <span className="text-slate-300">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {cvGuide.structure[activeSection].items && (
            <div className="grid sm:grid-cols-2 gap-2">
              {cvGuide.structure[activeSection].items!.map((item: string, i: number) => (
                <div key={i} className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2 text-sm">
                  <span className="text-green-400">✓</span>
                  <span className="text-slate-300">{item}</span>
                </div>
              ))}
            </div>
          )}
          {cvGuide.structure[activeSection].levels && (
            <div className="flex flex-wrap gap-2">
              {cvGuide.structure[activeSection].levels!.map((level: string) => (
                <span
                  key={level}
                  className="bg-blue-500/20 text-blue-300 border border-blue-500/30 text-sm px-4 py-1.5 rounded-full"
                >
                  {level}
                </span>
              ))}
            </div>
          )}
          {cvGuide.structure[activeSection].examples && (
            <div className="flex flex-wrap gap-2">
              {cvGuide.structure[activeSection].examples!.map((ex: string) => (
                <span
                  key={ex}
                  className="bg-purple-500/10 text-purple-300 border border-purple-500/20 text-sm px-3 py-1.5 rounded-full"
                >
                  {ex}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Do's and Don'ts */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-500/5 border border-green-500/20 rounded-2xl p-6">
            <h4 className="text-green-400 font-bold text-lg mb-4">✅ CV Do's</h4>
            <ul className="space-y-2">
              {cvGuide.dosDonts.dos.map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-green-400 mt-0.5 flex-shrink-0">✓</span>
                  <span className="text-slate-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6">
            <h4 className="text-red-400 font-bold text-lg mb-4">❌ CV Don'ts</h4>
            <ul className="space-y-2">
              {cvGuide.dosDonts.donts.map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-red-400 mt-0.5 flex-shrink-0">✗</span>
                  <span className="text-slate-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
