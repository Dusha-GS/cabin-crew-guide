import { useState, useRef, useEffect } from "react";
import { AuthUser } from "../hooks/useAuth";

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  user: AuthUser | null;
  onLoginClick: () => void;
  onLogout: () => void;
}

type NavItem = { id: string; label: string; icon: string; desc: string; premium?: boolean };
type NavGroup = { label: string; items: NavItem[] };

const navGroups: NavGroup[] = [
  {
    label: "Prepare",
    items: [
      { id: "airlines", label: "Airlines Overview", icon: "✈️", desc: "Emirates, Etihad, Qatar & more", premium: false },
      { id: "requirements", label: "Requirements", icon: "📋", desc: "Height, age, language, visa", premium: false },
      { id: "dress-code", label: "Dress Code", icon: "👗", desc: "What to wear to your assessment", premium: false },
      { id: "cv-guide", label: "CV Guide", icon: "📄", desc: "Build an ATS-proof cabin crew CV", premium: false },
      { id: "conduct", label: "Code of Conduct", icon: "🏆", desc: "Standards expected by ME airlines", premium: false },
      { id: "open-days", label: "Open Days", icon: "📅", desc: "Live recruitment events worldwide", premium: false },
    ],
  },
  {
    label: "Practice",
    items: [
      { id: "questions", label: "Interview Q&A", icon: "💬", desc: "Questions across four categories", premium: false },
      { id: "mock-exam", label: "Mock Exam", icon: "📝", desc: "25-question assessment simulator", premium: false },
      { id: "group-discussion", label: "Group Discussion", icon: "👥", desc: "Assessment day group scenarios", premium: true },
    ],
  },
  {
    label: "Coaching",
    items: [
      { id: "mock-interview", label: "Mock Interview", icon: "🤖", desc: "Practice with a simulated recruiter", premium: true },
      { id: "cv-review", label: "CV Review", icon: "📄", desc: "Instant CV feedback for ME airlines", premium: false },
      { id: "ask-cabin-crew", label: "Ask Cabin Crew", icon: "✈️", desc: "Get answers from former crew", premium: true },
    ],
  },
];

export default function Header({ activeSection, setActiveSection, user, onLoginClick, onLogout }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navigate = (id: string) => {
    setActiveSection(id);
    setOpenDropdown(null);
    setMenuOpen(false);
    setUserMenuOpen(false);
  };

  const isGroupActive = (group: NavGroup) =>
    group.items.some((item) => item.id === activeSection);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-2xl border-b border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-2">

          {/* Logo */}
          <button onClick={() => navigate("home")} className="flex items-center gap-2 group flex-shrink-0">
            <div className="w-9 h-9 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <span className="text-lg">✈</span>
            </div>
            <div className="hidden sm:block">
              <p className="text-white font-bold text-sm leading-none">Cabin Crew</p>
              <p className="text-amber-400 text-xs font-medium">Interview Guidebook</p>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" ref={dropdownRef}>
            {navGroups.map((group) => (
              <div key={group.label} className="relative">
                <button
                  onClick={() => setOpenDropdown(openDropdown === group.label ? null : group.label)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                    isGroupActive(group)
                      ? "bg-amber-500 text-slate-900"
                      : "text-slate-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {group.label}
                  <svg
                    className={`w-3 h-3 transition-transform duration-200 ${openDropdown === group.label ? "rotate-180" : ""}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {openDropdown === group.label && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-slate-800 border border-white/10 rounded-2xl shadow-2xl shadow-black/40 py-2 z-50">
                    {group.items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => navigate(item.id)}
                        className={`w-full text-left px-4 py-3 flex items-start gap-3 hover:bg-white/5 transition-colors group/item ${
                          activeSection === item.id ? "bg-white/5" : ""
                        }`}
                      >
                        <span className="text-lg flex-shrink-0 mt-0.5">{item.icon}</span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className={`text-sm font-medium ${activeSection === item.id ? "text-amber-400" : "text-white group-hover/item:text-amber-400 transition-colors"}`}>
                              {item.label}
                            </span>
                            {item.premium && (
                              <span className="text-[10px] font-bold text-amber-300 bg-amber-500/15 border border-amber-500/30 px-1.5 py-0.5 rounded-full">PRO</span>
                            )}
                          </div>
                          <p className="text-slate-500 text-xs mt-0.5">{item.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="w-px h-5 bg-white/10 mx-1" />

            <button
              onClick={() => navigate("rejection-decoded")}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 border ${
                activeSection === "rejection-decoded"
                  ? "bg-red-500 text-white border-red-500"
                  : "text-red-300 hover:text-white hover:bg-red-500/20 border-red-500/25"
              }`}
            >
              🔍 Rejection Decoded
            </button>

            <button
              onClick={() => navigate("after-interview")}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 border ${
                activeSection === "after-interview"
                  ? "bg-blue-500 text-white border-blue-500"
                  : "text-blue-300 hover:text-white hover:bg-blue-500/20 border-blue-500/25"
              }`}
            >
              ⏳ After the Interview
            </button>

            <button
              onClick={() => navigate("premium")}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                activeSection === "premium"
                  ? "bg-amber-500 text-slate-900"
                  : "text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30"
              }`}
            >
              ⭐ Pricing
            </button>
          </nav>

          {/* Right — user + hamburger */}
          <div className="flex items-center gap-2">
            {user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-3 py-1.5 transition-all"
                >
                  <div className="w-7 h-7 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-slate-900 font-bold text-xs">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-white text-xs font-medium hidden sm:block max-w-[80px] truncate">{user.name}</span>
                  <span className="text-slate-400 text-xs capitalize hidden sm:block bg-slate-700 px-1.5 py-0.5 rounded">{user.tier}</span>
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 max-w-[90vw] bg-slate-800 border border-white/10 rounded-xl shadow-2xl py-1 z-50">
                    <div className="px-4 py-3 border-b border-white/5">
                      <p className="text-white text-sm font-medium truncate">{user.name}</p>
                      <p className="text-slate-400 text-xs truncate">{user.email}</p>
                      <span className="inline-block mt-1 text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded capitalize">{user.tier} plan</span>
                    </div>
                    <button onClick={() => navigate("account")} className="w-full text-left px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2">
                      <span>👤</span> My Account
                    </button>
                    {user.tier !== "premium" && (
                      <button onClick={() => navigate("premium")} className="w-full text-left px-4 py-2.5 text-sm text-amber-400 hover:bg-amber-500/10 transition-colors flex items-center gap-2">
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
              <button
                onClick={onLoginClick}
                className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-xs px-4 py-2 rounded-xl transition-all hover:scale-[1.02]"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Sign In
              </button>
            )}

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              {menuOpen
                ? <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                : <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-slate-900 border-t border-white/10 max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-4 space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => navigate("rejection-decoded")}
                className={`px-3 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                  activeSection === "rejection-decoded"
                    ? "bg-red-500 text-white border-red-500"
                    : "text-red-300 bg-red-500/10 border-red-500/30"
                }`}
              >
                <span className="text-base">🔍</span>
                <span>Rejection Decoded</span>
              </button>
              <button
                onClick={() => navigate("after-interview")}
                className={`px-3 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                  activeSection === "after-interview"
                    ? "bg-blue-500 text-white border-blue-500"
                    : "text-blue-300 bg-blue-500/10 border-blue-500/30"
                }`}
              >
                <span className="text-base">⏳</span>
                <span>After the Interview</span>
              </button>
              <button
                onClick={() => navigate("premium")}
                className={`px-3 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                  activeSection === "premium"
                    ? "bg-amber-500 text-slate-900 border-amber-500"
                    : "text-amber-300 bg-amber-500/10 border-amber-500/30"
                }`}
              >
                <span className="text-base">⭐</span>
                <span>Pricing Plans</span>
              </button>
            </div>

            {navGroups.map((group) => (
              <div key={group.label}>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest px-1 mb-2">{group.label}</p>
                <div className="grid grid-cols-2 gap-2">
                  {group.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => navigate(item.id)}
                      className={`px-3 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center gap-2 ${
                        activeSection === item.id
                          ? "bg-amber-500 text-slate-900"
                          : item.premium
                          ? "text-amber-300 bg-amber-500/10 border border-amber-500/30"
                          : "text-slate-300 bg-white/5 hover:bg-white/10"
                      }`}
                    >
                      <span className="text-base flex-shrink-0">{item.icon}</span>
                      <span className="leading-tight">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {!user ? (
              <button
                onClick={() => { onLoginClick(); setMenuOpen(false); }}
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-2.5 rounded-xl text-sm transition-all"
              >
                Sign In / Create Account
              </button>
            ) : (
              <button
                onClick={() => navigate("account")}
                className="w-full bg-white/5 border border-white/10 text-slate-300 font-medium py-2.5 rounded-xl text-sm transition-all hover:bg-white/10"
              >
                👤 My Account
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
