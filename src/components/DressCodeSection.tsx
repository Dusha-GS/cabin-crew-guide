import { useState } from "react";
import BackButton from "./BackButton";

interface Props { goBack: () => void; previousLabel: string; }

// ─── Uniform data ─────────────────────────────────────────────────────────────
// Uniform descriptions and grooming standards are based on publicly available
// information, candidate-reported experiences, and official airline publications.
// Uniform standards are subject to change — always verify directly with the
// airline before your assessment day.
// ─────────────────────────────────────────────────────────────────────────────

const airlinesData = [
  {
    id: "emirates",
    name: "Emirates",
    uniform: "Beige and pinstripe suit with red hat and white draping veil — one of aviation's most recognised looks",
    hair: "Neat, tight bun secured with a red hair tie for women — completely off the face; trimmed and neat for men",
    makeup: "Full professional makeup is expected and required — Emirates' signature is the red lip. Red lipstick, neutral eyeshadow, mascara, and defined brows are part of the standard look. Arriving at assessment in this style signals brand awareness",
    nails: "Nail varnish must be worn — acceptable colours are clear/natural, red, nude, or French manicure. No other colours. Nails must not extend beyond half a centimetre above the fingertip",
    accessories: "Minimal jewelry — one stud earring per earlobe for women; no jewelry or piercings for men",
    tattoos: "No visible tattoos in uniform at any time",
    color: "#C41E3A",
    tips: [
      "Red lipstick is the iconic Emirates look — practice wearing it confidently before your assessment",
      "Hair must be completely off the face and neatly secured — the tight bun with red hair tie is the standard",
      "Uniform and presentation must be immaculate throughout the entire assessment day",
      "Smart closed heels are expected for assessment day — they reflect the professional standard; Emirates gave crew more shoe options from 2024 for on-duty use, but for assessment, heels remain the norm",
    ],
  },
  {
    id: "etihad",
    name: "Etihad Airways",
    uniform: "Falcon Grey, warm gold and greige uniform with headscarf option — Emirati-influenced, modest and refined",
    hair: "Elegantly styled — chignon or neat bun for women; no hair touching the collar; neat and trimmed for men",
    makeup: "Subtle, professional makeup — warm, neutral tones appropriate to the grey and gold palette. Fake lashes are permitted if not over-exaggerated (confirmed from 2019)",
    nails: "Well-maintained — acrylic allowed but not excessively long. Acceptable polish: neutral tones (beige, pink) or French manicure. Polish must be worn on duty",
    accessories: "Pearls or classic diamond studs — both confirmed as standard Etihad uniform accessories",
    tattoos: "No visible tattoos while in uniform",
    color: "#C8A96E",
    tips: [
      "Etihad's aesthetic is warm, elegant, and Emirati-influenced — your assessment presentation should reflect this refined style",
      "The uniform design is modest and refined — arrive at assessment in polished business attire that mirrors this sensibility",
      "Research Etihad's uniform to understand the aesthetic expected before your assessment day",
      "Skincare matters — clear, well-maintained skin is part of the overall presentation standard",
    ],
  },
  {
    id: "qatar",
    name: "Qatar Airways",
    uniform: "Burgundy and beige uniform — one of aviation's most recognised and iconic looks",
    hair: "Sleek and polished — bun covered with the iconic burgundy cap for women; neat and trimmed for men",
    makeup: "Sophisticated and polished — berry and wine tones complement the burgundy uniform palette",
    nails: "Short, clean nails — neutral or complementary tones",
    accessories: "Pearls or simple gold — minimal and elegant",
    tattoos: "Tattoos must be completely covered by uniform at all times",
    color: "#8B0000",
    tips: [
      "Qatar's uniform is iconic — study it and reflect its elegance at the open day; arriving polished in complementary tones signals awareness",
      "The burgundy cap must sit perfectly — practice positioning it if you have one",
      "Qatar Airways is a Skytrax 5-Star airline — every detail of your presentation matters",
      "Your posture and poise are as important as your outfit — stand tall, walk confidently",
    ],
  },
  {
    id: "flydubai",
    name: "flydubai",
    uniform: "Bright blue jackets with orange polka dot neckerchiefs and bold patterned blouses — a modern, vibrant look designed to reflect the airline's dynamic identity",
    hair: "Professional and well-groomed — neat styles appropriate to airline grooming standards",
    makeup: "Natural, polished makeup appropriate to a professional cabin crew standard",
    nails: "Clean and trimmed — professional appearance",
    accessories: "Minimal jewelry consistent with flydubai's uniform and grooming standards",
    tattoos: "No visible tattoos in uniform",
    color: "#FF6B35",
    tips: [
      "flydubai's uniform is bold and modern — reflect this energy with a confident, smart, well-groomed presentation at assessment",
      "Research flydubai's current uniform before your assessment day to understand the brand aesthetic you are aiming to represent",
      "flydubai values warmth, professionalism, and efficiency — your presentation should reflect all three",
      "Smart business attire is expected — show you understand the standard of presentation required of cabin crew",
    ],
  },
  {
    id: "airarabia",
    name: "Air Arabia",
    uniform: "Cherry red and white uniform (2021 redesign) — female crew wear red suits with white blouses; male crew wear silver/grey/charcoal with cherry red accents",
    hair: "Professional, conservative styling — neat and well-groomed",
    makeup: "Natural, professional makeup — polished presentation appropriate to a Gulf carrier",
    nails: "Clean and trimmed — neutral, professional tones",
    accessories: "Minimal jewelry consistent with uniform and grooming standards",
    tattoos: "No visible tattoos in uniform",
    color: "#E4002B",
    tips: [
      "Air Arabia's bold cherry red uniform calls for a confident, polished presentation at assessment",
      "Air Arabia values warmth, approachability, and genuine hospitality — let this come through in your personal presentation",
      "Research Air Arabia's current uniform to match the brand aesthetic before attending an open day",
      "Smart, practical professionalism — Air Arabia combines service warmth with operational efficiency",
    ],
  },
];

const interviewOutfitDos = [
  "Wear a smart blazer or professional dress/suit",
  "Choose neutral or classic colours (navy, black, grey, white)",
  "Ensure clothes are freshly pressed and wrinkle-free",
  "Wear smart closed-toe heels for assessment day — expected at all Gulf carrier assessments",
  "Keep hair neatly styled and away from your face",
  "Wear full, professional makeup — understated but polished",
  "Minimal, tasteful jewelry only",
  "Ensure your outfit fits well — not too tight or too loose",
  "Carry a neat portfolio or small professional bag",
  "Nails clean and manicured with appropriate polish",
];

const interviewOutfitDonts = [
  "Casual wear — jeans, t-shirts, trainers",
  "Heavy, dramatic, or unfinished makeup",
  "Strong or overwhelming perfume/cologne",
  "Visible tattoos where possible — cover with clothing or makeup",
  "Distracting accessories or large jewelry",
  "Wrinkled or stained clothing",
  "Very short skirts or low-cut tops",
  "Chipped or missing nail polish",
  "Messy or unstyled hair",
  "Open-toe sandals or flat casual shoes",
];

export default function DressCodeSection({ goBack, previousLabel }: Props) {
  const [selectedAirline, setSelectedAirline] = useState("emirates");
  const airline = airlinesData.find(a => a.id === selectedAirline)!;

  return (
    <div className="min-h-screen bg-slate-900 py-20 px-4 pt-24">
      <div className="max-w-6xl mx-auto">
        <BackButton onClick={goBack} label={`Back to ${previousLabel}`} />
        <div className="text-center mb-12">
          <span className="inline-block bg-pink-500/20 text-pink-400 text-sm font-medium px-4 py-1.5 rounded-full mb-4 border border-pink-500/30">
            👗 Dress Code Guide
          </span>
          <h2 className="text-4xl font-bold text-white mb-4">Look the Part</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            First impressions are everything. Here's exactly how to present yourself for each airline's open day and interview.
          </p>
        </div>

        {/* Global disclaimer */}
        <div className="bg-slate-800/50 border border-slate-700/40 rounded-xl px-5 py-4 mb-8 flex items-start gap-3">
          <span className="text-slate-400 text-base flex-shrink-0 mt-0.5">ℹ️</span>
          <p className="text-slate-400 text-xs leading-relaxed">
            Uniform descriptions and grooming standards are based on publicly available information and candidate-reported experiences. Airline standards are subject to change — always verify current requirements directly with each airline before your assessment day.
          </p>
        </div>

        {/* Interview Day Guide */}
        <div className="bg-gradient-to-r from-pink-900/30 to-slate-800 border border-pink-500/30 rounded-2xl p-8 mb-12">
          <h3 className="text-white font-bold text-2xl mb-2 flex items-center gap-2">
            👔 Interview Day Outfit Guide
          </h3>
          <p className="text-slate-400 mb-6">
            This is before you get the job — here's what to wear to the open day or interview.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-5">
              <h4 className="text-green-400 font-bold text-lg mb-4">✅ Wear This</h4>
              <ul className="space-y-2">
                {interviewOutfitDos.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-green-400 mt-0.5 flex-shrink-0">✓</span>
                    <span className="text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-5">
              <h4 className="text-red-400 font-bold text-lg mb-4">❌ Avoid This</h4>
              <ul className="space-y-2">
                {interviewOutfitDonts.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-red-400 mt-0.5 flex-shrink-0">✗</span>
                    <span className="text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Airline Uniform Standards */}
        <h3 className="text-2xl font-bold text-white mb-6">
          Airline Uniform Standards — Know What You're Aiming For
        </h3>

        {/* Airline Selector */}
        <div className="flex flex-wrap gap-3 mb-8">
          {airlinesData.map((a) => (
            <button
              key={a.id}
              onClick={() => setSelectedAirline(a.id)}
              className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 border ${
                selectedAirline === a.id
                  ? "bg-pink-500/30 text-pink-300 border-pink-500/50 scale-105"
                  : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10"
              }`}
            >
              ✈ {a.name}
            </button>
          ))}
        </div>

        {/* Airline Uniform Detail */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-700 border border-white/10 rounded-2xl p-8 mb-10">
          <h4 className="text-white font-bold text-2xl mb-2">{airline.name} — Uniform Standards</h4>
          <p className="text-slate-400 text-sm mb-6 italic">"{airline.uniform}"</p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {[
              { label: "Hair", value: airline.hair, icon: "💇" },
              { label: "Makeup", value: airline.makeup, icon: "💄" },
              { label: "Nails", value: airline.nails, icon: "💅" },
              { label: "Accessories", value: airline.accessories, icon: "💍" },
              { label: "Tattoos", value: airline.tattoos, icon: "🚫" },
            ].map((item) => (
              <div key={item.label} className="bg-white/5 rounded-xl p-4 border border-white/5">
                <p className="text-pink-400 text-xs font-bold mb-1 uppercase tracking-wider">
                  {item.icon} {item.label}
                </p>
                <p className="text-white text-sm leading-relaxed">{item.value}</p>
              </div>
            ))}
          </div>

          <div>
            <p className="text-amber-400 font-bold text-sm mb-3">💡 Insider Tips for {airline.name}:</p>
            <ul className="space-y-2">
              {airline.tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-amber-400 mt-0.5 flex-shrink-0">◆</span>
                  <span className="text-slate-300">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* General Grooming Standards */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Skin & Complexion",
              icon: "✨",
              points: [
                "Clear, well-moisturized skin is expected across all Gulf carriers",
                "Foundation and coverage used naturally and professionally",
                "Avoid heavy contouring — polished and natural is the standard",
                "Consistent skincare routine recommended given long flying hours",
              ],
            },
            {
              title: "Fitness & Posture",
              icon: "💪",
              points: [
                "Upright, confident posture throughout the assessment day",
                "Gulf airlines expect candidates to be in good physical health proportionate to height",
                "No visible signs of fatigue — rest well before assessment day",
                "Smile naturally and warmly — practice in the mirror if needed",
              ],
            },
            {
              title: "Fragrance",
              icon: "🌸",
              points: [
                "Light, professional fragrance only",
                "No strong or overpowering scents",
                "Avoid cigarette smoke or strong food odours before assessment",
                "Fresh, clean, and well-groomed at all times",
              ],
            },
          ].map((card) => (
            <div key={card.title} className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="text-3xl mb-3">{card.icon}</div>
              <h4 className="text-white font-bold text-lg mb-3">{card.title}</h4>
              <ul className="space-y-2">
                {card.points.map((p, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-pink-400 mt-0.5 flex-shrink-0">◆</span>
                    <span className="text-slate-300">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
