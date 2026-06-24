// ============================================================
// OPEN DAYS DATA
// Last updated: 24 June 2026
// ------------------------------------------------------------
// IMPORTANT: Airlines publish open day schedules only 4–8 weeks
// ahead and change them frequently. Dated events below were
// verified against official sources on the "Last updated" date.
// Always confirm on the airline's official careers site before
// travelling. Remove dated events once their date has passed.
// ------------------------------------------------------------
// Sources:
//   Emirates       — emiratesgroupcareers.com/cabin-crew
//   Qatar Airways  — careers.qatarairways.com
//   Etihad         — etihad.com/careers (live dated CV-drop events
//                    listed on Etihad's own events portal)
// ============================================================
// EVENT TYPE:
//   "walkin"  = Walk-in, no registration needed, arrive early (typically 9AM)
//   "invite"  = Invite only — must apply online first
//   "agency"  = Via local recruitment agency
// ============================================================

export type EventType = "walkin" | "invite" | "agency";
export type Airline = "Emirates" | "Qatar Airways" | "Etihad" | "flydubai" | "Air Arabia";

export interface OpenDayEvent {
  id: string;
  date: string;        // ISO format "2026-07-06" for sorting
  dateLabel: string;   // Display label e.g. "6 Jul 2026"
  country: string;
  flag: string;
  city: string;
  airline: Airline;
  type: EventType;
  venue?: string;
  notes?: string;
}

export const openDaysEvents: OpenDayEvent[] = [

  // ── UPCOMING DATED EVENTS ─────────────────────────────────
  // Verified against official Emirates careers schedule on 24 Jun 2026.
  // Each is invite/walk-in as marked; always confirm before travelling.

  { id:"em-me-jun25", date:"2026-06-25", dateLabel:"25 Jun 2026", country:"Montenegro", flag:"🇲🇪", city:"Podgorica", airline:"Emirates", type:"walkin", venue:"Hilton Podgorica, Bul. Svetog Petra Cetinjskog 2" },

  { id:"em-fr-jul6-mrs", date:"2026-07-06", dateLabel:"6 Jul 2026", country:"France", flag:"🇫🇷", city:"Marseille", airline:"Emirates", type:"walkin", venue:"InterContinental Marseille - Hotel Dieu, 1 Pl. Daviel" },
  { id:"em-pt-jul9-coi", date:"2026-07-09", dateLabel:"9 Jul 2026", country:"Portugal", flag:"🇵🇹", city:"Coimbra", airline:"Emirates", type:"walkin", venue:"Hotel Coimbra Aeminium, Av. Armando Gonsalves, Lote 20" },
  { id:"em-pt-jul11-bra", date:"2026-07-11", dateLabel:"11 Jul 2026", country:"Portugal", flag:"🇵🇹", city:"Braga", airline:"Emirates", type:"walkin", venue:"Melia Braga, Av. Gen. Carrilho da Silva Pinto 8" },
  { id:"em-ca-jul19-yyz", date:"2026-07-19", dateLabel:"19 Jul 2026", country:"Canada", flag:"🇨🇦", city:"Toronto", airline:"Emirates", type:"walkin", venue:"Chelsea Hotel Toronto, 33 Gerrard St. West M5G 1Z4" },
  { id:"em-ee-jul22", date:"2026-07-22", dateLabel:"22 Jul 2026", country:"Estonia", flag:"🇪🇪", city:"Tallinn", airline:"Emirates", type:"walkin", venue:"Tallink Spa & Conference Hotel, Sadama tn 11a" },
  { id:"em-nl-jul25-rot", date:"2026-07-25", dateLabel:"25 Jul 2026", country:"Netherlands", flag:"🇳🇱", city:"Rotterdam", airline:"Emirates", type:"walkin", venue:"Hilton Rotterdam, Weena 10" },

  // NOTE: Emirates runs many more open days each month (often 60–80
  // worldwide, Europe-heavy). Only events verifiable on the last-updated
  // date are listed here. For the full current schedule, the definitive
  // source is emiratesgroupcareers.com/cabin-crew.

  // ── ONGOING / ROLLING / NO FIXED DATE ─────────────────────
  // Use date "2099-12-31" so these always sort to the bottom.
  // These reflect each airline's standing recruitment approach and
  // do not expire, but candidates should still apply online for
  // current invitations.

  // Emirates — apply online; invitations and events issued regularly
  { id:"em-ae-ongoing", date:"2099-12-31", dateLabel:"Weekly", country:"UAE", flag:"🇦🇪", city:"Dubai", airline:"Emirates", type:"invite", notes:"Events held regularly in Dubai — apply online to be invited" },
  { id:"em-in-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"India", flag:"🇮🇳", city:"Multiple cities", airline:"Emirates", type:"invite", notes:"Regular events — apply online; dates announced 4–8 weeks ahead" },
  { id:"em-ph-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"Philippines", flag:"🇵🇭", city:"Manila", airline:"Emirates", type:"invite", notes:"Regular events — apply online; dates announced 4–8 weeks ahead" },
  { id:"em-kr-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"South Korea", flag:"🇰🇷", city:"Seoul", airline:"Emirates", type:"invite", notes:"Regular events — apply online; dates announced 4–8 weeks ahead" },
  { id:"em-th-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"Thailand", flag:"🇹🇭", city:"Bangkok", airline:"Emirates", type:"invite", notes:"Regular events — apply online; dates announced 4–8 weeks ahead" },
  { id:"em-jp-ongoing", date:"2099-12-31", dateLabel:"Ongoing", country:"Japan", flag:"🇯🇵", city:"Osaka", airline:"Emirates", type:"agency", notes:"Often via local agency — verify current process at emiratesgroupcareers.com" },

  // Qatar Airways — primarily invite-only / CV-drop; events announced when scheduled
  { id:"qa-in-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"India", flag:"🇮🇳", city:"Multiple cities", airline:"Qatar Airways", type:"invite", notes:"Apply at careers.qatarairways.com — events announced when scheduled" },
  { id:"qa-ph-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"Philippines", flag:"🇵🇭", city:"Manila", airline:"Qatar Airways", type:"invite", notes:"Apply at careers.qatarairways.com" },
  { id:"qa-kr-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"South Korea", flag:"🇰🇷", city:"Seoul", airline:"Qatar Airways", type:"invite", notes:"Apply at careers.qatarairways.com" },
  { id:"qa-th-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"Thailand", flag:"🇹🇭", city:"Bangkok / Krabi", airline:"Qatar Airways", type:"invite", notes:"Apply at careers.qatarairways.com" },
  { id:"qa-ma-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"Morocco", flag:"🇲🇦", city:"Casablanca / Rabat", airline:"Qatar Airways", type:"invite", notes:"Apply at careers.qatarairways.com" },
  { id:"qa-eg-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"Egypt", flag:"🇪🇬", city:"Cairo", airline:"Qatar Airways", type:"invite", notes:"Apply at careers.qatarairways.com" },
  { id:"qa-ro-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"Romania", flag:"🇷🇴", city:"Multiple", airline:"Qatar Airways", type:"invite", notes:"Apply at careers.qatarairways.com" },
  { id:"qa-rs-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"Serbia", flag:"🇷🇸", city:"Belgrade", airline:"Qatar Airways", type:"invite", notes:"Apply at careers.qatarairways.com" },
  { id:"qa-gr-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"Greece", flag:"🇬🇷", city:"Athens", airline:"Qatar Airways", type:"invite", notes:"Apply at careers.qatarairways.com" },
  { id:"qa-za-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"South Africa", flag:"🇿🇦", city:"Durban / Johannesburg", airline:"Qatar Airways", type:"invite", notes:"Apply at careers.qatarairways.com" },
  { id:"qa-jp-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"Japan", flag:"🇯🇵", city:"Tokyo", airline:"Qatar Airways", type:"invite", notes:"Apply at careers.qatarairways.com" },
  { id:"qa-ae-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"UAE", flag:"🇦🇪", city:"Abu Dhabi", airline:"Qatar Airways", type:"invite", notes:"Arabic speakers event also available — apply at careers.qatarairways.com" },
  { id:"qa-lk-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"Sri Lanka", flag:"🇱🇰", city:"Colombo", airline:"Qatar Airways", type:"invite", notes:"Apply at careers.qatarairways.com" },
  { id:"qa-my-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"Malaysia", flag:"🇲🇾", city:"Kuala Lumpur", airline:"Qatar Airways", type:"invite", notes:"Apply at careers.qatarairways.com" },

  // Etihad — runs a small number of dated walk-in CV-drop open days plus
  // invite-only Assessment Days. Dated events appear on Etihad's own live
  // events portal and change frequently, so they are not duplicated here.
  // For current dated open days, send candidates to the portal:
  //   etihad.com/careers → Cabin Crew → Assessments (live events listed there)
  { id:"et-rs-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"Serbia", flag:"🇷🇸", city:"Belgrade", airline:"Etihad", type:"invite", notes:"Serbian speakers often preferred — current dated events at etihad.com/careers" },
  { id:"et-it-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"Italy", flag:"🇮🇹", city:"Rome / Milan", airline:"Etihad", type:"invite", notes:"Regular recruitment market — current dated events at etihad.com/careers" },
  { id:"et-es-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"Spain", flag:"🇪🇸", city:"Madrid / Barcelona", airline:"Etihad", type:"invite", notes:"Regular recruitment market — current dated events at etihad.com/careers" },
  { id:"et-de-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"Germany", flag:"🇩🇪", city:"Multiple", airline:"Etihad", type:"invite", notes:"Regular recruitment market — current dated events at etihad.com/careers" },
  { id:"et-ma-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"Morocco", flag:"🇲🇦", city:"—", airline:"Etihad", type:"invite", notes:"Regular recruitment market — current dated events at etihad.com/careers" },
  { id:"et-jp-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"Japan", flag:"🇯🇵", city:"Tokyo", airline:"Etihad", type:"invite", notes:"Regular recruitment market — current dated events at etihad.com/careers" },
  { id:"et-in-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"India", flag:"🇮🇳", city:"Multiple cities", airline:"Etihad", type:"invite", notes:"Regular recruitment market — current dated events at etihad.com/careers" },
  { id:"et-ph-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"Philippines", flag:"🇵🇭", city:"Manila", airline:"Etihad", type:"invite", notes:"Regular recruitment market — current dated events at etihad.com/careers" },
  { id:"et-my-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"Malaysia", flag:"🇲🇾", city:"Kuala Lumpur", airline:"Etihad", type:"invite", notes:"Regular recruitment market — current dated events at etihad.com/careers" },
  { id:"et-ie-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"Ireland", flag:"🇮🇪", city:"Dublin", airline:"Etihad", type:"invite", notes:"Regular recruitment market — current dated events at etihad.com/careers" },
  { id:"et-tr-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"Turkey", flag:"🇹🇷", city:"Istanbul", airline:"Etihad", type:"invite", notes:"Walk-in CV-drop open days held here periodically — check dates at etihad.com/careers" },
  { id:"et-au-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"Australia", flag:"🇦🇺", city:"Multiple cities", airline:"Etihad", type:"invite", notes:"Regular recruitment market — current dated events at etihad.com/careers" },
  { id:"et-ro-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"Romania", flag:"🇷🇴", city:"—", airline:"Etihad", type:"invite", notes:"Current dated events at etihad.com/careers" },
  { id:"et-cz-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"Czech Republic", flag:"🇨🇿", city:"Prague", airline:"Etihad", type:"invite", notes:"Walk-in CV-drop open days held here periodically — check dates at etihad.com/careers" },

  // ── flydubai & Air Arabia ─────────────────────────────────
  // Both recruit primarily through online application rather than
  // scheduled public walk-in open days. Listed here as ongoing so
  // candidates know the route to apply.
  { id:"fz-ae-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"UAE", flag:"🇦🇪", city:"Dubai", airline:"flydubai", type:"invite", notes:"Applications via flydubai careers portal — verify current openings at flydubai.com/careers" },
  { id:"g9-ae-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"UAE", flag:"🇦🇪", city:"Sharjah", airline:"Air Arabia", type:"invite", notes:"Applications via Air Arabia careers portal — verify current openings at airarabia.com/careers" },

];

// ── HELPERS ──────────────────────────────────────────────────

export const ALL_COUNTRIES = [...new Set(openDaysEvents.map(e => e.country))].sort();

export const ALL_AIRLINES: Airline[] = [
  "Emirates", "Qatar Airways", "Etihad", "flydubai", "Air Arabia"
];

export const LAST_UPDATED = "24 June 2026";
