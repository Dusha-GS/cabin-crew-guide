import { useState } from "react";
import { callClaude } from "../hooks/useClaude";
import BackButton from "./BackButton";

interface Props { goBack: () => void; previousLabel: string; }

type Airline = "Emirates" | "Etihad Airways" | "Qatar Airways" | "Any ME Airline";

const CV_REVIEW_SYSTEM = `You are a senior cabin crew recruitment specialist with 15+ years of experience at top Middle Eastern airlines. You have reviewed thousands of cabin crew CVs and know exactly what gets candidates to the next stage.

Analyze the CV provided and give structured, honest, actionable feedback. Be specific — reference actual phrases or sections from their CV. Balance encouragement with tough love.`;

const buildPrompt = (cv: string, airline: Airline) => `Please review this cabin crew CV for a ${airline} application:

---CV START---
${cv}
---CV END---

Provide your assessment in this exact format:

## Overall CV Score: [X/10]
[One sentence overall impression]

## ✅ What Works Well
- [specific strength from their actual CV]
- [specific strength]
- [specific strength]

## ❌ Critical Issues to Fix
- [specific problem with exact advice on how to fix it]
- [specific problem with fix]
- [specific problem with fix]

## ✍️ Rewrite These Lines
[Pick 1-2 weak lines from their CV and show an improved version]
Original: "[their actual line]"
Improved: "[your rewrite]"

## 📏 ${airline} Fit Check
[Does this CV reflect ${airline}'s known values and culture? What's missing?]

## 🔑 Top 5 Quick Wins
1. [actionable improvement, specific to their CV]
2. [actionable improvement]
3. [actionable improvement]
4. [actionable improvement]
5. [actionable improvement]

Be direct and specific. Reference their actual content. Don't be vague.`;

export default function AICVReviewSection({ goBack, previousLabel }: Props) {
  const [cvText, setCvText] = useState("");
  const [airline, setAirline] = useState<Airline>("Emirates");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");
  const [reviewed, setReviewed] = useState(false);

  const AIRLINES: Airline[] = ["Emirates", "Etihad Airways", "Qatar Airways", "Any ME Airline"];

  const handleReview = async () => {
    if (!cvText.trim() || cvText.trim().length < 100) {
      setError("Please paste your full CV text (at least a few paragraphs).");
      return;
    }
    setLoading(true);
    setError("");
    setFeedback("");
    setReviewed(false);

    try {
      const result = await callClaude(
        [{ role: "user", content: buildPrompt(cvText, airline) }],
        { system: CV_REVIEW_SYSTEM, max_tokens: 1200 }
      );
      setFeedback(result);
      setReviewed(true);
    } catch (e: unknown) {
      setError((e as Error).message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setFeedback("");
    setReviewed(false);
    setError("");
  };

  const renderFeedback = (text: string) => {
    return text.split("\n").map((line, i) => {
      if (line.startsWith("## ")) {
        return <h3 key={i} className="text-amber-400 font-bold text-lg mt-6 mb-3">{line.replace("## ", "")}</h3>;
      }
      if (line.startsWith("- ")) {
        return (
          <div key={i} className="flex items-start gap-2 mb-2">
            <span className="text-amber-400 mt-1 flex-shrink-0 text-xs">◆</span>
            <span className="text-slate-300 text-sm">{line.replace("- ", "")}</span>
          </div>
        );
      }
      if (/^\d\./.test(line)) {
        return (
          <div key={i} className="flex items-start gap-2 mb-2">
            <span className="text-amber-500 font-bold flex-shrink-0 text-sm">{line[0]}.</span>
            <span className="text-slate-300 text-sm">{line.slice(2)}</span>
          </div>
        );
      }
      if (line.startsWith("Original:") || line.startsWith("Improved:")) {
        const isOriginal = line.startsWith("Original:");
        return (
          <div key={i} className={`rounded-lg p-3 mb-2 border text-sm ${isOriginal ? "bg-red-500/10 border-red-500/20 text-red-300" : "bg-green-500/10 border-green-500/20 text-green-300"}`}>
            <span className="font-bold">{isOriginal ? "❌ Original:" : "✅ Improved:"}</span>{line.slice(line.indexOf(":") + 1)}
          </div>
        );
      }
      if (line.trim() === "") return <div key={i} className="h-2" />;
      return <p key={i} className="text-slate-300 text-sm leading-relaxed mb-1">{line}</p>;
    });
  };

  return (
    <div className="min-h-screen bg-slate-900 py-20 px-4 pt-24">
      <div className="max-w-3xl mx-auto">
        <BackButton onClick={goBack} label={`Back to ${previousLabel}`} />

        <div className="text-center mb-10">
          <span className="inline-block bg-green-500/20 text-green-400 text-sm font-medium px-4 py-1.5 rounded-full mb-4 border border-green-500/30">
            📄 Powered by Claude AI
          </span>
          <h2 className="text-4xl font-bold text-white mb-4">AI CV Review</h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Paste your CV text and get detailed, recruiter-level feedback in seconds.
          </p>
        </div>

        {!reviewed ? (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            {/* Airline target */}
            <div className="mb-6">
              <p className="text-slate-300 font-semibold text-sm mb-3">Target Airline</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {AIRLINES.map((a) => (
                  <button
                    key={a}
                    onClick={() => setAirline(a)}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
                      airline === a
                        ? "bg-green-500/30 text-green-300 border-green-500/50"
                        : "bg-white/5 text-slate-400 border-white/10 hover:bg-white/10"
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>

            {/* CV paste area */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-slate-300 font-semibold text-sm">Paste Your CV Text</p>
                <span className="text-slate-500 text-xs">{cvText.length} characters</span>
              </div>
              <textarea
                value={cvText}
                onChange={(e) => setCvText(e.target.value)}
                placeholder={`Paste your full CV here...\n\nInclude:\n• Personal statement / profile\n• Work experience\n• Education\n• Languages\n• Skills\n• Any personal details relevant to the role`}
                rows={14}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm resize-none focus:outline-none focus:border-green-500/50 focus:bg-white/8 transition-all leading-relaxed"
              />
              <p className="text-slate-600 text-xs mt-2">
                💡 Tip: Include your personal statement, all work experience, education, languages and skills for the best feedback.
              </p>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-5">
                <p className="text-red-400 text-sm">⚠️ {error}</p>
              </div>
            )}

            <button
              onClick={handleReview}
              disabled={loading || !cvText.trim()}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 disabled:opacity-40 text-white font-bold py-4 rounded-xl transition-all hover:scale-[1.01] text-lg shadow-lg"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Analyzing your CV...
                </span>
              ) : (
                "🔍 Review My CV →"
              )}
            </button>
          </div>
        ) : (
          <>
            {/* Feedback display */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-bold text-xl flex items-center gap-2">
                  📊 Your CV Feedback
                  <span className="text-sm font-normal text-slate-400">— {airline}</span>
                </h3>
                <button
                  onClick={reset}
                  className="text-slate-400 hover:text-amber-400 text-sm transition-colors"
                >
                  ↺ Review again
                </button>
              </div>
              <div>{renderFeedback(feedback)}</div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-4">
              <button
                onClick={reset}
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 text-white font-bold py-4 rounded-xl transition-all"
              >
                📄 Review Another CV
              </button>
              <button
                onClick={() => goBack()}
                className="flex-1 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold py-4 rounded-xl transition-all"
              >
                Back to Guide
              </button>
            </div>
          </>
        )}

        {/* Privacy note */}
        <p className="text-slate-600 text-xs text-center mt-6">
          🔒 Your CV text is sent directly to Anthropic's API for analysis and is not stored on our servers.
        </p>
      </div>
    </div>
  );
}
