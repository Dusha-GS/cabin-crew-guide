import { useState, useRef, useEffect } from "react";
import { callClaude, type ClaudeMessage } from "../hooks/useClaude";
import { type MembershipTier, getMembershipState, recordMockInterviewUsed } from "../hooks/useMembership";
import UpgradeGate from "./UpgradeGate";
import BackButton from "./BackButton";

interface Props { goBack: () => void; previousLabel: string; tier: MembershipTier; onNavigatePremium: () => void; }

type Airline = "Emirates" | "Etihad Airways" | "Qatar Airways" | "flydubai" | "Air Arabia";
type Stage = "setup" | "interview" | "feedback";

const AIRLINES: Airline[] = ["Emirates", "Etihad Airways", "Qatar Airways", "flydubai", "Air Arabia"];

const SYSTEM_PROMPT = (airline: Airline, difficulty: string) => `You are a senior cabin crew recruiter at ${airline}, one of the world's leading airlines. You are conducting a simulated practice job interview for a cabin crew position.

Your interview style:
- Professional, warm, but evaluative
- Ask ONE question at a time — never multiple questions together
- Listen carefully to answers and ask natural follow-up questions
- Vary question types: personal, behavioral (STAR method), situational, airline knowledge
- After each answer, give brief genuine feedback (1-2 sentences) before your next question
- Use the recruiter's real knowledge of ${airline}: routes, values, fleet, culture
- Difficulty level: ${difficulty}
- After 8-10 exchanges, wrap up and offer a final overall assessment

Interview stages to cover naturally:
1. Welcome & icebreaker
2. Motivation & airline knowledge  
3. Customer service experience
4. Situational/emergency scenarios
5. Teamwork & conflict
6. Personal values & lifestyle readiness

Format your response as:
[Feedback on their answer if applicable, then your next question]

Keep each response concise — 2-4 sentences max. This feels like a real interview conversation, not a quiz.

Start by warmly welcoming the candidate and asking your first question.`;

const FEEDBACK_PROMPT = (transcript: string, airline: Airline) => `You are a senior cabin crew recruiter at ${airline}. Review this mock interview transcript and provide a comprehensive final assessment.

Transcript:
${transcript}

Provide feedback in this exact format:

## Overall Score: [X/10]

## Strengths
- [strength 1]
- [strength 2]
- [strength 3]

## Areas to Improve
- [area 1 with specific advice]
- [area 2 with specific advice]

## Airline Fit for ${airline}
[2-3 sentences on how well they match ${airline}'s publicly known culture and values — note this is based on general public information]

## Top 3 Action Points Before Your Real Interview
1. [specific actionable tip]
2. [specific actionable tip]
3. [specific actionable tip]

Be honest but encouraging. Base your assessment on the candidate's responses in this session.`;

export default function AIMockInterviewSection({ goBack, previousLabel, tier, onNavigatePremium }: Props) {
  const membership = getMembershipState(tier);
  const [stage, setStage] = useState<Stage>("setup");
  const [selectedAirline, setSelectedAirline] = useState<Airline>("Emirates");
  const [difficulty, setDifficulty] = useState<"Beginner" | "Intermediate" | "Advanced">("Intermediate");
  const [messages, setMessages] = useState<ClaudeMessage[]>([]);
  const [displayMessages, setDisplayMessages] = useState<{ role: string; content: string; feedback?: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [finalFeedback, setFinalFeedback] = useState("");
  const [questionCount, setQuestionCount] = useState(0);
  const [error, setError] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [displayMessages, loading]);

  const startInterview = async () => {
    setLoading(true);
    setError("");
    try {
      const systemMsg = SYSTEM_PROMPT(selectedAirline, difficulty);
      const initMessages: ClaudeMessage[] = [
        { role: "user", content: "Please start the interview." }
      ];
      const response = await callClaude(initMessages, {
        system: systemMsg,
        max_tokens: 300,
      });
      setMessages(initMessages.concat([{ role: "assistant", content: response }]));
      setDisplayMessages([{ role: "assistant", content: response }]);
      setStage("interview");
      setQuestionCount(1);
      if (tier === "free") recordMockInterviewUsed();
    } catch (e: unknown) {
      setError((e as Error).message || "Failed to start interview. Check your API key.");
    } finally {
      setLoading(false);
    }
  };

  const sendAnswer = async () => {
    if (!input.trim() || loading) return;
    const userText = input.trim();
    setInput("");
    setLoading(true);
    setError("");

    const newMessages: ClaudeMessage[] = [
      ...messages,
      { role: "user", content: userText }
    ];

    setDisplayMessages(prev => [...prev, { role: "user", content: userText }]);

    try {
      const response = await callClaude(newMessages, {
        system: SYSTEM_PROMPT(selectedAirline, difficulty),
        max_tokens: 400,
      });
      setMessages([...newMessages, { role: "assistant", content: response }]);
      setDisplayMessages(prev => [...prev, { role: "assistant", content: response }]);
      setQuestionCount(q => q + 1);
    } catch (e: unknown) {
      setError((e as Error).message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const endInterview = async () => {
    setFeedbackLoading(true);
    setStage("feedback");
    setError("");
    const transcript = displayMessages
      .map(m => `${m.role === "user" ? "Candidate" : "Recruiter"}: ${m.content}`)
      .join("\n\n");
    try {
      const feedback = await callClaude(
        [{ role: "user", content: FEEDBACK_PROMPT(transcript, selectedAirline) }],
        { max_tokens: 1000 }
      );
      setFinalFeedback(feedback);
    } catch (e: unknown) {
      setError((e as Error).message || "Failed to generate feedback.");
    } finally {
      setFeedbackLoading(false);
    }
  };

  const reset = () => {
    setStage("setup");
    setMessages([]);
    setDisplayMessages([]);
    setInput("");
    setFinalFeedback("");
    setQuestionCount(0);
    setError("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendAnswer();
    }
  };

  // ── UPGRADE GATE ──────────────────────────────────────────────
  if (!membership.canUseMockInterview) {
    return (
      <div className="min-h-screen bg-slate-900 py-20 px-4 pt-24">
        <div className="max-w-3xl mx-auto">
          <BackButton onClick={goBack} label={`Back to ${previousLabel}`} />
          <div className="text-center mb-8">
            <span className="inline-block bg-amber-500/20 text-amber-400 text-sm font-medium px-4 py-1.5 rounded-full mb-4 border border-amber-500/30">
              🤖 AI Mock Interview
            </span>
            <h2 className="text-3xl font-bold text-white mb-3">Free trial session complete</h2>
            <p className="text-slate-400">Upgrade to Standard or Premium for unlimited mock interviews.</p>
          </div>
          <UpgradeGate
            requiredTier="standard"
            featureName="Unlimited Mock Interviews"
            featureDescription="Practice as many times as you need with a simulated Emirates, Qatar Airways or Etihad recruiter."
            onNavigatePremium={onNavigatePremium}
          />
        </div>
      </div>
    );
  }

  // ── SETUP SCREEN ──────────────────────────────────────────────
  if (stage === "setup") {
    return (
      <div className="min-h-screen bg-slate-900 py-20 px-4 pt-24">
        <div className="max-w-3xl mx-auto">
          <BackButton onClick={goBack} label={`Back to ${previousLabel}`} />
          <div className="text-center mb-10">
            <span className="inline-block bg-amber-500/20 text-amber-400 text-sm font-medium px-4 py-1.5 rounded-full mb-4 border border-amber-500/30">
              🤖 AI Mock Interview
            </span>
            <h2 className="text-4xl font-bold text-white mb-4">AI Mock Interview</h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Practice with a simulated AI recruiter from your chosen airline. Get instant feedback on every answer.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-6">
            <h3 className="text-white font-bold text-lg mb-5">Choose Your Interview Settings</h3>

            {/* Airline picker */}
            <div className="mb-6">
              <p className="text-slate-400 text-sm font-medium mb-3">Select Airline</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {AIRLINES.map((a) => (
                  <button
                    key={a}
                    onClick={() => setSelectedAirline(a)}
                    className={`py-3 px-4 rounded-xl text-sm font-semibold border transition-all duration-200 ${
                      selectedAirline === a
                        ? "bg-amber-500 text-slate-900 border-amber-500 shadow-lg shadow-amber-500/20 scale-[1.02]"
                        : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10"
                    }`}
                  >
                    ✈ {a}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty picker */}
            <div className="mb-8">
              <p className="text-slate-400 text-sm font-medium mb-3">Difficulty Level</p>
              <div className="grid grid-cols-3 gap-3">
                {(["Beginner", "Intermediate", "Advanced"] as const).map((d) => (
                  <button
                    key={d}
                    onClick={() => setDifficulty(d)}
                    className={`py-3 px-4 rounded-xl text-sm font-semibold border transition-all duration-200 ${
                      difficulty === d
                        ? d === "Beginner"
                          ? "bg-green-500 text-white border-green-500"
                          : d === "Intermediate"
                          ? "bg-amber-500 text-slate-900 border-amber-500"
                          : "bg-red-500 text-white border-red-500"
                        : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10"
                    }`}
                  >
                    {d === "Beginner" ? "🟢" : d === "Intermediate" ? "🟡" : "🔴"} {d}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-5">
                <p className="text-red-400 text-sm">⚠️ {error}</p>
              </div>
            )}

            <button
              onClick={startInterview}
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-50 text-slate-900 font-bold py-4 rounded-xl transition-all hover:scale-[1.01] text-lg shadow-lg shadow-amber-500/20"
            >
              {loading ? "Starting your interview..." : `Start ${selectedAirline} Interview →`}
            </button>
          </div>

          {/* What to expect */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: "💬", title: "Real Questions", desc: "Airline-specific questions from a simulated AI recruiter" },
              { icon: "⚡", title: "Instant Feedback", desc: "Get feedback on each answer as you go" },
              { icon: "📊", title: "Final Assessment", desc: "AI-generated score & action plan at the end" },
            ].map((item) => (
              <div key={item.title} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                <div className="text-2xl mb-2">{item.icon}</div>
                <p className="text-white font-semibold text-sm mb-1">{item.title}</p>
                <p className="text-slate-400 text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── FEEDBACK SCREEN ───────────────────────────────────────────
  if (stage === "feedback") {
    return (
      <div className="min-h-screen bg-slate-900 py-20 px-4 pt-24">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">📊</div>
            <h2 className="text-3xl font-bold text-white mb-2">Interview Complete</h2>
            <p className="text-slate-400">{selectedAirline} — {difficulty} Level — {questionCount} exchanges</p>
          </div>

          {feedbackLoading ? (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
              <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-slate-400">Reviewing your interview...</p>
            </div>
          ) : (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-6">
              <div className="prose prose-invert max-w-none">
                {finalFeedback.split("\n").map((line, i) => {
                  if (line.startsWith("## ")) {
                    return <h3 key={i} className="text-amber-400 font-bold text-xl mt-6 mb-3">{line.replace("## ", "")}</h3>;
                  }
                  if (line.startsWith("- ")) {
                    return (
                      <div key={i} className="flex items-start gap-2 mb-2">
                        <span className="text-amber-400 mt-1 flex-shrink-0">◆</span>
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
                  if (line.trim() === "") return <div key={i} className="h-2" />;
                  return <p key={i} className="text-slate-300 text-sm leading-relaxed">{line}</p>;
                })}
              </div>
              {/* Smallest AI disclosure */}
              <p className="text-slate-600 text-xs mt-5 pt-4 border-t border-white/5">
                ⓘ Assessment generated by AI — for practice only. Not a substitute for professional interview coaching.
              </p>
            </div>
          )}

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-5">
              <p className="text-red-400 text-sm">⚠️ {error}</p>
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={reset}
              className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-900 font-bold py-4 rounded-xl transition-all"
            >
              🔄 Practice Again
            </button>
            <button
              onClick={goBack}
              className="flex-1 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold py-4 rounded-xl transition-all"
            >
              Back to Guide
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── INTERVIEW CHAT SCREEN ─────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col pt-16">
      {/* Chat header — clearly labelled as simulated */}
      <div className="border-b border-white/10 bg-slate-900/95 backdrop-blur px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BackButton onClick={() => { if (confirm("End this interview session?")) reset(); }} label="End Interview" />
        </div>
        <div className="text-center">
          <p className="text-white font-bold text-sm">🤖 Simulated {selectedAirline} Recruiter</p>
          <p className="text-slate-400 text-xs">{difficulty} · {questionCount} exchanges · AI Practice</p>
        </div>
        <button
          onClick={endInterview}
          disabled={questionCount < 3}
          className="bg-amber-500/20 hover:bg-amber-500/30 disabled:opacity-40 text-amber-400 border border-amber-500/30 text-sm font-semibold px-4 py-2 rounded-lg transition-all"
        >
          Finish & Get Feedback
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 max-w-3xl w-full mx-auto">
        <div className="space-y-4">
          {displayMessages.map((msg, i) => (
            <div key={i} className={`flex gap-3 animate-fadeIn ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              {msg.role === "assistant" && (
                <div className="w-9 h-9 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-slate-900 font-bold text-sm flex-shrink-0 mt-1">
                  🤖
                </div>
              )}
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-amber-500/20 border border-amber-500/30 text-white ml-auto"
                  : "bg-white/5 border border-white/10 text-slate-200"
              }`}>
                {msg.content}
              </div>
              {msg.role === "user" && (
                <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 mt-1">
                  You
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 justify-start animate-fadeIn">
              <div className="w-9 h-9 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-slate-900 font-bold text-sm flex-shrink-0">
                🤖
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3">
                <div className="flex gap-1 items-center h-5">
                  <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-center">
              <p className="text-red-400 text-sm">⚠️ {error}</p>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      <div className="border-t border-white/10 bg-slate-900/95 backdrop-blur px-4 py-4">
        <div className="max-w-3xl mx-auto flex gap-3">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your answer... (Enter to send, Shift+Enter for new line)"
            disabled={loading}
            rows={2}
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm resize-none focus:outline-none focus:border-amber-500/50 focus:bg-white/8 transition-all disabled:opacity-50"
          />
          <button
            onClick={sendAnswer}
            disabled={!input.trim() || loading}
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-40 text-slate-900 font-bold px-5 rounded-xl transition-all hover:scale-105"
          >
            →
          </button>
        </div>
        <p className="text-slate-600 text-xs text-center mt-2">
          After 3+ exchanges, click "Finish & Get Feedback" for your full AI assessment
        </p>
      </div>
    </div>
  );
}
