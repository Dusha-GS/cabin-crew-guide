import { useState } from "react";
import BackButton from "./BackButton";
import { usePaidContent } from "../hooks/usePaidContent";
import { ContentLoading, ContentError } from "./ContentState";

interface Props { goBack: () => void; previousLabel: string; }

type Category = "personal" | "behavioral" | "situational" | "knowledge";

interface QA {
  question: string;
  difficulty: string;
  category: string;
  sampleAnswer: string;
  tips: string[];
}
type QuestionBank = Record<Category, QA[]>;

const categoryConfig = {
  personal: { label: "Personal Questions", icon: "👤", color: "from-blue-600 to-blue-700" },
  behavioral: { label: "Behavioral Questions", icon: "🎯", color: "from-purple-600 to-purple-700" },
  situational: { label: "Situational Questions", icon: "⚡", color: "from-orange-600 to-orange-700" },
  knowledge: { label: "Airline Knowledge", icon: "✈️", color: "from-green-600 to-green-700" },
};

const difficultyColors = {
  Easy: "bg-green-500/20 text-green-400 border-green-500/30",
  Medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Hard: "bg-red-500/20 text-red-400 border-red-500/30",
};

export default function InterviewQASection({ goBack, previousLabel }: Props) {
  const [activeCategory, setActiveCategory] = useState<Category>("personal");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const { data: interviewQuestions, loading, error, retry } =
    usePaidContent<QuestionBank>("interview-questions");

  if (loading) return <ContentLoading goBack={goBack} previousLabel={previousLabel} />;
  if (error || !interviewQuestions) {
    return (
      <ContentError
        goBack={goBack}
        previousLabel={previousLabel}
        message={error || "We couldn't load these questions."}
        onRetry={retry}
      />
    );
  }

  const questions = interviewQuestions[activeCategory] ?? [];

  return (
    <div className="min-h-screen bg-slate-900 py-20 px-4 pt-24">
      <div className="max-w-5xl mx-auto">
        <BackButton onClick={goBack} label={`Back to ${previousLabel}`} />
        <div className="text-center mb-12">
          <span className="inline-block bg-blue-500/20 text-blue-400 text-sm font-medium px-4 py-1.5 rounded-full mb-4 border border-blue-500/30">
            💬 Interview Questions & Answers
          </span>
          <h2 className="text-4xl font-bold text-white mb-4">Master Your Interview</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Real-world questions across four categories — with sample answers and expert tips for Gulf airline interviews.
          </p>
        </div>

        {/* STAR Method */}
        <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-500/30 rounded-2xl p-6 mb-10">
          <h4 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
            ⭐ The STAR Method — Your Secret Weapon
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { letter: "S", word: "Situation", desc: "Describe the context or background" },
              { letter: "T", word: "Task", desc: "Explain your specific role or responsibility" },
              { letter: "A", word: "Action", desc: "Detail the steps YOU personally took" },
              { letter: "R", word: "Result", desc: "Share the measurable outcome" },
            ].map((star) => (
              <div key={star.letter} className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center font-bold text-slate-900 text-lg mx-auto mb-2">
                  {star.letter}
                </div>
                <p className="text-amber-400 font-bold text-sm mb-1">{star.word}</p>
                <p className="text-slate-400 text-xs">{star.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {(Object.keys(categoryConfig) as Category[]).map((cat) => {
            const config = categoryConfig[cat];
            return (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setExpandedIndex(null); }}
                className={`p-4 rounded-xl border transition-all duration-300 text-left ${
                  activeCategory === cat
                    ? `bg-gradient-to-br ${config.color} border-transparent shadow-lg`
                    : "bg-white/5 border-white/10 hover:bg-white/10"
                }`}
              >
                <div className="text-2xl mb-1">{config.icon}</div>
                <p className={`text-sm font-semibold ${activeCategory === cat ? "text-white" : "text-slate-300"}`}>
                  {config.label}
                </p>
                <p className="text-xs text-white/60 mt-0.5">{(interviewQuestions[cat] ?? []).length} questions</p>
              </button>
            );
          })}
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {questions.map((q: QA, index: number) => (
            <div
              key={index}
              className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                expandedIndex === index
                  ? "border-amber-500/50 bg-white/5"
                  : "border-white/10 hover:border-white/20"
              }`}
            >
              <button
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                className="w-full text-left p-5 flex items-start justify-between gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-7 h-7 bg-amber-500/20 text-amber-400 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${difficultyColors[q.difficulty as keyof typeof difficultyColors]}`}>
                      {q.difficulty}
                    </span>
                    <span className="text-xs text-slate-500 bg-white/5 px-2 py-0.5 rounded-full">
                      {q.category}
                    </span>
                  </div>
                  <p className="text-white font-semibold text-base pr-4">{q.question}</p>
                </div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${expandedIndex === index ? "bg-amber-500 rotate-180" : "bg-white/10"}`}>
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {expandedIndex === index && (
                <div className="px-5 pb-5 border-t border-white/10">
                  <div className="mt-4 bg-green-500/10 border border-green-500/20 rounded-xl p-4 mb-4">
                    <p className="text-green-400 font-bold text-sm mb-2">✍️ Sample Answer</p>
                    <p className="text-slate-300 text-sm leading-relaxed">{q.sampleAnswer}</p>
                  </div>
                  <div>
                    <p className="text-amber-400 font-bold text-sm mb-2">💡 Pro Tips</p>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {q.tips.map((tip: string, i: number) => (
                        <div key={i} className="flex items-start gap-2 bg-amber-500/5 border border-amber-500/10 rounded-lg p-2.5">
                          <span className="text-amber-400 text-xs mt-0.5 flex-shrink-0">◆</span>
                          <span className="text-slate-300 text-xs">{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
