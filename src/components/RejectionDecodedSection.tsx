import { useState } from "react";
import { usePaidContent } from "../hooks/usePaidContent";
import { ContentLoading, ContentError } from "./ContentState";

interface StatBox { val: string; label: string; }
interface AirlineConfig { id: string; name: string; shortName: string; flag: string; heroStats: StatBox[]; }
type PaidReason = { id: number; [k: string]: unknown };
interface RejectionDecodedSectionProps { goBack: () => void; previousLabel: string; tier: string; onNavigatePremium: () => void; }

const airlines: AirlineConfig[] = [
  { id: "emirates", name: "Emirates", shortName: "Emirates", flag: "🇦🇪", heroStats: [
    { val: "15,000+", label: "Applications/month (widely reported)" },
    { val: "6 months", label: "Confirmed reapply wait" },
    { val: "0", label: "Feedback given on rejection" },
  ]},
  { id: "qatar", name: "Qatar Airways", shortName: "Qatar Airways", flag: "🇶🇦", heroStats: [
    { val: "Global", label: "Open day recruitment" },
    { val: "Varies", label: "Reapply wait — verify directly" },
    { val: "0", label: "Feedback given on rejection" },
  ]},
  { id: "etihad", name: "Etihad", shortName: "Etihad", flag: "🇦🇪", heroStats: [
    { val: "Global", label: "Open day recruitment" },
    { val: "Varies", label: "Reapply wait — verify directly" },
    { val: "0", label: "Feedback given on rejection" },
  ]},
  { id: "flydubai", name: "flydubai", shortName: "flydubai", flag: "🇦🇪", heroStats: [
    { val: "~25 days", label: "Reported post-interview wait" },
    { val: "Verify", label: "Reapply wait — check with flydubai" },
    { val: "0", label: "Feedback given on rejection" },
  ]},
  { id: "airarabia", name: "Air Arabia", shortName: "Air Arabia", flag: "🇦🇪", heroStats: [
    { val: "~2 weeks", label: "Reported post-interview response" },
    { val: "Verify", label: "Reapply wait — check with Air Arabia" },
    { val: "0", label: "Feedback given on rejection" },
  ]},
];

const defaultHeroStats: StatBox[] = [
  { val: "5", label: "Gulf airlines covered" },
  { val: "6", label: "Rejection reasons decoded" },
  { val: "0", label: "Feedback given on rejection" },
];

const freeAirlineNotes: Record<string, Record<number, string>> = {
  emirates: {
    1: "Candidates widely report that Emirates uses an ATS called Taleo. Emirates is widely reported to receive 15,000+ applications per month — candidates consistently report that rejected CVs receive an automated response with no indication any human reviewed the application.",
    2: "Emirates minimum requirements: 160cm height, 212cm arm reach (standing on tiptoes). Women: signature red lip and neat bun or updo are expected at assessment. All tattoos must be completely covered by the uniform at all times.",
  },
  qatar: {
    1: "Qatar Airways uses its own careers portal. Application volume is extremely high for a Doha-based operation. Candidates widely report fast automated screening — a clean, keyword-rich single-column CV is as critical here as at any Gulf carrier.",
    2: "Qatar Airways height and arm reach requirements are similar to Emirates — verify directly before applying. Polished, elegant presentation is expected. All tattoos must be covered by the airline's uniform. Candidates report a refined, high-standard grooming expectation.",
  },
  etihad: {
    1: "Etihad uses its own online careers portal. Candidates report ATS-style CV filtering similar to other Gulf carriers. A clean, single-column, keyword-rich document is essential — the same formatting errors that trigger rejections at Emirates apply equally here.",
    2: "Etihad height and arm reach requirements are similar to Emirates — verify directly before applying. A refined, understated elegance is expected in grooming and presentation. All tattoos must be completely covered by the airline's uniform.",
  },
  flydubai: {
    1: "flydubai uses an online application portal. The process is reported as less intensive than Emirates but a clean, professional, keyword-rich CV remains essential. Candidates report faster response times than at the Big Three carriers.",
    2: "flydubai height and arm reach requirements — verify directly with flydubai before applying. Professional and conservative grooming is expected. All tattoos must be covered by the uniform. Candidates report a professional standard consistent with a Gulf carrier.",
  },
  airarabia: {
    1: "Air Arabia uses its own careers portal. Application volume is lower than at the Big Three, but a clean, single-column, keyword-rich CV remains essential. Candidates report faster response times and a more direct application process overall.",
    2: "Air Arabia height and arm reach requirements — verify directly with Air Arabia before applying. Professional and conservative grooming consistent with a Gulf carrier uniform standard is expected. All tattoos must be covered by the airline's uniform.",
  },
};

const reasons = [
  {
    id: 1,
    emoji: "📄",
    label: "REASON 1",
    title: "Your CV Was Filtered Before a Human Saw It",
    subtitle: "The ATS trap is widely reported to eliminate the majority of applicants before any recruiter reads a single word.",
    accentColor: "text-red-400",
    borderColor: "border-red-500/30",
    bgColor: "from-red-950/40 to-slate-800",
    badgeBg: "bg-red-500/20 text-red-300 border-red-500/30",
    free: true,
    why: `Gulf carriers collectively receive hundreds of thousands of cabin crew applications every year. To manage this volume, airlines use Applicant Tracking Systems (ATS) — computer programs that scan CVs before any human reads them. If your CV fails the scan, you receive an automated rejection.

The ATS reads your document the way a computer reads text — left to right, top to bottom. Multi-column layouts, text boxes, embedded graphics, and design elements confuse the parser. Candidates widely report that plain, single-column Word documents consistently outperform beautifully designed Canva CVs — at every Gulf carrier. This is not about talent or experience. It is about format.`,
    testimonial: {
      quote: "I applied to the same airline three times using a two-column Canva CV I was really proud of. Each time: silence, then rejection within 48 hours. A friend who was already flying told me to delete the design entirely and use a plain Word document with the exact keywords from the job listing. My next application got me an assessment day invitation within 11 days.",
      source: "Composite experience drawn from cabin crew applicant community forums",
    },
    fix: [
      { step: "Use a single-column Word (.docx) document only — no Canva, no tables, no columns, no graphics", icon: "✅" },
      { step: "Add these keywords naturally in your experience sections: 'customer service,' 'hospitality,' 'emergency procedures,' 'multicultural team,' 'safety awareness,' 'first aid certified,' 'conflict resolution,' 'cabin crew'", icon: "🔑" },
      { step: "State height and arm reach explicitly — e.g. 'Height: 165cm | Arm Reach: 212cm (standing on tiptoes)' — in your personal profile header", icon: "📏" },
      { step: "Include a professional photo (Gulf airlines expect this — Western advice to omit photos does NOT apply here)", icon: "📸" },
      { step: "Keep it to 1–2 pages maximum with clear section headers: Personal Profile, Work Experience, Education, Skills, Languages", icon: "📐" },
      { step: "Answer the motivational field ('Why do you want to join [Airline]?') in full — never say 'I love to travel' or 'I want to see the world.' Candidates widely report this as an immediate rejection trigger across all Gulf carriers", icon: "⚠️" },
    ],
    youtubeSearch: "Gulf airline cabin crew CV ATS tips 2024",
    youtubeLabel: "How to Write an ATS-Proof Cabin Crew CV",
    stat: "All Gulf carriers use automated CV screening before human review",
  },
  {
    id: 2,
    emoji: "👗",
    label: "REASON 2",
    title: "Your Appearance Didn't Pass the Grooming Check",
    subtitle: "Recruiters assess presentation within moments of seeing you — before you say a word.",
    accentColor: "text-pink-400",
    borderColor: "border-pink-500/30",
    bgColor: "from-pink-950/40 to-slate-800",
    badgeBg: "bg-pink-500/20 text-pink-300 border-pink-500/30",
    free: true,
    why: `Cabin crew are the physical embodiment of the airline's brand. Emirates, Qatar Airways, Etihad, flydubai, and Air Arabia all invest in their crew's presentation — and they expect candidates to match their standards precisely. At CV drop-off and at the grooming check (which happens early in the assessment day), recruiters assess candidates against a strict checklist.

Visible exposed tattoos, incorrect makeup, visible piercings, the wrong attire, or the wrong hair style can all result in elimination — even if your interview performance is excellent. Candidates widely report being eliminated at this stage without understanding why, because no Gulf carrier provides this feedback.`,
    testimonial: {
      quote: "I made it to the final interview at a Gulf carrier twice and both times received a rejection. I later spoke to someone who had been on the panel and they mentioned my exposed forearm tattoo — which I thought was small and unimportant. Gulf carriers require all tattoos to be fully covered by the uniform at all times. I hadn't checked the specific uniform coverage areas.",
      source: "Composite experience drawn from cabin crew applicant community forums",
    },
    fix: [
      { step: "Skin: Clear, well-groomed skin is expected across all Gulf carriers. See a dermatologist if needed — this is a professional presentation requirement", icon: "✨" },
      { step: "Tattoos: Must be completely covered by the airline's uniform at all times. Check the specific uniform coverage for the carrier you are applying to — even a small tattoo on the inner forearm may be visible", icon: "🚫" },
      { step: "Women — Hair: Neat bun or updo, no loose hair. All Gulf carriers expect professional hair presentation at assessment day", icon: "💇‍♀️" },
      { step: "Women — Makeup: Professional, refined, and complete. Each airline has a signature crew look — arriving groomed to match their brand signals awareness and intent. Select your airline above for specific guidance", icon: "💄" },
      { step: "Women — Attire: Pencil skirt or tailored trousers, professional blazer, heels preferred across Gulf carriers. Conservative neckline. No excessive jewellery", icon: "👠" },
      { step: "Men — Be completely clean-shaven. Smart suit, polished shoes, conservative tie. Hair neatly styled. These expectations apply consistently across all five Gulf carriers", icon: "👔" },
      { step: "Height and reach: Requirements vary by airline. Select your airline above for specific details, or verify directly with each carrier before applying", icon: "📏" },
    ],
    youtubeSearch: "Gulf airline cabin crew grooming standards assessment day",
    youtubeLabel: "Grooming Standards for Gulf Airline Assessment Days",
    stat: "Presentation assessed immediately at assessment day — at every Gulf carrier",
  },
  {
    id: 3,
    emoji: "🎥",
    label: "REASON 3",
    title: "You Failed the Online Screening Stage",
    subtitle: "The online screening stage eliminates a significant number of applicants — before you ever meet a recruiter.",
    accentColor: "text-blue-400",
    borderColor: "border-blue-500/30",
    bgColor: "from-blue-950/40 to-slate-800",
    badgeBg: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    free: false,
    stat: "Online screening: widely reported as a high elimination stage across Gulf carriers",
  },
  {
    id: 4,
    emoji: "🎭",
    label: "REASON 4",
    title: "Your Answers Sounded Rehearsed or Generic",
    subtitle: "Gulf airline recruiters across all five carriers are trained to identify scripted, memorised answers — and they eliminate candidates who give them.",
    accentColor: "text-amber-400",
    borderColor: "border-amber-500/30",
    bgColor: "from-amber-950/40 to-slate-800",
    badgeBg: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    free: false,
    stat: "Scripted answers: one of the most widely cited reasons for final-stage rejection",
  },
  {
    id: 5,
    emoji: "👥",
    label: "REASON 5",
    title: "You Failed the Group Exercise",
    subtitle: "Recruiters watch every candidate simultaneously. They're not looking for the best idea — they're watching how you behave.",
    accentColor: "text-teal-400",
    borderColor: "border-teal-500/30",
    bgColor: "from-teal-950/40 to-slate-800",
    badgeBg: "bg-teal-500/20 text-teal-300 border-teal-500/30",
    free: false,
    stat: "Candidates widely report recruiters observing ALL candidates simultaneously",
  },
  {
    id: 6,
    emoji: "🧠",
    label: "REASON 6",
    title: "\"Cultural Fit\" — The Silent Rejection",
    subtitle: "The most common undisclosed rejection reason — and the hardest to argue with, because it's deliberately subjective.",
    accentColor: "text-purple-400",
    borderColor: "border-purple-500/30",
    bgColor: "from-purple-950/40 to-slate-800",
    badgeBg: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    free: false,
    stat: "Most commonly cited undisclosed reason for final-stage rejection",
  },
];

const getButtonClasses = (airlineId: string, isSelected: boolean): string => {
  if (!isSelected) return "bg-white/5 border border-white/10 text-slate-300 hover:border-white/25 hover:text-white";
  const map: Record<string, string> = {
    emirates: "bg-red-600 border-transparent text-white",
    qatar: "bg-purple-700 border-transparent text-white",
    etihad: "bg-blue-600 border-transparent text-white",
    flydubai: "bg-orange-500 border-transparent text-white",
    airarabia: "bg-amber-500 border-transparent text-slate-900",
  };
  return map[airlineId] ?? "bg-white/10 border-transparent text-white";
};

const getCalloutBg = (airlineId: string): string => {
  const map: Record<string, string> = {
    emirates: "bg-red-950/60 border-red-500/30",
    qatar: "bg-purple-950/60 border-purple-500/30",
    etihad: "bg-blue-950/60 border-blue-500/30",
    flydubai: "bg-orange-950/60 border-orange-500/30",
    airarabia: "bg-amber-950/60 border-amber-500/30",
  };
  return map[airlineId] ?? "bg-white/5 border-white/10";
};

const getCalloutLabel = (airlineId: string): string => {
  const map: Record<string, string> = {
    emirates: "text-red-400",
    qatar: "text-purple-400",
    etihad: "text-blue-400",
    flydubai: "text-orange-400",
    airarabia: "text-amber-400",
  };
  return map[airlineId] ?? "text-slate-400";
};

const getCalloutText = (airlineId: string): string => {
  const map: Record<string, string> = {
    emirates: "text-red-200",
    qatar: "text-purple-200",
    etihad: "text-blue-200",
    flydubai: "text-orange-200",
    airarabia: "text-amber-200",
  };
  return map[airlineId] ?? "text-slate-300";
};

export default function RejectionDecodedSection({ goBack, previousLabel, tier, onNavigatePremium }: RejectionDecodedSectionProps) {
  const [openCard, setOpenCard] = useState<number | null>(null);
  const [selectedAirline, setSelectedAirline] = useState<string | null>(null);

  // Paid reason bodies (reasons 3-6) + their airline notes live server-side and
  // are fetched only for Standard+ members. Free/anon users use the inline
  // free reasons (1-2) and see 3-6 as locked previews.
  const paidTier = tier !== "free";
  const { data: paidData, loading: paidLoading, error: paidError, retry: paidRetry } =
    usePaidContent<{ reasons: PaidReason[]; airlineNotes: Record<string, Record<number, string>> }>("rejection-decoded");

  const isLocked = (free: boolean) => !free && tier === "free";
  const handleCardClick = (id: number, free: boolean) => {
    if (isLocked(free)) return;
    setOpenCard(openCard === id ? null : id);
  };
  const handleAirlineSelect = (airlineId: string) => {
    setSelectedAirline(selectedAirline === airlineId ? null : airlineId);
  };

  // Merge fetched paid bodies onto the paid reason shells; free reasons already
  // carry their full body inline.
  const paidById: Record<number, PaidReason> = {};
  (paidData?.reasons ?? []).forEach((r) => { paidById[r.id] = r; });
  const effReasons = reasons.map((r) => (r.free ? r : { ...r, ...(paidById[r.id] ?? {}) })) as typeof reasons;
  const effAirlineNotes: Record<string, Record<number, string>> = { ...freeAirlineNotes };
  if (paidData?.airlineNotes) {
    for (const air of Object.keys(paidData.airlineNotes)) {
      effAirlineNotes[air] = { ...(freeAirlineNotes[air] ?? {}), ...paidData.airlineNotes[air] };
    }
  }

  const currentAirline = airlines.find((a) => a.id === selectedAirline) ?? null;
  const heroStats = currentAirline?.heroStats ?? defaultHeroStats;

  // Paid members must wait for their content; free users never block.
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
      <div className="max-w-4xl mx-auto px-4 pt-6">
        <button onClick={goBack} className="flex items-center gap-2 text-slate-400 hover:text-amber-400 transition-colors text-sm mb-6">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          ← {previousLabel}
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-10">

        {/* Hero */}
        <div className="relative bg-gradient-to-br from-red-950/60 via-slate-800/80 to-slate-900 border border-red-500/20 rounded-3xl p-8 md:p-12 overflow-hidden mb-6">
          <div className="absolute inset-0 bg-cover opacity-50" style={{ backgroundImage: "url(/images/rejection-decoded-bg.jpg)", backgroundPosition: "right center", maskImage: "linear-gradient(to right, transparent 0%, transparent 30%, black 100%)", WebkitMaskImage: "linear-gradient(to right, transparent 0%, transparent 30%, black 100%)" }} />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-slate-900/40 pointer-events-none" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 bg-red-500/15 border border-red-500/30 rounded-full px-4 py-1.5 mb-5">
              <span className="text-red-400 text-xs font-bold uppercase tracking-widest">Gulf Carrier Intelligence</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Rejection<br />
              <span className="bg-gradient-to-r from-red-400 via-amber-400 to-red-400 bg-clip-text text-transparent">Decoded</span>
            </h1>
            <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl mb-6">
              Airlines never tell you why you failed. This guide does. Six evidence-backed reasons why candidates are rejected at Gulf carriers — Emirates, Qatar Airways, Etihad, flydubai, and Air Arabia — with real examples and specific fixes for each.
            </p>
            <div className="flex flex-wrap gap-3">
              {heroStats.map((stat, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-center">
                  <div className="text-amber-400 font-bold text-lg">{stat.val}</div>
                  <div className="text-slate-400 text-xs">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Airline Selector */}
        <div className="bg-slate-800/60 border border-slate-700/40 rounded-2xl p-5 mb-6">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-3">Select your airline for specific guidance</p>
          <div className="flex flex-wrap gap-2">
            {airlines.map((airline) => (
              <button key={airline.id} onClick={() => handleAirlineSelect(airline.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${getButtonClasses(airline.id, selectedAirline === airline.id)}`}>
                <span>{airline.flag}</span>
                <span>{airline.shortName}</span>
              </button>
            ))}
          </div>
          {currentAirline ? (
            <p className="text-xs text-slate-400 mt-3">Showing <span className={getCalloutLabel(currentAirline.id)}>{currentAirline.name}</span> specific insights inside each rejection reason below. Tap again to deselect.</p>
          ) : (
            <p className="text-xs text-slate-400 mt-3">Select an airline above to see how each rejection reason applies to your specific target carrier.</p>
          )}
        </div>

        {/* Legal disclaimer */}
        <div className="bg-slate-800/50 border border-slate-700/40 rounded-xl px-5 py-4 mb-6 flex items-start gap-3">
          <span className="text-slate-400 text-base flex-shrink-0 mt-0.5">ℹ️</span>
          <p className="text-slate-400 text-xs leading-relaxed">
            The rejection reasons and recruitment process details on this page are based on publicly reported candidate experiences from forums, community platforms, and open candidate discussions. They do not represent confirmed policies of any airline. Always verify current requirements directly with the airline before applying.
          </p>
        </div>

        {/* Tier notice */}
        {tier === "free" && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5 mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="text-3xl">🔓</div>
            <div className="flex-1">
              <p className="text-amber-300 font-bold text-sm mb-1">2 of 6 Reasons Unlocked — Free Plan</p>
              <p className="text-slate-400 text-sm">Reasons 1 and 2 are available free. Upgrade to Standard or Premium to unlock all 6 rejection reasons with full examples and fixes.</p>
            </div>
            <button onClick={onNavigatePremium} className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-5 py-2.5 rounded-xl text-sm transition-all hover:scale-105 flex-shrink-0">
              Unlock All →
            </button>
          </div>
        )}

        {/* Reason Cards */}
        <div className="space-y-4">
          {effReasons.map((reason) => {
            const locked = isLocked(reason.free);
            const isOpen = openCard === reason.id && !locked;
            const airlineNote = currentAirline && effAirlineNotes[currentAirline.id] ? (effAirlineNotes[currentAirline.id][reason.id] ?? null) : null;

            return (
              <div key={reason.id} className={`relative rounded-2xl border transition-all duration-300 overflow-hidden ${locked ? "border-white/10 bg-slate-800/40 cursor-default" : `${reason.borderColor} bg-gradient-to-br ${reason.bgColor} cursor-pointer hover:scale-[1.01]`}`}>
                <button onClick={() => handleCardClick(reason.id, reason.free)} className="w-full text-left p-5 md:p-6" disabled={locked}>
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${locked ? "bg-white/5" : "bg-white/10"}`}>
                      {locked ? "🔒" : reason.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className={`text-xs font-bold uppercase tracking-wider border rounded-full px-2.5 py-0.5 ${locked ? "bg-white/5 text-slate-400 border-white/10" : reason.badgeBg}`}>{reason.label}</span>
                        {locked && <span className="text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-full px-2.5 py-0.5">Standard+</span>}
                      </div>
                      <h3 className={`font-bold text-base md:text-lg leading-snug ${locked ? "text-slate-400" : "text-white"}`}>{reason.title}</h3>
                      <p className={`text-sm mt-1 leading-relaxed ${locked ? "text-slate-600" : "text-slate-400"}`}>{reason.subtitle}</p>
                    </div>
                    {!locked && (
                      <div className={`flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-transform ${isOpen ? "rotate-180 border-white/30 bg-white/10" : "border-white/10 bg-white/5"}`}>
                        <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    )}
                  </div>
                </button>

                {locked && (
                  <div className="px-5 md:px-6 pb-5">
                    <button onClick={onNavigatePremium} className="w-full bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 font-semibold py-3 rounded-xl text-sm transition-all hover:scale-[1.01] flex items-center justify-center gap-2">
                      🔓 Unlock this reason — Upgrade to Standard
                    </button>
                  </div>
                )}

                {isOpen && (
                  <div className="px-5 md:px-6 pb-6 border-t border-white/5 pt-5">
                    <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold mb-5 border ${reason.badgeBg}`}>
                      📊 {reason.stat}
                    </div>

                    {airlineNote && currentAirline && (
                      <div className={`rounded-xl border p-4 mb-6 ${getCalloutBg(currentAirline.id)}`}>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-base">{currentAirline.flag}</span>
                          <span className={`text-xs font-bold uppercase tracking-wider ${getCalloutLabel(currentAirline.id)}`}>{currentAirline.name} — Specific Guidance</span>
                        </div>
                        <p className={`text-sm leading-relaxed ${getCalloutText(currentAirline.id)}`}>{airlineNote}</p>
                      </div>
                    )}

                    <div className="mb-6">
                      <h4 className={`text-xs font-bold uppercase tracking-wider mb-3 ${reason.accentColor}`}>Why This Happens</h4>
                      <div className="text-slate-300 text-sm leading-relaxed space-y-3">
                        {(reason.why ?? "").split("\n\n").map((para, i) => <p key={i}>{para}</p>)}
                      </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 md:p-5 mb-6">
                      <div className="flex items-start gap-3">
                        <div className="text-2xl flex-shrink-0 mt-0.5">💬</div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Real Candidate Experience</h4>
                          <blockquote className="text-slate-300 text-sm leading-relaxed italic mb-2">"{reason.testimonial?.quote}"</blockquote>
                          <p className="text-slate-400 text-xs">— {reason.testimonial?.source}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className={`text-xs font-bold uppercase tracking-wider mb-3 ${reason.accentColor}`}>The Fix — Specific Actions</h4>
                      <div className="space-y-3">
                        {(reason.fix ?? []).map((item, i) => (
                          <div key={i} className="flex items-start gap-3 bg-white/[0.03] border border-white/5 rounded-xl p-3.5">
                            <span className="text-lg flex-shrink-0">{item.icon}</span>
                            <p className="text-slate-300 text-sm leading-relaxed">{item.step}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(reason.youtubeSearch ?? "")}`} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-3 border border-white/10 bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-all group">
                      <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-sm font-semibold group-hover:text-amber-400 transition-colors">▶ {reason.youtubeLabel}</p>
                        <p className="text-slate-400 text-xs mt-0.5">Search YouTube for relevant guides</p>
                      </div>
                      <svg className="w-4 h-4 text-slate-400 group-hover:text-amber-400 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {tier === "free" && (
          <div className="mt-10 bg-gradient-to-br from-amber-900/30 to-slate-800 border border-amber-500/30 rounded-3xl p-8 text-center">
            <div className="text-4xl mb-4">🔓</div>
            <h3 className="text-white font-bold text-xl mb-2">Unlock All 6 Rejection Reasons</h3>
            <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">
              Reasons 3–6 cover the online screening stage, rehearsed answers, the group exercise, and the "cultural fit" silent rejection — the four most misunderstood elimination stages. Standard plan includes full access.
            </p>
            <button onClick={onNavigatePremium} className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-900 font-bold px-8 py-4 rounded-xl shadow-lg shadow-amber-500/30 transition-all hover:scale-105 text-base">
              View Plans & Unlock →
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
