import { useState } from "react";
import { callClaude } from "../hooks/useClaude";
import BackButton from "./BackButton";

interface Props {
  goBack: () => void;
  previousLabel: string;
  tier?: string;
  onNavigatePremium?: () => void;
}

type Question = {
  id: number;
  question: string;
  category: string;
  difficulty: string;
  modelAnswer: string;
  type: "open" | "multiple";
  options?: string[];
  correctOption?: number;
};

const QUESTIONS: Question[] = [
  // ── Situational ───────────────────────────────────────────────────────────
  { id: 1, type: "open", question: "You notice a passenger appears very anxious before takeoff. What do you do?", category: "Situational", difficulty: "Easy", modelAnswer: "Approach calmly and warmly, offer reassurance, explain procedures if needed, check in throughout flight." },
  { id: 2, type: "open", question: "A passenger becomes verbally aggressive because their meal choice is unavailable. How do you handle this?", category: "Behavioral", difficulty: "Medium", modelAnswer: "Stay calm, acknowledge frustration, apologise sincerely, offer alternatives, escalate to senior crew if needed." },
  { id: 3, type: "open", question: "During a flight, two passengers in the same row have a heated argument. What steps do you take?", category: "Situational", difficulty: "Medium", modelAnswer: "Intervene professionally, separate if possible, de-escalate calmly, document and inform senior crew." },
  { id: 4, type: "open", question: "Why do you want to work specifically for Emirates/a Middle Eastern airline?", category: "Personal", difficulty: "Easy", modelAnswer: "Show genuine airline knowledge — routes, values, service culture, crew diversity, training reputation." },
  { id: 5, type: "open", question: "A passenger is showing signs of a medical emergency (clutching chest). Walk me through your response.", category: "Emergency", difficulty: "Hard", modelAnswer: "Alert senior crew immediately, assess symptoms, retrieve the emergency medical kit and AED if cardiac arrest is suspected, follow the airline's emergency medical protocol, ask for medical professionals onboard, and prepare for possible diversion if needed." },
  { id: 6, type: "open", question: "You've been awake for 18 hours and have a 12-hour flight ahead. How do you ensure you deliver excellent service?", category: "Personal", difficulty: "Medium", modelAnswer: "Professional responsibility, rest strategies during layover, teamwork with crew, maintaining standards regardless of fatigue." },
  { id: 7, type: "open", question: "A child is travelling alone and seems frightened. How do you manage their journey?", category: "Situational", difficulty: "Easy", modelAnswer: "Introduce yourself warmly, explain who you are, ensure comfort, follow Unaccompanied Minor protocols." },
  { id: 8, type: "open", question: "A colleague is behaving unprofessionally during service. What do you do?", category: "Behavioral", difficulty: "Hard", modelAnswer: "Address privately after service, support the team during service, escalate to senior crew if passenger-facing, document if needed." },
  { id: 9, type: "open", question: "Describe a time you went above and beyond for someone. What was the outcome?", category: "Personal", difficulty: "Easy", modelAnswer: "Use STAR format — Situation, Task, Action, Result. Show empathy, initiative, and positive impact." },
  { id: 10, type: "open", question: "A passenger refuses to fasten their seatbelt during turbulence. How do you handle it?", category: "Situational", difficulty: "Medium", modelAnswer: "Calmly explain the safety regulation, use firm but polite tone, escalate to senior crew if non-compliant, document the refusal." },
  { id: 11, type: "open", question: "How would you handle a language barrier with a distressed passenger?", category: "Situational", difficulty: "Medium", modelAnswer: "Use simple words, gestures, translation apps or crew who speak the language, remain calm and patient." },
  { id: 12, type: "open", question: "What does excellent customer service mean to you in a cabin crew context?", category: "Personal", difficulty: "Easy", modelAnswer: "Anticipating needs, personalised service, cultural sensitivity, consistency under pressure, making passengers feel genuinely cared for." },

  // ── Multiple Choice ───────────────────────────────────────────────────────
  { id: 13, type: "multiple", question: "What is the primary purpose of the passenger safety briefing before takeoff?", category: "Safety", difficulty: "Easy", modelAnswer: "To ensure all passengers are aware of emergency procedures and safety equipment.", options: ["To entertain passengers during boarding", "To ensure passengers know emergency procedures and safety equipment", "To introduce the cabin crew team", "To explain the meal service"], correctOption: 1 },
  { id: 14, type: "multiple", question: "A passenger has an allergic reaction during the flight. What is your FIRST action?", category: "Emergency", difficulty: "Hard", modelAnswer: "Inform the senior crew member immediately so the emergency protocol can begin.", options: ["Give them water and wait", "Inform the senior crew member immediately", "Ask other passengers for antihistamines", "Announce over PA for a doctor"], correctOption: 1 },
  { id: 15, type: "multiple", question: "Which of the following is NOT an acceptable reason to upgrade a passenger?", category: "Behavioral", difficulty: "Medium", modelAnswer: "Personal preference for the passenger is not a valid or ethical reason for an upgrade.", options: ["Medical necessity approved by senior crew", "Operational reasons (overbooking)", "Personal preference for the passenger", "Unaccompanied minor needing closer supervision"], correctOption: 2 },
  { id: 16, type: "multiple", question: "How should you address a passenger who appears intoxicated and is requesting more alcohol?", category: "Situational", difficulty: "Hard", modelAnswer: "Politely decline and inform the senior crew member — serving more alcohol to an intoxicated passenger is against aviation regulations.", options: ["Serve them one last drink and then stop", "Politely decline and inform senior crew", "Ignore the request and avoid the passenger", "Ask other passengers to intervene"], correctOption: 1 },
  { id: 17, type: "multiple", question: "What does CRM stand for in aviation?", category: "Knowledge", difficulty: "Medium", modelAnswer: "Crew Resource Management — the use of all available resources to ensure safe and efficient operations.", options: ["Cabin Resource Management", "Crew Resource Management", "Customer Relations Manual", "Crisis Response Method"], correctOption: 1 },
  { id: 18, type: "multiple", question: "During an emergency evacuation, which of the following is a widely used cabin crew command?", category: "Emergency", difficulty: "Hard", modelAnswer: "A widely used evacuation command is: 'Release seatbelts, leave everything, come this way!' However, the exact wording varies by airline — you will learn your specific airline's commands during initial training.", options: ["Please gather your belongings and proceed to the exit", "Release seatbelts, leave everything, come this way", "Remain seated until further instructions", "Please walk calmly to the nearest exit"], correctOption: 1 },
  { id: 19, type: "multiple", question: "Which airline is headquartered in Doha, Qatar?", category: "Knowledge", difficulty: "Easy", modelAnswer: "Qatar Airways is headquartered at Hamad International Airport in Doha, Qatar.", options: ["Emirates", "Etihad Airways", "Qatar Airways", "flydubai"], correctOption: 2 },

  // ── Math / Time Zone ──────────────────────────────────────────────────────
  { id: 20, type: "multiple", question: "You depart Dubai (UTC+4) at 08:00 local time on a flight to London (UTC+1). The flight duration is 7 hours 30 minutes. What is the local arrival time in London?", category: "Math", difficulty: "Medium", modelAnswer: "Depart 08:00 Dubai (UTC+4) = 04:00 UTC. Add 7h30m = 11:30 UTC. London UTC+1 = 12:30 local time.", options: ["12:30", "13:30", "15:30", "11:30"], correctOption: 0 },
  { id: 21, type: "multiple", question: "A flight departs Bangkok (UTC+7) at 23:45 and arrives in Dubai (UTC+4) after 6 hours 10 minutes. What is the local arrival time in Dubai?", category: "Math", difficulty: "Hard", modelAnswer: "Depart 23:45 Bangkok (UTC+7) = 16:45 UTC. Add 6h10m = 22:55 UTC. Dubai UTC+4 = 02:55 next day.", options: ["02:55", "03:55", "01:55", "04:55"], correctOption: 0 },
  { id: 22, type: "multiple", question: "You are serving a row of 4 passengers. Each meal tray costs the airline $18.50. What is the total cost for the row?", category: "Math", difficulty: "Easy", modelAnswer: "4 × $18.50 = $74.00", options: ["$64.00", "$72.00", "$74.00", "$76.50"], correctOption: 2 },
  { id: 23, type: "multiple", question: "A flight from Doha (UTC+3) departs at 14:20 local time. It arrives in New York (UTC-5) after 14 hours 45 minutes. What is the local arrival time in New York?", category: "Math", difficulty: "Hard", modelAnswer: "Depart 14:20 Doha (UTC+3) = 11:20 UTC. Add 14h45m = 02:05 UTC next day. New York UTC-5 = 21:05 same day.", options: ["21:05", "22:05", "20:05", "23:05"], correctOption: 0 },
  { id: 24, type: "multiple", question: "You have 47 economy passengers and each is allowed 23kg of checked baggage. What is the total maximum checked baggage weight for the cabin?", category: "Math", difficulty: "Medium", modelAnswer: "47 × 23 = 1,081 kg", options: ["1,061 kg", "1,081 kg", "1,101 kg", "1,021 kg"], correctOption: 1 },
  { id: 25, type: "multiple", question: "A flight departs Abu Dhabi (UTC+4) at 06:30 and arrives in Paris (UTC+2) at 11:45 local Paris time. What is the actual flight duration?", category: "Math", difficulty: "Hard", modelAnswer: "Depart 06:30 Abu Dhabi (UTC+4) = 02:30 UTC. Arrive 11:45 Paris (UTC+2) = 09:45 UTC. Duration = 7 hours 15 minutes.", options: ["5h 15min", "6h 15min", "7h 15min", "8h 15min"], correctOption: 2 },
];

const DEMO_QUESTIONS: Question[] = [QUESTIONS[0]];

const difficultyColor: Record<string, string> = {
  Easy: "text-green-400 bg-green-400/10 border-green-400/20",
  Medium: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  Hard: "text-red-400 bg-red-400/10 border-red-400/20",
};

const categoryColor: Record<string, string> = {
  Math: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  Knowledge: "text-purple-400 bg-purple-400/10 border-purple-400/20",
  Emergency: "text-red-400 bg-red-400/10 border-red-400/20",
  Safety: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
};

export default function MockExamSection({ goBack, previousLabel, tier, onNavigatePremium }: Props) {
  const isUnlocked = tier === "standard" || tier === "premium";
  const [demoMode, setDemoMode] = useState(false);

  const [currentQ, setCurrentQ] = useState(0);
  const [answer, setAnswer] = useState("");
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [optionSubmitted, setOptionSubmitted] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [loadingFeedback, setLoadingFeedback] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [examComplete, setExamComplete] = useState(false);
  const [scores, setScores] = useState<Record<number, number>>({});
  const [correctCount, setCorrectCount] = useState(0);

  const questions = isUnlocked ? QUESTIONS : DEMO_QUESTIONS;
  const question = questions[currentQ];
  const isMultiple = question.type === "multiple";

  const getFeedback = async () => {
    if (!answer.trim()) return;
    setLoadingFeedback(true);
    setFeedback("");
    try {
      const result = await callClaude([{
        role: "user",
        content: `You are a cabin crew interview assessor. Assess this answer out of 10 and give concise, practical feedback (3-4 sentences). Focus on the quality of examples used, alignment with cabin crew values, and one specific improvement suggestion.

Question: "${question.question}"
Category: ${question.category}
Candidate Answer: "${answer}"
Model Answer Guidance: "${question.modelAnswer}"

Format: Start with "Score: X/10" then give your assessment.`,
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

  const submitOption = () => {
    if (selectedOption === null) return;
    setOptionSubmitted(true);
    const isCorrect = selectedOption === question.correctOption;
    if (isCorrect) setCorrectCount((c) => c + 1);
    setScores((prev) => ({ ...prev, [question.id]: isCorrect ? 10 : 0 }));
  };

  const nextQuestion = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setAnswer("");
      setFeedback("");
      setShowModel(false);
      setSelectedOption(null);
      setOptionSubmitted(false);
    } else {
      setExamComplete(true);
    }
  };

  const restart = () => {
    setCurrentQ(0); setAnswer(""); setFeedback("");
    setShowModel(false); setExamComplete(false);
    setScores({}); setDemoMode(false);
    setSelectedOption(null); setOptionSubmitted(false);
    setCorrectCount(0);
  };

  const avgScore = Object.keys(scores).length > 0
    ? (Object.values(scores).reduce((a, b) => a + b, 0) / Object.keys(scores).length).toFixed(1)
    : null;

  const multipleChoiceTotal = questions.filter(q => q.type === "multiple").length;
  const answeredMultiple = questions.filter(q => q.type === "multiple" && scores[q.id] !== undefined).length;

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
              25 real cabin crew interview questions — situational, behavioral, knowledge, and math/time zone calculations.
            </p>
            <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-6 max-w-sm mx-auto mb-6">
              <p className="text-white font-bold mb-1">Try a free demo</p>
              <p className="text-slate-400 text-sm mb-4">Preview 1 question with full feedback — no account needed</p>
              <button
                onClick={() => { setDemoMode(true); }}
                className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold py-3 rounded-xl text-sm transition-all hover:scale-[1.01]"
              >
                🎯 Try Demo Question
              </button>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6 max-w-sm mx-auto">
              <p className="text-white font-bold mb-1">Unlock all 25 questions</p>
              <p className="text-slate-400 text-sm mb-4">Get full access with Standard or Premium plan</p>
              <button
                onClick={onNavigatePremium}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-900 font-bold py-3 rounded-xl text-sm transition-all hover:scale-[1.01]"
              >
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
            <h2 className="text-3xl font-bold text-white mb-2">
              {demoMode ? "Demo Complete!" : "Exam Complete!"}
            </h2>
            {avgScore && (
              <p className="text-slate-400 mb-2">
                Average score: <span className="text-amber-400 font-bold text-xl">{avgScore}/10</span>
              </p>
            )}
            {!demoMode && multipleChoiceTotal > 0 && (
              <p className="text-slate-400 mb-2">
                Multiple choice: <span className="text-blue-400 font-bold">{correctCount}/{answeredMultiple} correct</span>
              </p>
            )}
            <p className="text-slate-500 text-sm mb-8">
              {demoMode ? "You've completed the demo question." : `You answered all ${questions.length} questions.`}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={restart}
                className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-3 px-6 rounded-xl text-sm transition-all"
              >
                Restart
              </button>
              {demoMode && (
                <button
                  onClick={onNavigatePremium}
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold py-3 px-6 rounded-xl text-sm transition-all"
                >
                  Unlock All 25 Questions →
                </button>
              )}
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
            <button onClick={onNavigatePremium} className="text-amber-400 hover:text-amber-300 text-xs underline">
              Unlock all 25 →
            </button>
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
          <div className="flex gap-1 flex-wrap justify-end max-w-[200px]">
            {questions.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 w-5 rounded-full transition-all ${
                  i < currentQ ? "bg-amber-500" : i === currentQ ? "bg-amber-400" : "bg-slate-700"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-6 mb-5">
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className={`text-xs px-2 py-0.5 rounded border font-medium ${difficultyColor[question.difficulty]}`}>
              {question.difficulty}
            </span>
            <span className={`text-xs px-2 py-0.5 rounded border font-medium ${categoryColor[question.category] || "text-slate-400 bg-slate-700/50 border-white/5"}`}>
              {question.category}
            </span>
            {isMultiple && (
              <span className="text-xs px-2 py-0.5 rounded border font-medium text-slate-400 bg-slate-700/50 border-white/5">
                Multiple Choice
              </span>
            )}
          </div>
          <p className="text-white text-lg font-medium leading-relaxed">{question.question}</p>
        </div>

        {/* Multiple choice options */}
        {isMultiple ? (
          <div className="space-y-3 mb-5">
            {question.options!.map((option, i) => {
              let style = "border-white/10 bg-slate-800/60 text-slate-300 hover:border-amber-500/40 hover:bg-amber-500/5";
              if (optionSubmitted) {
                if (i === question.correctOption) style = "border-green-500/60 bg-green-500/10 text-green-300";
                else if (i === selectedOption) style = "border-red-500/60 bg-red-500/10 text-red-300";
                else style = "border-white/5 bg-slate-800/30 text-slate-500";
              } else if (selectedOption === i) {
                style = "border-amber-500/60 bg-amber-500/10 text-amber-300";
              }
              return (
                <button
                  key={i}
                  disabled={optionSubmitted}
                  onClick={() => setSelectedOption(i)}
                  className={`w-full text-left px-5 py-4 rounded-xl border transition-all text-sm font-medium ${style}`}
                >
                  <span className="text-xs font-bold mr-3 opacity-60">{["A", "B", "C", "D"][i]}</span>
                  {option}
                </button>
              );
            })}

            {!optionSubmitted ? (
              <button
                onClick={submitOption}
                disabled={selectedOption === null}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-900 font-bold py-3 rounded-xl text-sm transition-all disabled:opacity-50"
              >
                Submit Answer
              </button>
            ) : (
              <div className={`rounded-2xl p-5 ${selectedOption === question.correctOption ? "bg-green-500/10 border border-green-500/20" : "bg-red-500/10 border border-red-500/20"}`}>
                <p className={`text-xs font-bold uppercase tracking-wider mb-2 ${selectedOption === question.correctOption ? "text-green-400" : "text-red-400"}`}>
                  {selectedOption === question.correctOption ? "✅ Correct!" : "❌ Incorrect"}
                </p>
                <p className="text-slate-200 text-sm leading-relaxed">{question.modelAnswer}</p>
              </div>
            )}
          </div>
        ) : (
          <>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              rows={5}
              placeholder="Type your answer here… Be specific and use examples from your experience."
              className="w-full bg-slate-800 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-all text-sm resize-none mb-4"
            />

            <div className="flex flex-col sm:flex-row gap-3 mb-5">
              <button
                onClick={getFeedback}
                disabled={!answer.trim() || loadingFeedback}
                className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-900 font-bold py-3 rounded-xl text-sm transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loadingFeedback ? (
                  <>
                    <span className="w-4 h-4 border-2 border-slate-900/40 border-t-slate-900 rounded-full animate-spin" />
                    Getting feedback…
                  </>
                ) : (
                  "Get Feedback"
                )}
              </button>
              <button
                onClick={() => setShowModel(!showModel)}
                className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium py-3 rounded-xl text-sm transition-all"
              >
                {showModel ? "Hide" : "Show"} Model Answer
              </button>
            </div>

            {feedback && (
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-5 mb-4">
                <p className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">Feedback</p>
                <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap">{feedback}</p>
                <p className="text-slate-600 text-xs mt-3 pt-3 border-t border-white/5">
                  ⓘ Feedback is AI-generated and for practice purposes only — not a substitute for professional interview coaching.
                </p>
              </div>
            )}

            {showModel && (
              <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-5 mb-4">
                <p className="text-green-400 text-xs font-bold uppercase tracking-wider mb-2">✅ Model Answer Guidance</p>
                <p className="text-slate-200 text-sm leading-relaxed">{question.modelAnswer}</p>
              </div>
            )}
          </>
        )}

        <button
          onClick={nextQuestion}
          className="w-full bg-slate-700 hover:bg-slate-600 text-white font-medium py-3 rounded-xl text-sm transition-all mt-2"
        >
          {currentQ < questions.length - 1 ? "Next Question →" : "Finish Exam"}
        </button>
      </div>
    </div>
  );
}
