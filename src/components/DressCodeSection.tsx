import { useState } from "react";
import BackButton from "./BackButton";

interface Props { goBack: () => void; previousLabel: string; }

const airlines = [
  {
    id: "emirates",
    name: "Emirates",
    uniform: "Red hat, red and beige uniform with white scarf",
    hair: "Hair neatly styled — bun for women, trimmed for men",
    makeup: "Natural, polished makeup — no heavy or dramatic looks",
    nails: "Short, clean nails — neutral or red polish only",
    accessories: "Minimal jewelry — small earrings, watch permitted",
    tattoos: "No visible tattoos in uniform",
    color: "#C41E3A",
    tips: [
      "Red lipstick is the iconic Emirates look — practice wearing it confidently",
      "Hair must be completely off the face and neatly secured",
      "Uniform must be wrinkle-free and immaculate at all times",
      "Heels are required — practice walking in them comfortably",
    ],
  },
  {
    id: "etihad",
    name: "Etihad Airways",
    uniform: "Falcon Grey, warm gold and greige uniform with headscarf option",
    hair: "Elegantly styled — chignon or neat bun for women",
    makeup: "Subtle, professional makeup — warm tones preferred",
    nails: "Clean and trimmed — neutral or subtle tones",
    accessories: "Simple, elegant jewelry — uniform accessories provided",
    tattoos: "No visible tattoos while in uniform",
    color: "#C8A96E",
    tips: [
      "Etihad's brand is 'warmth and elegance' — reflect this in your appearance",
      "The Emirati-influenced design means modest, refined presentation",
      "Research Etihad's uniform to understand the aesthetic expected",
      "Skin must be clear and well-groomed — skincare matters",
    ],
  },
  {
    id: "qatar",
    name: "Qatar Airways",
    uniform: "Burgundy and beige uniform — one of aviation's most recognized looks",
    hair: "Sleek and polished — bun covered with burgundy cap for women",
    makeup: "Sophisticated and polished — berry/wine tones complement the uniform",
    nails: "Short, clean nails — neutral or complementary tones",
    accessories: "Pearls or simple gold — minimal and elegant",
    tattoos: "Tattoos must be completely covered by uniform",
    color: "#8B0000",
    tips: [
      "Qatar's uniform is iconic — study it and reflect its elegance at the open day",
      "The burgundy cap must sit perfectly — practice positioning it",
      "Qatar values a 'Five Star' appearance — every detail matters",
      "Your posture and poise are as important as your outfit",
    ],
  },
];

const interviewOutfitDos = [
  "Wear a smart blazer or professional dress/suit",
  "Choose neutral or classic colors (navy, black, grey, white)",
  "Ensure clothes are freshly pressed and wrinkle-free",
  "Wear formal heels (open-toe is fine for open days)",
  "Keep hair neatly styled and away from your face",
  "Wear light, professional makeup",
  "Minimal, tasteful jewelry only",
  "Ensure your outfit fits well — not too tight or too loose",
  "Carry a neat portfolio or small professional bag",
  "Nails clean and trimmed — neutral polish is safest",
];

const interviewOutfitDonts = [
  "Casual wear — jeans, t-shirts, trainers",
  "Heavy or dramatic makeup",
  "Strong or overwhelming perfume/cologne",
  "Visible tattoos if possible",
  "Distracting accessories or large jewelry",
  "Wrinkled or stained clothing",
  "Very short skirts or low-cut tops",
  "Chipped nail polish",
  "Messy or unstyled hair",
  "Overly casual shoes or flat sandals",
];

export default function DressCodeSection({ goBack, previousLabel }: Props) {
  const [selectedAirline, setSelectedAirline] = useState("emirates");
  const airline = airlines.find(a => a.id === selectedAirline)!;

  return (
    <div className="min-h-screen bg-slate-900 py-20 px-4 pt-24">
      <div className="max-w-6xl mx-auto">
        <BackButton onClick={goBack} label={`Back to ${previousLabel}`} />
        <div className="text-center mb-12">
          <span className="inline-block bg-pink-500/20 text-pink-400 text-sm font-medium px-4 py-1.5 rounded-full mb-4 border border-pink-500/30">👗 Dress Code Guide</span>
          <h2 className="text-4xl font-bold text-white mb-4">Look the Part</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">First impressions are everything. Here's exactly how to present yourself for each airline's open day and interview.</p>
        </div>

        {/* Interview Day Guide */}
        <div className="bg-gradient-to-r from-pink-900/30 to-slate-800 border border-pink-500/30 rounded-2xl p-8 mb-12">
          <h3 className="text-white font-bold text-2xl mb-2 flex items-center gap-2">👔 Interview Day Outfit Guide</h3>
          <p className="text-slate-400 mb-6">This is before you get the job — here's what to wear to the open day or interview.</p>
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
        <h3 className="text-2xl font-bold text-white mb-6">Airline Uniform Standards — Know What You're Aiming For</h3>

        {/* Airline Selector */}
        <div className="flex flex-wrap gap-3 mb-8">
          {airlines.map((a) => (
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
                <p className="text-pink-400 text-xs font-bold mb-1 uppercase tracking-wider">{item.icon} {item.label}</p>
                <p className="text-white text-sm">{item.value}</p>
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
              points: ["Clear, well-moisturized skin expected", "Foundation/coverage used naturally", "Avoid heavy contouring", "SPF skincare recommended for travel"],
            },
            {
              title: "Fitness & Posture",
              icon: "💪",
              points: ["Upright, confident posture always", "Healthy weight proportional to height", "No visible signs of fatigue", "Smile naturally — practice in the mirror"],
            },
            {
              title: "Fragrance",
              icon: "🌸",
              points: ["Light, professional fragrance only", "No strong or overpowering scents", "Avoid cigarette or strong food odors", "Fresh and clean at all times"],
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
