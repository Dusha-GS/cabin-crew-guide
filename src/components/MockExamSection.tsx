import { useState } from "react";
import { callClaude } from "../hooks/useClaude";
import BackButton from "./BackButton";

interface Props { goBack: () => void; previousLabel: string; tier?: string; onNavigatePremium?: () => void; }

const QUESTIONS = [
  {
    id: 1,
    question: "You notice a passenger appears very anxious before takeoff. What do you do?",
    category: "Situational",
    difficulty: "Easy",
    modelAnswer: "Approach calmly and warmly, offer reassurance, explain procedures if needed, check in throughout flight."
  },
  {
    id: 2,
    question: "A passenger becomes verbally aggressive because their meal choice is unavailable. How do you handle this?",
    category: "Behavioral",
    difficulty: "Medium",
    modelAnswer: "Stay calm, acknowledge frustration, apologize sincerely, offer alternatives, escalate to senior crew if needed."
  },
  {
    id: 3,
    question: "During a flight, two passengers in the same row have a heated argument. What steps do you take?",
    category: "Situational",
    difficulty: "Medium",
    modelAnswer: "Intervene professionally, separate if possible, de-escalate calmly, document and inform senior crew."
  },
  {
    id: 4,
    question: "Why do you want to work specifically for Emirates/a Middle Eastern airline?",
    category: "Personal",
    difficulty: "Easy",
    modelAnswer: "Show genuine airline knowledge — routes, values, service culture, crew diversity, training reputation."
  },
  {
    id: 5,
    question: "A passenger is showing signs of a medical emergency (clutching chest). Walk me through your response.",
    category: "Emergency",
    difficulty: "Hard",
    modelAnswer: "Alert senior crew immediately, retrieve first aid kit and AED, follow emergency protocols, ask for medical professionals onboard, prepare for diversion if needed."
  },
  {
    id: 6,
    question: "You've been awake for 18 hours and have a 12-hour flight ahead. How do you ensure you deliver excellent service?",
    category: "Personal",
    difficulty: "Medium",
    modelAnswer: "Professional responsibility, rest strategies during layover, teamwork with crew, maintaining standards regardless of fatigue."
  },
  {
    id: 7,
    question: "Tell me about a time you went above and beyond for a customer.",
    category: "Behavioral",
    difficulty: "Easy",
    modelAnswer: "Use STAR method — specific situation, clear action taken, measurable positive result."
  },
  {
    id: 8,
    question: "What is the primary duty of cabin crew? Safety or service?",
    category: "Knowledge",
    difficulty: "Easy",
    modelAnswer: "Safety is ALWAYS the primary duty. Service is important but safety comes first in every situation."
  },
];

const SCORE_PROMPT = (question: string, answer: string, modelAnswer: string) =>
  `You are a cabin crew interview assessor at a top Middle Eastern airline. Evaluate this interview answer:

Question: ${question}

Candidate's Answer: ${answer}

Model Answer Reference: ${modelAnswer}

Score this answer and respond in EXACTLY this format:

SCORE: [number 1-10]
VERDICT: [one word: Excellent / Good / Adequate / Needs Work / Poor]
STRENGTH: [one sentence on what they did well]
IMPROVE: [one sentence on the biggest thing to improve]
TIP: [one specific tip for this type of question]

Be honest and concise. Each field on its own line.`;

interface AnswerResult {
  score: number;
  verdict: string;
  strength: string;
  improve: string;
  tip: string;
}

export default function MockExamSection({ goBack, previousLabel }: Props) {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [results, setResults] = useState<Record<number, AnswerResult>>({});
  const [scoring, setScoring] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [aiEnabled, setAiEnabled] = useState(true);
  const [currentInput, setCurrentInput] = useState("");

  const question = QUESTIONS[currentQ];
  const totalAnswered = Object.keys(answers).length;
  const totalScored = Object.keys(results).length;

  const parseResult = (text: string): AnswerResult => {
    const get = (key: string) => {
      const match = text.match(new RegExp(`${key}:\\s*(.+)`));
      return match ? match[1].trim() : "";
    };
    return {
      score: parseInt(get("SCORE")) || 5,
      verdict: get("VERDICT"),
      strength: get("STRENGTH"),
      improve: get("IMPROVE"),
      tip: get("TIP"),
    };
  };

  const submitAnswer = async () => {
    if (!currentInput.trim()) return;
    const ans = currentInput.trim();
    setAnswers(prev => ({ ...prev, [question.id]: ans }));
    setCurrentInput("");

    if (aiEnabled) {
      setScoring(true);
      try {
        const response = await callClaude(
          [{ role: "user", content: SCORE_PROMPT(question.question, ans, question.modelAnswer) }],
          { max_tokens: 300 }
        );
        setResults(prev => ({ ...prev, [question.id]: parseResult(response) }));
      } catch {
        // silently fail AI scoring, still save answer
      } finally {
        setScoring(false);
      }
    }

    // Move to next question or finish
    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setSubmitted(true);
    }
  };

  const avgScore = totalScored > 0
    ? (Object.values(results).reduce((s, r) => s + r.score, 0) / totalScored).toFixed(1)
    : "—";

  const verdictColor = (v: string) => {
    if (v === "Excellent") return "text-green-400";
    if (v === "Good") return "text-blue-400";
    if (v === "Adequate") return "text-yellow-400";
    if (v === "Needs Work") return "text-orange-400";
    return "text-red-400";
  };

  const scoreColor = (s: number) => {
    if (s >= 8) return "text-green-400";
    if (s >= 6) return "text-yellow-400";
    if (s >= 4) return "text-orange-400";
    return "text-red-400";
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-900 py-20 px-4 pt-24">
        <div className="max-w-4xl mx-auto">
          <BackButton onClick={goBack} label={`Back to ${previousLabel}`} />
          <div className="text-center mb-10">
            <div className="text-5xl mb-4">📊</div>
            <h2 className="text-3xl font-bold text-white mb-2">Exam Complete!</h2>
            {aiEnabled && totalScored > 0 && (
              <p className="text-slate-400">AI Average Score: <span className="text-amber-400 font-bold text-2xl">{avgScore}/10</span></p>
            )}
          </div>

          <div className="space-y-6 mb-8">
            {QUESTIONS.map((q, i) => {
              const ans = answers[q.id];
              const result = results[q.id];
              return (
                <div key={q.id} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-6 h-6 bg-amber-500/20 text-amber-400 rounded-full flex items-center justify-center text-xs font-bold">{i + 1}</span>
                        <span className="text-xs text-slate-500 bg-white/5 px-2 py-0.5 rounded-full">{q.category}</span>
                        <span className="text-xs text-slate-500">{q.difficulty}</span>
                      </div>
                      <p className="text-white font-semibold text-sm">{q.question}</p>
                    </div>
                    {result && (
                      <div className="text-center flex-shrink-0">
                        <div className={`text-2xl font-bold ${scoreColor(result.score)}`}>{result.score}/10</div>
                        <div className={`text-xs font-bold ${verdictColor(result.verdict)}`}>{result.verdict}</div>
                      </div>
                    )}
                  </div>

                  {ans && (
                    <div className="bg-white/5 rounded-xl p-3 mb-3">
                      <p className="text-slate-500 text-xs mb-1">Your answer:</p>
                      <p className="text-slate-300 text-sm">{ans}</p>
                    </div>
                  )}

                  {result && (
                    <div className="grid sm:grid-cols-3 gap-3 text-xs">
                      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                        <p className="text-green-400 font-bold mb-1">✅ Strength</p>
                        <p className="text-slate-300">{result.strength}</p>
                      </div>
                      <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3">
                        <p className="text-orange-400 font-bold mb-1">📈 Improve</p>
                        <p className="text-slate-300">{result.improve}</p>
                      </div>
                      <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                        <p className="text-amber-400 font-bold mb-1">💡 Tip</p>
                        <p className="text-slate-300">{result.tip}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => { setAnswers({}); setResults({}); setCurrentQ(0); setSubmitted(false); setCurrentInput(""); }}
              className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-900 font-bold py-4 rounded-xl transition-all"
            >
              🔄 Retry Exam
            </button>
            <button onClick={goBack} className="flex-1 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold py-4 rounded-xl transition-all">
              Back to Guide
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 py-20 px-4 pt-24">
      <div className="max-w-3xl mx-auto">
        <BackButton onClick={goBack} label={`Back to ${previousLabel}`} />

        <div className="text-center mb-8">
          <span className="inline-block bg-red-500/20 text-red-400 text-sm font-medium px-4 py-1.5 rounded-full mb-4 border border-red-500/30">
            📝 Mock Exam
          </span>
          <h2 className="text-4xl font-bold text-white mb-2">Cabin Crew Mock Exam</h2>
          <p className="text-slate-400">Answer each question as you would in a real interview.</p>
        </div>

        {/* AI toggle */}
        <div className="flex items-center justify-between bg-amber-500/10 border border-amber-500/20 rounded-xl px-5 py-3 mb-8">
          <div>
            <p className="text-amber-400 font-semibold text-sm">🤖 AI Scoring</p>
            <p className="text-slate-500 text-xs">Claude scores each answer instantly</p>
          </div>
          <button
            onClick={() => setAiEnabled(!aiEnabled)}
            className={`w-12 h-6 rounded-full transition-all relative ${aiEnabled ? "bg-amber-500" : "bg-slate-600"}`}
          >
            <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${aiEnabled ? "left-6" : "left-0.5"}`} />
          </button>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-slate-400">Question {currentQ + 1} of {QUESTIONS.length}</span>
            <span className="text-amber-400 font-medium">{totalAnswered} answered</span>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-500"
              style={{ width: `${((currentQ) / QUESTIONS.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Current Question */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-700 border border-white/10 rounded-2xl p-8 mb-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center font-bold text-slate-900 text-lg">
              {currentQ + 1}
            </div>
            <div className="flex gap-2">
              <span className="text-xs bg-white/10 text-slate-300 px-3 py-1 rounded-full">{question.category}</span>
              <span className={`text-xs px-3 py-1 rounded-full border ${
                question.difficulty === "Easy" ? "bg-green-500/20 text-green-400 border-green-500/30" :
                question.difficulty === "Medium" ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" :
                "bg-red-500/20 text-red-400 border-red-500/30"
              }`}>{question.difficulty}</span>
            </div>
          </div>

          <p className="text-white text-xl font-semibold leading-relaxed mb-6">
            {question.question}
          </p>

          <textarea
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            placeholder="Type your answer here... Try to be specific and use examples from your experience."
            rows={6}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm resize-none focus:outline-none focus:border-amber-500/50 focus:bg-white/8 transition-all leading-relaxed"
          />

          <div className="flex items-center justify-between mt-4">
            <p className="text-slate-600 text-xs">
              {aiEnabled ? "🤖 Claude will score this answer" : "Manual exam mode"}
            </p>
            <button
              onClick={submitAnswer}
              disabled={!currentInput.trim() || scoring}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 disabled:opacity-40 text-slate-900 font-bold px-8 py-3 rounded-xl transition-all hover:scale-105"
            >
              {scoring ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                  Scoring...
                </span>
              ) : currentQ < QUESTIONS.length - 1 ? "Submit & Next →" : "Submit & Finish"}
            </button>
          </div>
        </div>

        {/* Question navigator */}
        <div className="flex flex-wrap gap-2 justify-center">
          {QUESTIONS.map((q, i) => (
            <button
              key={q.id}
              onClick={() => { if (!scoring) setCurrentQ(i); }}
              className={`w-9 h-9 rounded-full text-sm font-bold transition-all ${
                i === currentQ
                  ? "bg-amber-500 text-slate-900 scale-110"
                  : answers[q.id]
                  ? "bg-green-500/20 text-green-400 border border-green-500/30"
                  : "bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
