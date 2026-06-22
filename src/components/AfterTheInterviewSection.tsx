import { useState } from "react";

interface AfterTheInterviewSectionProps {
  goBack: () => void;
  previousLabel: string;
  tier: string;
  onNavigatePremium: () => void;
}

const phases = [
  {
    id: 1,
    emoji: "🤫",
    label: "PHASE 1",
    title: "The First Week of Silence",
    subtitle: "What's actually happening behind closed doors — and how to read the signals correctly.",
    accentColor: "text-slate-300",
    borderColor: "border-slate-500/40",
    bgColor: "from-slate-800/80 to-slate-900",
    badgeBg: "bg-slate-600/30 text-slate-300 border-slate-500/40",
    free: true,
    stat: "Documented wait range: 30 days to 6 months",
    why: `After your final interview, the recruiter sends your complete file to Emirates HQ in Dubai. This is not automated — it goes to a recruitment coordinator who compiles all candidates from that assessment day along with scoring notes and observations. That review typically takes 1–2 weeks. During this time: nothing. No email. No call. No status update.

The silence is not a sign you failed. It is a sign the process is working normally. The recruiter may have seen 40+ candidates that day. Your file is being compared, ranked, and reviewed against everyone else from that session and potentially other sessions from the same month.

The first positive signal, if you passed, is almost always either: a phone call from a Dubai number asking you to confirm your availability, or an email asking for additional documents. A request for documents is your first real indication that you are being progressed.`,
    testimonial: {
      quote: "I was convinced I had failed because I heard nothing for three weeks. Then a call came from a +971 number I didn't recognise. I nearly didn't pick up. It was Emirates asking me to start submitting documents for my medical clearance. That silence meant nothing — but it felt like everything.",
      source: "Composite experience drawn from cabin crew applicant community forums",
    },
    checklist: [
      { item: "Check your spam/junk folder daily — Emirates emails frequently land there", icon: "📧" },
      { item: "Save the Emirates recruitment number in your phone so you recognise a Dubai call (+971)", icon: "📱" },
      { item: "Track your Emirates online status: 'Approval in Progress' = conditional offer pending · 'Joining Formalities in Progress' = you are in", icon: "🖥️" },
      { item: "Do not call Emirates to follow up within the first 3 weeks — it carries no benefit", icon: "🔕" },
      { item: "If 6 weeks pass with no contact and your status has not changed, your application was not successful on this occasion", icon: "⏰" },
    ],
    youtubeSearch: "Emirates cabin crew golden call experience after final interview",
    youtubeLabel: "Candidates React to the Emirates Golden Call",
  },
  {
    id: 2,
    emoji: "🏥",
    label: "PHASE 2",
    title: "The Medical Check",
    subtitle: "Being invited to your medical is the strongest confirmation you passed. Here is exactly what they test.",
    accentColor: "text-green-400",
    borderColor: "border-green-500/30",
    bgColor: "from-green-950/40 to-slate-800",
    badgeBg: "bg-green-500/20 text-green-300 border-green-500/30",
    free: true,
    stat: "GCAA-standard examination — conducted under UAE aviation authority",
    why: `The pre-employment medical is conducted under UAE General Civil Aviation Authority (GCAA) standards. For Emirates, this happens in Dubai after you arrive. For some international candidates, initial tests may be arranged locally before travel. The medical is a genuine filter — candidates do fail at this stage.

The medical runs simultaneously with your criminal background check. Emirates verifies employment history, checks criminal records in your country of origin, and confirms there are no misrepresentations in your application. Any discrepancy between what you declared and what checks reveal is grounds for withdrawal of your offer.

Honesty in your application is not optional — it is the only viable strategy. Disclosing a condition upfront is recoverable. Being found to have concealed one is not.`,
    testimonial: {
      quote: "At my medical, one blood test came back borderline. They gave me 30 days to get a specialist clearance letter. I nearly gave up. I got the letter, submitted it, and my DOJ came through 3 weeks later. A medical flag is not automatically the end — get documentation, communicate, and follow their process.",
      source: "Composite experience drawn from cabin crew applicant community forums",
    },
    checklist: [
      { item: "Vision: minimum 6/9 corrected. Contact lenses required — no spectacles in uniform. Laser surgery accepted if fully healed 6–12 months prior", icon: "👁️" },
      { item: "BMI: generally below 28. Emirates assesses proportionality holistically — fitness and professional presentation are evaluated alongside the number", icon: "⚖️" },
      { item: "Blood tests: HIV, Hepatitis B surface antigen, VDRL (syphilis), TB chest X-ray, drug screen. UAE law does not issue residency visas for HIV-positive candidates — Emirates discloses this standard before you travel", icon: "🩸" },
      { item: "Hearing: conversational voice at 2 metres, both ears. Mild cases correctable with hearing aids may be accepted", icon: "👂" },
      { item: "Dental: oral health is assessed. Severe untreated conditions may be flagged before joining", icon: "🦷" },
      { item: "No alcohol 48 hours before your medical. Sleep well. Bring all original documents plus certified copies", icon: "📋" },
      { item: "Pre-existing conditions are not covered by Emirates medical insurance for the first 2 years — declare everything honestly upfront", icon: "⚠️" },
    ],
    youtubeSearch: "Emirates cabin crew medical day induction Dubai what to expect",
    youtubeLabel: "Emirates Medical Day — What Actually Happens",
  },
  {
    id: 3,
    emoji: "📄",
    label: "PHASE 3",
    title: "The Offer Letter & DOJ Wait",
    subtitle: "You have the offer. Now comes the part most candidates least expect — more waiting.",
    accentColor: "text-amber-400",
    borderColor: "border-amber-500/30",
    bgColor: "from-amber-950/40 to-slate-800",
    badgeBg: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    free: false,
    stat: "DOJ wait: from immediate to 6 months — depends on training class cycle",
    why: `The offer letter arrives after you pass your medical and background checks. It contains your salary breakdown, benefits, contract duration (typically 3 years, renewable), base location (Dubai), and your Date of Joining — or instructions on when a DOJ will be confirmed.

DOJ timing depends entirely on Emirates' training class schedule. Emirates trains cabin crew in cohorts — each class starts at fixed intervals. If you pass your medical the same week a class is forming, your DOJ could be within days. If you just missed a cycle, you wait for the next one. Candidates in forums report DOJ waits ranging from immediate to over 6 months, with many falling in the 1–3 month range.

The critical rule: do not resign from your current job until you have both a signed offer letter AND a confirmed DOJ date. An offer letter without a DOJ date is still a conditional offer. Life decisions made on a conditional offer can backfire.`,
    testimonial: {
      quote: "My offer letter arrived in February. It said my DOJ would be confirmed within 4–6 weeks. It came through at 8 weeks. I had already told my employer I was leaving. Those 8 weeks were more stressful than any interview. Wait for the DOJ date before making any life decisions.",
      source: "Composite experience drawn from cabin crew applicant community forums",
    },
    checklist: [
      { item: "Read your offer letter carefully — check salary, contract length, and every condition attached to the offer before accepting", icon: "📋" },
      { item: "Accept within the deadline stated — usually 5–7 days. If you need more time, contact Emirates recruitment in writing", icon: "⏰" },
      { item: "Do NOT resign from your current employer until you have a confirmed DOJ date — not just an offer letter", icon: "🚫" },
      { item: "Emirates arranges your UAE employment visa — you do not apply separately. Do not pay anyone claiming to assist with this process", icon: "🛂" },
      { item: "Start apostilling documents now: birth certificate, criminal record clearance, degree or diploma. Allow 2–6 weeks depending on your country", icon: "📑" },
      { item: "If your DOJ is delayed beyond what was communicated, contact Emirates recruitment by email and keep all correspondence in writing", icon: "✉️" },
    ],
    youtubeSearch: "Emirates cabin crew offer letter date of joining wait experience",
    youtubeLabel: "Emirates Offer Letter & DOJ — What to Expect",
  },
  {
    id: 4,
    emoji: "⏳",
    label: "PHASE 4",
    title: "What To Do During the Wait",
    subtitle: "The limbo between offer and joining is a preparation window — not dead time.",
    accentColor: "text-blue-400",
    borderColor: "border-blue-500/30",
    bgColor: "from-blue-950/40 to-slate-800",
    badgeBg: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    free: false,
    stat: "Emirates training: 7.5 weeks — assessed continuously throughout",
    why: `Most candidates spend the DOJ wait anxiously checking email. The candidates who thrive in training are the ones who use this period intentionally. Emirates training is intense — 7.5 weeks of safety procedures, service standards, and emergency drills, assessed at every stage. Arriving prepared makes a measurable difference to your experience.

The practical side of relocating to Dubai also demands attention. Accommodation, banking, transport, SIM cards — all of this has to be resolved in your first weeks, while simultaneously managing the most demanding professional training of your life. Candidates who arrive without any preparation describe the first two weeks as overwhelming. Those who have done groundwork describe them as exciting.`,
    testimonial: {
      quote: "I had 3 months between my offer and my DOJ. I spent the first month doing nothing — just waiting. The next two months I studied basic Arabic, learned Dubai's metro system on Google Maps, opened a Wise account, and did daily fitness. The candidates who struggled in training were always the ones who arrived having done nothing to prepare.",
      source: "Composite experience drawn from cabin crew applicant community forums",
    },
    checklist: [
      { item: "Fitness: training involves early starts, long practical sessions, and a swimming test. Build your physical endurance and stamina now", icon: "🏃‍♀️" },
      { item: "Financial buffer: calculate at least 2–3 months of living expenses. Dubai costs are high in the first month before salary arrives. Emirates pays monthly", icon: "💰" },
      { item: "Documents: apostille your birth certificate, criminal record clearance, and any educational certificates now — this takes weeks in most countries", icon: "📑" },
      { item: "Arabic basics: شكراً (shukran = thank you) · أهلاً (ahlan = hello) · من فضلك (min fadlak = please). Even 10 phrases signals genuine cultural respect to colleagues", icon: "🗣️" },
      { item: "Dubai orientation: study the key areas (Jumeirah, Al Barsha, Deira, Dubai Marina), learn the Nol metro card system, download Careem for transport", icon: "🌆" },
      { item: "Banking: open a Wise or Revolut account for international transfers now. Your UAE bank account (Emirates NBD or FAB are most common for new joiners) comes after you arrive", icon: "🏦" },
      { item: "Mental health: stay connected to your support network. Avoid irreversible life decisions — selling property, ending leases — until your DOJ is fully confirmed", icon: "🧠" },
    ],
    youtubeSearch: "moving to Dubai cabin crew prepare before Emirates joining date",
    youtubeLabel: "What to Prepare Before Your Emirates DOJ",
  },
  {
    id: 5,
    emoji: "🔄",
    label: "PHASE 5",
    title: "If You Were Rejected: The Comeback Plan",
    subtitle: "The 6-month wait is not a punishment. It is a preparation window. Here is how to use every week of it.",
    accentColor: "text-red-400",
    borderColor: "border-red-500/30",
    bgColor: "from-red-950/40 to-slate-800",
    badgeBg: "bg-red-500/20 text-red-300 border-red-500/30",
    free: false,
    stat: "6-month mandatory wait: Emirates, Qatar Airways, and Etihad",
    why: `Emirates, Qatar Airways, and Etihad all enforce a mandatory 6-month wait before reapplying after rejection at any stage of the process. The 6-month clock begins from the date your rejection is confirmed — not the date of your interview.

Many serving cabin crew passed on their second, third, or later attempt. The difference between candidates who eventually succeed and those who keep failing the same stage is specificity — they identified exactly where they failed, targeted that weakness deliberately, and approached the next application as a materially different candidate. A second attempt that is a repeat of the first will produce the same outcome.

The 6 months are not empty time. They are the most productive training period available to you — because you now know exactly what the process looks like from the inside.`,
    testimonial: {
      quote: "I failed Emirates three times. HireVue first. Group exercise second. Final interview third. Each time I went back, I had a specific plan. By my third attempt I had done weekly mock interviews for five months straight. I joined in 2023. The 6 months between each attempt felt like punishment at the time. Looking back, each one made me a significantly stronger candidate.",
      source: "Composite experience drawn from cabin crew applicant community forums",
    },
    checklist: [
      { item: "Month 1: Allow yourself to process the rejection properly. Two to three weeks before starting your debrief — burnout and rushed reapplications rarely succeed", icon: "🧘‍♀️" },
      { item: "Month 1–2: Identify exactly which stage you failed. Be honest with yourself. Use the Rejection Decoded section of this guidebook to diagnose the specific reason", icon: "🔍" },
      { item: "Month 2–3: Target that stage exclusively. Failed HireVue? Practice English tests and STAR answers daily. Failed group exercise? Practice inclusive language and active listening in every group setting", icon: "🎯" },
      { item: "Month 3–4: Film yourself doing mock interviews weekly. Watch them back. The gap between how you think you come across and how you actually come across is often larger than you expect", icon: "🎥" },
      { item: "Month 4–5: Refresh everything — new professional photos, updated CV, revisit grooming standards. Do not resubmit the same application materials", icon: "✨" },
      { item: "Month 6: Apply. You are a different candidate from six months ago. Approach the application as a new start, not a retry", icon: "🚀" },
      { item: "During the Emirates wait: consider applying to Etihad or Qatar Airways. The interview skills transfer directly, and the experience often strengthens a subsequent Emirates application", icon: "✈️" },
    ],
    youtubeSearch: "Emirates cabin crew rejected reapply 6 months comeback plan",
    youtubeLabel: "How to Come Back Stronger After a Rejection",
  },
];

export default function AfterTheInterviewSection({
  goBack,
  previousLabel,
  tier,
  onNavigatePremium,
}: AfterTheInterviewSectionProps) {
  const [openPhase, setOpenPhase] = useState<number | null>(null);
  const isLocked = (free: boolean) => !free && tier === "free";

  const handlePhaseClick = (id: number, free: boolean) => {
    if (isLocked(free)) return;
    setOpenPhase(openPhase === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-slate-900 pt-20">
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

      <div className="max-w-4xl mx-auto px-4 pb-10">

        {/* Hero */}
        <div className="relative bg-gradient-to-br from-slate-800/80 via-slate-800/60 to-slate-900 border border-white/10 rounded-3xl p-8 md:p-12 overflow-hidden mb-6">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 mb-5">
              <span className="text-slate-300 text-xs font-bold uppercase tracking-widest">The Part No One Talks About</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
              After the<br />
              <span className="bg-gradient-to-r from-slate-300 via-amber-300 to-slate-300 bg-clip-text text-transparent">
                Interview
              </span>
            </h1>
            <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl mb-6">
              Every competitor stops at interview prep. Nobody covers what comes next — the silence, the medical, 
              the DOJ wait, and what to do if it doesn't go your way. This does.
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-center">
                <div className="text-amber-400 font-bold text-lg">30d–6m</div>
                <div className="text-slate-400 text-xs">Post-interview wait range</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-center">
                <div className="text-amber-400 font-bold text-lg">7.5 weeks</div>
                <div className="text-slate-400 text-xs">Emirates training duration</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-center">
                <div className="text-amber-400 font-bold text-lg">6 months</div>
                <div className="text-slate-400 text-xs">Mandatory reapplication wait</div>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-slate-800/50 border border-slate-700/40 rounded-xl px-5 py-4 mb-6 flex items-start gap-3">
          <span className="text-slate-500 text-base flex-shrink-0 mt-0.5">ℹ️</span>
          <p className="text-slate-500 text-xs leading-relaxed">
            The timelines, process details, and experiences on this page are based on publicly reported candidate accounts from forums and community platforms. 
            They do not represent confirmed policies of any airline. Always verify current processes directly with the relevant airline.
          </p>
        </div>

        {/* Free tier notice */}
        {tier === "free" && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5 mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="text-3xl">🔓</div>
            <div className="flex-1">
              <p className="text-amber-300 font-bold text-sm mb-1">Phases 1 & 2 Unlocked — Free Plan</p>
              <p className="text-slate-400 text-sm">The Offer Letter, DOJ Wait, Preparation Guide, and Comeback Plan are available on Standard and Premium.</p>
            </div>
            <button
              onClick={onNavigatePremium}
              className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-5 py-2.5 rounded-xl text-sm transition-all hover:scale-105 flex-shrink-0"
            >
              Unlock All →
            </button>
          </div>
        )}

        {/* Phase Cards */}
        <div className="space-y-4">
          {phases.map((phase) => {
            const locked = isLocked(phase.free);
            const isOpen = openPhase === phase.id && !locked;

            return (
              <div
                key={phase.id}
                className={`relative rounded-2xl border transition-all duration-300 overflow-hidden ${
                  locked
                    ? "border-white/10 bg-slate-800/40 cursor-default"
                    : `${phase.borderColor} bg-gradient-to-br ${phase.bgColor} cursor-pointer hover:scale-[1.01]`
                }`}
              >
                {/* Header */}
                <button
                  onClick={() => handlePhaseClick(phase.id, phase.free)}
                  className="w-full text-left p-5 md:p-6"
                  disabled={locked}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${locked ? "bg-white/5" : "bg-white/10"}`}>
                      {locked ? "🔒" : phase.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className={`text-xs font-bold uppercase tracking-wider border rounded-full px-2.5 py-0.5 ${locked ? "bg-white/5 text-slate-500 border-white/10" : phase.badgeBg}`}>
                          {phase.label}
                        </span>
                        {locked && (
                          <span className="text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-full px-2.5 py-0.5">
                            Standard+
                          </span>
                        )}
                      </div>
                      <h3 className={`font-bold text-base md:text-lg leading-snug ${locked ? "text-slate-500" : "text-white"}`}>
                        {phase.title}
                      </h3>
                      <p className={`text-sm mt-1 leading-relaxed ${locked ? "text-slate-600" : "text-slate-400"}`}>
                        {phase.subtitle}
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

                {/* Locked CTA */}
                {locked && (
                  <div className="px-5 md:px-6 pb-5">
                    <button
                      onClick={onNavigatePremium}
                      className="w-full bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 font-semibold py-3 rounded-xl text-sm transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
                    >
                      🔓 Unlock this phase — Upgrade to Standard
                    </button>
                  </div>
                )}

                {/* Expanded Content */}
                {isOpen && (
                  <div className="px-5 md:px-6 pb-6 border-t border-white/5 pt-5">

                    {/* Stat badge */}
                    <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold mb-5 border ${phase.badgeBg}`}>
                      📊 {phase.stat}
                    </div>

                    {/* Why section */}
                    <div className="mb-6">
                      <h4 className={`text-xs font-bold uppercase tracking-wider mb-3 ${phase.accentColor}`}>
                        What's Actually Happening
                      </h4>
                      <div className="text-slate-300 text-sm leading-relaxed space-y-3">
                        {phase.why.split("\n\n").map((para, i) => (
                          <p key={i}>{para}</p>
                        ))}
                      </div>
                    </div>

                    {/* Testimonial */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 md:p-5 mb-6">
                      <div className="flex items-start gap-3">
                        <div className="text-2xl flex-shrink-0 mt-0.5">💬</div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Candidate Experience</h4>
                          <blockquote className="text-slate-300 text-sm leading-relaxed italic mb-2">
                            "{phase.testimonial.quote}"
                          </blockquote>
                          <p className="text-slate-500 text-xs">— {phase.testimonial.source}</p>
                        </div>
                      </div>
                    </div>

                    {/* Checklist */}
                    <div className="mb-6">
                      <h4 className={`text-xs font-bold uppercase tracking-wider mb-3 ${phase.accentColor}`}>
                        Your Action Checklist
                      </h4>
                      <div className="space-y-3">
                        {phase.checklist.map((item, i) => (
                          <div key={i} className="flex items-start gap-3 bg-white/3 border border-white/5 rounded-xl p-3.5">
                            <span className="text-lg flex-shrink-0">{item.icon}</span>
                            <p className="text-slate-300 text-sm leading-relaxed">{item.item}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* YouTube link */}
                    <a
                      href={`https://www.youtube.com/results?search_query=${encodeURIComponent(phase.youtubeSearch)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 border border-white/10 bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-all group"
                    >
                      <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-sm font-semibold group-hover:text-amber-400 transition-colors">
                          ▶ {phase.youtubeLabel}
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
          <div className="mt-10 bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 rounded-3xl p-8 text-center">
            <div className="text-4xl mb-4">🔓</div>
            <h3 className="text-white font-bold text-xl mb-2">Unlock All 5 Phases</h3>
            <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">
              Phases 3–5 cover the offer letter, the DOJ wait, your Dubai preparation checklist, and the 6-month comeback plan. Available on Standard and Premium.
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
