// ============================================================
// OPEN DAYS DATA
// Last updated: 27 June 2026
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
//   Etihad         — etihad.com/careers
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
  date: string;
  dateLabel: string;
  country: string;
  flag: string;
  city: string;
  airline: Airline;
  type: EventType;
  venue?: string;
  notes?: string;
}

export const openDaysEvents: OpenDayEvent[] = [

  // ── EMIRATES DATED OPEN DAYS ──────────────────────────────
  // All verified against emiratesgroupcareers.com/cabin-crew on 27 Jun 2026.
  // Walk-in: arrive at 9AM. No registration required.
  // Always confirm on Emirates' site before travelling — events can change.

  // June 27 (Today)
  { id:"em-al-jun27", date:"2026-06-27", dateLabel:"27 Jun 2026", country:"Albania", flag:"🇦🇱", city:"Tirana", airline:"Emirates", type:"walkin", venue:"Hilton Garden Inn Tirana, Bulevardi Gjergj Fishta Nr. 146" },
  { id:"em-au-jun27-gc", date:"2026-06-27", dateLabel:"27 Jun 2026", country:"Australia", flag:"🇦🇺", city:"Gold Coast", airline:"Emirates", type:"walkin", venue:"Novotel Surfers Paradise, 3105 Surfers Paradise Blvd" },
  { id:"em-it-jun27-rom", date:"2026-06-27", dateLabel:"27 Jun 2026", country:"Italy", flag:"🇮🇹", city:"Rome", airline:"Emirates", type:"walkin", venue:"InterContinental Rome Ambasciatori Palace, Via Vittorio Veneto 62" },
  { id:"em-mt-jun27", date:"2026-06-27", dateLabel:"27 Jun 2026", country:"Malta", flag:"🇲🇹", city:"St Julian's", airline:"Emirates", type:"walkin", venue:"Radisson Blu Resort, St. George's Bay, St. Julian's STJ 3391" },

  // June 28
  { id:"em-ie-jun28-cork", date:"2026-06-28", dateLabel:"28 Jun 2026", country:"Ireland", flag:"🇮🇪", city:"Cork", airline:"Emirates", type:"walkin", venue:"The Metropole Hotel, MacCurtain Street T23 EEC3" },
  { id:"em-pt-jun28-lis", date:"2026-06-28", dateLabel:"28 Jun 2026", country:"Portugal", flag:"🇵🇹", city:"Lisbon", airline:"Emirates", type:"walkin", venue:"Lisbon Marriott Hotel, Av. dos Combatentes 45" },
  { id:"em-gb-jun28-lhr", date:"2026-06-28", dateLabel:"28 Jun 2026", country:"United Kingdom", flag:"🇬🇧", city:"London Heathrow", airline:"Emirates", type:"walkin", venue:"Delta Hotels Heathrow Windsor, Ditton Rd, Langley SL3 8PT" },

  // June 29
  { id:"em-it-jun29-pal", date:"2026-06-29", dateLabel:"29 Jun 2026", country:"Italy", flag:"🇮🇹", city:"Palermo", airline:"Emirates", type:"walkin", venue:"Mercure Palermo Centro, Via Mariano Stabile 112, 90139" },

  // June 30
  { id:"em-ie-jun30-dub", date:"2026-06-30", dateLabel:"30 Jun 2026", country:"Ireland", flag:"🇮🇪", city:"Dublin", airline:"Emirates", type:"walkin", venue:"Hilton Dublin, Charlemont Pl, D02 A893" },
  { id:"em-pt-jun30-opo", date:"2026-06-30", dateLabel:"30 Jun 2026", country:"Portugal", flag:"🇵🇹", city:"Porto", airline:"Emirates", type:"walkin", venue:"Porto Palácio Hotel & Spa, Av. da Boavista 1269, 4100-130" },
  { id:"em-gb-jun30-lba", date:"2026-06-30", dateLabel:"30 Jun 2026", country:"United Kingdom", flag:"🇬🇧", city:"Leeds", airline:"Emirates", type:"walkin", venue:"Park Plaza Leeds, Boar Ln, Leeds LS1 5NS" },

  // July 2
  { id:"em-at-jul2-vie", date:"2026-07-02", dateLabel:"2 Jul 2026", country:"Austria", flag:"🇦🇹", city:"Vienna", airline:"Emirates", type:"walkin", venue:"Renaissance Vienna Schönbrunn Hotel, Linke Wienzeile / Ullmannstrasse 71, 1150" },

  // July 3
  { id:"em-gb-jul3-lon", date:"2026-07-03", dateLabel:"3 Jul 2026", country:"United Kingdom", flag:"🇬🇧", city:"London", airline:"Emirates", type:"walkin", venue:"London Marriott Kensington, 147C Cromwell Rd SW5 0TH" },

  // July 4
  { id:"em-sk-jul4-bts", date:"2026-07-04", dateLabel:"4 Jul 2026", country:"Slovakia", flag:"🇸🇰", city:"Bratislava", airline:"Emirates", type:"walkin", venue:"Crowne Plaza Bratislava, Hodžovo námestie 2, 816 25" },
  { id:"em-es-jul4-bcn", date:"2026-07-04", dateLabel:"4 Jul 2026", country:"Spain", flag:"🇪🇸", city:"Barcelona", airline:"Emirates", type:"walkin", venue:"Four Points by Sheraton Barcelona Diagonal, Avda. Diagonal 161-163" },

  // July 5
  { id:"em-hk-jul5", date:"2026-07-05", dateLabel:"5 Jul 2026", country:"Hong Kong", flag:"🇭🇰", city:"Hong Kong", airline:"Emirates", type:"walkin", venue:"InterContinental Grand Stanford Hong Kong, 70 Mody Road, Tsimshatsui East" },
  { id:"em-gb-jul5-gla", date:"2026-07-05", dateLabel:"5 Jul 2026", country:"United Kingdom", flag:"🇬🇧", city:"Glasgow", airline:"Emirates", type:"walkin", venue:"Maldron Hotels, 50 Renfrew St, Glasgow G2 3BW" },

  // July 6
  { id:"em-fr-jul6-mrs", date:"2026-07-06", dateLabel:"6 Jul 2026", country:"France", flag:"🇫🇷", city:"Marseille", airline:"Emirates", type:"walkin", venue:"InterContinental Marseille - Hotel Dieu, 1 Pl. Daviel" },
  { id:"em-ro-jul6-buh", date:"2026-07-06", dateLabel:"6 Jul 2026", country:"Romania", flag:"🇷🇴", city:"Bucharest", airline:"Emirates", type:"walkin", venue:"Hilton Garden Inn Bucharest Old Town, 12 Doamnei Street" },
  { id:"em-es-jul6-alc", date:"2026-07-06", dateLabel:"6 Jul 2026", country:"Spain", flag:"🇪🇸", city:"Alicante", airline:"Emirates", type:"walkin", venue:"NH Alicante, Calle Mexico 18, 03008" },

  // July 7
  { id:"em-dk-jul7-cph", date:"2026-07-07", dateLabel:"7 Jul 2026", country:"Denmark", flag:"🇩🇰", city:"Copenhagen", airline:"Emirates", type:"walkin", venue:"Radisson Blu Scandinavia Hotel Copenhagen, Amager Boul. 70, 2300" },
  { id:"em-gb-jul7-dnd", date:"2026-07-07", dateLabel:"7 Jul 2026", country:"United Kingdom", flag:"🇬🇧", city:"Dundee", airline:"Emirates", type:"walkin", venue:"Apex City Quay Hotel & Spa, 1 West Victoria Dock Road DD1 3JP" },

  // July 8
  { id:"em-nz-jul8-akl", date:"2026-07-08", dateLabel:"8 Jul 2026", country:"New Zealand", flag:"🇳🇿", city:"Auckland", airline:"Emirates", type:"walkin", venue:"Four Points by Sheraton Auckland, 396 Queen Street" },

  // July 9
  { id:"em-fi-jul9-hel", date:"2026-07-09", dateLabel:"9 Jul 2026", country:"Finland", flag:"🇫🇮", city:"Helsinki", airline:"Emirates", type:"walkin", venue:"Hotel U14, Autograph Collection, Unioninkatu 14, 00130" },
  { id:"em-pt-jul9-coi", date:"2026-07-09", dateLabel:"9 Jul 2026", country:"Portugal", flag:"🇵🇹", city:"Coimbra", airline:"Emirates", type:"walkin", venue:"Hotel Coimbra Aeminium, Av. Armando Gonsalves, Lote 20" },

  // July 10
  { id:"em-au-jul10-mel", date:"2026-07-10", dateLabel:"10 Jul 2026", country:"Australia", flag:"🇦🇺", city:"Melbourne", airline:"Emirates", type:"walkin", venue:"Dorsett Melbourne, 615 Little Lonsdale Street VIC 3000" },

  // July 11
  { id:"em-pt-jul11-bra", date:"2026-07-11", dateLabel:"11 Jul 2026", country:"Portugal", flag:"🇵🇹", city:"Braga", airline:"Emirates", type:"walkin", venue:"Melia Braga, Av. Gen. Carrilho da Silva Pinto 8" },

  // July 13
  { id:"em-es-jul13-agp", date:"2026-07-13", dateLabel:"13 Jul 2026", country:"Spain", flag:"🇪🇸", city:"Malaga", airline:"Emirates", type:"walkin", venue:"Hilton Garden Inn Malaga, Av. de Velázquez 126, 29004" },

  // July 14
  { id:"em-bg-jul14-sof", date:"2026-07-14", dateLabel:"14 Jul 2026", country:"Bulgaria", flag:"🇧🇬", city:"Sofia", airline:"Emirates", type:"walkin", venue:"Grand Hotel Sofia, 1 Gurko Str., 1000" },
  { id:"em-cz-jul14-prg", date:"2026-07-14", dateLabel:"14 Jul 2026", country:"Czech Republic", flag:"🇨🇿", city:"Prague", airline:"Emirates", type:"walkin", venue:"NH Prague City, Mozartova 261/1, 150 00 Praha 5" },

  // July 15
  { id:"em-hu-jul15-bud", date:"2026-07-15", dateLabel:"15 Jul 2026", country:"Hungary", flag:"🇭🇺", city:"Budapest", airline:"Emirates", type:"walkin", venue:"Mövenpick Hotel Budapest Centre, Rákóczi Street 43-45, 1088" },
  { id:"em-gb-jul15-cdf", date:"2026-07-15", dateLabel:"15 Jul 2026", country:"United Kingdom", flag:"🇬🇧", city:"Cardiff", airline:"Emirates", type:"walkin", venue:"voco St David's Cardiff, Havannah Street CF10 5SD" },

  // July 16
  { id:"em-au-jul16-cnz", date:"2026-07-16", dateLabel:"16 Jul 2026", country:"Australia", flag:"🇦🇺", city:"Cairns", airline:"Emirates", type:"walkin", venue:"Pullman Cairns International, 17 Abbott St, Cairns City QLD 4870" },
  { id:"em-cz-jul16-brq", date:"2026-07-16", dateLabel:"16 Jul 2026", country:"Czech Republic", flag:"🇨🇿", city:"Brno", airline:"Emirates", type:"walkin", venue:"Hotel Passage, Lidická 23, 602 00" },
  { id:"em-fr-jul16-cdg", date:"2026-07-16", dateLabel:"16 Jul 2026", country:"France", flag:"🇫🇷", city:"Paris (Roissy)", airline:"Emirates", type:"walkin", venue:"Melia Hotel International, 9 rue du Voyageur, 95700 Roissy en France" },

  // July 17
  { id:"em-ba-jul17-sjj", date:"2026-07-17", dateLabel:"17 Jul 2026", country:"Bosnia & Herzegovina", flag:"🇧🇦", city:"Sarajevo", airline:"Emirates", type:"walkin", venue:"Mövenpick Hotel Sarajevo, Fra Filipa Lastrica 2, 71000" },
  { id:"em-gb-jul17-lpl", date:"2026-07-17", dateLabel:"17 Jul 2026", country:"United Kingdom", flag:"🇬🇧", city:"Liverpool", airline:"Emirates", type:"walkin", venue:"Hilton Liverpool, 3 Thomas Steers Way L1 8LW" },

  // July 18
  { id:"em-fr-jul18-bod", date:"2026-07-18", dateLabel:"18 Jul 2026", country:"France", flag:"🇫🇷", city:"Bordeaux", airline:"Emirates", type:"walkin", venue:"Hilton Garden Inn Bordeaux, 17 Allée de Rio, 33800" },
  { id:"em-it-jul18-mxp", date:"2026-07-18", dateLabel:"18 Jul 2026", country:"Italy", flag:"🇮🇹", city:"Milan (Malpensa)", airline:"Emirates", type:"walkin", venue:"Sheraton Milan Malpensa Airport Hotel, Malpensa Terminal 1, S.S. 336, 21010 Ferno" },

  // July 19
  { id:"em-ca-jul19-yyz", date:"2026-07-19", dateLabel:"19 Jul 2026", country:"Canada", flag:"🇨🇦", city:"Toronto", airline:"Emirates", type:"walkin", venue:"Chelsea Hotel Toronto, 33 Gerrard St. West M5G 1Z4" },
  { id:"em-hr-jul19-zag", date:"2026-07-19", dateLabel:"19 Jul 2026", country:"Croatia", flag:"🇭🇷", city:"Zagreb", airline:"Emirates", type:"walkin", venue:"DoubleTree by Hilton Zagreb, Ul. grada Vukovara 269A, 10000" },
  { id:"em-de-jul19-dus", date:"2026-07-19", dateLabel:"19 Jul 2026", country:"Germany", flag:"🇩🇪", city:"Düsseldorf", airline:"Emirates", type:"walkin", venue:"NH Düsseldorf City, Kölner Str. 186-188, 40227" },

  // July 20
  { id:"em-fr-jul20-lys", date:"2026-07-20", dateLabel:"20 Jul 2026", country:"France", flag:"🇫🇷", city:"Lyon", airline:"Emirates", type:"walkin", venue:"Sofitel Lyon Bellecour, 20 Quai Gailleton, 69288 Lyon Cedex 02" },

  // July 21
  { id:"em-md-jul21-kiv", date:"2026-07-21", dateLabel:"21 Jul 2026", country:"Moldova", flag:"🇲🇩", city:"Chisinau", airline:"Emirates", type:"walkin", venue:"BERD'S MGallery Hotel Collection, 12th Dimitrie Cantemir Blvd, MD-2001" },

  // July 22
  { id:"em-ee-jul22-tll", date:"2026-07-22", dateLabel:"22 Jul 2026", country:"Estonia", flag:"🇪🇪", city:"Tallinn", airline:"Emirates", type:"walkin", venue:"Tallink Spa & Conference Hotel, Sadama tn 11a, 10111" },
  { id:"em-ch-jul22-zrh", date:"2026-07-22", dateLabel:"22 Jul 2026", country:"Switzerland", flag:"🇨🇭", city:"Zurich", airline:"Emirates", type:"walkin", venue:"Crowne Plaza Zurich, Badenerstrasse 420, 8040" },
  { id:"em-gb-jul22-ncl", date:"2026-07-22", dateLabel:"22 Jul 2026", country:"United Kingdom", flag:"🇬🇧", city:"Newcastle", airline:"Emirates", type:"walkin", venue:"Maldron Hotel Newcastle, 17 Newgate Street NE1 5RE" },

  // July 23
  { id:"em-pl-jul23-krk", date:"2026-07-23", dateLabel:"23 Jul 2026", country:"Poland", flag:"🇵🇱", city:"Krakow", airline:"Emirates", type:"walkin", venue:"Holiday Inn Krakow City Centre, ul. Wielopole 4, 31-072" },
  { id:"em-ro-jul23-ias", date:"2026-07-23", dateLabel:"23 Jul 2026", country:"Romania", flag:"🇷🇴", city:"Iasi", airline:"Emirates", type:"walkin", venue:"Hotel International Iasi, 5A Palat Street, 700032" },
  { id:"em-nl-jul23-ams", date:"2026-07-23", dateLabel:"23 Jul 2026", country:"Netherlands", flag:"🇳🇱", city:"Amsterdam", airline:"Emirates", type:"walkin", venue:"Park Centraal Amsterdam, Stadhouderskade 25, 1071 ZD" },

  // July 24
  { id:"em-lt-jul24-vil", date:"2026-07-24", dateLabel:"24 Jul 2026", country:"Lithuania", flag:"🇱🇹", city:"Vilnius", airline:"Emirates", type:"walkin", venue:"Hilton Garden Inn Vilnius City Center, Gedimino av. 44B-1, LT-01110" },
  { id:"em-se-jul24-sto", date:"2026-07-24", dateLabel:"24 Jul 2026", country:"Sweden", flag:"🇸🇪", city:"Stockholm", airline:"Emirates", type:"walkin", venue:"Hilton Stockholm Slussen, Guldgränd 8, SE-104 65" },
  { id:"em-gb-jul24-lgw", date:"2026-07-24", dateLabel:"24 Jul 2026", country:"United Kingdom", flag:"🇬🇧", city:"London Gatwick", airline:"Emirates", type:"walkin", venue:"Sofitel Gatwick North Terminal, London Gatwick Airport RH6 0PH" },

  // July 25
  { id:"em-au-jul25-syd", date:"2026-07-25", dateLabel:"25 Jul 2026", country:"Australia", flag:"🇦🇺", city:"Sydney", airline:"Emirates", type:"walkin", venue:"Four Points by Sheraton Sydney Central Park, 88 Broadway, Chippendale NSW 2008" },
  { id:"em-pl-jul25-waw", date:"2026-07-25", dateLabel:"25 Jul 2026", country:"Poland", flag:"🇵🇱", city:"Warsaw", airline:"Emirates", type:"walkin", venue:"Holiday Inn Warsaw City Center, Twarda 52, 00-831" },
  { id:"em-nl-jul25-rot", date:"2026-07-25", dateLabel:"25 Jul 2026", country:"Netherlands", flag:"🇳🇱", city:"Rotterdam", airline:"Emirates", type:"walkin", venue:"Hilton Rotterdam, Weena 10, 3012 CM" },

  // July 26
  { id:"em-se-jul26-got", date:"2026-07-26", dateLabel:"26 Jul 2026", country:"Sweden", flag:"🇸🇪", city:"Gothenburg", airline:"Emirates", type:"walkin", venue:"Radisson Blu Scandinavia Hotel Gothenburg, Södra Hamngatan 59, 411 06" },

  // NOTE: Emirates runs many more open days beyond these dates.
  // Events beyond July 26 had not yet been published when this file was
  // last updated. Check emiratesgroupcareers.com/cabin-crew for new additions.

  // ── ONGOING / ROLLING / NO FIXED DATE ─────────────────────
  // Use date "2099-12-31" so these always sort to the bottom.

  // Emirates — apply online; invitations and events issued regularly
  { id:"em-ae-ongoing", date:"2099-12-31", dateLabel:"Weekly", country:"UAE", flag:"🇦🇪", city:"Dubai", airline:"Emirates", type:"invite", notes:"Events held regularly in Dubai — apply online to be invited" },
  { id:"em-in-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"India", flag:"🇮🇳", city:"Multiple cities", airline:"Emirates", type:"invite", notes:"Regular events — apply online; dates announced 4–8 weeks ahead" },
  { id:"em-ph-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"Philippines", flag:"🇵🇭", city:"Manila", airline:"Emirates", type:"invite", notes:"Regular events — apply online; dates announced 4–8 weeks ahead" },
  { id:"em-kr-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"South Korea", flag:"🇰🇷", city:"Seoul", airline:"Emirates", type:"invite", notes:"Regular events — apply online; dates announced 4–8 weeks ahead" },
  { id:"em-th-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"Thailand", flag:"🇹🇭", city:"Bangkok", airline:"Emirates", type:"invite", notes:"Regular events — apply online; dates announced 4–8 weeks ahead" },
  { id:"em-jp-ongoing", date:"2099-12-31", dateLabel:"Ongoing", country:"Japan", flag:"🇯🇵", city:"Osaka", airline:"Emirates", type:"agency", notes:"Often via local agency — verify current process at emiratesgroupcareers.com" },

  // Qatar Airways
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

  // Etihad
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

  // flydubai & Air Arabia
  { id:"fz-ae-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"UAE", flag:"🇦🇪", city:"Dubai", airline:"flydubai", type:"invite", notes:"Applications via flydubai careers portal — verify current openings at flydubai.com/careers" },
  { id:"g9-ae-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"UAE", flag:"🇦🇪", city:"Sharjah", airline:"Air Arabia", type:"invite", notes:"Applications via Air Arabia careers portal — verify current openings at airarabia.com/careers" },

];

// ── HELPERS ──────────────────────────────────────────────────
export const ALL_COUNTRIES = [...new Set(openDaysEvents.map(e => e.country))].sort();
export const ALL_AIRLINES: Airline[] = ["Emirates", "Qatar Airways", "Etihad", "flydubai", "Air Arabia"];
export const LAST_UPDATED = "27 June 2026";
