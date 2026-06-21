import { useState } from "react";

interface RejectionDecodedSectionProps {
  goBack: () => void;
  previousLabel: string;
  tier: string;
  onNavigatePremium: () => void;
}

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
    why: `Emirates receives over 15,000 cabin crew applications every single month. To handle this volume, they use an Applicant Tracking System (ATS) called Taleo — a computer program that scans your CV before any human ever sees it. If your CV fails the scan, you receive an automated rejection email within 24–48 hours. The recruiter never even knew you existed.

The ATS reads your document the way a computer reads text — left to right, top to bottom. Multi-column layouts, text boxes, embedded graphics, and design elements confuse the parser. It reads your carefully designed Canva CV as a near-empty document and scores it below the threshold. A clean, unqualified candidate with a plain Word document consistently beats a highly qualified candidate with a beautifully designed layout.`,
    testimonial: {
      quote: "I applied to Emirates three times using a two-column Canva CV I was really proud of. Each time: silence, then rejection within 48 hours. A friend who was already flying told me to delete the design entirely and use a plain Word document with the exact keywords from the job listing. My next application got me an assessment day invitation within 11 days.",
      source: "Composite experience drawn from cabin crew applicant community forums",
    },
    fix: [
      { step: "Use a single-column Word (.docx) document only — no Canva, no tables, no columns, no graphics", icon: "✅" },
      { step: "Add these keywords naturally in your experience sections: 'customer service,' 'hospitality,' 'emergency procedures,' 'multicultural team,' 'safety awareness,' 'first aid certified,' 'conflict resolution,' 'cabin crew'", icon: "🔑" },
      { step: "State height and arm reach explicitly — e.g. 'Height: 165cm | Arm Reach: 212cm (standing on tiptoes)' — in your personal profile header", icon: "📏" },
      { step: "Include a professional photo (UAE airlines expect this — Western advice to omit photos does NOT apply here)", icon: "📸" },
      { step: "Keep it to 1–2 pages maximum with clear section headers: Personal Profile, Work Experience, Education, Skills, Languages", icon: "📐" },
      { step: "Answer the 'Why Emirates?' field in 500 words — never say 'I love to travel' or 'I want to see the world' — widely reported by candidates as an immediate rejection trigger", icon: "⚠️" },
    ],
    youtubeSearch: "Emirates cabin crew CV ATS tips 2024",
    youtubeLabel: "How to Write an ATS-Proof Cabin Crew CV",
    stat: "15,000+ applications/month to Emirates alone",
  },
  {
    id: 2,
    emoji: "👗",
    label: "REASON 2",
    title: "Your Appearance Didn't Pass the Grooming Check",
    subtitle: "Recruiters make their first assessment within 90 seconds of seeing you — before you say a word.",
    accentColor: "text-pink-400",
    borderColor: "border-pink-500/30",
    bgColor: "from-pink-950/40 to-slate-800",
    badgeBg: "bg-pink-500/20 text-pink-300 border-pink-500/30",
    free: true,
    why: `Cabin crew are the physical embodiment of the airline's brand. Emirates, Qatar Airways, and Etihad invest enormously in their image — and they expect their crew to match it precisely. At CV drop-off and at the grooming check (which happens early in the assessment day), recruiters assess candidates against a strict checklist. This is not superficial: it reflects what passengers will see on every flight.

Visible acne, exposed tattoos, incorrect makeup, visible piercings, the wrong attire, or the wrong hair style can all result in immediate elimination — even if your interview performance is excellent. Critically, many candidates are eliminated at this stage who never understand why, because the airline won't tell them.`,
    testimonial: {
      quote: "I made it to the Emirates final interview twice and both times received a rejection. I later spoke to someone who had been on the panel and they mentioned my exposed forearm tattoo — which I thought was small and unimportant. Emirates requires all tattoos to be fully covered by the uniform at all times. I hadn't checked the specific uniform coverage areas.",
      source: "Composite experience drawn from cabin crew applicant community forums",
    },
    fix: [
      { step: "Skin: Clear skin is expected. Visible acne, prominent scars, or birthmarks on visible areas are noted. See a dermatologist if needed — this is a professional requirement, not a beauty standard", icon: "✨" },
      { step: "Tattoos: Must be completely covered by the Emirates uniform at all times. Check the exact uniform coverage diagram — even a small tattoo on the inner forearm may be visible. If in doubt, cover it with makeup or clothing for the assessment", icon: "🚫" },
      { step: "Women — Hair: Neat bun or updo, no loose hair. Emirates specifically looks for this professional hair presentation", icon: "💇‍♀️" },
      { step: "Women — Makeup: Professional, refined, and complete. Emirates cabin crew wear a signature red lip — arriving at your assessment this way signals awareness of their brand. No excessive dramatic makeup", icon: "💄" },
      { step: "Women — Attire: Pencil skirt or tailored trousers, professional blazer, heels (ballet flats acceptable but heels preferred). Conservative neckline. No excessive jewelry", icon: "👠" },
      { step: "Men — Be completely clean-shaven. Smart suit, polished shoes, conservative tie. Hair neatly styled", icon: "👔" },
      { step: "Height check: Emirates minimum is 160cm with an arm reach of 212cm standing on tiptoes. Etihad and Qatar have similar requirements. Measure yourself before applying", icon: "📏" },
    ],
    youtubeSearch: "Emirates cabin crew grooming standards assessment day 2024",
    youtubeLabel: "Emirates Grooming Standards Explained",
    stat: "Grooming assessed within 90 seconds at CV drop",
  },
  {
    id: 3,
    emoji: "🎥",
    label: "REASON 3",
    title: "You Failed the English / HireVue Screen",
    subtitle: "The English test is the single stage where the highest number of Emirates applicants are rejected.",
    accentColor: "text-blue-400",
    borderColor: "border-blue-500/30",
    bgColor: "from-blue-950/40 to-slate-800",
    badgeBg: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    free: false,
    why: `Emirates's online application route includes a HireVue digital interview and an English language assessment before you ever meet a recruiter. Candidates widely report this as the stage where the highest number of applicants are eliminated, consistent with analysis across multiple recruitment preparation platforms.

The HireVue consists of approximately 6 questions (some STAR-based, one gamified speed task), plus a written English comprehension and essay section. You typically have 30 seconds to prepare per question and 2–3 minutes to answer. Many candidates underestimate this stage because it feels less "real" than a face-to-face interview — that's the mistake.`,
    testimonial: {
      quote: "I thought the HireVue would be easy because English is my strong suit. What I didn't prepare for was the gamified speed task — it tests your cognitive processing under time pressure. I hesitated, started and restarted, and ran out of time. I never made it to the assessment day.",
      source: "Composite experience from candidate accounts shared across public recruitment forums",
    },
    fix: [
      { step: "Set up your recording environment before the interview: good lighting (face the light, don't sit with a window behind you), clean background, stable internet, phone or laptop at eye level", icon: "💡" },
      { step: "Practice looking directly into the camera lens — not at your own face on screen. This creates genuine eye contact", icon: "👁️" },
      { step: "Study the STAR method: Situation → Task → Action → Result. Practice answering out loud until it feels natural, not recited. Every answer must have all four parts", icon: "⭐" },
      { step: "The English test includes: reading comprehension passages, multiple-choice sentence completions, and a short essay (e.g. 'write a thank you letter' or 'describe a holiday you took'). Practice all three formats", icon: "📝" },
      { step: "Time yourself. You have 30 seconds to think, 2–3 minutes to answer. Speak at 75% of your normal speed — nervous candidates speak too fast and lose clarity", icon: "⏱️" },
      { step: "The gamified task tests quick decision-making under pressure. Practice simple pattern-recognition or sorting games to build cognitive speed", icon: "🎮" },
    ],
    youtubeSearch: "Emirates HireVue interview tips cabin crew 2024",
    youtubeLabel: "Emirates HireVue Interview Preparation Guide",
    stat: "Highest rejection rate of any Emirates stage",
  },
  {
    id: 4,
    emoji: "🎭",
    label: "REASON 4",
    title: "Your Answers Sounded Rehearsed or Generic",
    subtitle: "Emirates recruiters are trained to identify scripted, memorised answers — and they eliminate candidates who give them.",
    accentColor: "text-amber-400",
    borderColor: "border-amber-500/30",
    bgColor: "from-amber-950/40 to-slate-800",
    badgeBg: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    free: false,
    why: `This is the most common reason candidates fail the final interview despite feeling it went well. The recruiter is not looking for perfect answers — they're looking for real people with genuine stories. When candidates memorise scripted responses, their answers lack the specific detail, emotional truth, and natural language that makes a story believable.

Emirates, Etihad, and Qatar Airways all use STAR-format situational questions. The failure is almost always in the detail: stories without a clear Result, conflict examples where the candidate claims they "never really have conflicts," or motivational answers that mention travel — something candidates consistently report as an immediate rejection trigger across all three airlines.`,
    testimonial: {
      quote: "I attempted Emirates six times. Every time I made it to the final interview and was rejected. A coach reviewed my answers and told me immediately: 'Your story is good but you never tell them what happened in the end. You always describe what you did but never the outcome. The recruiter needs a complete story.' That was it. One change — adding the result — and I passed on my seventh attempt.",
      source: "Composite experience drawn from cabin crew applicant community forums",
    },
    fix: [
      { step: "NEVER say: 'I want to be cabin crew because I love to travel / meet people / see the world.' This is consistently flagged across candidate forums, coaching communities, and airline application guides as an immediate red flag. Instead, speak about service, safety, and the specific airline's values", icon: "🚫" },
      { step: "Every answer must follow STAR completely: Situation (brief context), Task (your specific role), Action (exactly what YOU did — use 'I', not 'we'), Result (measurable or observable outcome)", icon: "⭐" },
      { step: "For conflict questions: If you say 'I rarely have conflicts' or 'I get along with everyone' — you will be eliminated. Every professional has experienced conflict. Prepare a real example that shows you resolved it professionally", icon: "⚡" },
      { step: "Practice your answers OUT LOUD until they sound like a natural conversation, not a performance. Record yourself and listen back — if you sound like you're reading from a script, practice more", icon: "🎙️" },
      { step: "Prepare 8–10 real personal stories from your work history that cover: excellent customer service, working under pressure, handling conflict, making a decision without manager guidance, a mistake you made and learned from, teamwork", icon: "📖" },
      { step: "Weakness questions: Never say 'I'm a perfectionist' or 'I work too hard.' Pick a genuine area of development and show how you're actively addressing it", icon: "💪" },
    ],
    youtubeSearch: "Emirates cabin crew final interview STAR method tips fail",
    youtubeLabel: "Why Candidates Fail the Emirates Final Interview",
    stat: "6 attempts average for candidates with scripted answers",
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
    why: `The group exercise is the assessment stage most candidates misunderstand. Candidates focus entirely on what to say — what solutions, what ideas, what argument — when the recruiter is watching how you interact with other people. There are no right or wrong answers to the scenarios given. The exercise is designed to be open-ended precisely so that no single "correct" answer exists.

Multiple recruiters observe simultaneously, watching for: listening behaviour, how candidates treat quieter group members, whether they interrupt, how they respond to disagreement, and whether they maintain composure under social pressure. This maps directly to the cabin crew role — where crew interact with 300+ passengers of different cultures, temperaments, and needs in a high-pressure environment.`,
    testimonial: {
      quote: "I went into three Emirates assessment days thinking I needed to show leadership — speak up, contribute ideas, make the group follow a clear direction. Three rejections. Then someone who had passed told me: 'They're not hiring a manager. They want someone their passengers would feel safe with. Be warm, include everyone, listen more than you talk.' I passed the fourth time after completely changing my approach.",
      source: "Composite experience drawn from cabin crew applicant community forums",
    },
    fix: [
      { step: "Use inclusive language throughout: 'What does everyone think about this?', 'I'd like to build on what [name] said...', 'We as a group feel...', 'That's a great point — and I'd add...'", icon: "🤝" },
      { step: "If someone is quiet: actively bring them in. 'I'd love to hear what [name] thinks about this.' This is exactly the team behaviour Emirates looks for", icon: "💬" },
      { step: "Do not dominate. Speaking for more than 40% of the time is a red flag. Even if your ideas are good, monopolising the conversation signals poor team awareness", icon: "⚖️" },
      { step: "Do not stay silent. If you contribute fewer than 3–4 substantive points, you won't be noticed. The balance is: engaged but not dominant", icon: "🎯" },
      { step: "Never interrupt. Even if the other person is wrong. Wait for a natural pause, then contribute. Interrupting is one of the fastest ways to be eliminated", icon: "🤫" },
      { step: "Stay warm and calm throughout. If the discussion becomes heated or goes off track, a calm, measured de-escalation ('Can we refocus on the key question?') is exactly what recruiters want to see", icon: "😌" },
      { step: "Remember: recruiters observe you in breaks and during lunch too. The 'interview' begins when you walk through the door and doesn't end until you leave the building", icon: "👀" },
    ],
    youtubeSearch: "Emirates cabin crew assessment day group exercise tips",
    youtubeLabel: "Group Exercise Tips — Emirates Assessment Day",
    stat: "Recruiters observe ALL candidates simultaneously",
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
    why: `The rejection letter always says the same thing: "We regret to inform you that we have decided not to progress with your application." No reason given. No feedback. No indication of what went wrong. For many candidates — especially those who reached the final interview — this is the most devastating outcome because it offers nothing to improve on.

'Cultural fit' is the umbrella reason that covers everything from low energy to personality mismatch to values that don't align with the airline. Emirates, Qatar, and Etihad have specific internal cultures that they protect carefully. They also operate with nationality and diversity quotas for specific recruitment events — meaning some rejections have nothing to do with your performance.

What you can control: your energy, your alignment with their values, and your consistency throughout the entire day.`,
    testimonial: {
      quote: "I passed every stage of the Emirates assessment day with flying colours — grooming check, English test, group exercise, and I thought my final interview was excellent. Rejection email that evening. I contacted a coach who had been an Emirates recruiter. She told me: 'You were performing. The recruiter could feel the difference between who you were in the formal interview and who you were during the break. Emirates wants to see the same person in both.' That stuck with me.",
      source: "Composite experience drawn from cabin crew applicant community forums",
    },
    fix: [
      { step: "Research the airline's stated values before your interview. Emirates: 'Fly Better' (excellence, diversity, innovation, safety). Qatar: 'Going Places Together' (hospitality, perfection, care). Etihad: 'Choose Well' (empathy, diversity, responsibility). Prepare one real personal example for each value", icon: "🔍" },
      { step: "Mirror their language in your answers. Use phrases like 'world-class service,' 'diverse team,' 'safety-first culture,' 'passenger wellbeing.' Recruiters register subconsciously when candidates speak their language", icon: "🗣️" },
      { step: "Maintain consistent, warm energy ALL DAY. The formal interview is not the only moment you're being assessed. Your behaviour during registration, in the waiting area, during breaks, and at lunch is all observed", icon: "⚡" },
      { step: "Genuine enthusiasm reads differently from performed enthusiasm. Find the specific thing about this airline that genuinely excites you and speak from that place. Recruiters have interviewed thousands of candidates — they know the difference", icon: "❤️" },
      { step: "Prepare one thoughtful question to ask at the end of the final interview. Something specific to the airline and role, not something you could Google. Example: 'How does the crew culture at Emirates support new joiners adapting to life in Dubai?'", icon: "❓" },
      { step: "If you're rejected for 'cultural fit' and you've addressed all the above: understand that some rejections involve factors outside your control (quotas, recruiter chemistry, timing). This is not a reflection of your worth. Emirates has 2,100+ open days planned globally in 2026 — reapply in 6 months with fresh preparation", icon: "🔄" },
    ],
    youtubeSearch: "Emirates cabin crew cultural fit rejection why failed final interview",
    youtubeLabel: "Understanding the 'Cultural Fit' Rejection",
    stat: "Most common undisclosed reason for final-stage rejection",
  },
];

export default function RejectionDecodedSection({
  goBack,
  previousLabel,
  tier,
  onNavigatePremium,
}: RejectionDecodedSectionProps) {
  const [openCard, setOpenCard] = useState<number | null>(null);
  const isLocked = (free: boolean) => !free && tier === "free";

  const handleCardClick = (id: number, free: boolean) => {
    if (isLocked(free)) return;
    setOpenCard(openCard === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-slate-900 pt-20">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 pt-6">
        <button
          onClick={goBack}
          className="flex items-center gap-2 text-slate-400 hover:text-amber-400 transition-colors text-sm mb-6"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          ← {previousLabel}
        </button>
      </div>

      {/* Hero */}
      <div className="max-w-4xl mx-auto px-4 pb-10">
        <div className="relative bg-gradient-to-br from-red-950/60 via-slate-800/80 to-slate-900 border border-red-500/20 rounded-3xl p-8 md:p-12 overflow-hidden mb-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 bg-red-500/15 border border-red-500/30 rounded-full px-4 py-1.5 mb-5">
              <span className="text-red-400 text-xs font-bold uppercase tracking-widest">Gulf Carrier Intelligence</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Rejection<br />
              <span className="bg-gradient-to-r from-red-400 via-amber-400 to-red-400 bg-clip-text text-transparent">
                Decoded
              </span>
            </h1>
            <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl mb-6">
              Airlines never tell you why you failed. This guide does. Six evidence-backed reasons why
              candidates are rejected at Emirates, Qatar Airways, and Etihad — with real examples and
              specific fixes for each.
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-center">
                <div className="text-amber-400 font-bold text-lg">15,000+</div>
                <div className="text-slate-400 text-xs">Emirates apps/month</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-center">
                <div className="text-amber-400 font-bold text-lg">6 months</div>
                <div className="text-slate-400 text-xs">Wait to reapply if rejected</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-center">
                <div className="text-amber-400 font-bold text-lg">0</div>
                <div className="text-slate-400 text-xs">Feedback given on rejection</div>
              </div>
            </div>
          </div>
        </div>

        {/* Legal disclaimer notice */}
        <div className="bg-slate-800/50 border border-slate-700/40 rounded-xl px-5 py-4 mb-6 flex items-start gap-3">
          <span className="text-slate-500 text-base flex-shrink-0 mt-0.5">ℹ️</span>
          <p className="text-slate-500 text-xs leading-relaxed">
            The rejection reasons and recruitment process details on this page are based on publicly reported candidate experiences from forums, community platforms, and open candidate discussions. They do not represent confirmed policies of any airline. Always verify current requirements directly with the airline before applying.
          </p>
        </div>

        {/* Tier notice for free users */}
        {tier === "free" && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5 mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="text-3xl">🔓</div>
            <div className="flex-1">
              <p className="text-amber-300 font-bold text-sm mb-1">2 of 6 Reasons Unlocked — Free Plan</p>
              <p className="text-slate-400 text-sm">Reasons 1 and 2 are available free. Upgrade to Standard or Premium to unlock all 6 rejection reasons with full examples and fixes.</p>
            </div>
            <button
              onClick={onNavigatePremium}
              className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-5 py-2.5 rounded-xl text-sm transition-all hover:scale-105 flex-shrink-0"
            >
              Unlock All →
            </button>
          </div>
        )}

        {/* Reason Cards */}
        <div className="space-y-4">
          {reasons.map((reason) => {
            const locked = isLocked(reason.free);
            const isOpen = openCard === reason.id && !locked;

            return (
              <div
                key={reason.id}
                className={`relative rounded-2xl border transition-all duration-300 overflow-hidden ${
                  locked
                    ? "border-white/10 bg-slate-800/40 cursor-default"
                    : `${reason.borderColor} bg-gradient-to-br ${reason.bgColor} cursor-pointer hover:scale-[1.01]`
                }`}
              >
                {/* Card Header */}
                <button
                  onClick={() => handleCardClick(reason.id, reason.free)}
                  className="w-full text-left p-5 md:p-6"
                  disabled={locked}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${locked ? "bg-white/5" : "bg-white/10"}`}>
                      {locked ? "🔒" : reason.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className={`text-xs font-bold uppercase tracking-wider border rounded-full px-2.5 py-0.5 ${locked ? "bg-white/5 text-slate-500 border-white/10" : reason.badgeBg}`}>
                          {reason.label}
                        </span>
                        {locked && (
                          <span className="text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-full px-2.5 py-0.5">
                            Standard+
                          </span>
                        )}
                      </div>
                      <h3 className={`font-bold text-base md:text-lg leading-snug ${locked ? "text-slate-500" : "text-white"}`}>
                        {reason.title}
                      </h3>
                      <p className={`text-sm mt-1 leading-relaxed ${locked ? "text-slate-600" : "text-slate-400"}`}>
                        {reason.subtitle}
                      </p>
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

                {/* Locked overlay CTA */}
                {locked && (
                  <div className="px-5 md:px-6 pb-5">
                    <button
                      onClick={onNavigatePremium}
                      className="w-full bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 font-semibold py-3 rounded-xl text-sm transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
                    >
                      🔓 Unlock this reason — Upgrade to Standard
                    </button>
                  </div>
                )}

                {/* Expanded Content */}
                {isOpen && (
                  <div className="px-5 md:px-6 pb-6 border-t border-white/5 pt-5">
                    {/* Stat callout */}
                    <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold mb-5 border ${reason.badgeBg}`}>
                      📊 {reason.stat}
                    </div>

                    {/* Why this happens */}
                    <div className="mb-6">
                      <h4 className={`text-xs font-bold uppercase tracking-wider mb-3 ${reason.accentColor}`}>
                        Why This Happens
                      </h4>
                      <div className="text-slate-300 text-sm leading-relaxed space-y-3">
                        {reason.why.split("\n\n").map((para, i) => (
                          <p key={i}>{para}</p>
                        ))}
                      </div>
                    </div>

                    {/* Testimonial */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 md:p-5 mb-6">
                      <div className="flex items-start gap-3">
                        <div className="text-2xl flex-shrink-0 mt-0.5">💬</div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Real Candidate Experience</h4>
                          <blockquote className="text-slate-300 text-sm leading-relaxed italic mb-2">
                            "{reason.testimonial.quote}"
                          </blockquote>
                          <p className="text-slate-500 text-xs">— {reason.testimonial.source}</p>
                        </div>
                      </div>
                    </div>

                    {/* The Fix */}
                    <div className="mb-6">
                      <h4 className={`text-xs font-bold uppercase tracking-wider mb-3 ${reason.accentColor}`}>
                        The Fix — Specific Actions
                      </h4>
                      <div className="space-y-3">
                        {reason.fix.map((item, i) => (
                          <div key={i} className="flex items-start gap-3 bg-white/3 border border-white/5 rounded-xl p-3.5">
                            <span className="text-lg flex-shrink-0">{item.icon}</span>
                            <p className="text-slate-300 text-sm leading-relaxed">{item.step}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* YouTube search link */}
                    <a
                      href={`https://www.youtube.com/results?search_query=${encodeURIComponent(reason.youtubeSearch)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-3 border border-white/10 bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-all group`}
                    >
                      <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-sm font-semibold group-hover:text-amber-400 transition-colors">
                          ▶ {reason.youtubeLabel}
                        </p>
                        <p className="text-slate-500 text-xs mt-0.5">Search YouTube for relevant guides</p>
                      </div>
                      <svg className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom upgrade CTA for free users */}
        {tier === "free" && (
          <div className="mt-10 bg-gradient-to-br from-amber-900/30 to-slate-800 border border-amber-500/30 rounded-3xl p-8 text-center">
            <div className="text-4xl mb-4">🔓</div>
            <h3 className="text-white font-bold text-xl mb-2">Unlock All 6 Rejection Reasons</h3>
            <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">
              Reasons 3–6 cover the HireVue screen, rehearsed answers, the group exercise, and the "cultural fit" silent rejection — the four most misunderstood elimination stages. Standard plan includes full access.
            </p>
            <button
              onClick={onNavigatePremium}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-900 font-bold px-8 py-4 rounded-xl shadow-lg shadow-amber-500/30 transition-all hover:scale-105 text-base"
            >
              View Plans & Unlock →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
