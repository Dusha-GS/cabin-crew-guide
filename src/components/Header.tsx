import { useState } from "react";

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const navItems = [
  { id: "home", label: "Home", icon: "🏠" },
  { id: "airlines", label: "Airlines", icon: "✈️" },
  { id: "requirements", label: "Requirements", icon: "📋" },
  { id: "dress-code", label: "Dress Code", icon: "👗" },
  { id: "cv-guide", label: "CV Guide", icon: "📄" },
  { id: "questions", label: "Interview Q&A", icon: "💬" },
  { id: "group-discussion", label: "Group Discussion", icon: "👥" },
  { id: "mock-exam", label: "Mock Exam", icon: "📝" },
  { id: "conduct", label: "Code of Conduct", icon: "🏆" },
  { id: "ai-mock-interview", label: "AI Interview", icon: "🤖" },
  { id: "ask-cabin-crew", label: "Ask Crew", icon: "✈️" },
  { id: "premium", label: "Premium", icon: "⭐" },
];

export default function Header({ activeSection, setActiveSection }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-2xl border-b border-amber-500/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => setActiveSection("home")} className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <span className="text-lg">✈</span>
            </div>
            <div className="hidden sm:block">
              <p className="text-white font-bold text-sm leading-none">Cabin Crew</p>
              <p className="text-amber-400 text-xs font-medium">Interview Guidebook</p>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.slice(1).map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
                  activeSection === item.id
                    ? "bg-amber-500 text-slate-900"
                    : item.id === "ask-cabin-crew"
                    ? "text-amber-300 hover:text-white hover:bg-amber-500/20 border border-amber-500/30"
                    : item.id === "ai-mock-interview"
                    ? "text-amber-300 hover:text-white hover:bg-amber-500/20 border border-amber-500/20"
                    : "text-slate-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <span className="text-sm">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors">
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-slate-900 border-t border-white/10">
          <div className="px-4 py-3 grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveSection(item.id); setMenuOpen(false); }}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                  activeSection === item.id
                    ? "bg-amber-500 text-slate-900"
                    : item.id === "ask-cabin-crew"
                    ? "text-amber-300 bg-amber-500/10 border border-amber-500/30"
                    : "text-slate-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
