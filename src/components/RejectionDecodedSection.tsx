import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface StatBox {
  val: string;
  label: string;
}

interface AirlineConfig {
  id: string;
  name: string;
  shortName: string;
  flag: string;
  heroStats: StatBox[];
}

interface RejectionDecodedSectionProps {
  goBack: () => void;
  previousLabel: string;
  tier: string;
  onNavigatePremium: () => void;
}

// ─── Airlines ─────────────────────────────────────────────────────────────────

const airlines: AirlineConfig[] = [
  {
    id: "emirates",
    name: "Emirates",
    shortName: "Emirates",
    flag: "🇦🇪",
    heroStats: [
      { val: "15,000+", label: "Applications/month (widely reported)" },
      { val: "6 months", label: "Confirmed reapply wait" },
      { val: "0", label: "Feedback given on rejection" },
    ],
  },
  {
    id: "qatar",
    name: "Qatar Airways",
    shortName: "Qatar Airways",
    flag: "🇶🇦",
    heroStats: [
      { val: "Global", label: "Open day recruitment" },
      { val: "Varies", label: "Reapply wait — verify directly" },
      { val: "0", label: "Feedback given on rejection" },
    ],
  },
  {
    id: "etihad",
    name: "Etihad",
    shortName: "Etihad",
    flag: "🇦🇪",
    heroStats: [
      { val: "Global", label: "Open day recruitment" },
      { val: "Varies", label: "Reapply wait — verify directly" },
      { val: "0", label: "Feedback given on rejection" },
    ],
  },
  {
    id: "flydubai",
    name: "flydubai",
    shortName: "flydubai",
    flag: "🇦🇪",
    heroStats: [
      { val: "~25 days", label: "Reported post-interview wait" },
      { val: "Verify", label: "Reapply wait — check with flydubai" },
      { val: "0", label: "Feedback given on rejection" },
    ],
  },
  {
    id: "airarabia",
    name: "Air Arabia",
    shortName: "Air Arabia",
    flag: "🇦🇪",
    heroStats: [
      { val: "~2 weeks", label: "Reported post-interview response" },
      { val: "Verify", label: "Reapply wait — check with Air Arabia" },
      { val: "0", label: "Feedback given on rejection" },
    ],
  },
];

const defaultHeroStats: StatBox[] = [
  { val: "5", label: "Gulf airlines covered" },
  { val: "6", label: "Rejection reasons decoded" },
  { val: "0", label: "Feedback given on rejection" },
];

// ─── Airline-specific notes per reason (id 1–6) ───────────────────────────────

const airlineNotes: Record<string, Record<number, string>> = {
  emirates: {
    1: "Candidates widely report that Emirates uses an ATS called Taleo. Emirates is widely reported to receive 15,000+ applications per month — candidates consistently report that rejected CVs receive an automated response with no indication any human reviewed the application.",
    2: "Emirates minimum requirements: 160cm height, 212cm arm reach (standing on tiptoes). Women: signature red lip and neat bun or updo are expected at assessment. All tattoos must be completely covered by the uniform at all times.",
    3: "Candidates widely report that Emirates uses a platform called HireVue — approximately 6 questions including one gamified cognitive speed task, plus a written English section. Candidates widely report having around 30 seconds to prepare and 2–3 minutes to answer per question. The gamified task is widely reported as the most commonly underestimated stage.",
    4: "Emirates STAR-format questions include 'Tell me about a time you went above and beyond for a customer' and 'Why Emirates?' Candidates widely report that mentioning travel as motivation is an immediate rejection trigger.",
    5: "Emirates assessment days have multiple observers watching all candidates simultaneously. The scenario is deliberately open-ended — no right answers exist. Candidates widely report that recruiters observe continuously from the moment you arrive, including during registration and breaks.",
    6: "Emirates: 'Fly Better' — excellence, diversity, innovation, safety. Confirmed reapplication wait: 6 months. Post-interview wait: 30 days to 6 months. Maintain the same warm, authentic energy in every informal moment as in the formal interview.",
  },
  qatar: {
    1: "Qatar Airways uses its own careers portal. Application volume is extremely high for a Doha-based operation. Candidates widely report fast automated screening — a clean, keyword-rich single-column CV is as critical here as at any Gulf carrier.",
    2: "Qatar Airways height and arm reach requirements are similar to Emirates — verify directly before applying. Polished, elegant presentation is expected. All tattoos must be covered by the airline's uniform. Candidates report a refined, high-standard grooming expectation.",
    3: "Qatar Airways uses its own online portal with English assessment and screening questions. Candidates widely report a structured multi-stage screening process. Prepare STAR-format answers and practise written English before completing your application.",
    4: "Qatar Airways uses STAR-format interview questions. Candidates report that 'Why Qatar?' answers mentioning travel or luxury aspirations are flagged immediately. The 'Going Places Together' values — hospitality, perfection, care — should be central to your answers.",
    5: "Qatar Airways group exercises follow a similar observation framework to other Gulf carriers. Candidates report that cultural sensitivity and genuine warmth toward all group members are specifically noted — consistent with the airline's deep hospitality identity.",
    6: "Qatar Airways: 'Going Places Together' — hospitality, perfection, care. Deeply rooted in Qatari heritage and world-class service. Candidates report that genuine warmth and cultural awareness are closely observed throughout the entire assessment day.",
  },
  etihad: {
    1: "Etihad uses its own online careers portal. Candidates report ATS-style CV filtering similar to other Gulf carriers. A clean, single-column, keyword-rich document is essential — the same formatting errors that trigger rejections at Emirates apply equally here.",
    2: "Etihad height and arm reach requirements are similar to Emirates — verify directly before applying. A refined, understated elegance is expected in grooming and presentation. All tattoos must be completely covered by the airline's uniform.",
    3: "Etihad's online application includes screening questions and an English proficiency component. Candidates report a structured assessment format comparable to other Gulf carriers. Prepare STAR-based answers and practise written English before completing your application.",
    4: "Etihad uses STAR-format interview questions. Candidates widely report that considered, thoughtful responses — reflecting genuine empathy and care — resonate more strongly than high-energy rehearsed answers. Research Etihad's current stated values on their official careers page before your interview.",
    5: "Etihad group exercises mirror the observation criteria of other Gulf carriers. Candidates widely report that genuine empathy toward other group members and a considered, calm approach are particularly valued — bring this to how you participate, not just what you say.",
    6: "Candidates widely report that Etihad's culture centres on empathy, diversity, and genuine responsibility toward passengers and colleagues. Those who come across as warm and considered — not just polished — are reported to progress. Reapplication wait: verify directly with Etihad. Always check their official careers page for current values and requirements.",
  },
  flydubai: {
    1: "flydubai uses an online application portal. The process is reported as less intensive than Emirates but a clean, professional, keyword-rich CV remains essential. Candidates report faster response times than at the Big Three carriers.",
    2: "flydubai height and arm reach requirements — verify directly with flydubai before applying. Professional and conservative grooming is expected. All tattoos must be covered by the uniform. Candidates report a professional standard that is slightly less formal than Emirates.",
    3: "flydubai's online application is reported as less intensive than Emirates. However, candidates report English proficiency checks and screening questions that form part of the assessment. Complete your application carefully — it is your first impression.",
    4: "flydubai uses structured interview questions with STAR-format expectations. Candidates report a more conversational tone than Emirates, but genuine service motivation and specific real-life examples are equally important. Generic or travel-focused answers are flagged.",
    5: "flydubai assessment days are reported as smaller in scale than Emirates but follow the same group exercise observation format. Warmth, inclusion, and active listening are as important here as at any Gulf carrier — recruiters observe all candidates simultaneously.",
    6: "Candidates widely report that flydubai's culture focuses on reliability, value for money, and making travel accessible to more people. Showing genuine enthusiasm for this mission — rather than a five-star service aspiration — is reported to resonate well. Post-interview wait: approximately 25 days (widely reported by candidates). Reapply wait: verify directly with flydubai.",
  },
  airarabia: {
    1: "Air Arabia uses its own careers portal. Application volume is lower than at the Big Three, but a clean, single-column, keyword-rich CV remains essential. Candidates report faster response times and a more direct application process overall.",
    2: "Air Arabia height and arm reach requirements — verify directly with Air Arabia before applying. Professional and conservative grooming consistent with a Gulf carrier uniform standard is expected. All tattoos must be covered by the airline's uniform.",
    3: "Air Arabia's online screening is typically reported as more straightforward than the Big Three. However, a strong English proficiency check and a carefully completed application are essential — they form part of the recruiter's first impression of you.",
    4: "Air Arabia uses structured interview questions focused on genuine hospitality and service commitment. Candidates report that answers reflecting the airline's community-focused, accessibility-driven identity perform significantly better than generic service answers.",
    5: "Air Arabia group exercises reflect the airline's community-focused, warmth-first identity. Being genuinely inclusive and listening actively are reported as particularly valued — consistent with the airline's accessibility and warmth mission.",
    6: "Candidates widely report that Air Arabia's culture values affordability, warmth, and connecting communities. Authenticity and genuine hospitality instinct matter more here than polish. Post-interview response: approximately 2 weeks (widely reported by candidates). Reapply wait: verify directly with Air Arabia.",
  },
};

// ─── Rejection reasons ────────────────────────────────────────────────────────

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
    why: `Gulf carriers collectively receive hundreds of thousands of cabin crew applications every year. To manage this volume, airlines use Applicant Tracking Systems (ATS) — computer programs that scan CVs before any human ever reads them. If your CV fails the scan, you receive an automated rejection. The recruiter never knew you existed.

The ATS reads your document the way a computer reads text — left to right, top to bottom. Multi-column layouts, text boxes, embedded graphics, and design elements confuse the parser. It reads your carefully designed Canva CV as a near-empty document and scores it below the threshold. A clean, unqualified candidate with a plain Word document consistently beats a highly qualified candidate with a beautifully designed layout — at every Gulf carrier.`,
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
    subtitle: "Recruiters make their first assessment within 90 seconds of seeing you — before you say a word.",
    accentColor: "text-pink-400",
    borderColor: "border-pink-500/30",
    bgColor: "from-pink-950/40 to-slate-800",
    badgeBg: "bg-pink-500/20 text-pink-300 border-pink-500/30",
    free: true,
    why: `Cabin crew are the physical embodiment of the airline's brand. Emirates, Qatar Airways, Etihad, flydubai, and Air Arabia all invest in their crew's presentation — and they expect candidates to match their standards precisely. At CV drop-off and at the grooming check (which happens early in the assessment day), recruiters assess candidates against a strict checklist.

Visible acne, exposed tattoos, incorrect makeup, visible piercings, the wrong attire, or the wrong hair style can all result in immediate elimination — even if your interview performance is excellent. Many candidates are eliminated at this stage without understanding why, because no Gulf carrier provides this feedback.`,
    testimonial: {
      quote: "I made it to the final interview at a Gulf carrier twice and both times received a rejection. I later spoke to someone who had been on the panel and they mentioned my exposed forearm tattoo — which I thought was small and unimportant. Gulf carriers require all tattoos to be fully covered by the uniform at all times. I hadn't checked the specific uniform coverage areas.",
      source: "Composite experience drawn from cabin crew applicant community forums",
    },
    fix: [
      { step: "Skin: Clear skin is expected across all Gulf carriers. Visible acne, prominent scars, or birthmarks on visible areas are noted. See a dermatologist if needed — this is a professional requirement, not a beauty standard", icon: "✨" },
      { step: "Tattoos: Must be completely covered by the airline's uniform at all times. Check the specific uniform coverage for the carrier you are applying to — even a small tattoo on the inner forearm may be visible", icon: "🚫" },
      { step: "Women — Hair: Neat bun or updo, no loose hair. All Gulf carriers expect professional hair presentation at assessment day", icon: "💇‍♀️" },
      { step: "Women — Makeup: Professional, refined, and complete. Each airline has a signature crew look — arriving groomed to match their brand signals awareness and intent. Select your airline above for specific guidance", icon: "💄" },
      { step: "Women — Attire: Pencil skirt or tailored trousers, professional blazer, heels preferred across Gulf carriers. Conservative neckline. No excessive jewellery", icon: "👠" },
      { step: "Men — Be completely clean-shaven. Smart suit, polished shoes, conservative tie. Hair neatly styled. These expectations apply consistently across all five Gulf carriers", icon: "👔" },
      { step: "Height and reach: Requirements vary by airline. Select your airline above for specific details, or verify directly with each carrier before applying", icon: "📏" },
    ],
    youtubeSearch: "Gulf airline cabin crew grooming standards assessment day",
    youtubeLabel: "Grooming Standards for Gulf Airline Assessment Days",
    stat: "Grooming assessed within 90 seconds at CV drop — at every Gulf carrier",
  },
  {
    id: 3,
    emoji: "🎥",
    label: "REASON 3",
    title: "You Failed the Online Screening Stage",
    subtitle: "The online screening stage eliminates more applicants than any other — before you ever meet a recruiter.",
    accentColor: "text-blue-400",
    borderColor: "border-blue-500/30",
    bgColor: "from-blue-950/40 to-slate-800",
    badgeBg: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    free: false,
    why: `Every major Gulf carrier now requires candidates to complete an online screening stage before being invited to an assessment day. Each airline uses its own platform or portal, with components that typically include an English language assessment and situational or STAR-format questions.

Candidates widely report the online screening stage as the phase where the highest number of applicants are eliminated. The most common mistake is treating it as less "real" than a face-to-face interview. The digital record goes directly to the recruitment team — every hesitation, restart, and rushed answer is logged. Select your airline above to see what to expect on their specific platform.`,
    testimonial: {
      quote: "I thought the online video interview would be easy because English is my strong suit. What I didn't prepare for was a timed cognitive task — it tests your processing speed under time pressure. I hesitated, started and restarted, and ran out of time. I never made it to the assessment day.",
      source: "Composite experience from candidate accounts shared across public recruitment forums",
    },
    fix: [
      { step: "Set up your recording environment before the interview: good lighting (face the light, don't sit with a window behind you), clean background, stable internet, phone or laptop at eye level", icon: "💡" },
      { step: "Practice looking directly into the camera lens — not at your own face on screen. This creates genuine eye contact", icon: "👁️" },
      { step: "Study the STAR method: Situation → Task → Action → Result. Practice answering out loud until it feels natural, not recited. Every answer must have all four parts", icon: "⭐" },
      { step: "English sections typically include: reading comprehension passages, multiple-choice sentence completions, and a short written response. Practice all three formats", icon: "📝" },
      { step: "Time yourself. You typically have 30 seconds to prepare and 2–3 minutes to answer per question. Speak at 75% of your normal speed — nervous candidates speak too fast and lose clarity", icon: "⏱️" },
      { step: "Complete your online screening for all airlines you're applying to in the same preparation window — the skills overlap heavily across all five carriers", icon: "📋" },
    ],
    youtubeSearch: "Gulf airline cabin crew online video interview tips 2024",
    youtubeLabel: "Online Screening & Video Interview — Gulf Airline Cabin Crew Guide",
    stat: "Online screening: highest elimination stage across all Gulf carriers",
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
    why: `This is the most common reason candidates fail the final interview despite feeling it went well. The recruiter is not looking for perfect answers — they're looking for real people with genuine stories. When candidates memorise scripted responses, their answers lack the specific detail, emotional truth, and natural language that makes a story believable.

All five Gulf carriers — Emirates, Qatar Airways, Etihad, flydubai, and Air Arabia — use STAR-format situational questions at interview stage. The failure is almost always in the detail: stories without a clear Result, conflict examples where the candidate claims they "never really have conflicts," or motivational answers that mention travel — something candidates consistently report as an immediate rejection trigger across every Gulf airline interview.`,
    testimonial: {
      quote: "I attempted the same airline six times. Every time I made it to the final interview and was rejected. A coach reviewed my answers and told me immediately: 'Your story is good but you never tell them what happened in the end. You always describe what you did but never the outcome. The recruiter needs a complete story.' That was it. One change — adding the result — and I passed on my seventh attempt.",
      source: "Composite experience drawn from cabin crew applicant community forums",
    },
    fix: [
      { step: "NEVER say: 'I want to be cabin crew because I love to travel / meet people / see the world.' This is consistently flagged as an immediate red flag across all Gulf airline interview processes. Speak about service, safety, and the specific airline's values", icon: "🚫" },
      { step: "Every answer must follow STAR completely: Situation (brief context), Task (your specific role), Action (exactly what YOU did — use 'I', not 'we'), Result (measurable or observable outcome)", icon: "⭐" },
      { step: "For conflict questions: If you say 'I rarely have conflicts' or 'I get along with everyone' — you will be eliminated. Every professional has experienced conflict. Prepare a real example that shows you resolved it professionally", icon: "⚡" },
      { step: "Practice your answers OUT LOUD until they sound like a natural conversation, not a performance. Record yourself and listen back — if you sound like you're reading from a script, practice more", icon: "🎙️" },
      { step: "Prepare 8–10 real personal stories from your work history that cover: excellent customer service, working under pressure, handling conflict, making a decision without manager guidance, a mistake you made and learned from, teamwork", icon: "📖" },
      { step: "Weakness questions: Never say 'I'm a perfectionist' or 'I work too hard.' Pick a genuine area of development and show how you're actively addressing it", icon: "💪" },
    ],
    youtubeSearch: "cabin crew final interview STAR method fail tips 2024",
    youtubeLabel: "Why Candidates Fail the Cabin Crew Final Interview",
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

Multiple recruiters observe simultaneously, watching for: listening behaviour, how candidates treat quieter group members, whether they interrupt, how they respond to disagreement, and whether they maintain composure under social pressure. This maps directly to the cabin crew role — where crew interact with hundreds of passengers of different cultures, temperaments, and needs in a high-pressure environment. This assessment pattern is consistent across all five Gulf carriers.`,
    testimonial: {
      quote: "I went into three Gulf airline assessment days thinking I needed to show leadership — speak up, contribute ideas, make the group follow a clear direction. Three rejections. Then someone who had passed told me: 'They're not hiring a manager. They want someone their passengers would feel safe with. Be warm, include everyone, listen more than you talk.' I passed the fourth time after completely changing my approach.",
      source: "Composite experience drawn from cabin crew applicant community forums",
    },
    fix: [
      { step: "Use inclusive language throughout: 'What does everyone think about this?', 'I'd like to build on what [name] said...', 'We as a group feel...', 'That's a great point — and I'd add...'", icon: "🤝" },
      { step: "If someone is quiet: actively bring them in. 'I'd love to hear what [name] thinks about this.' This is the team behaviour Gulf airline recruiters look for — it mirrors how crew support every passenger on board", icon: "💬" },
      { step: "Do not dominate. Speaking for more than 40% of the time is a red flag. Even if your ideas are good, monopolising the conversation signals poor team awareness", icon: "⚖️" },
      { step: "Do not stay silent. If you contribute fewer than 3–4 substantive points, you won't be noticed. The balance is: engaged but not dominant", icon: "🎯" },
      { step: "Never interrupt. Even if the other person is wrong. Wait for a natural pause, then contribute. Interrupting is one of the fastest ways to be eliminated across all Gulf airline assessment days", icon: "🤫" },
      { step: "Stay warm and calm throughout. If the discussion becomes heated, a calm de-escalation ('Can we refocus on the key question?') is exactly what recruiters want to see", icon: "😌" },
      { step: "Remember: recruiters observe you in breaks and during lunch too. The 'interview' begins when you walk through the door and doesn't end until you leave the building", icon: "👀" },
    ],
    youtubeSearch: "Gulf airline cabin crew assessment day group exercise tips",
    youtubeLabel: "Group Exercise Tips — Gulf Airline Assessment Day",
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

'Cultural fit' is the umbrella reason that covers everything from low energy to personality mismatch to values that don't align with the airline. All five Gulf carriers have specific internal cultures they protect carefully. They also operate with nationality and diversity considerations for specific recruitment events — meaning some rejections have nothing to do with your performance.

What you can control: your energy, your alignment with their values, and your consistency throughout the entire day. Select your airline above to see their specific values framework.`,
    testimonial: {
      quote: "I passed every stage of the assessment day with flying colours — grooming check, English test, group exercise, and I thought my final interview was excellent. Rejection email that evening. I contacted a coach who had been a recruiter at that airline. She told me: 'You were performing. The recruiter could feel the difference between who you were in the formal interview and who you were during the break. They want to see the same person in both.' That stuck with me.",
      source: "Composite experience drawn from cabin crew applicant community forums",
    },
    fix: [
      { step: "Research the airline's values before your interview. Select your airline above to see the specific values framework for each carrier. Prepare one real personal example for each value", icon: "🔍" },
      { step: "Mirror their language in your answers. Use phrases like 'world-class service,' 'diverse team,' 'safety-first culture,' 'passenger wellbeing.' Recruiters register subconsciously when candidates speak their language", icon: "🗣️" },
      { step: "Maintain consistent, warm energy ALL DAY. The formal interview is not the only moment you're being assessed. Your behaviour during registration, in the waiting area, during breaks, and at lunch is all observed", icon: "⚡" },
      { step: "Genuine enthusiasm reads differently from performed enthusiasm. Find the specific thing about this airline that genuinely excites you and speak from that place. Recruiters have interviewed thousands of candidates — they know the difference", icon: "❤️" },
      { step: "Prepare one thoughtful question to ask at the end of the final interview. Something specific to the airline and role, not something you could Google. Example: 'How does the crew culture here support new joiners adapting to life at base?'", icon: "❓" },
      { step: "If rejected for 'cultural fit' after addressing all of the above: understand that some rejections involve factors outside your control. Reapplication timeframes vary by airline — check directly with each carrier. This is not a reflection of your worth", icon: "🔄" },
    ],
    youtubeSearch: "cabin crew cultural fit rejection Gulf airline final interview",
    youtubeLabel: "Understanding the 'Cultural Fit' Rejection — Cabin Crew",
    stat: "Most common undisclosed reason for final-stage rejection",
  },
];

// ─── Styling helpers ───────────────────────────────────────────────────────────

const getButtonClasses = (airlineId: string, isSelected: boolean): string => {
  if (!isSelected)
    return "bg-white/5 border border-white/10 text-slate-300 hover:border-white/25 hover:text-white";
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

// ─── Component ────────────────────────────────────────────────────────────────

export default function RejectionDecodedSection({
  goBack,
  previousLabel,
  tier,
  onNavigatePremium,
}: RejectionDecodedSectionProps) {
  const [openCard, setOpenCard] = useState<number | null>(null);
  const [selectedAirline, setSelectedAirline] = useState<string | null>(null);

  const isLocked = (free: boolean) => !free && tier === "free";

  const handleCardClick = (id: number, free: boolean) => {
    if (isLocked(free)) return;
    setOpenCard(openCard === id ? null : id);
  };

  const handleAirlineSelect = (airlineId: string) => {
    setSelectedAirline(selectedAirline === airlineId ? null : airlineId);
  };

  const currentAirline = airlines.find((a) => a.id === selectedAirline) ?? null;
  const heroStats = currentAirline?.heroStats ?? defaultHeroStats;

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

      <div className="max-w-4xl mx-auto px-4 pb-10">

        {/* Hero */}
        <div className="relative bg-gradient-to-br from-red-950/60 via-slate-800/80 to-slate-900 border border-red-500/20 rounded-3xl p-8 md:p-12 overflow-hidden mb-6">
          {/* Faded background photo — right-weighted, behind text. Drop a licensed image at public/images/rejection-decoded-bg.jpg */}
          <div
            className="absolute inset-0 bg-cover opacity-30"
            style={{
              backgroundImage: "url(/images/rejection-decoded-bg.jpg)",
              backgroundPosition: "right center",
              maskImage: "linear-gradient(to right, transparent 0%, transparent 30%, black 100%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, transparent 30%, black 100%)",
            }}
          />
          {/* Dark gradient to keep text readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-slate-900/40 pointer-events-none" />
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
              candidates are rejected at Gulf carriers — Emirates, Qatar Airways, Etihad, flydubai, and
              Air Arabia — with real examples and specific fixes for each.
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
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-3">
            Select your airline for specific guidance
          </p>
          <div className="flex flex-wrap gap-2">
            {airlines.map((airline) => (
              <button
                key={airline.id}
                onClick={() => handleAirlineSelect(airline.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${getButtonClasses(
                  airline.id,
                  selectedAirline === airline.id
                )}`}
              >
                <span>{airline.flag}</span>
                <span>{airline.shortName}</span>
              </button>
            ))}
          </div>
          {currentAirline ? (
            <p className="text-xs text-slate-400 mt-3">
              Showing{" "}
              <span className={getCalloutLabel(currentAirline.id)}>
                {currentAirline.name}
              </span>{" "}
              specific insights inside each rejection reason below. Tap again to deselect.
            </p>
          ) : (
            <p className="text-xs text-slate-500 mt-3">
              Select an airline above to see how each rejection reason applies to your specific target carrier.
            </p>
          )}
        </div>

        {/* Legal disclaimer */}
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
            const airlineNote =
              currentAirline && airlineNotes[currentAirline.id]
                ? (airlineNotes[currentAirline.id][reason.id] ?? null)
                : null;

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

                    {/* Airline-specific callout */}
                    {airlineNote && currentAirline && (
                      <div className={`rounded-xl border p-4 mb-6 ${getCalloutBg(currentAirline.id)}`}>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-base">{currentAirline.flag}</span>
                          <span className={`text-xs font-bold uppercase tracking-wider ${getCalloutLabel(currentAirline.id)}`}>
                            {currentAirline.name} — Specific Guidance
                          </span>
                        </div>
                        <p className={`text-sm leading-relaxed ${getCalloutText(currentAirline.id)}`}>
                          {airlineNote}
                        </p>
                      </div>
                    )}

                    {/* Why This Happens */}
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
                          <div key={i} className="flex items-start gap-3 bg-white/[0.03] border border-white/5 rounded-xl p-3.5">
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
                      className="flex items-center gap-3 border border-white/10 bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-all group"
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
              Reasons 3–6 cover the online screening stage, rehearsed answers, the group exercise, and the "cultural fit" silent rejection — the four most misunderstood elimination stages. Standard plan includes full access.
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
