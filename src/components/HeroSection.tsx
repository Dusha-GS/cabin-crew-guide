interface HeroSectionProps {
  setActiveSection: (section: string) => void;
}

export default function HeroSection({ setActiveSection }: HeroSectionProps) {
  const sections = [
    { id: "airlines", label: "Airlines Overview", icon: "✈️", color: "from-blue-600 to-blue-800" },
    { id: "requirements", label: "Requirements", icon: "📋", color: "from-purple-600 to-purple-800" },
    { id: "dress-code", label: "Dress Code", icon: "👗", color: "from-pink-600 to-pink-800" },
    { id: "cv-guide", label: "CV Guide", icon: "📄", color: "from-green-600 to-green-800" },
    { id: "questions", label: "Interview Q&A", icon: "💬", color: "from-orange-600 to-orange-800" },
    { id: "group-discussion", label: "Group Discussion", icon: "👥", color: "from-teal-600 to-teal-800" },
    { id: "mock-exam", label: "Mock Exam", icon: "📝", color: "from-red-600 to-red-800" },
    { id: "conduct", label: "Code of Conduct", icon: "🏆", color: "from-amber-600 to-amber-800" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-amber-950" />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-amber-900/60" />
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 rounded-full px-5 py-2 mb-6 backdrop-blur-sm">
            <span className="text-amber-400 text-sm">✦</span>
            <span className="text-amber-300 text-sm font-medium">Middle Eastern Airlines Edition 2024-2025</span>
            <span className="text-amber-400 text-sm">✦</span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
            Cabin Crew
            <span className="block bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">
              Interview Guidebook
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 mb-3 font-light">
            Your Complete Guide to Landing Your Dream Role
          </p>

          <p className="text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Covering Emirates, Etihad Airways, Qatar Airways, flydubai & Air Arabia — 
            from CV preparation to final interview, dress code, group discussions, and mock exam questions.
          </p>

          {/* Airline tags */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {["Emirates", "Etihad Airways", "Qatar Airways", "flydubai", "Air Arabia"].map((airline) => (
              <span
                key={airline}
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm px-4 py-1.5 rounded-full font-medium"
              >
                ✈ {airline}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={() => setActiveSection("ai-mock-interview")}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-900 font-bold px-8 py-4 rounded-xl shadow-lg shadow-amber-500/30 transition-all hover:scale-105 text-lg flex items-center justify-center gap-2"
            >
              🤖 AI Mock Interview
            </button>
            <button
              onClick={() => setActiveSection("mock-exam")}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105 text-lg"
            >
              Try Mock Exam 📝
            </button>
          </div>

          {/* Scroll indicator */}
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-amber-400/60 rounded-full mx-auto flex items-start justify-center pt-2">
              <div className="w-1.5 h-3 bg-amber-400/60 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Section Cards */}
      <div className="bg-slate-900 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What's Inside the Guidebook
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Everything you need to prepare for your Middle Eastern airline cabin crew interview.
            </p>
          </div>

          {/* AI Features highlight */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <button
              onClick={() => setActiveSection("ai-mock-interview")}
              className="group relative bg-gradient-to-br from-amber-900/40 to-slate-800 border border-amber-500/40 p-6 rounded-2xl hover:scale-[1.02] transition-all duration-300 shadow-lg text-left overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-4xl">🤖</span>
                  <span className="bg-amber-500/20 text-amber-400 text-xs font-bold px-3 py-1 rounded-full border border-amber-500/30">POWERED BY CLAUDE AI</span>
                </div>
                <h3 className="text-white font-bold text-xl mb-2">AI Mock Interview</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Have a real conversation with Claude AI acting as an Emirates/Qatar recruiter. Get instant feedback on every answer.
                </p>
                <div className="mt-4 text-amber-400 text-sm font-semibold group-hover:gap-2 flex items-center gap-1 transition-all">
                  Start practicing →
                </div>
              </div>
            </button>

            <button
              onClick={() => setActiveSection("ai-cv-review")}
              className="group relative bg-gradient-to-br from-green-900/40 to-slate-800 border border-green-500/40 p-6 rounded-2xl hover:scale-[1.02] transition-all duration-300 shadow-lg text-left overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-2xl" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-4xl">📄</span>
                  <span className="bg-green-500/20 text-green-400 text-xs font-bold px-3 py-1 rounded-full border border-green-500/30">POWERED BY CLAUDE AI</span>
                </div>
                <h3 className="text-white font-bold text-xl mb-2">AI CV Review</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Paste your CV and get instant, actionable feedback tailored to cabin crew standards at ME airlines.
                </p>
                <div className="mt-4 text-green-400 text-sm font-semibold group-hover:gap-2 flex items-center gap-1 transition-all">
                  Review my CV →
                </div>
              </div>
            </button>
          </div>

          {/* Standard sections */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`group bg-gradient-to-br ${section.color} p-6 rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg text-left`}
              >
                <div className="text-4xl mb-3">{section.icon}</div>
                <h3 className="text-white font-bold text-sm leading-tight">{section.label}</h3>
                <div className="mt-3 text-white/60 text-xs group-hover:text-white/80 transition-colors">
                  Learn more →
                </div>
              </button>
            ))}
          </div>

          {/* Premium */}
          <div className="mt-8 flex flex-col items-center">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-16 bg-amber-500/40" />
              <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">Exclusive</span>
              <span className="h-px w-16 bg-amber-500/40" />
            </div>
            <button
              onClick={() => setActiveSection("premium")}
              className="group relative w-full max-w-2xl bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 p-8 rounded-3xl hover:scale-[1.02] transition-all duration-300 shadow-2xl shadow-amber-500/30 text-left overflow-hidden border-2 border-amber-300/50"
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
              <div className="relative flex flex-col md:flex-row items-start md:items-center gap-5">
                <div className="text-6xl drop-shadow-lg">⭐</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-slate-900/80 text-amber-300 text-xs font-bold px-3 py-1 rounded-full">PREMIUM • $25</span>
                    <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">MEMBERS ONLY</span>
                  </div>
                  <h3 className="text-slate-900 font-bold text-2xl leading-tight mb-1">Premium Final Lab</h3>
                  <p className="text-slate-800 text-sm leading-relaxed">
                    Members-only voice exam with 25 questions + former Middle East cabin crew Q&A, AI essay assessment, and aviation math.
                  </p>
                </div>
                <div className="hidden md:flex items-center gap-2 bg-slate-900 text-amber-400 font-bold px-5 py-3 rounded-xl group-hover:bg-slate-800 transition-colors">
                  Unlock →
                </div>
              </div>
            </button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "5", label: "Airlines Covered", icon: "✈️" },
              { value: "50+", label: "Interview Questions", icon: "💬" },
              { value: "∞", label: "AI Practice Sessions", icon: "🤖" },
              { value: "100%", label: "Comprehensive Guide", icon: "🏆" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-amber-400 mb-1">{stat.value}</div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
