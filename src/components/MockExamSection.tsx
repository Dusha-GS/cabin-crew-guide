import { useState } from "react";
import { callClaude } from "../hooks/useClaude";
import BackButton from "./BackButton";

interface Props {
  goBack: () => void;
  previousLabel: string;
  tier?: string;
  onNavigatePremium?: () => void;
}

const QUESTIONS = [
  { id: 1, question: "You notice a passenger appears very anxious before takeoff. What do you do?", category: "Situational", difficulty: "Easy", modelAnswer: "Approach calmly and warmly, offer reassurance, explain procedures if needed, check in throughout flight." },
  { id: 2, question: "A passenger becomes verbally aggressive because their meal choice is unavailable. How do you handle this?", category: "Behavioral", difficulty: "Medium", modelAnswer: "Stay calm, acknowledge frustration, apologise sincerely, offer alternatives, escalate to senior crew if needed." },
  { id: 3, question: "During a flight, two passengers in the same row have a heated argument. What steps do you take?", category: "Situational", difficulty: "Medium", modelAnswer: "Intervene professionally, separate if possible, de-escalate calmly, document and inform senior crew." },
  { id: 4, question: "Why do you want to work specifically for Emirates/a Middle Eastern airline?", category: "Personal", difficulty: "Easy", modelAnswer: "Show genuine airline knowledge — routes, values, service culture, crew diversity, training reputation." },
  { id: 5, question: "A passenger is showing signs of a medical emergency (clutching chest). Walk me through your response.", category: "Emergency", difficulty: "Hard", modelAnswer: "Alert senior crew immediately, retrieve first aid kit and AED, follow emergency protocols, ask for medical professionals onboard, prepare for diversion if needed." },
  { id: 6, question: "You've been awake for 18 hours and have a 12-hour flight ahead. How do you ensure you deliver excellent service?", category: "Personal", difficulty: "Medium", modelAnswer: "Professional responsibility, rest strategies during layover, teamwork with crew, maintaining standards regardless of fatigue." },
  { id: 7, question: "A child is travelling alone and seems frightened. How do you manage their journey?", category: "Situational", difficulty: "Easy", modelAnswer: "Introduce yourself warmly, explain who you are, ensure comfort, follow Unaccompanied Minor protocols." },
  { id: 8, question: "A colleague is behaving unprofessionally during service. What do you do?", category: "Behavioral", difficulty: "Hard", modelAnswer: "Address privately after service, support the team during service, escalate to senior crew if passenger-facing, document if needed." },
];

const DEMO_QUESTIONS = [QUESTIONS[0]];

const difficultyColor: Record<string, string> = {
  Easy: "text-green-400 bg-green-400/10 border-green-400/20",
  Medium: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  Hard: "text-red-400 bg-red-400/10 border-red-400/20",
};

export default function MockExamSection({ goBack, previousLabel, tier, onNavigatePremium }: Props) {
  const isUnlocked = tier === "standard" || tier === "premium";
  const [demoMode, setDemoMode] = useState(false);
  
  const [currentQ, setCurrentQ] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loadingFeedback, setLoadingFeedback] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [examComplete, setExamComplete] = useState(false);
  const [scores, setScores] = useState<Record<number, number>>({});

  const questions = isUnlocked ? QUESTIONS : DEMO_QUESTIONS;
  const question = questions[currentQ];

  const getFeedback = async () => {
    if (!answer.trim()) return;
    setLoadingFeedback(true);
    setFeedback("");
    try {
      const result = await callClaude([{
        role: "user",
        content: `You are a cabin crew interview assessor. Assess this answer out of 10 and give concise feedback (3-4 sentences). Do not mention Claude or AI in your response.

Question: "${question.question}"
Category: ${question.category}
Candidate Answer: "${answer}"
Model Answer Guidance: "${question.modelAnswer}"

Format: Start with "Score: X/10" then a brief assessment.`,
      }]);
      setFeedback(result);
      const scoreMatch = result.match(/Score:\s*(\d+)/i);
      if (scoreMatch) setScores((prev) => ({ ...prev, [question.id]: parseInt(scoreMatch[1]) }));
    } catch {
      setFeedback("Unable to get feedback right now. Review the model answer below.");
    } finally {
      setLoadingFeedback(false);
    }
  };

  const nextQuestion = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setAnswer("");
      setFeedback("");
      setShowModel(false);
    } else {
      setExamComplete(true);
    }
  };

  const restart = () => {
    setCurrentQ(0); setAnswer(""); setFeedback("");
    setShowModel(false); setExamComplete(false);
    setScores({}); setDemoMode(false); setStarted(false);
  };

  const avgScore = Object.keys(scores).length > 0
    ? (Object.values(scores).reduce((a, b) => a + b, 0) / Object.keys(scores).length).toFixed(1)
    : null;

  // ── Gate for free users ──────────────────────────────────────────────────
  if (!isUnlocked && !demoMode) {
    return (
      <div className="min-h-screen bg-slate-900 py-20 px-4 pt-24">
        <div className="max-w-3xl mx-auto">
          <BackButton onClick={goBack} label={`Back to ${previousLabel}`} />
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-3xl font-bold text-white mb-3">Mock Exam</h2>
            <p className="text-slate-400 max-w-md mx-auto mb-10 leading-relaxed">
              Practice real cabin crew interview questions with instant scoring and personalised feedback.
            </p>
            <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-6 max-w-sm mx-auto mb-6">
              <p className="text-white font-bold mb-1">Try a free demo</p>
              <p className="text-slate-400 text-sm mb-4">Preview 1 question with full feedback — no account needed</p>
              <button onClick={() => { setDemoMode(true); setStarted(true); }} className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold py-3 rounded-xl text-sm transition-all hover:scale-[1.01]">
                🎯 Try Demo Question
              </button>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6 max-w-sm mx-auto">
              <p className="text-white font-bold mb-1">Unlock all 8 questions</p>
              <p className="text-slate-400 text-sm mb-4">Get full access with Standard or Premium plan</p>
              <button onClick={onNavigatePremium} className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-900 font-bold py-3 rounded-xl text-sm transition-all hover:scale-[1.01]">
                ⭐ View Plans
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Exam complete ────────────────────────────────────────────────────────
  if (examComplete) {
    return (
      <div className="min-h-screen bg-slate-900 py-20 px-4 pt-24">
        <div className="max-w-2xl mx-auto text-center">
          <BackButton onClick={goBack} label={`Back to ${previousLabel}`} />
          <div className="py-10">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-white mb-2">{demoMode ? "Demo Complete!" : "Exam Complete!"}</h2>
            {avgScore && <p className="text-slate-400 mb-2">Average score: <span className="text-amber-400 font-bold text-xl">{avgScore}/10</span></p>}
            <p className="text-slate-500 text-sm mb-8">{demoMode ? "You've completed the demo question." : `You answered ${questions.length} questions.`}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button onClick={restart} className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-3 px-6 rounded-xl text-sm transition-all">Restart</button>
              {demoMode && <button onClick={onNavigatePremium} className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold py-3 px-6 rounded-xl text-sm transition-all">Unlock All 8 Questions →</button>}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Exam in progress ─────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-900 py-20 px-4 pt-24">
      <div className="max-w-3xl mx-auto">
        <BackButton onClick={goBack} label={`Back to ${previousLabel}`} />

        {demoMode && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl px-4 py-3 mb-6 flex items-center justify-between">
            <p className="text-amber-400 text-sm font-medium">🎯 Demo — 1 question preview</p>
            <button onClick={onNavigatePremium} className="text-amber-400 hover:text-amber-300 text-xs underline">Unlock all 8 →</button>
          </div>
        )}

        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-slate-800 border border-white/10 rounded-full px-4 py-1.5 mb-4">
            <span className="text-slate-400 text-xs">📝 Mock Exam</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Cabin Crew Mock Exam</h2>
          <p className="text-slate-400 text-sm">Answer each question as you would in a real interview.</p>
        </div>

        <div className="flex items-center justify-between mb-6">
          <p className="text-slate-400 text-sm">Question {currentQ + 1} of {questions.length}</p>
          <div className="flex gap-1.5">
            {questions.map((_, i) => (
              <div key={i} className={`h-1.5 w-8 rounded-full transition-all ${i < currentQ ? "bg-amber-500" : i === currentQ ? "bg-amber-400" : "bg-slate-700"}`} />
            ))}
          </div>
        </div>

        <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-6 mb-5">
          <div className="flex items-center gap-2 mb-4">
            <span className={`text-xs px-2 py-0.5 rounded border font-medium ${difficultyColor[question.difficulty]}`}>{question.difficulty}</span>
            <span className="text-xs text-slate-500 bg-slate-700/50 px-2 py-0.5 rounded border border-white/5">{question.category}</span>
          </div>
          <p className="text-white text-lg font-medium leading-relaxed">{question.question}</p>
        </div>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={5}
          placeholder="Type your answer here… Be specific and use examples from your experience."
          className="w-full bg-slate-800 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-all text-sm resize-none mb-4"
        />

        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <button onClick={getFeedback} disabled={!answer.trim() || loadingFeedback}
            className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-900 font-bold py-3 rounded-xl text-sm transition-all disabled:opacity-50 flex items-center justify-center gap-2">
            {loadingFeedback ? <><span className="w-4 h-4 border-2 border-slate-900/40 border-t-slate-900 rounded-full animate-spin" />Getting feedback…</> : "Get Feedback"}
          </button>
          <button onClick={() => setShowModel(!showModel)} className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium py-3 rounded-xl text-sm transition-all">
            {showModel ? "Hide" : "Show"} Model Answer
          </button>
        </div>

        {feedback && (
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-5 mb-4">
            <p className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">Feedback</p>
            <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap">{feedback}</p>
          </div>
        )}

        {showModel && (
          <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-5 mb-4">
            <p className="text-green-400 text-xs font-bold uppercase tracking-wider mb-2">✅ Model Answer Guidance</p>
            <p className="text-slate-200 text-sm leading-relaxed">{question.modelAnswer}</p>
          </div>
        )}

        <button onClick={nextQuestion} className="w-full bg-slate-700 hover:bg-slate-600 text-white font-medium py-3 rounded-xl text-sm transition-all">
          {currentQ < questions.length - 1 ? "Next Question →" : "Finish Exam"}
        </button>
      </div>
    </div>
  );
}
