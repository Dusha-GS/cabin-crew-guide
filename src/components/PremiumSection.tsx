import BackButton from "./BackButton";

interface Props {
  goBack: () => void;
  previousLabel: string;
  setActiveSection: (s: string) => void;
}

const WHOP_LINK = "https://whop.com/your-product-link"; // ← Replace with your actual Whop link

export default function PremiumSection({ goBack, previousLabel, setActiveSection }: Props) {
  const features = [
    {
      icon: "🤖",
      title: "Unlimited AI Mock Interviews",
      desc: "Practice with Claude AI acting as a real Emirates, Qatar Airways or Etihad recruiter. No limits.",
      tag: "INCLUDED",
    },
    {
      icon: "📄",
      title: "AI CV Review",
      desc: "Paste your CV and get detailed recruiter-level feedback, rewrites and a score tailored to ME airlines.",
      tag: "INCLUDED",
    },
    {
      icon: "🎙️",
      title: "Voice Exam (25 Questions)",
      desc: "Full spoken mock interview with 25 advanced questions from former Middle East cabin crew professionals.",
      tag: "PREMIUM",
    },
    {
      icon: "✍️",
      title: "AI Essay Assessment",
      desc: "Submit written answers and get detailed essay-style feedback on structure, content and airline alignment.",
      tag: "PREMIUM",
    },
    {
      icon: "✈️",
      title: "Aviation Math Practice",
      desc: "Timed math tests covering weight & balance, time zones, and conversions — commonly tested by major airlines.",
      tag: "PREMIUM",
    },
    {
      icon: "🎓",
      title: "Former Crew Q&A Library",
      desc: "Exclusive answers and stories from former Middle East cabin crew — real insider knowledge.",
      tag: "PREMIUM",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900 py-20 px-4 pt-24">
      <div className="max-w-4xl mx-auto">
        <BackButton onClick={goBack} label={`Back to ${previousLabel}`} />

        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">⭐</div>
          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 rounded-full px-5 py-2 mb-5">
            <span className="text-amber-400 font-bold text-sm">PREMIUM FINAL LAB</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
              Get Hired
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            One payment. Lifetime access. The most comprehensive cabin crew prep package for Middle Eastern airlines.
          </p>
        </div>

        {/* Price card */}
        <div className="bg-gradient-to-br from-amber-500/20 to-slate-800 border border-amber-500/40 rounded-3xl p-8 mb-10 text-center relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-400/10 rounded-full blur-2xl" />
          <div className="relative">
            <p className="text-slate-400 text-sm mb-2">One-time payment</p>
            <div className="text-6xl font-bold text-white mb-1">$25</div>
            <p className="text-amber-400 text-sm mb-6">Lifetime access — no subscription</p>
            <a
              href={WHOP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-900 font-bold px-12 py-4 rounded-xl shadow-lg shadow-amber-500/30 transition-all hover:scale-105 text-lg"
            >
              Unlock Premium on Whop →
            </a>
            <p className="text-slate-500 text-xs mt-4">Secure payment via Whop · Instant access · No refunds after 24h</p>
          </div>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 gap-5 mb-10">
          {features.map((f) => (
            <div
              key={f.title}
              className={`rounded-2xl p-6 border transition-all duration-300 ${
                f.tag === "INCLUDED"
                  ? "bg-green-500/5 border-green-500/20 hover:border-green-500/40"
                  : "bg-white/5 border-white/10 hover:border-amber-500/30"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-3xl">{f.icon}</span>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                  f.tag === "INCLUDED"
                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                    : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                }`}>
                  {f.tag === "INCLUDED" ? "✓ FREE" : "⭐ PREMIUM"}
                </span>
              </div>
              <h4 className="text-white font-bold text-base mb-2">{f.title}</h4>
              <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Try free AI features CTA */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-700 border border-white/10 rounded-2xl p-6 text-center mb-8">
          <p className="text-white font-bold text-lg mb-2">Try the AI Features Free First</p>
          <p className="text-slate-400 text-sm mb-5">
            The AI Mock Interview and AI CV Review are free to try — no account needed.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => setActiveSection("ai-mock-interview")}
              className="bg-amber-500/20 border border-amber-500/30 text-amber-400 hover:bg-amber-500/30 font-semibold px-6 py-3 rounded-xl transition-all"
            >
              🤖 Try AI Mock Interview
            </button>
            <button
              onClick={() => setActiveSection("ai-cv-review")}
              className="bg-green-500/20 border border-green-500/30 text-green-400 hover:bg-green-500/30 font-semibold px-6 py-3 rounded-xl transition-all"
            >
              📄 Try AI CV Review
            </button>
          </div>
        </div>

        {/* Social proof */}
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { quote: "Got my Emirates offer after 2 weeks of using this guidebook.", name: "Sarah M., Dubai" },
            { quote: "The AI mock interview was scary-realistic. Prepared me perfectly.", name: "Aisha K., London" },
            { quote: "CV review pointed out exactly what was wrong. Rewrote it and got called the next week.", name: "Priya R., Mumbai" },
          ].map((t, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <div className="text-amber-400 text-lg mb-3">★★★★★</div>
              <p className="text-slate-300 text-sm italic leading-relaxed mb-3">"{t.quote}"</p>
              <p className="text-slate-500 text-xs">— {t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
