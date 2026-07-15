import { useState, useRef } from "react";
import { usePaidContent } from "../hooks/usePaidContent";
import { ContentLoading, ContentError } from "./ContentState";

interface AfterTheInterviewSectionProps {
  goBack: () => void;
  previousLabel: string;
  tier: string;
  onNavigatePremium: () => void;
}

interface PhaseInsight { icon: string; text: string; }
interface Phase {
  id: number;
  number: string;
  emoji: string;
  title: string;
  headline: string;
  tagline: string;
  accent: string;
  border: string;
  bg: string;
  badge: string;
  free: boolean;
  // Paid phases (3-5) ship as shells; content + insights arrive from the server.
  content?: string;
  insights?: PhaseInsight[];
}

type AirlineKey = "emirates" | "qatar" | "etihad" | "flydubai" | "airArabia";

interface AirlineProfile {
  name: string;
  emoji: string;
  iataCode: string;
  base: string;
  accent: string;
  border: string;
  bg: string;
  badge: string;
  waitRange: string;
  medicalCity: string;
  training: string;
  reapply: string;
  goldenSignal: string;
  insiderTip: string;
  portalStatuses: { status: string; meaning: string }[];
}

const airlineProfiles: Record<AirlineKey, AirlineProfile> = {
  emirates: {
    name: "Emirates",
    emoji: "✈️",
    iataCode: "EK",
    base: "Dubai, UAE",
    accent: "text-red-400",
    border: "border-red-500/50",
    bg: "from-red-950/60 to-slate-900",
    badge: "bg-red-500/20 text-red-300 border-red-500/30",
    waitRange: "30 days – 6 months",
    medicalCity: "Dubai (GCAA standard)",
    training: "Initial joining: ~8 weeks · then 6 months supervised flying · annual recurrent SEP mandatory · new aircraft type training whenever fleet expands",
    reapply: "6 months — confirmed across multiple candidate accounts",
    goldenSignal: "A phone call from a +971 Dubai number. Save it — you might miss it.",
    insiderTip: "Emirates offer emails are widely reported by candidates to land in spam and junk folders. Check every folder every single day from the moment you walk out of your interview.",
    portalStatuses: [
      { status: "Interview Complete", meaning: "File open — recruiter actively considering you" },
      { status: "Approval in Progress", meaning: "Conditional offer — medical and paperwork under review" },
      { status: "Joining Formalities in Progress", meaning: "You are in — onboarding has started" },
      { status: "Application Unsuccessful", meaning: "Not this time — 6 months before reapplying" },
    ],
  },
  qatar: {
    name: "Qatar Airways",
    emoji: "🌙",
    iataCode: "QR",
    base: "Doha, Qatar",
    accent: "text-purple-400",
    border: "border-purple-500/50",
    bg: "from-purple-950/60 to-slate-900",
    badge: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    waitRange: "2 weeks – 6+ months",
    medicalCity: "Doha (includes Police Act Disclosure Application)",
    training: "Initial joining: 6–8 weeks · ongoing recurrent training mandatory under GCAA standards · additional type training for new aircraft",
    reapply: "6 months — reported by candidates; verify directly with Qatar Airways",
    goldenSignal: "The 'Golden Call' — a phone call from Doha confirming your selection.",
    insiderTip: "Qatar has been known to place candidates on standby for months. This is not a rejection — it is a queue.",
    portalStatuses: [
      { status: "Awaiting DOJ", meaning: "Qatar is finalising your start date — positive sign" },
      { status: "Data Bridge Completed", meaning: "File submitted to senior management for approval" },
      { status: "Selection Stage Completed", meaning: "You are selected — offer letter or visa incoming" },
    ],
  },
  etihad: {
    name: "Etihad Airways",
    emoji: "🌟",
    iataCode: "EY",
    base: "Abu Dhabi, UAE",
    accent: "text-amber-400",
    border: "border-amber-500/50",
    bg: "from-amber-950/60 to-slate-900",
    badge: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    waitRange: "Weeks to months — full process typically ~5 months",
    medicalCity: "Abu Dhabi (GCAA compliant)",
    training: "Initial joining: several weeks · annual recurrent SEP mandatory under CAR-CC · additional type training for new aircraft types",
    reapply: "Candidates report needing a new account profile to reapply — verify with Etihad directly",
    goldenSignal: "Email or call from Etihad HR with a conditional offer and your next steps.",
    insiderTip: "If previously rejected by Etihad, you may need to delete your account and create a fresh profile to reapply.",
    portalStatuses: [
      { status: "Application Under Review", meaning: "Recruiter reviewing your profile" },
      { status: "Shortlisted", meaning: "You have progressed — assessment invitation coming" },
    ],
  },
  flydubai: {
    name: "flydubai",
    emoji: "🚀",
    iataCode: "FZ",
    base: "Dubai, UAE",
    accent: "text-orange-400",
    border: "border-orange-500/50",
    bg: "from-orange-950/60 to-slate-900",
    badge: "bg-orange-500/20 text-orange-300 border-orange-500/30",
    waitRange: "~25 days average — faster than the Big 3",
    medicalCity: "Dubai (standard aeromedical)",
    training: "Initial joining: several weeks · annual recurrent SEP training mandatory · ongoing training throughout career",
    reapply: "Not confirmed — verify directly with flydubai",
    goldenSignal: "Email notification from flydubai HR — turnaround is faster than Big 3.",
    insiderTip: "flydubai is significantly faster than Emirates or Qatar based on candidate-reported timelines. If 4 weeks pass with no contact, follow up directly.",
    portalStatuses: [
      { status: "Under Review", meaning: "Application is being assessed" },
      { status: "Offer Extended", meaning: "You have been selected — offer incoming" },
    ],
  },
  airArabia: {
    name: "Air Arabia",
    emoji: "🌅",
    iataCode: "G9",
    base: "Sharjah, UAE",
    accent: "text-rose-400",
    border: "border-rose-500/50",
    bg: "from-rose-950/60 to-slate-900",
    badge: "bg-rose-500/20 text-rose-300 border-rose-500/30",
    waitRange: "~2 weeks — typically the fastest of the five, based on candidate-reported timelines",
    medicalCity: "Sharjah (standard aeromedical)",
    training: "Initial joining: several weeks · annual recurrent SEP training mandatory · ongoing training throughout career",
    reapply: "Not confirmed — verify directly with Air Arabia",
    goldenSignal: "Direct contact from Air Arabia recruitment — typically within 2 weeks of your interview.",
    insiderTip: "Air Arabia runs the fastest recruitment cycle of the five airlines based on candidate reports. Two weeks with no response is your signal to follow up.",
    portalStatuses: [
      { status: "Under Review", meaning: "Application is being assessed" },
      { status: "Offer Extended", meaning: "You have been selected" },
    ],
  },
};

const phases: Phase[] = [
  {
    id: 1,
    number: "01",
    emoji: "🤫",
    title: "The Silence",
    headline: "You walked out. Now what?",
    tagline: "The days after your final interview are the hardest. Here is what is actually happening — and what the silence really means.",
    accent: "text-slate-300",
    border: "border-slate-500/30",
    bg: "from-slate-800/80 to-slate-900",
    badge: "bg-slate-700/50 text-slate-300 border-slate-500/30",
    free: true,
    content: `Based on widely reported candidate accounts, after your final interview your file is typically submitted for internal review alongside other candidates from your assessment day. The review process takes time — each candidate is considered individually before any decisions are communicated. It is not automated and it is not instant.

The silence is not a signal. It is the process working exactly as it should. A document request following your interview means you are being progressed. That is your green light.`,
    insights: [
      { icon: "📧", text: "Check your spam and junk folder every single day — airline emails are notorious for landing there" },
      { icon: "📱", text: "Save the airline's recruitment number in your phone so you recognise the call when it comes" },
      { icon: "🖥️", text: "Log into your application portal regularly — status changes are often your first real signal" },
      { icon: "🔕", text: "Do not call or email recruitment within the first 3 weeks — it has no positive impact" },
      { icon: "⏰", text: "Six weeks with no contact and no status change is typically the signal that this round was not successful" },
    ],
  },
  {
    id: 2,
    number: "02",
    emoji: "🏥",
    title: "The Medical",
    headline: "Being invited to your medical is the confirmation.",
    tagline: "This is not a formality. It is a genuine filter — and the strongest signal you have passed the interview.",
    accent: "text-emerald-400",
    border: "border-emerald-500/30",
    bg: "from-emerald-950/40 to-slate-900",
    badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    free: true,
    content: `A medical invitation is the strongest signal the interview went well. It runs simultaneously with your background and criminal record check. Both must clear before any offer is made.

The medical is conducted under Gulf Civil Aviation Authority standards. It covers vision, hearing, blood panels, chest X-ray, dental, and BMI — all of which must fall within acceptable ranges. Conditions that seemed minor can surface here. What matters most is honesty: any discrepancy between what you declared and what the tests reveal can result in immediate withdrawal of your offer.

If a test comes back with a flag, do not assume the process is over. Request a specialist clearance letter, communicate with the recruitment team, and follow their process. Flags that are documented and addressed are routinely accepted.`,
    insights: [
      { icon: "👁️", text: "Vision: minimum 6/9 corrected in most cases. Contact lenses are widely accepted; verify spectacles policy with your specific airline before attending. Laser surgery is generally accepted if fully healed — confirm the required healing period with the airline directly." },
      { icon: "🩸", text: "Blood: panels typically include Hepatitis B, VDRL, TB chest X-ray, and drug screening. Employment and residency visa requirements in UAE and Qatar include medical testing — verify current requirements and any implications for your specific situation directly with your airline and the relevant embassy before travelling for your medical." },
      { icon: "⚖️", text: "BMI: assessed holistically alongside fitness and professional presentation — not a single number alone" },
      { icon: "🦷", text: "Dental: oral health is reviewed. Severe untreated conditions may be flagged before joining" },
      { icon: "📋", text: "Bring all original documents plus certified copies. No alcohol 48 hours before. Sleep well the night before" },
      { icon: "⚠️", text: "Declare everything honestly. Many airline medical insurance plans exclude pre-existing conditions for an initial period — coverage terms vary by airline, so verify directly. Concealment is never worth it." },
    ],
  },
  {
    id: 3,
    number: "03",
    emoji: "📄",
    title: "The Offer",
    headline: "You have the offer. Do not resign yet.",
    tagline: "The offer letter is real. The DOJ wait is also real. Know the difference before making any life decisions.",
    accent: "text-amber-400",
    border: "border-amber-500/30",
    bg: "from-amber-950/40 to-slate-900",
    badge: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    free: false,
    // PAID BODY (content + insights) served from netlify/functions/get-content.js
    // ("after-the-interview", Standard+). Only the shell above ships in the bundle.
  },
  {
    id: 4,
    number: "04",
    emoji: "⏳",
    title: "The Wait",
    headline: "The limbo is a gift. Use it.",
    tagline: "The candidates who thrive in training are the ones who arrived prepared. Here is your preparation window.",
    accent: "text-blue-400",
    border: "border-blue-500/30",
    bg: "from-blue-950/40 to-slate-900",
    badge: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    free: false,
    // PAID BODY served from get-content.js ("after-the-interview", Standard+).
  },
  {
    id: 5,
    number: "05",
    emoji: "🔄",
    title: "The Comeback",
    headline: "Rejection is information. Use it differently from everyone else.",
    tagline: "Most candidates treat the 6-month wait as a gap. The ones who eventually pass treat it as a training programme.",
    accent: "text-red-400",
    border: "border-red-500/30",
    bg: "from-red-950/40 to-slate-900",
    badge: "bg-red-500/20 text-red-300 border-red-500/30",
    free: false,
    // PAID BODY served from get-content.js ("after-the-interview", Standard+).
  },
];

export default function AfterTheInterviewSection({ goBack, previousLabel, tier, onNavigatePremium }: AfterTheInterviewSectionProps) {
  const [selectedAirline, setSelectedAirline] = useState<AirlineKey | null>(null);
  const [openPhase, setOpenPhase] = useState<number | null>(null);

  const isLocked = (free: boolean) => !free && tier === "free";
  const phaseRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const topRef = useRef<HTMLDivElement>(null);
  const handleStepClick = (id: number, free: boolean) => {
    if (isLocked(free)) return;
    setOpenPhase(id);
    setTimeout(() => {
      phaseRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  };

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const airline = selectedAirline ? airlineProfiles[selectedAirline] : null;

  const handlePhaseClick = (id: number, free: boolean) => {
    if (isLocked(free)) return;
    setOpenPhase(openPhase === id ? null : id);
  };

  // Paid phase bodies (3-5) are NOT in the bundle — they come from the server,
  // gated on a Standard+ session. Free users never fetch and never block.
  const paidTier = tier !== "free";
  const { data: paidData, loading: paidLoading, error: paidError, retry: paidRetry } =
    usePaidContent<{ phases: { id: number; content: string; insights: PhaseInsight[] }[] }>("after-the-interview");

  const paidById: Record<number, { content: string; insights: PhaseInsight[] }> = {};
  (paidData?.phases ?? []).forEach((p) => { paidById[p.id] = p; });
  const effPhases: Phase[] = phases.map((p) => (p.free ? p : { ...p, ...(paidById[p.id] ?? {}) }));

  if (paidTier && paidLoading) return <ContentLoading goBack={goBack} previousLabel={previousLabel} />;
  if (paidTier && (paidError || !paidData)) {
    return (
      <ContentError
        goBack={goBack}
        previousLabel={previousLabel}
        message={paidError || "We couldn't load this content."}
        onRetry={paidRetry}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 pt-20">
      <div ref={topRef} className="max-w-4xl mx-auto px-4 pt-6">
        <button onClick={goBack} className="flex items-center gap-2 text-slate-400 hover:text-amber-400 transition-colors text-sm mb-6">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          ← {previousLabel}
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-16">

        {/* ── HERO ── */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-800/90 to-slate-900 p-8 md:p-12 mb-8">
          <div
            className="absolute inset-0 bg-cover opacity-50"
            style={{
              backgroundImage: "url(/images/after-interview-bg.jpg)",
              backgroundPosition: "right center",
              maskImage: "linear-gradient(to right, transparent 0%, transparent 30%, black 100%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, transparent 30%, black 100%)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-slate-900/40" />
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
          </div>
          <div className="relative">
            <div className="inline-flex items-center gap-2 bg-white/8 border border-white/12 rounded-full px-4 py-1.5 mb-6">
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
              <span className="text-slate-300 text-xs font-bold uppercase tracking-widest">The Part No Competitor Covers</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-none tracking-tight">
              After<br />
              <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300 bg-clip-text text-transparent">
                the Interview.
              </span>
            </h1>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-xl mb-8">
              You walked out the door. Now comes the part nobody prepares you for — the silence, the medical, the offer, the wait, and what to do if it doesn't go your way.
            </p>
            <div className="grid grid-cols-3 gap-3 max-w-lg">
              {[
                { value: "30d–6m", label: "Post-interview wait" },
                { value: "~8 wks", label: "Emirates initial training" },
                { value: "6 months", label: "Reapply wait" },
              ].map((s, i) => (
                <div key={i} className="bg-white/5 border border-white/8 rounded-xl p-3 text-center">
                  <div className="text-amber-400 font-black text-lg">{s.value}</div>
                  <div className="text-slate-500 text-xs mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── AIRLINE SELECTOR ── */}
        <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-5 mb-6">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-3">
            Personalise for your airline — see specific timelines, status codes & insider notes
          </p>
          <div className="flex flex-wrap gap-2">
            {(Object.entries(airlineProfiles) as [AirlineKey, AirlineProfile][]).map(([key, profile]) => (
              <button
                key={key}
                onClick={() => setSelectedAirline(selectedAirline === key ? null : key)}
                className={`flex items-center gap-2.5 px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
                  selectedAirline === key
                    ? `${profile.border} bg-white/10 text-white`
                    : "border-white/10 bg-white/5 text-slate-400 hover:text-white hover:bg-white/8"
                }`}
              >
                <span
                  className={`flex items-center justify-center w-7 h-6 rounded-md text-[11px] font-black tracking-wide border ${
                    selectedAirline === key
                      ? profile.badge
                      : "bg-white/5 text-slate-400 border-white/10"
                  }`}
                >
                  {profile.iataCode}
                </span>
                <span>{profile.name}</span>
              </button>
            ))}
            {selectedAirline && (
              <button
                onClick={() => setSelectedAirline(null)}
                className="px-4 py-2 rounded-xl text-sm font-semibold border border-white/10 bg-white/3 text-slate-500 hover:text-slate-300 transition-all"
              >
                Clear ✕
              </button>
            )}
          </div>
        </div>

        {/* ── AIRLINE PROFILE CARD ── */}
        {airline && (
          <div className={`bg-gradient-to-br ${airline.bg} border ${airline.border} rounded-2xl p-6 mb-6 transition-all`}>
            <div className="flex items-start justify-between gap-4 flex-wrap mb-5">
              <div>
                <div className={`text-xs font-bold uppercase tracking-widest mb-1 ${airline.accent}`}>Your Airline — {airline.name}</div>
                <h3 className="text-white font-bold text-xl">📍 Based in {airline.base}</h3>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
              {[
                { label: "Post-interview wait", value: airline.waitRange },
                { label: "Medical location", value: airline.medicalCity },
                { label: "Training", value: airline.training },
                { label: "Reapply after rejection", value: airline.reapply },
              ].map((item, i) => (
                <div key={i} className="bg-white/8 border border-white/10 rounded-xl p-3">
                  <div className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1">{item.label}</div>
                  <div className="text-white text-xs font-semibold leading-tight">{item.value}</div>
                </div>
              ))}
            </div>
            <div className={`bg-white/5 border border-white/10 rounded-xl p-4 mb-4`}>
              <div className={`text-xs font-bold uppercase tracking-wider mb-1 ${airline.accent}`}>🌟 The Sign You Passed</div>
              <p className="text-white text-sm font-medium">{airline.goldenSignal}</p>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-4">
              <div className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">💡 Insider Note</div>
              <p className="text-slate-300 text-sm">{airline.insiderTip}</p>
            </div>
            {airline.portalStatuses.length > 0 && (
              <div>
                <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-3">Application Portal Status Guide</div>
                <div className="space-y-2">
                  {airline.portalStatuses.map((s, i) => (
                    <div key={i} className="flex items-start gap-3 bg-white/5 border border-white/8 rounded-xl p-3">
                      <div className={`text-xs font-bold px-2.5 py-1 rounded-lg border flex-shrink-0 ${airline.badge}`}>{s.status}</div>
                      <p className="text-slate-400 text-xs leading-relaxed pt-0.5">{s.meaning}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── LEGAL DISCLAIMER ── */}
        <div className="bg-slate-800/40 border border-slate-700/30 rounded-xl px-5 py-3.5 mb-6 flex items-start gap-3">
          <span className="text-slate-600 text-sm flex-shrink-0 mt-0.5">ℹ️</span>
          <p className="text-slate-600 text-xs leading-relaxed">
            All timelines, process details, and status descriptions on this page are based on publicly reported candidate accounts from forums and community platforms. They do not represent confirmed policies of any airline. Always verify current processes directly with the relevant airline before making any decisions.
          </p>
        </div>

        {/* ── TIER NOTICE ── */}
        {tier === "free" && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5 mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="text-3xl">🔓</div>
            <div className="flex-1">
              <p className="text-amber-300 font-bold text-sm mb-1">Phases 1 & 2 Unlocked — Free Plan</p>
              <p className="text-slate-400 text-sm">The Offer Letter, DOJ Wait, Preparation Guide, and Comeback Plan unlock on Standard and Premium.</p>
            </div>
            <button onClick={onNavigatePremium} className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-5 py-2.5 rounded-xl text-sm transition-all hover:scale-105 flex-shrink-0">
              Unlock All →
            </button>
          </div>
        )}

        {/* ── PHASE STEPS INDICATOR ── */}
        <div className="flex items-center gap-1 mb-6 overflow-x-auto pb-1">
          {effPhases.map((phase, i) => (
            <div key={phase.id} className="flex items-center gap-1 flex-shrink-0">
              <button
                type="button"
                onClick={() => handleStepClick(phase.id, phase.free)}
                disabled={isLocked(phase.free)}
                aria-label={`${phase.title}${isLocked(phase.free) ? " (locked — Standard or Premium)" : ""}`}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                  isLocked(phase.free)
                    ? "border-white/8 bg-white/3 text-slate-600 cursor-not-allowed"
                    : openPhase === phase.id
                    ? `${phase.border} bg-white/8 text-white`
                    : "border-white/10 bg-white/5 text-slate-400 hover:text-white hover:bg-white/8"
                }`}
              >
                <span aria-hidden="true">{phase.emoji}</span>
                <span className="hidden sm:block">{phase.title}</span>
                <span className="sm:hidden">{phase.number}</span>
                {isLocked(phase.free) && <span className="text-slate-600" aria-hidden="true">🔒</span>}
              </button>
              {i < phases.length - 1 && <div className="w-3 h-px bg-white/10 flex-shrink-0" />}
            </div>
          ))}
        </div>

        {/* ── PHASE CARDS ── */}
        <div className="space-y-3">
          {effPhases.map((phase) => {
            const locked = isLocked(phase.free);
            const isOpen = openPhase === phase.id && !locked;

            return (
              <div
                key={phase.id}
                ref={(el) => { phaseRefs.current[phase.id] = el; }}
                className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
                  locked
                    ? "border-white/8 bg-slate-800/30"
                    : isOpen
                    ? `${phase.border} bg-gradient-to-br ${phase.bg}`
                    : "border-white/10 bg-slate-800/50 hover:border-white/20 hover:bg-slate-800/70"
                }`}
              >
                <button
                  onClick={() => handlePhaseClick(phase.id, phase.free)}
                  disabled={locked}
                  className="w-full text-left p-5 md:p-6"
                >
                  <div className="flex items-center gap-4">
                    <div className={`text-3xl md:text-4xl flex-shrink-0 ${locked ? "opacity-30" : ""}`}>
                      {locked ? "🔒" : phase.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className={`font-black text-xs uppercase tracking-widest ${locked ? "text-slate-600" : phase.accent}`}>
                          {phase.number} · {phase.title}
                        </span>
                        {locked && (
                          <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-full px-2 py-0.5">
                            Standard+
                          </span>
                        )}
                      </div>
                      <h3 className={`font-black text-lg md:text-xl leading-tight mb-1 ${locked ? "text-slate-600" : "text-white"}`}>
                        {phase.headline}
                      </h3>
                      <p className={`text-sm leading-relaxed ${locked ? "text-slate-700" : "text-slate-400"}`}>
                        {phase.tagline}
                      </p>
                    </div>
                    {!locked && (
                      <div className={`w-8 h-8 rounded-full border flex items-center justify-center flex-shrink-0 transition-transform ${isOpen ? "rotate-180 border-white/20 bg-white/10" : "border-white/10 bg-white/5"}`}>
                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    )}
                  </div>
                </button>

                {locked && (
                  <div className="px-5 md:px-6 pb-5">
                    <button
                      onClick={onNavigatePremium}
                      className="w-full bg-amber-500/8 hover:bg-amber-500/15 border border-amber-500/25 text-amber-500 font-semibold py-3 rounded-xl text-sm transition-all flex items-center justify-center gap-2"
                    >
                      🔓 Unlock — Upgrade to Standard
                    </button>
                  </div>
                )}

                {isOpen && (
                  <div className="px-5 md:px-6 pb-6 border-t border-white/8 pt-5 space-y-6">
                    <div>
                      <div className={`text-xs font-black uppercase tracking-widest mb-3 ${phase.accent}`}>What's Actually Happening</div>
                      <div className="space-y-3">
                        {(phase.content ?? "").split("\n\n").map((para, i) => (
                          <p key={i} className="text-slate-300 text-sm leading-relaxed">{para}</p>
                        ))}
                      </div>
                    </div>

                    {airline && (
                      <div className={`border ${airline.border} bg-white/5 rounded-xl p-4`}>
                        <div className={`text-xs font-black uppercase tracking-widest mb-2 ${airline.accent}`}>
                          {airline.emoji} For {airline.name} specifically
                        </div>
                        {phase.id === 1 && (
                          <p className="text-slate-300 text-sm">
                            Post-interview wait: <span className="text-white font-semibold">{airline.waitRange}</span>.
                            {" "}{airline.goldenSignal}
                          </p>
                        )}
                        {phase.id === 2 && (
                          <p className="text-slate-300 text-sm">
                            Medical conducted in: <span className="text-white font-semibold">{airline.medicalCity}</span>.
                          </p>
                        )}
                        {phase.id === 3 && (
                          <p className="text-slate-300 text-sm">
                            Training duration: <span className="text-white font-semibold">{airline.training}</span> after joining.
                            {" "}Do not resign until both offer letter and DOJ date are confirmed in writing.
                          </p>
                        )}
                        {phase.id === 4 && (
                          <p className="text-slate-300 text-sm">
                            Your base city is <span className="text-white font-semibold">{airline.base}</span>. Use the wait period to research neighbourhoods, transport, and cost of living there specifically.
                          </p>
                        )}
                        {phase.id === 5 && (
                          <p className="text-slate-300 text-sm">
                            Mandatory wait before reapplying: <span className="text-white font-semibold">{airline.reapply}</span>.
                          </p>
                        )}
                      </div>
                    )}

                    <div>
                      <div className={`text-xs font-black uppercase tracking-widest mb-3 ${phase.accent}`}>Your Action Checklist</div>
                      <div className="space-y-2">
                        {(phase.insights ?? []).map((item, i) => (
                          <div key={i} className="flex items-start gap-3 bg-white/4 border border-white/6 rounded-xl p-4 hover:bg-white/6 transition-colors">
                            <span className="text-xl flex-shrink-0">{item.icon}</span>
                            <p className="text-slate-300 text-sm leading-relaxed">{item.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <a
                      href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                        phase.id === 1 ? "cabin crew golden call after interview experience"
                        : phase.id === 2 ? "cabin crew medical check induction day experience"
                        : phase.id === 3 ? "cabin crew offer letter date of joining wait"
                        : phase.id === 4 ? "moving to Dubai cabin crew preparing before joining"
                        : "cabin crew rejected comeback plan reapply 6 months"
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 bg-white/4 border border-white/8 hover:bg-white/8 rounded-xl p-4 transition-all group"
                    >
                      <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-sm font-semibold group-hover:text-amber-400 transition-colors">
                          ▶ Watch: Real candidate experiences — {phase.title}
                        </p>
                        <p className="text-slate-600 text-xs mt-0.5">Opens YouTube search for verified experiences</p>
                      </div>
                      <svg className="w-4 h-4 text-slate-600 group-hover:text-amber-400 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>

                    <button
                      onClick={scrollToTop}
                      className="flex items-center gap-1.5 text-slate-600 hover:text-amber-400 text-xs transition-colors group"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7-7" />
                      </svg>
                      Back to top
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {tier === "free" && (
          <div className="mt-10 relative overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 rounded-3xl p-8 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-blue-500/5" />
            <div className="relative">
              <div className="text-4xl mb-4">🔓</div>
              <h3 className="text-white font-black text-2xl mb-2">Unlock All 5 Phases</h3>
              <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">
                Phases 3–5 cover the offer letter, DOJ wait, Dubai preparation checklist, and the 6-month comeback plan. Available on Standard and Premium.
              </p>
              <button
                onClick={onNavigatePremium}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-900 font-black px-10 py-4 rounded-2xl shadow-xl shadow-amber-500/25 transition-all hover:scale-105 text-base"
              >
                View Plans & Unlock →
              </button>
            </div>
          </div>
        )}

      </div>

      <div className="flex justify-start mt-6 pb-4">
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 text-slate-500 hover:text-amber-400 text-sm transition-colors group"
        >
          <svg className="w-4 h-4 group-hover:text-amber-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7-7" />
          </svg>
          Back to top
        </button>
      </div>

    </div>
  );
}
