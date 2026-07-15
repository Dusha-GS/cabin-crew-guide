import { requirements, airlines } from "../data/guideData";
import BackButton from "./BackButton";

interface Props { goBack: () => void; previousLabel: string; }

export default function RequirementsSection({ goBack, previousLabel }: Props) {
  const mainAirlines = ["emirates", "etihad", "qatar"];

  return (
    <div className="min-h-screen bg-slate-900 py-20 px-4 pt-24">
      <div className="max-w-6xl mx-auto">
        <BackButton onClick={goBack} label={`Back to ${previousLabel}`} />
        <div className="text-center mb-12">
          <span className="inline-block bg-purple-500/20 text-purple-400 text-sm font-medium px-4 py-1.5 rounded-full mb-4 border border-purple-500/30">
            📋 Entry Requirements
          </span>
          <h2 className="text-4xl font-bold text-white mb-4">Can You Apply?</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Check the minimum requirements for Emirates, Etihad, and Qatar Airways before applying.
          </p>
        </div>

        {/* Global disclaimer */}
        <div className="bg-slate-800/50 border border-slate-700/40 rounded-xl px-5 py-4 mb-8 flex items-start gap-3">
          <span className="text-slate-400 text-base flex-shrink-0 mt-0.5">ℹ️</span>
          <p className="text-slate-400 text-xs leading-relaxed">
            Requirements shown are based on publicly available information and candidate-reported experiences. They are subject to change at any time. Always verify current requirements directly with each airline before applying. For flydubai and Air Arabia requirements, see the <strong className="text-slate-400">Airlines Overview</strong> section.
          </p>
        </div>

        {/* 212cm Reach Test Callout */}
        <div className="bg-gradient-to-r from-purple-900/40 to-slate-800 border border-purple-500/30 rounded-2xl p-6 mb-12">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="text-center md:text-left flex-1">
              <h4 className="text-white font-bold text-2xl mb-2 flex items-center gap-2">
                📏 The 212cm Arm Reach Test
              </h4>
              <p className="text-slate-400 mb-4 leading-relaxed">
                Emirates, Etihad, and Qatar Airways all require a minimum arm reach of 212cm —
                tested using one arm extended upward. The test is performed barefoot at all three
                carriers; tiptoes are allowed.
              </p>
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
                <p className="text-purple-300 font-semibold text-sm mb-2">💡 How to Prepare:</p>
                <ul className="space-y-1 text-slate-400 text-sm">
                  <li>• The reach test is performed <strong className="text-slate-300">barefoot</strong> — shoes are removed before the test at all three airlines</li>
                  <li>• <strong className="text-slate-300">Tiptoes are allowed</strong> — practice your barefoot tiptoe reach at home daily until you consistently hit 212cm</li>
                  <li>• It is one arm extended upward — not both arms simultaneously</li>
                  <li>• Stretch your arm and shoulder fully — small posture adjustments can add 1–2cm</li>
                  <li>• Arrive at assessment day wearing heels for overall presentation — but you will remove them for the reach test itself</li>
                </ul>
              </div>
              <p className="text-slate-400 text-xs mt-3 italic">
                Note: flydubai also requires a 212cm reach. Air Arabia minimum height is 160cm (female) / 170cm (male) — verify their exact reach requirement directly with Air Arabia.
              </p>
            </div>
            <div className="flex-shrink-0 text-center bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="text-6xl font-bold text-purple-400 mb-2">212</div>
              <div className="text-2xl font-bold text-white mb-1">centimetres</div>
              <div className="text-slate-400 text-sm">Minimum arm reach</div>
              <div className="text-slate-400 text-xs mt-1">Barefoot · One arm · Tiptoes allowed</div>
            </div>
          </div>
        </div>

        {/* Requirements Comparison Table */}
        <div className="overflow-x-auto mb-12">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left text-slate-400 text-sm font-bold uppercase tracking-wider p-4 border-b border-white/10">
                  Requirement
                </th>
                {mainAirlines.map((id) => {
                  const airline = airlines.find((a) => a.id === id)!;
                  return (
                    <th key={id} className="text-center p-4 border-b border-white/10">
                      <div className="text-white font-bold">{airline.name}</div>
                      <div className="text-slate-400 text-xs mt-0.5">{airline.base}</div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {[
                { label: "Minimum Age", key: "minAge", format: (v: string | number) => `${v} years` },
                { label: "Arm Reach", key: "minHeight", format: (v: string | number) => String(v) },
                { label: "Education", key: "education", format: (v: string | number) => String(v) },
                { label: "Languages", key: "languages", format: (v: string | number) => String(v) },
                { label: "Experience", key: "experience", format: (v: string | number) => String(v) },
                { label: "Passport", key: "passport", format: (v: string | number) => String(v) },
                { label: "Swimming", key: "swimming", format: (v: string | number) => String(v) },
                { label: "Medical", key: "medical", format: (v: string | number) => String(v) },
              ].map((req, rowIndex) => (
                <tr
                  key={req.key}
                  className={`${rowIndex % 2 === 0 ? "bg-white/2" : ""} hover:bg-white/5 transition-colors`}
                >
                  <td className="p-4 border-b border-white/5 text-amber-400 font-semibold text-sm">
                    {req.label}
                  </td>
                  {mainAirlines.map((id) => {
                    const reqs = requirements[id as keyof typeof requirements];
                    const value = reqs[req.key as keyof typeof reqs] as string | number;
                    return (
                      <td
                        key={id}
                        className="p-4 border-b border-white/5 text-center text-slate-300 text-sm"
                      >
                        {req.format(value)}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Additional Requirements Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {mainAirlines.map((id) => {
            const airline = airlines.find((a) => a.id === id)!;
            const reqs = requirements[id as keyof typeof requirements];
            return (
              <div key={id} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <h4 className="text-white font-bold text-lg mb-4">✈ {airline.name}</h4>
                <ul className="space-y-2">
                  {reqs.other.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-amber-400 mt-0.5 flex-shrink-0">◆</span>
                      <span className="text-slate-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* flydubai and Air Arabia note */}
        <div className="bg-slate-800/40 border border-slate-700/30 rounded-xl px-5 py-4 text-center">
          <p className="text-slate-400 text-sm">
            Requirements for <span className="text-slate-400 font-semibold">flydubai</span> and{" "}
            <span className="text-slate-400 font-semibold">Air Arabia</span> are available in the{" "}
            <span className="text-slate-400 font-semibold">Airlines Overview</span> section.
            Always verify all requirements directly with each airline before applying — requirements
            are subject to change.
          </p>
        </div>

      </div>
    </div>
  );
}
