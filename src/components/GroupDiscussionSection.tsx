import { useState } from "react";
import BackButton from "./BackButton";
import { usePaidContent } from "../hooks/usePaidContent";
import { ContentLoading, ContentError } from "./ContentState";

interface Props { goBack: () => void; previousLabel: string; }

interface GDTopic {
  topic: string;
  type: string;
  description: string;
  tips: string[];
  commonItems?: string[];
}

export default function GroupDiscussionSection({ goBack, previousLabel }: Props) {
  const [selected, setSelected] = useState(0);

  const { data: groupDiscussionTopics, loading, error, retry } =
    usePaidContent<GDTopic[]>("group-discussion");

  const dosList = [
    "Listen actively and acknowledge others' points",
    "Make eye contact with all group members, not just the recruiter",
    "Speak clearly and confidently, but not too loudly",
    "Build on others' ideas — say 'I agree with [name], and I'd add...'",
    "Use inclusive language — 'we' not just 'I'",
    "Take notes during the discussion if paper is provided",
    "Summarize the group's discussion if asked or when appropriate",
    "Stay positive even when disagreeing — 'That's a great point, however...'",
    "Contribute meaningfully — quality over quantity",
    "Show genuine enthusiasm for the topic",
  ];

  const dontsList = [
    "Dominate the conversation or talk over others",
    "Stay completely silent — you must participate",
    "Use negative body language (crossed arms, eye-rolling)",
    "Argue aggressively or dismiss others' ideas rudely",
    "Go completely off-topic",
    "Ignore quieter group members",
    "Repeat yourself excessively",
    "Use filler words (um, uh, like) too frequently",
    "Check your phone or show disinterest",
    "Make personal attacks or inappropriate comments",
  ];

  const roles = [
    { role: "The Initiator", description: "Kicks off the discussion. Opens with a clear framework or perspective.", tip: "Starting strong makes you memorable. Prepare a brief opening statement.", icon: "🚀" },
    { role: "The Facilitator", description: "Keeps the discussion on track. Ensures everyone gets a chance to speak.", tip: "Say 'Let's hear from [name]' — shows leadership.", icon: "🎯" },
    { role: "The Summarizer", description: "Wraps up key points and brings the group to a conclusion.", tip: "End with 'To summarize our key points...' — this role is highly valued.", icon: "📋" },
    { role: "The Bridge Builder", description: "Connects different ideas and finds common ground between conflicting views.", tip: "This shows emotional intelligence and team-building skills.", icon: "🌉" },
  ];

  if (loading) return <ContentLoading goBack={goBack} previousLabel={previousLabel} />;
  if (error || !groupDiscussionTopics || groupDiscussionTopics.length === 0) {
    return (
      <ContentError
        goBack={goBack}
        previousLabel={previousLabel}
        message={error || "We couldn't load the discussion topics."}
        onRetry={retry}
      />
    );
  }

  const topic = groupDiscussionTopics[selected] ?? groupDiscussionTopics[0];

  return (
    <div className="min-h-screen bg-slate-900 py-20 px-4 pt-24">
      <div className="max-w-6xl mx-auto">
        <BackButton onClick={goBack} label={`Back to ${previousLabel}`} />
        <div className="text-center mb-12">
          <span className="inline-block bg-teal-500/20 text-teal-400 text-sm font-medium px-4 py-1.5 rounded-full mb-4 border border-teal-500/30">👥 Group Discussion</span>
          <h2 className="text-4xl font-bold text-white mb-4">Group Discussion Masterclass</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Group discussions test your teamwork, communication, and leadership.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: "Communication", icon: "💬", desc: "Clear, structured, confident speaking" },
            { label: "Teamwork", icon: "🤝", desc: "Supporting and building on others" },
            { label: "Leadership", icon: "👑", desc: "Guiding without dominating" },
            { label: "Problem-Solving", icon: "🧠", desc: "Logical, practical thinking" },
          ].map((item) => (
            <div key={item.label} className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center hover:border-teal-500/30 transition-colors">
              <div className="text-3xl mb-2">{item.icon}</div>
              <p className="text-teal-400 font-bold text-sm mb-1">{item.label}</p>
              <p className="text-slate-400 text-xs">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2"><span className="text-teal-400">🎭</span> Strategic Roles to Play</h3>
          <div className="grid md:grid-cols-4 gap-4">
            {roles.map((role) => (
              <div key={role.role} className="bg-gradient-to-br from-slate-800 to-slate-700 border border-white/10 rounded-2xl p-5 hover:border-teal-500/30 transition-all">
                <div className="text-3xl mb-3">{role.icon}</div>
                <h4 className="text-white font-bold text-sm mb-2">{role.role}</h4>
                <p className="text-slate-400 text-xs mb-3 leading-relaxed">{role.description}</p>
                <div className="bg-teal-500/10 border border-teal-500/20 rounded-lg p-2">
                  <p className="text-teal-300 text-xs">💡 {role.tip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2"><span className="text-teal-400">📚</span> Practice Topics</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              {groupDiscussionTopics.map((t: GDTopic, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelected(index)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                    selected === index ? "bg-teal-500/20 border-teal-500/50 shadow-lg" : "bg-white/5 border-white/10 hover:bg-white/10"
                  }`}
                >
                  <p className={`font-semibold text-sm ${selected === index ? "text-teal-300" : "text-white"}`}>{t.topic}</p>
                  <span className="text-xs text-slate-400 bg-white/5 px-2 py-0.5 rounded-full mt-1 inline-block">{t.type}</span>
                </button>
              ))}
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-700 border border-white/10 rounded-2xl p-6">
              <span className="bg-teal-500/20 text-teal-400 text-xs px-3 py-1 rounded-full border border-teal-500/30 font-medium">{topic.type}</span>
              <h4 className="text-white font-bold text-xl mt-3 mb-3">{topic.topic}</h4>
              <p className="text-slate-300 text-sm leading-relaxed mb-5 bg-white/5 rounded-xl p-4 border border-white/5">"{topic.description}"</p>
              <div className="mb-4">
                <p className="text-teal-400 font-bold text-sm mb-3">💡 Discussion Tips:</p>
                <ul className="space-y-2">
                  {topic.tips.map((tip: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-teal-400 mt-0.5 flex-shrink-0">◆</span>
                      <span className="text-slate-300">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {topic.commonItems && (
                <div>
                  <p className="text-amber-400 font-bold text-sm mb-2">📋 Items to rank:</p>
                  <div className="flex flex-wrap gap-2">
                    {topic.commonItems.map((item: string, i: number) => (
                      <span key={i} className="bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs px-3 py-1 rounded-full">{i + 1}. {item}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-500/5 border border-green-500/20 rounded-2xl p-6">
            <h4 className="text-green-400 font-bold text-lg mb-4">✅ Do These Things</h4>
            <ul className="space-y-2">
              {dosList.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-green-400 mt-0.5 flex-shrink-0">✓</span>
                  <span className="text-slate-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6">
            <h4 className="text-red-400 font-bold text-lg mb-4">❌ Avoid These Mistakes</h4>
            <ul className="space-y-2">
              {dontsList.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-red-400 mt-0.5 flex-shrink-0">✗</span>
                  <span className="text-slate-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
