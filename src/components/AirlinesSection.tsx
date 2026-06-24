import { useState } from "react";
import { airlines, interviewStages, requirements } from "../data/guideData";
import BackButton from "./BackButton";

interface Props { goBack: () => void; previousLabel: string; }

export default function AirlinesSection({ goBack, previousLabel }: Props) {
  const [selectedAirline, setSelectedAirline] = useState("emirates");

  const airline = airlines.find((a) => a.id === selectedAirline)!;
  const stages = interviewStages[selectedAirline as keyof typeof interviewStages] || [];
  const reqs = requirements[selectedAirline as keyof typeof requirements];

  return (
    <div className="min-h-screen bg-slate-900 py-20 px-4 pt-24">
      <div className="max-w-6xl mx-auto">
        <BackButton onClick={goBack} label={`Back to ${previousLabel}`} />
        <div className="text-center mb-12">
          <span className="inline-block bg-amber-500/20 text-amber-400 text-sm font-medium px-4 py-1.5 rounded-full mb-4 border border-amber-500/30">
            ✈ Airlines Overview
          </span>
          <h2 className="text-4xl font-bold text-white mb-4">Gulf Airlines</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Select an airline to explore their interview process, requirements, and insider tips.
          </p>
        </div>

        {/* Global disclaimer */}
        <div className="bg-slate-800/50 border border-slate-700/40 rounded-xl px-5 py-4 mb-8 flex items-start gap-3">
          <span className="text-slate-500 text-base flex-shrink-0 mt-0.5">ℹ️</span>
          <p className="text-slate-500 text-xs leading-relaxed">
            Airline information, fleet figures, route counts, and interview process details on this page are based on publicly available sources and candidate-reported experiences. They are subject to change at any time. Always verify current requirements and processes directly with each airline before applying.
          </p>
        </div>

        {/* Airline Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {airlines.map((a) => (
            <button
              key={a.id}
              onClick={() => setSelectedAirline(a.id)}
              className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 border ${
                selectedAirline === a.id
                  ? "bg-amber-500 text-slate-900 border-amber-500 shadow-lg shadow-amber-500/30 scale-105"
                  : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10"
              }`}
            >
              ✈ {a.name}
            </button>
          ))}
        </div>

        {/* Airline Info + Requirements */}
        <div className="grid md:grid-cols-3 gap-6 mb-4">
          {/* Airline Info Card */}
          <div className="md:col-span-1 bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-6 border border-white/10">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl mb-4"
              style={{ backgroundColor: airline.color + "30", border: `1px solid ${airline.color}50` }}
            >
              ✈
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{airline.name}</h3>
            <div className="space-y-3">
              {[
                { label: "Base", value: airline.base },
                { label: "Hub", value: airline.hub },
                { label: "Founded", value: airline.founded },
                { label: "Fleet", value: airline.fleet },
                { label: "Destinations", value: airline.destinations },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex justify-between items-center border-b border-white/5 pb-2"
                >
                  <span className="text-slate-400 text-sm">{item.label}</span>
                  <span className="text-white text-sm font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Requirements Panel */}
          {reqs && (
            <div className="md:col-span-2 bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-6 border border-white/10">
              <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">📋</span> Key Requirements
              </h4>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { label: "Minimum Age", value: `${reqs.minAge} years` },
                  { label: "Arm Reach", value: reqs.minHeight },
                  { label: "Education", value: reqs.education },
                  { label: "Experience", value: reqs.experience },
                  { label: "Languages", value: reqs.languages },
                  { label: "Passport", value: reqs.passport },
                  { label: "Swimming", value: reqs.swimming },
                  { label: "Medical", value: reqs.medical },
                ].map((req) => (
                  <div key={req.label} className="bg-white/5 rounded-xl p-3 border border-white/5">
                    <p className="text-amber-400 text-xs font-bold mb-1 uppercase tracking-wider">
                      {req.label}
                    </p>
                    <p className="text-white text-sm leading-snug">{req.value}</p>
                  </div>
                ))}
              </div>
              {reqs.other && (
                <div className="mt-4">
                  <p className="text-amber-400 text-sm font-bold mb-2">Additional Requirements:</p>
                  <div className="flex flex-wrap gap-2">
                    {reqs.other.map((r: string, i: number) => (
                      <span
                        key={i}
                        className="bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs px-3 py-1 rounded-full"
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Fleet/route data note */}
        <p className="text-slate-600 text-xs text-right mb-10 pr-1">
          Fleet and route figures are approximate and subject to change — verify current data on each airline's official website.
        </p>

        {/* Interview Process */}
        <div>
          <h4 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
            <span className="text-amber-400">🗺️</span> Interview Process — Step by Step
          </h4>
          <p className="text-slate-500 text-xs mb-6">
            Process outlines are based on publicly reported candidate experiences and are subject to change. Always verify the current recruitment process directly with {airline.name} before attending an event.
          </p>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-500 via-amber-500/50 to-transparent hidden md:block" />
            <div className="space-y-4">
              {stages.map((stage: { stage: number; title: string; description: string; tips: string[] }, index: number) => (
                <div key={index} className="flex gap-6 group">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center font-bold text-slate-900 text-lg shadow-lg shadow-amber-500/30 z-10">
                    {stage.stage}
                  </div>
                  <div className="flex-1 bg-white/5 hover:bg-white/[0.08] border border-white/10 rounded-2xl p-5 transition-all duration-300 group-hover:border-amber-500/30">
                    <h5 className="text-white font-bold text-lg mb-2">{stage.title}</h5>
                    <p className="text-slate-400 text-sm mb-3 leading-relaxed">{stage.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {stage.tips.map((tip: string, i: number) => (
                        <span
                          key={i}
                          className="bg-amber-500/10 text-amber-300 text-xs px-3 py-1 rounded-full border border-amber-500/20"
                        >
                          ✓ {tip}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
