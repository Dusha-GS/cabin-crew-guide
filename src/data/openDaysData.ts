// ============================================================
// OPEN DAYS DATA — update this file weekly
// Last updated: 7 June 2026
// Source: emiratesgroupcareers.com (live), careers.qatarairways.com,
//         etihad.com/careers, flightattendantcentral.com
// ============================================================
// EVENT TYPE:
//   "walkin"  = Walk-in, no registration needed, arrive 9AM
//   "invite"  = Invite only — must apply online first
//   "agency"  = Via local recruitment agency
// ============================================================

export type EventType = "walkin" | "invite" | "agency";
export type Airline = "Emirates" | "Qatar Airways" | "Etihad" | "flydubai" | "Air Arabia";

export interface OpenDayEvent {
  id: string;
  date: string;        // ISO format "2026-06-08" for sorting
  dateLabel: string;   // Display label e.g. "8 Jun 2026"
  country: string;
  flag: string;
  city: string;
  airline: Airline;
  type: EventType;
  venue?: string;
  notes?: string;
}

export const openDaysEvents: OpenDayEvent[] = [

  // ── JUNE 2026 ────────────────────────────────────────────

  { id:"em-cn-jun7", date:"2026-06-07", dateLabel:"7 Jun 2026", country:"China", flag:"🇨🇳", city:"Macao", airline:"Emirates", type:"walkin", venue:"The Ritz-Carlton Macau Galaxy Macau™, Estrada da Baía da Nossa Senhora da Esperanca s/n, COTAI" },
  { id:"em-es-jun7-bcn", date:"2026-06-07", dateLabel:"7 Jun 2026", country:"Spain", flag:"🇪🇸", city:"Barcelona", airline:"Emirates", type:"walkin", venue:"Four Points by Sheraton Barcelona Diagonal, Avda. Diagonal, 161-163" },
  { id:"em-fr-jun8", date:"2026-06-08", dateLabel:"8 Jun 2026", country:"France", flag:"🇫🇷", city:"Nice", airline:"Emirates", type:"walkin", venue:"Novotel Nice Centre, 8-10 parvis de l'europe, 06300 Nice" },
  { id:"em-ro-jun8", date:"2026-06-08", dateLabel:"8 Jun 2026", country:"Romania", flag:"🇷🇴", city:"Cluj-Napoca", airline:"Emirates", type:"walkin", venue:"Vibre Hotel, Strada Constantin Brâncuși 48-54" },
  { id:"em-sk-jun8", date:"2026-06-08", dateLabel:"8 Jun 2026", country:"Slovakia", flag:"🇸🇰", city:"Bratislava", airline:"Emirates", type:"walkin", venue:"Crowne Plaza Bratislava, Hodžovo námestie 2" },
  { id:"em-lk-jun8", date:"2026-06-08", dateLabel:"8 Jun 2026", country:"Sri Lanka", flag:"🇱🇰", city:"Colombo", airline:"Emirates", type:"invite", notes:"Apply online at emiratesgroupcareers.com" },
  { id:"em-es-jun9-val", date:"2026-06-09", dateLabel:"9 Jun 2026", country:"Spain", flag:"🇪🇸", city:"Valencia", airline:"Emirates", type:"walkin", venue:"Hotel Medium Valencia, Av. d'Amado Granell Mesado, 48" },
  { id:"em-gb-jun9-brs", date:"2026-06-09", dateLabel:"9 Jun 2026", country:"United Kingdom", flag:"🇬🇧", city:"Bristol", airline:"Emirates", type:"walkin", venue:"Holiday Inn Bristol City Centre, Bond Street BS1 3LE" },
  { id:"em-ma-jun9", date:"2026-06-09", dateLabel:"9 Jun 2026", country:"Morocco", flag:"🇲🇦", city:"Marrakesh", airline:"Emirates", type:"invite", notes:"Apply online at emiratesgroupcareers.com" },
  { id:"em-nz-jun10", date:"2026-06-10", dateLabel:"10 Jun 2026", country:"New Zealand", flag:"🇳🇿", city:"Auckland", airline:"Emirates", type:"walkin", venue:"Grand Millennium Hotel Auckland, 71 Mayoral Drive" },
  { id:"em-es-jun10-mad", date:"2026-06-10", dateLabel:"10 Jun 2026", country:"Spain", flag:"🇪🇸", city:"Madrid", airline:"Emirates", type:"walkin", venue:"Novotel Madrid Center, O´Donnell 53" },
  { id:"em-gb-jun10-ncl", date:"2026-06-10", dateLabel:"10 Jun 2026", country:"United Kingdom", flag:"🇬🇧", city:"Newcastle", airline:"Emirates", type:"walkin", venue:"Maldron Hotel Newcastle, 17 Newgate Street NE1 5RE" },
  { id:"em-za-jun10", date:"2026-06-10", dateLabel:"10 Jun 2026", country:"South Africa", flag:"🇿🇦", city:"Pretoria", airline:"Emirates", type:"invite", notes:"Apply online at emiratesgroupcareers.com" },
  { id:"em-es-jun11-ali", date:"2026-06-11", dateLabel:"11 Jun 2026", country:"Spain", flag:"🇪🇸", city:"Alicante", airline:"Emirates", type:"walkin", venue:"NH Alicante, Calle Mexico, 18" },
  { id:"em-my-jun11", date:"2026-06-11", dateLabel:"11 Jun 2026", country:"Malaysia", flag:"🇲🇾", city:"Kuala Lumpur", airline:"Emirates", type:"invite", notes:"Apply online at emiratesgroupcareers.com" },
  { id:"em-ma-jun11-rabat", date:"2026-06-11", dateLabel:"11 Jun 2026", country:"Morocco", flag:"🇲🇦", city:"Rabat", airline:"Emirates", type:"invite", notes:"Apply online at emiratesgroupcareers.com" },
  { id:"em-tn-jun11", date:"2026-06-11", dateLabel:"11 Jun 2026", country:"Tunisia", flag:"🇹🇳", city:"Sousse", airline:"Emirates", type:"invite", notes:"Apply online at emiratesgroupcareers.com" },
  { id:"em-au-jun12-mel", date:"2026-06-12", dateLabel:"12 Jun 2026", country:"Australia", flag:"🇦🇺", city:"Melbourne", airline:"Emirates", type:"walkin", venue:"Dorsett Melbourne, 615 Little Lonsdale Street VIC 3000" },
  { id:"em-es-jun12-agp", date:"2026-06-12", dateLabel:"12 Jun 2026", country:"Spain", flag:"🇪🇸", city:"Malaga", airline:"Emirates", type:"walkin", venue:"Hilton Garden Inn Malaga, Av. de Velázquez, 126" },
  { id:"em-gb-jun12-lon", date:"2026-06-12", dateLabel:"12 Jun 2026", country:"United Kingdom", flag:"🇬🇧", city:"London", airline:"Emirates", type:"walkin", venue:"Marlin Waterloo Hotel, 111 Westminster Bridge Road SE1 7HR" },
  { id:"em-za-jun12", date:"2026-06-12", dateLabel:"12 Jun 2026", country:"South Africa", flag:"🇿🇦", city:"Johannesburg", airline:"Emirates", type:"invite", notes:"Apply online at emiratesgroupcareers.com" },
  { id:"em-ma-jun13", date:"2026-06-13", dateLabel:"13 Jun 2026", country:"Morocco", flag:"🇲🇦", city:"Casablanca", airline:"Emirates", type:"invite", notes:"Apply online at emiratesgroupcareers.com" },
  { id:"em-sg-jun13", date:"2026-06-13", dateLabel:"13 Jun 2026", country:"Singapore", flag:"🇸🇬", city:"Singapore City", airline:"Emirates", type:"invite", notes:"Apply online at emiratesgroupcareers.com" },
  { id:"em-za-jun14-cpt", date:"2026-06-14", dateLabel:"14 Jun 2026", country:"South Africa", flag:"🇿🇦", city:"Cape Town", airline:"Emirates", type:"invite", notes:"Apply online at emiratesgroupcareers.com" },
  { id:"em-ua-jun14", date:"2026-06-14", dateLabel:"14 Jun 2026", country:"Ukraine", flag:"🇺🇦", city:"Nationwide", airline:"Emirates", type:"agency", notes:"Via Aloha Partners LLC — aloha.com.ua" },
  { id:"em-cz-jun14", date:"2026-06-14", dateLabel:"14 Jun 2026", country:"Czech Republic", flag:"🇨🇿", city:"Prague", airline:"Emirates", type:"walkin", venue:"Radisson Blu Hotel Prague, Žitná 561/8, 120 00" },
  { id:"em-gb-jun14-not", date:"2026-06-14", dateLabel:"14 Jun 2026", country:"United Kingdom", flag:"🇬🇧", city:"Nottingham", airline:"Emirates", type:"walkin", venue:"Crowne Plaza Nottingham, Wollaton Street NG1 5RH" },
  { id:"em-us-jun15-dal", date:"2026-06-15", dateLabel:"15 Jun 2026", country:"USA", flag:"🇺🇸", city:"Dallas", airline:"Emirates", type:"invite", notes:"Apply online at emiratesgroupcareers.com" },
  { id:"em-be-jun15", date:"2026-06-15", dateLabel:"15 Jun 2026", country:"Belgium", flag:"🇧🇪", city:"Brussels", airline:"Emirates", type:"walkin", venue:"NH Collection Brussels Centre, Blvd Adolphe Max 7" },
  { id:"em-hu-jun15", date:"2026-06-15", dateLabel:"15 Jun 2026", country:"Hungary", flag:"🇭🇺", city:"Budapest", airline:"Emirates", type:"walkin", venue:"Mövenpick Hotel Budapest Centre, Rákóczi Street 43-45" },
  { id:"em-gb-jun15-bfs", date:"2026-06-15", dateLabel:"15 Jun 2026", country:"United Kingdom", flag:"🇬🇧", city:"Belfast", airline:"Emirates", type:"walkin", venue:"Clayton Hotel Belfast, 22-26 Ormeau Ave BT2 8HS" },
  { id:"em-fr-jun16-par", date:"2026-06-16", dateLabel:"16 Jun 2026", country:"France", flag:"🇫🇷", city:"Paris", airline:"Emirates", type:"walkin", venue:"Melia Hotel International, 9 rue du Voyageur, Roissy en France" },
  { id:"em-pl-jun16", date:"2026-06-16", dateLabel:"16 Jun 2026", country:"Poland", flag:"🇵🇱", city:"Krakow", airline:"Emirates", type:"walkin", venue:"Holiday Inn Krakow City Centre, ul. Wielopole 4" },
  { id:"em-gb-jun16-bgh", date:"2026-06-16", dateLabel:"16 Jun 2026", country:"United Kingdom", flag:"🇬🇧", city:"Brighton", airline:"Emirates", type:"walkin", venue:"Leonardo Royal Brighton Waterfront, Kings Road" },
  { id:"em-za-jun16", date:"2026-06-16", dateLabel:"16 Jun 2026", country:"South Africa", flag:"🇿🇦", city:"Stellenbosch", airline:"Emirates", type:"invite", notes:"Apply online at emiratesgroupcareers.com" },
  { id:"em-be-jun17-ant", date:"2026-06-17", dateLabel:"17 Jun 2026", country:"Belgium", flag:"🇧🇪", city:"Antwerp", airline:"Emirates", type:"walkin", venue:"NH Collection Antwerp Centre, Pelikaanstraat 84" },
  { id:"em-ba-jun17", date:"2026-06-17", dateLabel:"17 Jun 2026", country:"Bosnia", flag:"🇧🇦", city:"Sarajevo", airline:"Emirates", type:"walkin", venue:"Mövenpick Hotel Sarajevo, Fra Filipa Lastrica 2" },
  { id:"em-de-jun17-muc", date:"2026-06-17", dateLabel:"17 Jun 2026", country:"Germany", flag:"🇩🇪", city:"Munich", airline:"Emirates", type:"walkin", venue:"Hotel Bayerischer Hof, Promenadepl. 2-6, 80333 München" },
  { id:"em-gb-jun17-liv", date:"2026-06-17", dateLabel:"17 Jun 2026", country:"United Kingdom", flag:"🇬🇧", city:"Liverpool", airline:"Emirates", type:"walkin", venue:"Hilton Liverpool, 3 Thomas Steers Way L1 8LW" },
  { id:"em-tr-jun17-ank", date:"2026-06-17", dateLabel:"17 Jun 2026", country:"Turkey", flag:"🇹🇷", city:"Ankara", airline:"Emirates", type:"invite", notes:"Apply online at emiratesgroupcareers.com" },
  { id:"em-am-jun18", date:"2026-06-18", dateLabel:"18 Jun 2026", country:"Armenia", flag:"🇦🇲", city:"Yerevan", airline:"Emirates", type:"walkin", venue:"DoubleTree by Hilton Yerevan City Centre, 4/2 Grigor Lusavorich" },
  { id:"em-fr-jun18-lys", date:"2026-06-18", dateLabel:"18 Jun 2026", country:"France", flag:"🇫🇷", city:"Lyon", airline:"Emirates", type:"walkin", venue:"Sofitel Lyon Bellecour, 20 Quai Gailleton" },
  { id:"em-it-jun18-mil", date:"2026-06-18", dateLabel:"18 Jun 2026", country:"Italy", flag:"🇮🇹", city:"Milan", airline:"Emirates", type:"walkin", venue:"Sheraton Milan Malpensa Airport Hotel, Malpensa Terminal 1" },
  { id:"em-de-jun19-dus", date:"2026-06-19", dateLabel:"19 Jun 2026", country:"Germany", flag:"🇩🇪", city:"Düsseldorf", airline:"Emirates", type:"walkin", venue:"NH Düsseldorf City, Kölner Str. 186-188" },
  { id:"em-nl-jun19-ams", date:"2026-06-19", dateLabel:"19 Jun 2026", country:"Netherlands", flag:"🇳🇱", city:"Amsterdam", airline:"Emirates", type:"walkin", venue:"Park Centraal Amsterdam, Stadhouderskade 25" },
  { id:"em-tr-jun19-ist", date:"2026-06-19", dateLabel:"19 Jun 2026", country:"Turkey", flag:"🇹🇷", city:"Istanbul", airline:"Emirates", type:"invite", notes:"Apply online at emiratesgroupcareers.com" },
  { id:"em-hr-jun20", date:"2026-06-20", dateLabel:"20 Jun 2026", country:"Croatia", flag:"🇭🇷", city:"Zagreb", airline:"Emirates", type:"walkin", venue:"DoubleTree by Hilton Zagreb, Ul. grada Vukovara 269A" },
  { id:"em-ge-jun20", date:"2026-06-20", dateLabel:"20 Jun 2026", country:"Georgia", flag:"🇬🇪", city:"Tbilisi", airline:"Emirates", type:"walkin", venue:"Courtyard By Marriott Tbilisi, 4 Freedom Square" },
  { id:"em-de-jun20-dor", date:"2026-06-20", dateLabel:"20 Jun 2026", country:"Germany", flag:"🇩🇪", city:"Dortmund", airline:"Emirates", type:"walkin", venue:"Courtyard by Marriott Dortmund, Emil-Figge-Str. 41" },
  { id:"em-ar-jun20", date:"2026-06-20", dateLabel:"20 Jun 2026", country:"Argentina", flag:"🇦🇷", city:"Buenos Aires", airline:"Emirates", type:"agency", notes:"Via Top Fly Recruitment Academy — topflyra.com" },
  { id:"em-nl-jun21-hag", date:"2026-06-21", dateLabel:"21 Jun 2026", country:"Netherlands", flag:"🇳🇱", city:"The Hague", airline:"Emirates", type:"walkin", venue:"Novotel Den Haag City Centre, Hofweg 5-7" },
  { id:"em-gb-jun21-edi", date:"2026-06-21", dateLabel:"21 Jun 2026", country:"United Kingdom", flag:"🇬🇧", city:"Edinburgh", airline:"Emirates", type:"walkin", venue:"DoubleTree by Hilton Edinburgh City Centre, 34 Bread Street EH3 9AF" },
  { id:"em-rs-jun21", date:"2026-06-21", dateLabel:"21 Jun 2026", country:"Serbia", flag:"🇷🇸", city:"Belgrade", airline:"Emirates", type:"invite", notes:"Apply online at emiratesgroupcareers.com" },
  { id:"em-az-jun22", date:"2026-06-22", dateLabel:"22 Jun 2026", country:"Azerbaijan", flag:"🇦🇿", city:"Baku", airline:"Emirates", type:"walkin", venue:"InterContinental Baku, Zarifa Aliyeva str.31" },
  { id:"em-ca-jun22-yvr", date:"2026-06-22", dateLabel:"22 Jun 2026", country:"Canada", flag:"🇨🇦", city:"Vancouver", airline:"Emirates", type:"walkin", venue:"JW Marriott Parq Vancouver, 39 Smithe Street" },
  { id:"em-de-jun22-fra", date:"2026-06-22", dateLabel:"22 Jun 2026", country:"Germany", flag:"🇩🇪", city:"Frankfurt", airline:"Emirates", type:"walkin", venue:"Novotel Frankfurt City, Lise-Meitner-Straße 2" },
  { id:"em-lv-jun22", date:"2026-06-22", dateLabel:"22 Jun 2026", country:"Latvia", flag:"🇱🇻", city:"Riga", airline:"Emirates", type:"walkin", venue:"Radisson Blu Hotel & SPA Daugava, Kuģu iela 24" },
  { id:"em-ch-jun22", date:"2026-06-22", dateLabel:"22 Jun 2026", country:"Switzerland", flag:"🇨🇭", city:"Zurich", airline:"Emirates", type:"walkin", venue:"Crowne Plaza Zurich, Badenerstrasse 420" },
  { id:"em-fr-jun23-nts", date:"2026-06-23", dateLabel:"23 Jun 2026", country:"France", flag:"🇫🇷", city:"Nantes", airline:"Emirates", type:"walkin", venue:"Mercure Nantes Centre Grand Hôtel, 4 rue du Couëdic" },
  { id:"em-de-jun23-ber", date:"2026-06-23", dateLabel:"23 Jun 2026", country:"Germany", flag:"🇩🇪", city:"Berlin", airline:"Emirates", type:"walkin", venue:"Crowne Plaza Berlin City Centre, Nürnberger Straße 65" },
  { id:"em-gr-jun23-ath", date:"2026-06-23", dateLabel:"23 Jun 2026", country:"Greece", flag:"🇬🇷", city:"Athens", airline:"Emirates", type:"walkin", venue:"Athenaeum InterContinental, 89-93 Syngrou Avenue" },
  { id:"em-ro-jun23", date:"2026-06-23", dateLabel:"23 Jun 2026", country:"Romania", flag:"🇷🇴", city:"Timișoara", airline:"Emirates", type:"walkin", venue:"Tresor Le Palais Timisoara (Hilton), Strada Radu Tudoran 18" },
  { id:"em-si-jun23", date:"2026-06-23", dateLabel:"23 Jun 2026", country:"Slovenia", flag:"🇸🇮", city:"Ljubljana", airline:"Emirates", type:"walkin", venue:"InterContinental Ljubljana, Slovenska cesta 59" },
  { id:"em-fr-jun24-str", date:"2026-06-24", dateLabel:"24 Jun 2026", country:"France", flag:"🇫🇷", city:"Strasbourg", airline:"Emirates", type:"walkin", venue:"Hilton Strasbourg, 1 avenue Herrenschmidt" },
  { id:"em-se-jun24-sto", date:"2026-06-24", dateLabel:"24 Jun 2026", country:"Sweden", flag:"🇸🇪", city:"Stockholm", airline:"Emirates", type:"walkin", venue:"Hilton Stockholm Slussen, Guldgränd 8" },
  { id:"em-gb-jun24-lgw", date:"2026-06-24", dateLabel:"24 Jun 2026", country:"United Kingdom", flag:"🇬🇧", city:"London Gatwick", airline:"Emirates", type:"walkin", venue:"Sofitel Gatwick North, London Gatwick Airport North Terminal" },
  { id:"em-za-jun24", date:"2026-06-24", dateLabel:"24 Jun 2026", country:"South Africa", flag:"🇿🇦", city:"Bloemfontein", airline:"Emirates", type:"invite", notes:"Apply online at emiratesgroupcareers.com" },
  { id:"em-au-jun25-syd", date:"2026-06-25", dateLabel:"25 Jun 2026", country:"Australia", flag:"🇦🇺", city:"Sydney", airline:"Emirates", type:"walkin", venue:"Sydney Harbour Marriott, 30 Pitt Street NSW 2000" },
  { id:"em-de-jun25-ham", date:"2026-06-25", dateLabel:"25 Jun 2026", country:"Germany", flag:"🇩🇪", city:"Hamburg", airline:"Emirates", type:"walkin", venue:"Crowne Plaza Hamburg-City Alster" },
  { id:"em-gr-jun25-sky", date:"2026-06-25", dateLabel:"25 Jun 2026", country:"Greece", flag:"🇬🇷", city:"Thessaloniki", airline:"Emirates", type:"walkin", venue:"Monasty Hotel, Vasileos Iraleiou 45" },
  { id:"em-it-jun25-ven", date:"2026-06-25", dateLabel:"25 Jun 2026", country:"Italy", flag:"🇮🇹", city:"Venice", airline:"Emirates", type:"walkin", venue:"Hilton Garden Inn Venice Mestre San Giuliano, Via Orlanda 1" },
  { id:"em-me-jun25", date:"2026-06-25", dateLabel:"25 Jun 2026", country:"Montenegro", flag:"🇲🇪", city:"Podgorica", airline:"Emirates", type:"walkin", venue:"Hilton Podgorica, Bul. Svetog Petra Cetinjskog 2" },
  { id:"em-es-jun26-san", date:"2026-06-26", dateLabel:"26 Jun 2026", country:"Spain", flag:"🇪🇸", city:"Santander", airline:"Emirates", type:"walkin", venue:"NH Ciudad de Santander, Menéndez Pelayo 13-15" },
  { id:"em-se-jun26-mmo", date:"2026-06-26", dateLabel:"26 Jun 2026", country:"Sweden", flag:"🇸🇪", city:"Malmö", airline:"Emirates", type:"walkin", venue:"Radisson Blu Hotel Malmo, Ostergatan 10" },
  { id:"em-gb-jun26-man", date:"2026-06-26", dateLabel:"26 Jun 2026", country:"United Kingdom", flag:"🇬🇧", city:"Manchester", airline:"Emirates", type:"walkin", venue:"DoubleTree by Hilton Manchester Piccadilly, 1 Auburn Street M1 3DG" },
  { id:"em-za-jun26-dur", date:"2026-06-26", dateLabel:"26 Jun 2026", country:"South Africa", flag:"🇿🇦", city:"Durban", airline:"Emirates", type:"invite", notes:"Apply online at emiratesgroupcareers.com" },
  { id:"em-au-jun27-gld", date:"2026-06-27", dateLabel:"27 Jun 2026", country:"Australia", flag:"🇦🇺", city:"Gold Coast", airline:"Emirates", type:"walkin", venue:"Novotel Surfers Paradise, 3105 Surfers Paradise Blvd QLD 4217" },
  { id:"em-it-jun27-rom", date:"2026-06-27", dateLabel:"27 Jun 2026", country:"Italy", flag:"🇮🇹", city:"Rome", airline:"Emirates", type:"walkin", venue:"InterContinental Rome Ambasciatori Palace, Via Vittorio Veneto 62" },
  { id:"em-mt-jun27", date:"2026-06-27", dateLabel:"27 Jun 2026", country:"Malta", flag:"🇲🇹", city:"St. Julian's", airline:"Emirates", type:"walkin", venue:"Radisson Blu Resort St. Julian's, St. George's Bay STJ 3391" },
  { id:"em-tn-jun28-tun", date:"2026-06-28", dateLabel:"28 Jun 2026", country:"Tunisia", flag:"🇹🇳", city:"Tunis", airline:"Emirates", type:"invite", notes:"Apply online at emiratesgroupcareers.com" },
  { id:"em-us-jun28-jfk", date:"2026-06-28", dateLabel:"28 Jun 2026", country:"USA", flag:"🇺🇸", city:"New York", airline:"Emirates", type:"invite", notes:"Apply online at emiratesgroupcareers.com" },
  { id:"em-pt-jun28-lis", date:"2026-06-28", dateLabel:"28 Jun 2026", country:"Portugal", flag:"🇵🇹", city:"Lisbon", airline:"Emirates", type:"walkin", venue:"Lisbon Marriott Hotel, Av. dos Combatentes 45" },
  { id:"em-gb-jun28-lhr", date:"2026-06-28", dateLabel:"28 Jun 2026", country:"United Kingdom", flag:"🇬🇧", city:"London Heathrow", airline:"Emirates", type:"walkin", venue:"Delta Hotels Heathrow Windsor, Ditton Rd, Langley SL3 8PT" },
  { id:"em-mu-jun29", date:"2026-06-29", dateLabel:"29 Jun 2026", country:"Mauritius", flag:"🇲🇺", city:"Mauritius", airline:"Emirates", type:"invite", notes:"Apply online at emiratesgroupcareers.com" },
  { id:"em-tn-jun30-sfx", date:"2026-06-30", dateLabel:"30 Jun 2026", country:"Tunisia", flag:"🇹🇳", city:"Sfax", airline:"Emirates", type:"invite", notes:"Apply online at emiratesgroupcareers.com" },
  { id:"em-us-jun30-mia", date:"2026-06-30", dateLabel:"30 Jun 2026", country:"USA", flag:"🇺🇸", city:"Miami", airline:"Emirates", type:"invite", notes:"Apply online at emiratesgroupcareers.com" },

  // Qatar Airways — Nice & Lisbon confirmed walk-in events (June 2026)
  { id:"qa-fr-jun-nice", date:"2026-06-21", dateLabel:"Late Jun 2026", country:"France", flag:"🇫🇷", city:"Nice", airline:"Qatar Airways", type:"walkin", notes:"Walk-in event confirmed — check careers.qatarairways.com for exact date" },
  { id:"qa-pt-jun-lis", date:"2026-06-21", dateLabel:"Late Jun 2026", country:"Portugal", flag:"🇵🇹", city:"Lisbon", airline:"Qatar Airways", type:"walkin", notes:"Walk-in event confirmed — check careers.qatarairways.com for exact date" },
  { id:"qa-tr-jun-ist", date:"2026-06-21", dateLabel:"Late Jun 2026", country:"Turkey", flag:"🇹🇷", city:"Istanbul", airline:"Qatar Airways", type:"walkin", notes:"Walk-in event confirmed — check careers.qatarairways.com for exact date" },
  { id:"qa-my-jun-kul", date:"2026-06-21", dateLabel:"Late Jun 2026", country:"Malaysia", flag:"🇲🇾", city:"Kuala Lumpur", airline:"Qatar Airways", type:"walkin", notes:"Walk-in event confirmed — check careers.qatarairways.com for exact date" },

  // ── JULY 2026 ─────────────────────────────────────────────

  { id:"em-at-jul2", date:"2026-07-02", dateLabel:"2 Jul 2026", country:"Austria", flag:"🇦🇹", city:"Vienna", airline:"Emirates", type:"walkin", venue:"Renaissance Vienna Schönbrunn Hotel, Linke Wienzeile / Ullmannstrasse 71" },
  { id:"em-eg-jul4", date:"2026-07-04", dateLabel:"4 Jul 2026", country:"Egypt", flag:"🇪🇬", city:"Cairo", airline:"Emirates", type:"invite", notes:"Apply online at emiratesgroupcareers.com" },
  { id:"em-tr-jul4-antalya", date:"2026-07-04", dateLabel:"4 Jul 2026", country:"Turkey", flag:"🇹🇷", city:"Antalya", airline:"Emirates", type:"invite", notes:"Apply online at emiratesgroupcareers.com" },
  { id:"em-gb-jul5-gla", date:"2026-07-05", dateLabel:"5 Jul 2026", country:"United Kingdom", flag:"🇬🇧", city:"Glasgow", airline:"Emirates", type:"walkin", venue:"Maldron Hotels, 50 Renfrew St G2 3BW" },
  { id:"em-tr-jul6-bodrum", date:"2026-07-06", dateLabel:"6 Jul 2026", country:"Turkey", flag:"🇹🇷", city:"Bodrum", airline:"Emirates", type:"invite", notes:"Apply online at emiratesgroupcareers.com" },
  { id:"em-fr-jul6-mrs", date:"2026-07-06", dateLabel:"6 Jul 2026", country:"France", flag:"🇫🇷", city:"Marseille", airline:"Emirates", type:"walkin", venue:"InterContinental Marseille - Hotel Dieu, 1 Pl. Daviel" },
  { id:"em-gb-jul7-dun", date:"2026-07-07", dateLabel:"7 Jul 2026", country:"United Kingdom", flag:"🇬🇧", city:"Dundee", airline:"Emirates", type:"walkin", venue:"Apex City Quay Hotel & Spa, 1 West Victoria Dock Road DD1 3JP" },
  { id:"em-pt-jul9-coi", date:"2026-07-09", dateLabel:"9 Jul 2026", country:"Portugal", flag:"🇵🇹", city:"Coimbra", airline:"Emirates", type:"walkin", venue:"Hotel Coimbra Aeminium, Av. Armando Gonsalves, Lote 20" },
  { id:"em-pt-jul11-bra", date:"2026-07-11", dateLabel:"11 Jul 2026", country:"Portugal", flag:"🇵🇹", city:"Braga", airline:"Emirates", type:"walkin", venue:"Melia Braga, Av. Gen. Carrilho da Silva Pinto 8" },
  { id:"em-bg-jul14", date:"2026-07-14", dateLabel:"14 Jul 2026", country:"Bulgaria", flag:"🇧🇬", city:"Sofia", airline:"Emirates", type:"walkin", venue:"Grand Hotel Sofia, 1 Gurko Str." },
  { id:"em-au-jul16-cns", date:"2026-07-16", dateLabel:"16 Jul 2026", country:"Australia", flag:"🇦🇺", city:"Cairns", airline:"Emirates", type:"walkin", venue:"Pullman Cairns International, 17 Abbott St QLD 4870" },
  { id:"em-ca-jul19-yyz", date:"2026-07-19", dateLabel:"19 Jul 2026", country:"Canada", flag:"🇨🇦", city:"Toronto", airline:"Emirates", type:"walkin", venue:"Chelsea Hotel Toronto, 33 Gerrard St. West M5G 1Z4" },
  { id:"em-md-jul21", date:"2026-07-21", dateLabel:"21 Jul 2026", country:"Moldova", flag:"🇲🇩", city:"Chișinău", airline:"Emirates", type:"walkin", venue:"BERD'S MGallery Hotel, 12th Dimitrie Cantemir Blvd" },
  { id:"em-ee-jul22", date:"2026-07-22", dateLabel:"22 Jul 2026", country:"Estonia", flag:"🇪🇪", city:"Tallinn", airline:"Emirates", type:"walkin", venue:"Tallink Spa & Conference Hotel, Sadama tn 11a" },
  { id:"em-lt-jul24", date:"2026-07-24", dateLabel:"24 Jul 2026", country:"Lithuania", flag:"🇱🇹", city:"Vilnius", airline:"Emirates", type:"walkin", venue:"Hilton Garden Inn Vilnius City Center, Gedimino av. 44B-1" },
  { id:"em-nl-jul25-rot", date:"2026-07-25", dateLabel:"25 Jul 2026", country:"Netherlands", flag:"🇳🇱", city:"Rotterdam", airline:"Emirates", type:"walkin", venue:"Hilton Rotterdam, Weena 10" },
  { id:"em-cy-jul27", date:"2026-07-27", dateLabel:"27 Jul 2026", country:"Cyprus", flag:"🇨🇾", city:"Larnaca", airline:"Emirates", type:"walkin", venue:"Radisson Blu Hotel Larnaca, Atlantidon 2, 6058" },
  { id:"em-fr-jul29-tls", date:"2026-07-29", dateLabel:"29 Jul 2026", country:"France", flag:"🇫🇷", city:"Toulouse", airline:"Emirates", type:"walkin", venue:"Pullman Toulouse Airport, 2 Av. Didier Daurat, Blagnac" },
  { id:"em-no-jul30", date:"2026-07-30", dateLabel:"30 Jul 2026", country:"Norway", flag:"🇳🇴", city:"Oslo", airline:"Emirates", type:"walkin", venue:"Radisson Blu Plaza Hotel Oslo, Sonja Henies Plass 3" },
  { id:"em-mg-jul31", date:"2026-07-31", dateLabel:"31 Jul 2026", country:"Madagascar", flag:"🇲🇬", city:"Antananarivo", airline:"Emirates", type:"invite", notes:"Apply online at emiratesgroupcareers.com" },

  // ── ONGOING / ROLLING / NO FIXED DATE ─────────────────────
  // Use date "2099-12-31" so these always sort to the bottom

  { id:"em-jp-ongoing", date:"2099-12-31", dateLabel:"Ongoing", country:"Japan", flag:"🇯🇵", city:"Osaka", airline:"Emirates", type:"agency", notes:"Via Airlige agency — airlige.com" },
  { id:"em-ru-ongoing", date:"2099-12-31", dateLabel:"Ongoing", country:"Russia", flag:"🇷🇺", city:"St. Petersburg", airline:"Emirates", type:"agency", notes:"Via Global Vision agency — global-vision.ru" },
  { id:"em-ae-ongoing", date:"2099-12-31", dateLabel:"Weekly", country:"UAE", flag:"🇦🇪", city:"Dubai", airline:"Emirates", type:"invite", notes:"Events held weekly in Dubai — apply online to be invited" },
  { id:"em-in-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"India", flag:"🇮🇳", city:"Multiple cities", airline:"Emirates", type:"invite", notes:"Regular events — apply online, dates announced 4–8 weeks ahead" },
  { id:"em-ph-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"Philippines", flag:"🇵🇭", city:"Manila", airline:"Emirates", type:"invite", notes:"Regular events — apply online, dates announced 4–8 weeks ahead" },
  { id:"em-kr-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"South Korea", flag:"🇰🇷", city:"Seoul", airline:"Emirates", type:"invite", notes:"Regular events — apply online, dates announced 4–8 weeks ahead" },
  { id:"em-th-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"Thailand", flag:"🇹🇭", city:"Bangkok", airline:"Emirates", type:"invite", notes:"Regular events — apply online, dates announced 4–8 weeks ahead" },
  { id:"em-dz-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"Algeria", flag:"🇩🇿", city:"—", airline:"Emirates", type:"invite", notes:"Listed country — apply online at emiratesgroupcareers.com" },
  { id:"em-mk-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"Macedonia", flag:"🇲🇰", city:"—", airline:"Emirates", type:"invite", notes:"Listed country — apply online at emiratesgroupcareers.com" },
  { id:"em-by-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"Belarus", flag:"🇧🇾", city:"—", airline:"Emirates", type:"invite", notes:"Listed country — apply online at emiratesgroupcareers.com" },
  { id:"em-ke-ongoing", date:"2099-12-31", dateLabel:"Rare", country:"Kenya", flag:"🇰🇪", city:"Nairobi", airline:"Emirates", type:"invite", notes:"Not regularly listed — apply online, may need to travel to Cairo event" },
  { id:"em-np-ongoing", date:"2099-12-31", dateLabel:"Rare", country:"Nepal", flag:"🇳🇵", city:"Kathmandu", airline:"Emirates", type:"invite", notes:"Not listed — apply online, candidates typically travel to Colombo or Delhi event" },
  { id:"em-so-ongoing", date:"2099-12-31", dateLabel:"Rare", country:"Somalia", flag:"🇸🇴", city:"—", airline:"Emirates", type:"invite", notes:"Not listed — apply online, attend nearest regional event" },

  // Qatar Airways — fully digital / invite-only process globally
  // Events announced last-minute; apply online to be shortlisted
  { id:"qa-in-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"India", flag:"🇮🇳", city:"Multiple cities", airline:"Qatar Airways", type:"invite", notes:"Apply at careers.qatarairways.com — events announced when scheduled" },
  { id:"qa-ph-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"Philippines", flag:"🇵🇭", city:"Manila", airline:"Qatar Airways", type:"agency", notes:"Apply via IPAMS agency — ipams.com.ph" },
  { id:"qa-kr-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"South Korea", flag:"🇰🇷", city:"Seoul", airline:"Qatar Airways", type:"invite", notes:"Apply at careers.qatarairways.com" },
  { id:"qa-th-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"Thailand", flag:"🇹🇭", city:"Bangkok / Krabi", airline:"Qatar Airways", type:"invite", notes:"Apply at careers.qatarairways.com" },
  { id:"qa-ma-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"Morocco", flag:"🇲🇦", city:"Casablanca / Rabat", airline:"Qatar Airways", type:"invite", notes:"Apply at careers.qatarairways.com" },
  { id:"qa-eg-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"Egypt", flag:"🇪🇬", city:"Cairo", airline:"Qatar Airways", type:"invite", notes:"Apply at careers.qatarairways.com" },
  { id:"qa-ro-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"Romania", flag:"🇷🇴", city:"Multiple", airline:"Qatar Airways", type:"invite", notes:"Apply at careers.qatarairways.com" },
  { id:"qa-rs-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"Serbia", flag:"🇷🇸", city:"Belgrade", airline:"Qatar Airways", type:"invite", notes:"Apply at careers.qatarairways.com" },
  { id:"qa-ua-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"Ukraine", flag:"🇺🇦", city:"—", airline:"Qatar Airways", type:"invite", notes:"Apply at careers.qatarairways.com" },
  { id:"qa-gr-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"Greece", flag:"🇬🇷", city:"Athens", airline:"Qatar Airways", type:"invite", notes:"Apply at careers.qatarairways.com" },
  { id:"qa-za-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"South Africa", flag:"🇿🇦", city:"Durban / Johannesburg", airline:"Qatar Airways", type:"invite", notes:"Apply at careers.qatarairways.com" },
  { id:"qa-jp-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"Japan", flag:"🇯🇵", city:"Tokyo", airline:"Qatar Airways", type:"invite", notes:"Apply at careers.qatarairways.com" },
  { id:"qa-ae-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"UAE", flag:"🇦🇪", city:"Abu Dhabi", airline:"Qatar Airways", type:"invite", notes:"Arabic speakers event also available — apply at careers.qatarairways.com" },
  { id:"qa-lk-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"Sri Lanka", flag:"🇱🇰", city:"Colombo", airline:"Qatar Airways", type:"invite", notes:"Apply at careers.qatarairways.com" },
  { id:"qa-my-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"Malaysia", flag:"🇲🇾", city:"Kuala Lumpur", airline:"Qatar Airways", type:"invite", notes:"Apply at careers.qatarairways.com" },
  { id:"qa-tn-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"Tunisia", flag:"🇹🇳", city:"—", airline:"Qatar Airways", type:"invite", notes:"Apply at careers.qatarairways.com" },

  // Etihad — fully invite-only globally. Apply online at etihad.com/careers
  { id:"et-rs-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"Serbia", flag:"🇷🇸", city:"Belgrade", airline:"Etihad", type:"invite", notes:"Serbian speakers preferred — etihad.com/careers" },
  { id:"et-it-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"Italy", flag:"🇮🇹", city:"Rome / Milan", airline:"Etihad", type:"invite", notes:"Regular recruitment market — etihad.com/careers" },
  { id:"et-es-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"Spain", flag:"🇪🇸", city:"Madrid / Barcelona", airline:"Etihad", type:"invite", notes:"Regular recruitment market — etihad.com/careers" },
  { id:"et-de-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"Germany", flag:"🇩🇪", city:"Multiple", airline:"Etihad", type:"invite", notes:"Regular recruitment market — etihad.com/careers" },
  { id:"et-ma-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"Morocco", flag:"🇲🇦", city:"—", airline:"Etihad", type:"invite", notes:"Regular recruitment market — etihad.com/careers" },
  { id:"et-tn-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"Tunisia", flag:"🇹🇳", city:"—", airline:"Etihad", type:"invite", notes:"Regular recruitment market — etihad.com/careers" },
  { id:"et-jp-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"Japan", flag:"🇯🇵", city:"Tokyo", airline:"Etihad", type:"invite", notes:"Regular recruitment market — etihad.com/careers" },
  { id:"et-in-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"India", flag:"🇮🇳", city:"Multiple cities", airline:"Etihad", type:"invite", notes:"Regular recruitment market — etihad.com/careers" },
  { id:"et-ph-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"Philippines", flag:"🇵🇭", city:"Manila", airline:"Etihad", type:"invite", notes:"Regular recruitment market — etihad.com/careers" },
  { id:"et-my-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"Malaysia", flag:"🇲🇾", city:"Kuala Lumpur", airline:"Etihad", type:"invite", notes:"Regular recruitment market — etihad.com/careers" },
  { id:"et-ie-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"Ireland", flag:"🇮🇪", city:"Dublin", airline:"Etihad", type:"invite", notes:"Regular recruitment market — etihad.com/careers" },
  { id:"et-sk-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"Slovakia", flag:"🇸🇰", city:"Bratislava", airline:"Etihad", type:"invite", notes:"Regular recruitment market — etihad.com/careers" },
  { id:"et-tr-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"Turkey", flag:"🇹🇷", city:"Istanbul", airline:"Etihad", type:"invite", notes:"Regular recruitment market — etihad.com/careers" },
  { id:"et-au-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"Australia", flag:"🇦🇺", city:"Multiple cities", airline:"Etihad", type:"invite", notes:"Regular recruitment market — etihad.com/careers" },
  { id:"et-za-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"South Africa", flag:"🇿🇦", city:"—", airline:"Etihad", type:"invite", notes:"Regular recruitment market — etihad.com/careers" },
  { id:"et-ro-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"Romania", flag:"🇷🇴", city:"—", airline:"Etihad", type:"invite", notes:"Apply online — etihad.com/careers" },
  { id:"et-hu-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"Hungary", flag:"🇭🇺", city:"—", airline:"Etihad", type:"invite", notes:"Apply online — etihad.com/careers" },
  { id:"et-bg-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"Bulgaria", flag:"🇧🇬", city:"—", airline:"Etihad", type:"invite", notes:"Apply online — etihad.com/careers" },
  { id:"et-hr-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"Croatia", flag:"🇭🇷", city:"—", airline:"Etihad", type:"invite", notes:"Apply online — etihad.com/careers" },
  { id:"et-ua-ongoing", date:"2099-12-31", dateLabel:"Year-round", country:"Ukraine", flag:"🇺🇦", city:"Kiev", airline:"Etihad", type:"invite", notes:"Historical market — apply online at etihad.com/careers" },

];

// ── HELPERS ──────────────────────────────────────────────────

export const ALL_COUNTRIES = [...new Set(openDaysEvents.map(e => e.country))].sort();

export const ALL_AIRLINES: Airline[] = [
  "Emirates", "Qatar Airways", "Etihad", "flydubai", "Air Arabia"
];

export const LAST_UPDATED = "7 June 2026";
