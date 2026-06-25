import { useState } from "react";
import BackButton from "./BackButton";

interface Props {
  goBack: () => void;
  previousLabel: string;
  isPremium: boolean;
  onUpgrade: () => void;
}

const CATEGORIES = ["Emirates", "Qatar Airways", "Etihad Airways", "flydubai", "Air Arabia", "Interview Tips", "CV Help", "Life as Crew"];

const FORMSPREE_URL = "https://formspree.io/f/xnjwjbbl";

export default function AskCabinCrewSection({ goBack, previousLabel, isPremium, onUpgrade }: Props) {
  const [newQuestion, setNewQuestion] = useState("");
  const [newQuestionCategory, setNewQuestionCategory] = useState("Interview Tips");
  const [authorName, setAuthorName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const submitQuestion = async () => {
    if (!newQuestion.trim() || !authorName.trim() || !authorEmail.trim()) return;
    setSubmitting(true);
    try {
      await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: authorName.trim(),
          email: authorEmail.trim(),
          category: newQuestionCategory,
          question: newQuestion.trim(),
        }),
      });
      setNewQuestion("");
      setAuthorName("");
      setAuthorEmail("");
      setSubmitted(true);
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Paywall screen
  if (!isPremium) {
    return (
      <div className="min-h-screen bg-slate-900 py-20 px-4 pt-24">
        <div className="max-w-3xl mx-auto">
          <BackButton onClick={goBack} label={`Back to ${previousLabel}`} />
          <div className="text-center mb-10">
            <div className="text-6xl mb-4">✈️</div>
            <h2 className="text-4xl font-bold text-white mb-4">Ask Cabin Crew</h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Post your questions and get personal answers from a real cabin crew expert — exclusively for Premium members.
            </p>
          </div>

          <div className="bg-gradient-to-br from-amber-900/30 to-slate-800 border border-amber-500/30 rounded-2xl p-8 mb-8">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {[
                { icon: "✋", title: "Real Expert Answers", desc: "Every question is personally answered by a former Middle Eastern airline cabin crew professional" },
                { icon: "📧", title: "Direct to Your Email", desc: "Answers delivered privately to your inbox — no public forum, no waiting around" },
                { icon: "✈️", title: "Insider Knowledge", desc: "Get honest, specific advice you won't find anywhere else" },
              ].map((item) => (
                <div key={item.title} className="text-center">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <p className="text-white font-bold text-sm mb-2">{item.title}</p>
                  <p className="text-slate-400 text-xs">{item.desc}</p>
                </div>
              ))}
            </div>
            <button
              onClick={onUpgrade}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-900 font-bold py-4 rounded-xl text-lg transition-all hover:scale-[1.01] shadow-lg shadow-amber-500/20"
            >
              Unlock Premium — $25/month →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 py-20 px-4 pt-24">
      <div className="max-w-2xl mx-auto">
        <BackButton onClick={goBack} label={`Back to ${previousLabel}`} />

        <div className="text-center mb-10">
          <span className="inline-block bg-amber-500/20 text-amber-400 text-sm font-medium px-4 py-1.5 rounded-full mb-4 border border-amber-500/30">
            ✈️ Premium Members Only
          </span>
          <h2 className="text-4xl font-bold text-white mb-3">Ask Cabin Crew</h2>
          <p className="text-slate-400 text-base max-w-lg mx-auto">
            Post your question and our expert will reply to your email as soon as possible, typically within 2–3 business days.
          </p>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-700/80 border border-amber-500/20 rounded-2xl p-8">
          <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
            <span>💬</span> Post Your Question
          </h3>

          {submitted ? (
            <div className="bg-green-500/15 border border-green-500/30 rounded-xl p-8 text-center">
              <div className="text-4xl mb-4">✅</div>
              <p className="text-green-400 font-bold text-xl mb-2">Question submitted!</p>
              <p className="text-slate-400 text-sm leading-relaxed">
                We'll reply to your email as soon as possible, typically within 2–3 business days.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 bg-white/10 hover:bg-white/20 border border-white/10 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-all"
              >
                Ask another question
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  value={authorName}
                  onChange={e => setAuthorName(e.target.value)}
                  placeholder="Your first name"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-500/50 transition-all"
                />
                <input
                  value={authorEmail}
                  onChange={e => setAuthorEmail(e.target.value)}
                  placeholder="Your email address"
                  type="email"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-500/50 transition-all"
                />
              </div>
              <select
                value={newQuestionCategory}
                onChange={e => setNewQuestionCategory(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-500/50 transition-all"
              >
                {CATEGORIES.map(c => (
                  <option key={c} value={c} className="bg-slate-800">{c}</option>
                ))}
              </select>
              <textarea
                value={newQuestion}
                onChange={e => setNewQuestion(e.target.value)}
                placeholder="What would you like to ask? Be specific — the more detail you give, the better the answer."
                rows={5}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm resize-none focus:outline-none focus:border-amber-500/50 transition-all"
              />
              <button
                onClick={submitQuestion}
                disabled={!newQuestion.trim() || !authorName.trim() || !authorEmail.trim() || submitting}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 disabled:opacity-40 text-slate-900 font-bold py-4 rounded-xl transition-all hover:scale-[1.01] text-base"
              >
                {submitting ? "Sending..." : "Post Question"}
              </button>
              <p className="text-slate-500 text-xs text-center">
                Our expert will reply directly to your email, typically within 2–3 business days. ✈️
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
