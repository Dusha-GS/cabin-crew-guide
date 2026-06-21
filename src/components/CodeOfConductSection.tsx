import { codeOfConduct } from "../data/guideData";
import BackButton from "./BackButton";

interface Props { goBack: () => void; previousLabel: string; }

export default function CodeOfConductSection({ goBack, previousLabel }: Props) {
  return (
    <div className="min-h-screen bg-slate-900 py-20 px-4 pt-24">
      <div className="max-w-6xl mx-auto">
        <BackButton onClick={goBack} label={`Back to ${previousLabel}`} />
        <div className="text-center mb-12">
          <span className="inline-block bg-amber-500/20 text-amber-400 text-sm font-medium px-4 py-1.5 rounded-full mb-4 border border-amber-500/30">🏆 Code of Conduct</span>
          <h2 className="text-4xl font-bold text-white mb-4">Professional Standards</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Understanding the code of conduct before your interview shows recruiters you're already thinking like cabin crew.</p>
        </div>
        <div className="bg-gradient-to-r from-amber-500/20 via-yellow-500/10 to-amber-500/20 border border-amber-500/30 rounded-2xl p-6 mb-12">
          <h4 className="text-amber-400 font-bold text-lg mb-4 text-center">✦ The Three Pillars of Cabin Crew Excellence ✦</h4>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { pillar: "Safety", icon: "🛡️", desc: "Safety is ALWAYS the top priority — above service, comfort, and convenience.", color: "from-red-900/40 to-red-800/20", border: "border-red-500/30" },
              { pillar: "Service", icon: "⭐", desc: "Deliver exceptional, personalized service that exceeds passenger expectations.", color: "from-blue-900/40 to-blue-800/20", border: "border-blue-500/30" },
              { pillar: "Integrity", icon: "💎", desc: "Uphold the highest standards of professionalism, honesty, and ethical behavior.", color: "from-green-900/40 to-green-800/20", border: "border-green-500/30" },
            ].map((pillar) => (
              <div key={pillar.pillar} className={`bg-gradient-to-br ${pillar.color} border ${pillar.border} rounded-xl p-5 text-center`}>
                <div className="text-4xl mb-3">{pillar.icon}</div>
                <h5 className="text-white font-bold text-xl mb-3">{pillar.pillar}</h5>
                <p className="text-slate-300 text-sm leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {codeOfConduct.map((category, index) => (
            <div key={index} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-amber-500/30 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{category.icon}</span>
                <h4 className="text-white font-bold text-lg">{category.category}</h4>
              </div>
              <ul className="space-y-2.5">
                {category.rules.map((rule, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm group">
                    <div className="w-5 h-5 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-400 text-xs">✓</span>
                    </div>
                    <span className="text-slate-300 leading-relaxed">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="bg-gradient-to-r from-amber-900/30 to-slate-800 border border-amber-500/20 rounded-2xl p-8 text-center">
          <div className="text-5xl mb-4">✈</div>
          <blockquote className="text-white text-xl font-light italic leading-relaxed mb-4">
            "You are not just cabin crew — you are an ambassador of your airline, your country, and the aviation industry."
          </blockquote>
          <p className="text-amber-400 font-semibold text-sm">— Cabin crew industry principle</p>
        </div>
      </div>
    </div>
  );
}
