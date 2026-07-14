import { useState, useRef } from "react";
import { callClaude } from "../hooks/useClaude";
import { type MembershipTier, getMembershipState, recordCVReviewUsed } from "../hooks/useMembership";
import UpgradeGate from "./UpgradeGate";
import BackButton from "./BackButton";

interface Props {
  goBack: () => void;
  previousLabel: string;
  tier: MembershipTier;
  onNavigatePremium: () => void;
}

type Airline = "Emirates" | "Etihad Airways" | "Qatar Airways" | "flydubai" | "Air Arabia" | "Any ME Airline";

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
[Based on publicly available information about ${airline}'s known values, culture, and typical hiring priorities, does this CV reflect what they look for? What could be strengthened? Note any observations are based on general public information and the candidate should verify current requirements directly with the airline.]

## 🔑 Top 5 Quick Wins
1. [actionable improvement, specific to their CV]
2. [actionable improvement]
3. [actionable improvement]
4. [actionable improvement]
5. [actionable improvement]

Be direct and specific. Reference their actual content. Don't be vague.`;

export default function AICVReviewSection({ goBack, previousLabel, tier, onNavigatePremium }: Props) {
  const membership = getMembershipState(tier);
  const [cvText, setCvText] = useState("");
  const [airline, setAirline] = useState<Airline>("Emirates");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");
  const [reviewed, setReviewed] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const AIRLINES: Airline[] = ["Emirates", "Etihad Airways", "Qatar Airways", "flydubai", "Air Arabia", "Any ME Airline"];

  // Check if free user has used their trial
  if (!membership.canUseCVReview) {
    return (
      <div className="min-h-screen bg-slate-900 py-20 px-4 pt-24">
        <div className="max-w-3xl mx-auto">
          <BackButton onClick={goBack} label={`Back to ${previousLabel}`} />
          <div className="text-center mb-8">
            <span className="inline-block bg-green-500/20 text-green-400 text-sm font-medium px-4 py-1.5 rounded-full mb-4 border border-green-500/30">
              📄 CV Review
            </span>
            <h2 className="text-3xl font-bold text-white mb-3">You've used your free CV review</h2>
            <p className="text-slate-400 mb-2">Your free trial included 1 CV review. Upgrade to get unlimited reviews plus file upload.</p>
          </div>
          <UpgradeGate
            requiredTier="standard"
            featureName="Unlimited CV Reviews"
            featureDescription="Get unlimited CV reviews with PDF/Word upload, detailed feedback and airline-specific analysis."
            onNavigatePremium={onNavigatePremium}
          />
        </div>
      </div>
    );
  }

  const extractTextFromFile = async (file: File): Promise<string> => {
    if (file.type === "text/plain") {
      return await file.text();
    }

    // For PDF and Word docs — basic text extraction
    // Note: binary format extraction is limited; plain text paste gives best results
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        const cleaned = result
          .replace(/[^\x20-\x7E\n\r\t]/g, " ")
          .replace(/\s{3,}/g, "\n")
          .trim();
        if (cleaned.length < 50) {
          reject(new Error("Could not extract enough text from this file. For best results, paste your CV text directly in the box below."));
        } else {
          resolve(cleaned);
        }
      };
      reader.onerror = () => reject(new Error("Failed to read file."));
      reader.readAsText(file, "utf-8");
    });
  };

  const handleFile = async (file: File) => {
    if (!membership.isStandard) {
      setError("File upload is available on Standard and Premium plans. Please paste your CV text below.");
      return;
    }

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];

    if (!allowedTypes.includes(file.type) && !file.name.match(/\.(pdf|doc|docx|txt)$/i)) {
      setError("Please upload a PDF, Word document (.doc/.docx), or text file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("File is too large. Maximum size is 5MB.");
      return;
    }

    setError("");
    setUploadedFileName(file.name);

    try {
      const text = await extractTextFromFile(file);
      setCvText(text);
    } catch (e: unknown) {
      setError((e as Error).message || "Could not read file. Please paste your CV text instead.");
      setUploadedFileName("");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleReview = async () => {
    if (!cvText.trim() || cvText.trim().length < 100) {
      setError("Please paste your full CV text or upload a file (at least a few paragraphs).");
      return;
    }
    setLoading(true);
    setError("");
    setFeedback("");
    setReviewed(false);

    try {
      const result = await callClaude(
        [{ role: "user", content: buildPrompt(cvText, airline) }],
        { feature: "cv-review", system: CV_REVIEW_SYSTEM, max_tokens: 1200 }
      );
      setFeedback(result);
      setReviewed(true);
      if (tier === "free") recordCVReviewUsed();
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
    setCvText("");
    setUploadedFileName("");
  };

  const renderFeedback = (text: string) => {
    return text.split("\n").map((line, i) => {
      if (line.startsWith("## ")) return (
        <h3 key={i} className="text-amber-400 font-bold text-lg mt-6 mb-3">{line.replace("## ", "")}</h3>
      );
      if (line.startsWith("- ")) return (
        <div key={i} className="flex items-start gap-2 mb-2">
          <span className="text-amber-400 mt-1 flex-shrink-0 text-xs">◆</span>
          <span className="text-slate-300 text-sm">{line.replace("- ", "")}</span>
        </div>
      );
      if (/^\d\./.test(line)) return (
        <div key={i} className="flex items-start gap-2 mb-2">
          <span className="text-amber-500 font-bold flex-shrink-0 text-sm">{line[0]}.</span>
          <span className="text-slate-300 text-sm">{line.slice(2)}</span>
        </div>
      );
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
            📄 CV Review
          </span>
          <h2 className="text-4xl font-bold text-white mb-4">AI CV Review</h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            {tier === "free"
              ? "Free trial — 1 AI-powered review included"
              : "Upload your CV or paste the text for instant AI-powered feedback."}
          </p>
          {tier === "free" && (
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-1.5 mt-3">
              <span className="text-amber-400 text-xs font-bold">FREE TRIAL</span>
              <span className="text-slate-400 text-xs">{membership.cvReviewsUsed}/1 reviews used</span>
            </div>
          )}
        </div>

        {!reviewed ? (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">

            {/* Airline target */}
            <div className="mb-6">
              <p className="text-slate-300 font-semibold text-sm mb-3">Target Airline</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
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

            {/* File upload — Standard/Premium only */}
            {membership.isStandard ? (
              <div className="mb-6">
                <p className="text-slate-300 font-semibold text-sm mb-3">Upload CV File</p>
                <div
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                    isDragging ? "border-green-500/60 bg-green-500/10" : "border-white/20 hover:border-green-500/40 hover:bg-white/5"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                  />
                  {uploadedFileName ? (
                    <div>
                      <div className="text-3xl mb-2">📄</div>
                      <p className="text-green-400 font-semibold text-sm">{uploadedFileName}</p>
                      <p className="text-slate-500 text-xs mt-1">Click to replace</p>
                    </div>
                  ) : (
                    <div>
                      <div className="text-3xl mb-2">📎</div>
                      <p className="text-white font-semibold text-sm mb-1">Drag & drop your CV here</p>
                      <p className="text-slate-500 text-xs">PDF, Word (.doc/.docx), or text file · Max 5MB</p>
                      <p className="text-slate-600 text-xs mt-2">or click to browse</p>
                    </div>
                  )}
                </div>
                {/* PDF extraction quality warning */}
                <p className="text-slate-600 text-xs mt-2 leading-relaxed">
                  ⚠️ Text extraction from PDF and Word files may be incomplete. For the most accurate feedback, paste your CV text directly in the box below.
                </p>
                <div className="flex items-center gap-3 my-4">
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="text-slate-500 text-xs">or paste text below</span>
                  <div className="flex-1 h-px bg-white/10" />
                </div>
              </div>
            ) : (
              <div className="mb-4 bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-amber-400 font-semibold text-sm">📎 File upload available on Standard & Premium</p>
                  <p className="text-slate-500 text-xs mt-0.5">Paste your CV text below to use your free review</p>
                </div>
                <button onClick={onNavigatePremium} className="text-amber-400 text-xs font-bold hover:underline flex-shrink-0 ml-4">
                  Upgrade →
                </button>
              </div>
            )}

            {/* CV paste area */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-slate-300 font-semibold text-sm">CV Text</p>
                <span className="text-slate-500 text-xs">{cvText.length} characters</span>
              </div>
              <textarea
                value={cvText}
                onChange={(e) => setCvText(e.target.value)}
                placeholder={`Paste your full CV here...\n\nInclude:\n• Personal statement / profile\n• Work experience\n• Education\n• Languages\n• Skills`}
                rows={12}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm resize-none focus:outline-none focus:border-green-500/50 focus:bg-white/8 transition-all leading-relaxed"
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-5">
                <p className="text-red-400 text-sm">⚠️ {error}</p>
              </div>
            )}

            <button
              onClick={handleReview}
              disabled={loading || !cvText.trim()}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 disabled:opacity-40 text-white font-bold py-4 rounded-xl transition-all hover:scale-[1.01] text-lg shadow-lg"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Analyzing your CV...
                </span>
              ) : "🔍 Review My CV →"}
            </button>
          </div>
        ) : (
          <>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-bold text-xl flex items-center gap-2">
                  📊 Your CV Feedback
                  <span className="text-sm font-normal text-slate-400">— {airline}</span>
                </h3>
                <button onClick={reset} className="text-slate-400 hover:text-amber-400 text-sm transition-colors">
                  ↺ Review again
                </button>
              </div>
              <div>{renderFeedback(feedback)}</div>
              {/* AI & airline disclaimer */}
              <p className="text-slate-600 text-xs mt-5 pt-4 border-t border-white/5 leading-relaxed">
                ⓘ Feedback generated by AI based on publicly available information. Airline-specific insights may not reflect current requirements — always verify directly with each airline before applying.
              </p>
            </div>
            <div className="flex gap-4">
              <button onClick={reset} className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 text-white font-bold py-4 rounded-xl transition-all">
                📄 Review Another CV
              </button>
              <button onClick={goBack} className="flex-1 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold py-4 rounded-xl transition-all">
                Back to Guide
              </button>
            </div>
          </>
        )}

        {/* Data privacy footer */}
        <p className="text-slate-600 text-xs text-center mt-6 leading-relaxed">
          🔒 Your CV text is processed via Anthropic's API. It is not stored on our servers. Anthropic retains API request logs for up to 7 days before permanent deletion and does not use commercial API data for model training. See Anthropic's Privacy Policy for full details.
        </p>
      </div>
    </div>
  );
}
