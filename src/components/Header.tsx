import { useState } from "react";
import { AuthUser } from "../hooks/useAuth";

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  user: AuthUser | null;
  onLoginClick: () => void;
  onLogout: () => void;
}

const navItems = [
  { id: "airlines", label: "Airlines", icon: "✈️" },
  { id: "requirements", label: "Requirements", icon: "📋" },
  { id: "dress-code", label: "Dress Code", icon: "👗" },
  { id: "cv-guide", label: "CV Guide", icon: "📄" },
  { id: "questions", label: "Interview Q&A", icon: "💬" },
  { id: "conduct", label: "Code of Conduct", icon: "🏆" },
  { id: "mock-exam", label: "Mock Exam", icon: "📝" },
  { id: "ai-mock-interview", label: "AI Interview", icon: "🤖" },
  { id: "ask-cabin-crew", label: "Ask Crew", icon: "✈️" },
  { id: "group-discussion", label: "Group Discussion", icon: "👥" },
  { id: "premium", label: "Pricing", icon: "⭐" },
];

const premiumNavIds = ["mock-exam", "ai-mock-interview", "ask-cabin-crew", "group-discussion"];

export default function Header({ activeSection, setActiveSection, user, onLoginClick, onLogout }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-2xl border-b border-amber-500/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <button onClick={() => setActiveSection("home")} className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <span className="text-lg">✈</span>
            </div>
            <div className="hidden sm:block">
              <p className="text-white font-bold text-sm leading-none">Cabin Crew</p>
              <p className="text-amber-400 text-xs font-medium">Interview Guidebook</p>
            </div>
          </button>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => setActiveSection(item.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
                  activeSection === item.id ? "bg-amber-500 text-slate-900"
                  : premiumNavIds.includes(item.id) ? "text-amber-300 hover:text-white hover:bg-amber-500/20 border border-amber-500/20"
                  : item.id === "premium" ? "text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30"
                  : "text-slate-300 hover:text-white hover:bg-white/10"}`}>
                <span className="text-sm">{item.icon}</span>{item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {user ? (
              <div className="relative">
                <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-3 py-1.5 transition-all">
                  <div className="w-7 h-7 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-slate-900 font-bold text-xs">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-white text-xs font-medium hidden sm:block max-w-[80px] truncate">{user.name}</span>
                  <span className="text-slate-400 text-xs capitalize hidden sm:block bg-slate-700 px-1.5 py-0.5 rounded">{user.tier}</span>
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-slate-800 border border-white/10 rounded-xl shadow-2xl py-1 z-50">
                    <div className="px-4 py-3 border-b border-white/5">
                      <p className="text-white text-sm font-medium truncate">{user.name}</p>
                      <p className="text-slate-400 text-xs truncate">{user.email}</p>
                      <span className="inline-block mt-1 text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded capitalize">{user.tier} plan</span>
                    </div>
                    {user.tier !== "premium" && (
                      <button onClick={() => { setUserMenuOpen(false); setActiveSection("premium"); }} className="w-full text-left px-4 py-2.5 text-sm text-amber-400 hover:bg-amber-500/10 transition-colors flex items-center gap-2">
                        <span>⭐</span> Upgrade Plan
                      </button>
                    )}
                    <button onClick={() => { setUserMenuOpen(false); onLogout(); }} className="w-full text-left px-4 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2">
                      <span>🚪</span> Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={onLoginClick} className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-xs px-4 py-2 rounded-xl transition-all hover:scale-[1.02]">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                Sign In
              </button>
            )}
            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors">
              {menuOpen
                ? <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                : <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-slate-900 border-t border-white/10">
          <div className="px-4 py-3 grid grid-cols-2 gap-2">
            {[{ id: "home", label: "Home", icon: "🏠" }, ...navItems].map((item) => (
              <button key={item.id} onClick={() => { setActiveSection(item.id); setMenuOpen(false); }}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                  activeSection === item.id ? "bg-amber-500 text-slate-900"
                  : premiumNavIds.includes(item.id) ? "text-amber-300 bg-amber-500/10 border border-amber-500/30"
                  : "text-slate-300 hover:text-white hover:bg-white/10"}`}>
                <span>{item.icon}</span>{item.label}
              </button>
            ))}
          </div>
          {!user && (
            <div className="px-4 pb-4">
              <button onClick={() => { onLoginClick(); setMenuOpen(false); }} className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-2.5 rounded-xl text-sm transition-all">
                Sign In / Create Account
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
