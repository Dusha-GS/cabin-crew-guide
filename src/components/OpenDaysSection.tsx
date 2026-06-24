import { useState, useMemo } from "react";
import BackButton from "./BackButton";
import {
  openDaysEvents,
  ALL_COUNTRIES,
  ALL_AIRLINES,
  LAST_UPDATED,
  type Airline,
  type EventType,
} from "../data/openDaysData";

interface Props {
  goBack: () => void;
  previousLabel: string;
}

// ── Airline badge colours ─────────────────────────────────────
const AIRLINE_STYLES: Record<Airline, { bg: string; text: string; border: string }> = {
  "Emirates":      { bg: "bg-blue-500/15",   text: "text-blue-300",   border: "border-blue-500/30" },
  "Qatar Airways": { bg: "bg-purple-500/15", text: "text-purple-300", border: "border-purple-500/30" },
  "Etihad":        { bg: "bg-amber-500/15",  text: "text-amber-300",  border: "border-amber-500/30" },
  "flydubai":      { bg: "bg-teal-500/15",   text: "text-teal-300",   border: "border-teal-500/30" },
  "Air Arabia":    { bg: "bg-red-500/15",    text: "text-red-300",    border: "border-red-500/30" },
};

// ── Event type badge ──────────────────────────────────────────
const TYPE_LABELS: Record<EventType, { label: string; dot: string }> = {
  walkin: { label: "Walk-in",    dot: "bg-emerald-400" },
  invite: { label: "Invite only", dot: "bg-amber-400" },
  agency: { label: "Via agency",  dot: "bg-slate-400" },
};

// ── Month label from ISO date string ─────────────────────────
function monthKey(dateStr: string) {
  if (dateStr === "2099-12-31") return "ONGOING";
  const d = new Date(dateStr);
  return d.toLocaleString("en-GB", { month: "long", year: "numeric" });
}

function monthOrder(dateStr: string) {
  if (dateStr === "2099-12-31") return 999999;
  return parseInt(dateStr.replace(/-/g, ""), 10);
}

export default function OpenDaysSection({ goBack, previousLabel }: Props) {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedAirlines, setSelectedAirlines] = useState<Airline[]>([]);
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");

  // ── Toggle helpers ────────────────────────────────────────
  const toggleCountry = (c: string) =>
    setSelectedCountries(prev =>
      prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]
    );

  const toggleAirline = (a: Airline) =>
    setSelectedAirlines(prev =>
      prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]
    );

  const clearAll = () => {
    setSelectedCountries([]);
    setSelectedAirlines([]);
  };

  // ── Filtered + grouped events ─────────────────────────────
  const grouped = useMemo(() => {
    const filtered = openDaysEvents.filter(e => {
      const countryOk = selectedCountries.length === 0 || selectedCountries.includes(e.country);
      const airlineOk = selectedAirlines.length === 0 || selectedAirlines.includes(e.airline);
      return countryOk && airlineOk;
    });

    const sorted = [...filtered].sort((a, b) => {
      const mo = monthOrder(a.date) - monthOrder(b.date);
      if (mo !== 0) return mo;
      return a.country.localeCompare(b.country);
    });

    const map: Record<string, typeof sorted> = {};
    for (const e of sorted) {
      const key = monthKey(e.date);
      if (!map[key]) map[key] = [];
      map[key].push(e);
    }

    return Object.entries(map).sort(([, a], [, b]) => {
      const ao = monthOrder(a[0].date);
      const bo = monthOrder(b[0].date);
      return ao - bo;
    });
  }, [selectedCountries, selectedAirlines]);

  const filteredCountries = ALL_COUNTRIES.filter(c =>
    c.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const hasFilters = selectedCountries.length > 0 || selectedAirlines.length > 0;
  const totalEvents = grouped.reduce((acc, [, evs]) => acc + evs.length, 0);

  return (
    <div className="min-h-screen bg-slate-900 pt-20 pb-16 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Back */}
        <div className="mb-6">
          <BackButton onClick={goBack} label={`← ${previousLabel}`} />
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            {/* SVG on mobile, emoji on desktop */}
            <span className="md:hidden w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
            </span>
            <span className="hidden md:inline text-3xl">📅</span>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                Airline Open Days
              </h1>
              <p className="text-slate-400 text-sm mt-0.5">
                Last updated: <span className="text-amber-400 font-medium">{LAST_UPDATED}</span>
                &nbsp;·&nbsp;Schedules change often — verify on the airline's official site
              </p>
            </div>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
            Open day and recruitment event schedule for Emirates, Qatar Airways, Etihad, flydubai and Air Arabia.
            Filter by country or airline to see only what's relevant to you. Airlines publish dated events only
            4–8 weeks ahead, so dated listings are limited — entries marked "Ongoing" show each airline's
            standing way to apply.
          </p>
        </div>

        {/* ── FILTERS ─────────────────────────────────────────── */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-4 md:p-5 mb-6 space-y-4">

          {/* Airline filter */}
          <div>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Filter by airline</p>
            <div className="flex flex-wrap gap-2">
              {ALL_AIRLINES.map(airline => {
                const s = AIRLINE_STYLES[airline];
                const active = selectedAirlines.includes(airline);
                return (
                  <button
                    key={airline}
                    onClick={() => toggleAirline(airline)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-150 ${
                      active
                        ? `${s.bg} ${s.text} ${s.border}`
                        : "bg-slate-700/50 text-slate-400 border-slate-600/40 hover:border-slate-500/60"
                    }`}
                  >
                    {airline}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Country filter */}
          <div>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Filter by country</p>

            {/* Selected country chips */}
            {selectedCountries.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {selectedCountries.map(c => (
                  <button
                    key={c}
                    onClick={() => toggleCountry(c)}
                    className="flex items-center gap-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-amber-500/30 transition-colors"
                  >
                    {openDaysEvents.find(e => e.country === c)?.flag} {c}
                    <span className="text-amber-400/60 ml-0.5">×</span>
                  </button>
                ))}
              </div>
            )}

            {/* Country picker toggle */}
            <button
              onClick={() => setShowCountryPicker(v => !v)}
              className="flex items-center gap-2 text-sm text-slate-300 bg-slate-700/50 border border-slate-600/40 hover:border-slate-500/60 px-4 py-2 rounded-lg transition-colors"
            >
              <span>{showCountryPicker ? "▲" : "▼"}</span>
              {showCountryPicker ? "Close country list" : "Select countries"}
              {selectedCountries.length > 0 && (
                <span className="bg-amber-500/30 text-amber-300 text-xs px-1.5 py-0.5 rounded-full font-bold ml-1">
                  {selectedCountries.length}
                </span>
              )}
            </button>

            {showCountryPicker && (
              <div className="mt-2 bg-slate-900/80 border border-slate-700/60 rounded-xl p-3">
                <input
                  type="text"
                  placeholder="Search country..."
                  value={countrySearch}
                  onChange={e => setCountrySearch(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-600/50 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 mb-3 focus:outline-none focus:border-amber-500/50"
                />
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 max-h-52 overflow-y-auto pr-1">
                  {filteredCountries.map(c => {
                    const flag = openDaysEvents.find(e => e.country === c)?.flag ?? "";
                    const active = selectedCountries.includes(c);
                    return (
                      <button
                        key={c}
                        onClick={() => toggleCountry(c)}
                        className={`flex items-center gap-2 text-xs px-2.5 py-2 rounded-lg text-left transition-colors ${
                          active
                            ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                            : "text-slate-300 hover:bg-slate-700/60 border border-transparent"
                        }`}
                      >
                        <span className="text-base leading-none">{flag}</span>
                        <span className="truncate">{c}</span>
                        {active && <span className="ml-auto text-amber-400 flex-shrink-0">✓</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Active filter summary + clear */}
          {hasFilters && (
            <div className="flex items-center justify-between pt-1 border-t border-slate-700/40">
              <p className="text-slate-400 text-xs">
                Showing <span className="text-white font-semibold">{totalEvents}</span> event{totalEvents !== 1 ? "s" : ""}
              </p>
              <button
                onClick={clearAll}
                className="text-xs text-slate-400 hover:text-amber-400 transition-colors underline underline-offset-2"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* ── EVENT LIST ───────────────────────────────────────── */}
        {grouped.length === 0 ? (
          <div className="text-center py-16 text-slate-500">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-lg font-medium text-slate-400">No events found</p>
            <p className="text-sm mt-1">Try adjusting your filters</p>
            <button onClick={clearAll} className="mt-4 text-amber-400 text-sm underline underline-offset-2">
              Clear filters
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {grouped.map(([month, events]) => (
              <div key={month}>
                {/* Month header */}
                <div className="flex items-center gap-3 mb-3">
                  <div className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                    month === "ONGOING"
                      ? "bg-slate-700/60 text-slate-400"
                      : "bg-amber-500/15 text-amber-400 border border-amber-500/20"
                  }`}>
                    {month === "ONGOING" ? "Ongoing — no fixed date" : month}
                  </div>
                  <div className="flex-1 h-px bg-slate-700/50" />
                  <span className="text-slate-600 text-xs">{events.length} event{events.length !== 1 ? "s" : ""}</span>
                </div>

                {/* Event cards */}
                <div className="space-y-2">
                  {events.map(event => {
                    const airlineStyle = AIRLINE_STYLES[event.airline];
                    const typeInfo = TYPE_LABELS[event.type];
                    const isOngoing = event.date === "2099-12-31";

                    return (
                      <div
                        key={event.id}
                        className="bg-slate-800/40 border border-slate-700/40 hover:border-slate-600/60 rounded-xl p-4 transition-all duration-150"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3">

                          {/* Date */}
                          <div className={`flex-shrink-0 text-xs font-semibold min-w-[100px] ${isOngoing ? "text-slate-500" : "text-white"}`}>
                            {event.dateLabel}
                          </div>

                          {/* Country + city */}
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <span className="text-xl leading-none flex-shrink-0">{event.flag}</span>
                            <div className="min-w-0">
                              <span className="text-white font-semibold text-sm">{event.country}</span>
                              {event.city && event.city !== "—" && (
                                <span className="text-slate-400 text-xs ml-1.5">· {event.city}</span>
                              )}
                              {event.venue && (
                                <p className="text-slate-500 text-xs mt-0.5 truncate">{event.venue}</p>
                              )}
                            </div>
                          </div>

                          {/* Airline badge */}
                          <div className="flex-shrink-0">
                            <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-lg border ${airlineStyle.bg} ${airlineStyle.text} ${airlineStyle.border}`}>
                              {event.airline}
                            </span>
                          </div>

                          {/* Type badge */}
                          <div className="flex-shrink-0">
                            <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${typeInfo.dot}`} />
                              {typeInfo.label}
                            </span>
                          </div>
                        </div>

                        {/* Notes */}
                        {event.notes && (
                          <p className="text-slate-500 text-xs mt-2 pl-0 sm:pl-[116px] leading-relaxed">
                            {event.notes}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── LEGEND ──────────────────────────────────────────── */}
        <div className="mt-10 border-t border-slate-700/40 pt-6">
          <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-3">Event types</p>
          <div className="flex flex-wrap gap-4">
            {Object.entries(TYPE_LABELS).map(([, { label, dot }]) => (
              <div key={label} className="flex items-center gap-2 text-xs text-slate-400">
                <span className={`w-2 h-2 rounded-full ${dot}`} />
                {label}
              </div>
            ))}
          </div>
          <p className="text-slate-600 text-xs mt-4 leading-relaxed">
            Sources: Emirates — emiratesgroupcareers.com · Qatar Airways — careers.qatarairways.com · Etihad — etihad.com/careers · flydubai — flydubai.com/careers · Air Arabia — airarabia.com/careers.
            Airlines publish schedules 4–8 weeks ahead and change them frequently. Dates shown were verified on the last-updated date above — always confirm directly with the airline before travelling.
          </p>
        </div>

      </div>
    </div>
  );
}
