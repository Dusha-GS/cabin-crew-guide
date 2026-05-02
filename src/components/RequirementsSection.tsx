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
          <span className="inline-block bg-purple-500/20 text-purple-400 text-sm font-medium px-4 py-1.5 rounded-full mb-4 border border-purple-500/30">📋 Entry Requirements</span>
          <h2 className="text-4xl font-bold text-white mb-4">Can You Apply?</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Check the minimum requirements for the Big 3 Middle Eastern airlines before applying.</p>
        </div>

        <div className="bg-gradient-to-r from-purple-900/40 to-slate-800 border border-purple-500/30 rounded-2xl p-6 mb-12">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="text-center md:text-left flex-1">
              <h4 className="text-white font-bold text-2xl mb-2 flex items-center gap-2">📏 The 212cm Reach Test</h4>
              <p className="text-slate-400 mb-4 leading-relaxed">All three major ME airlines require candidates to reach 212cm with both arms fully extended above their heads.</p>
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
                <p className="text-purple-300 font-semibold text-sm">💡 How to Pass:</p>
                <ul className="mt-2 space-y-1 text-slate-400 text-sm">
                  <li>• Stand on your tiptoes if needed</li>
                  <li>• Stretch your arms fully above your head</li>
                  <li>• Wear heels to assessment day — this counts!</li>
                  <li>• Practice the stretch daily before your interview</li>
                </ul>
              </div>
            </div>
            <div className="flex-shrink-0 text-center bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="text-6xl font-bold text-purple-400 mb-2">212</div>
              <div className="text-2xl font-bold text-white mb-1">centimetres</div>
              <div className="text-slate-400 text-sm">Minimum reach height</div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto mb-12">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left text-slate-400 text-sm font-bold uppercase tracking-wider p-4 border-b border-white/10">Requirement</th>
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
                { label: "Height/Reach", key: "minHeight", format: (v: string | number) => String(v) },
                { label: "Education", key: "education", format: (v: string | number) => String(v) },
                { label: "Languages", key: "languages", format: (v: string | number) => String(v) },
                { label: "Experience", key: "experience", format: (v: string | number) => String(v) },
                { label: "Passport", key: "passport", format: (v: string | number) => String(v) },
                { label: "Swimming", key: "swimming", format: (v: string | number) => String(v) },
                { label: "Medical", key: "medical", format: (v: string | number) => String(v) },
              ].map((req, rowIndex) => (
                <tr key={req.key} className={`${rowIndex % 2 === 0 ? "bg-white/2" : ""} hover:bg-white/5 transition-colors`}>
                  <td className="p-4 border-b border-white/5 text-amber-400 font-semibold text-sm">{req.label}</td>
                  {mainAirlines.map((id) => {
                    const reqs = requirements[id as keyof typeof requirements];
                    const value = reqs[req.key as keyof typeof reqs] as string | number;
                    return (
                      <td key={id} className="p-4 border-b border-white/5 text-center text-slate-300 text-sm">{req.format(value)}</td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
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
      </div>
    </div>
  );
}
