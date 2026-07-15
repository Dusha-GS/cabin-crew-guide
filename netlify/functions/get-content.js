// netlify/functions/get-content.js
//
// SERVER-ONLY PAID CONTENT.
// This file lives in netlify/functions and is NEVER shipped to the browser.
// The paid material below is returned only to a caller who:
//   1. presents a valid Supabase session token, AND
//   2. whose tier — read SERVER-SIDE from Supabase with the service key — covers
//      the requested content.
// Anonymous or free-tier visitors physically cannot obtain this data.

const cvGuide = {
  structure: [
    {
      section: "Professional Photo",
      description: "A high-quality professional headshot is MANDATORY for cabin crew CVs in the Middle East. White or neutral background, business attire, natural smile.",
      tips: [
        "White or light grey background only",
        "Professional business attire — not casual",
        "Natural smile — show warmth and approachability",
        "Hair neatly styled, makeup polished but natural",
        "Avoid selfies — hire a photographer if possible",
        "Full face visible — no sunglasses or hats",
      ],
    },
    {
      section: "Personal Profile",
      description: "A 3–4 sentence summary at the top of your CV that captures who you are, your experience, and why you're perfect for cabin crew.",
      example: "Enthusiastic and customer-focused professional with 3 years of hospitality experience serving diverse international guests. Fluent in English and Arabic, with a genuine passion for delivering memorable travel experiences. Known for remaining calm under pressure, proactive communication, and creating warm, welcoming environments. Eager to bring my service excellence and multicultural awareness to Emirates' world-class team.",
      tips: [
        "Mention your target airline by name",
        "Include languages you speak",
        "Highlight relevant experience (hospitality, service, travel)",
        "Keep it to 3–5 sentences maximum",
        "Tailor this for EACH airline you apply to",
      ],
    },
    {
      section: "Work Experience",
      description: "List your experience in reverse chronological order (most recent first). Focus on customer-facing and service roles.",
      tips: [
        "Use bullet points with ACTION verbs (Delivered, Managed, Resolved, Achieved)",
        "Include specific numbers where possible ('served 150+ daily customers')",
        "Highlight multicultural environments or diverse teams",
        "Include hospitality, tourism, healthcare, retail — all relevant",
        "Don't worry if you haven't flown — most ME airlines prefer to train from scratch",
      ],
    },
    {
      section: "Education",
      description: "Include your highest qualification. High school / secondary school is the minimum required by all ME airlines.",
      items: [
        "Degree or diploma (if applicable)",
        "High school certificate",
        "First aid / CPR certificates",
        "Language certifications",
        "Aviation or hospitality courses",
        "Any professional development courses",
      ],
    },
    {
      section: "Languages",
      description: "Languages are extremely valued by ME airlines. List all languages with proficiency levels clearly.",
      levels: ["Native / Fluent", "Advanced (C1)", "Intermediate (B2)", "Basic (A2-B1)"],
      tips: [
        "English fluency is mandatory",
        "Arabic is highly advantageous for ME airlines",
        "Even basic knowledge of a third language adds value",
        "Consider getting certified (IELTS, DELF, etc.)",
      ],
    },
    {
      section: "Key Skills",
      description: "A visual skills section that highlights your most relevant competencies at a glance.",
      examples: [
        "Customer Service Excellence",
        "First Aid & CPR Certified",
        "Cross-cultural Communication",
        "Conflict Resolution",
        "Teamwork & Collaboration",
        "Time Management",
        "Emotional Intelligence",
        "Problem Solving Under Pressure",
      ],
    },
    {
      section: "Personal Details",
      description: "Cabin crew CVs in the Middle East typically include personal details that Western CVs omit. This is expected and appropriate for Middle Eastern airline applications. Important: if you are based in the EU, UK, or a region with anti-discrimination or data protection laws, these conventions differ from local norms — this guidance applies specifically to ME airline recruitment only.",
      items: [
        "Date of Birth",
        "Nationality",
        "Height (in cm)",
        "Weight (optional but common)",
        "Passport expiry date",
        "Visa status (if applicable)",
        "Marital status (optional)",
        "Languages spoken",
      ],
    },
    {
      section: "Design & Formatting",
      description: "Your CV must be visually polished and easy to read. One page is ideal; two pages maximum.",
      tips: [
        "Use a clean, professional template — avoid cluttered designs",
        "Consistent font throughout (professional, readable)",
        "Use color accents sparingly — gold, navy, or the airline's brand color",
        "White space is your friend — don't overcrowd",
        "For open day drop-offs and email submissions, use a PDF. For online portal applications that use ATS scanning systems, a clean single-column Word (.docx) document often performs better — check the specific airline's application guidance.",
        "File name: FirstName_LastName_CabinCrew_CV.pdf",
      ],
    },
  ],
  dosDonts: {
    dos: [
      "Include a professional headshot on white background",
      "Tailor your CV to each specific airline",
      "Use action verbs in your bullet points",
      "Include specific numbers and achievements",
      "List all languages with proficiency levels",
      "Include relevant certifications (first aid, CPR)",
      "Keep to 1–2 pages maximum",
      "For open day submissions, export as a PDF. For online ATS applications, use a clean single-column Word (.docx) file",
      "Proofread multiple times for errors",
      "Have someone else review before submitting",
    ],
    donts: [
      "Use a casual selfie or no photo at all",
      "Submit the same generic CV to every airline",
      "Use passive language ('was responsible for')",
      "Leave unexplained employment gaps",
      "Include irrelevant personal hobbies (unless aviation/travel related)",
      "Use fancy fonts that are hard to read",
      "Use a multi-column or heavily designed CV for online portal applications",
      "Include a photo with sunglasses, hats, or filters",
      "Lie or exaggerate qualifications",
      "Include negative comments about previous employers",
    ],
  },
};

const interviewQuestions = {
  personal: [
    {
      question: "Tell me about yourself.",
      difficulty: "Easy",
      category: "Personal",
      sampleAnswer: "I'm a customer service professional with three years of experience working in a luxury hotel environment, where I managed guest relations and handled VIP clients from over 40 nationalities. I speak fluent English and Arabic, and conversational French. I've always been passionate about travel and creating exceptional experiences for others — which is why I'm so excited about the opportunity to join Emirates as a cabin crew member.",
      tips: [
        "Keep it to 60–90 seconds",
        "Mention relevant experience and languages",
        "End with why you want THIS specific role",
        "Don't recite your entire life story — highlight 3 key things",
      ],
    },
    {
      question: "Why do you want to be cabin crew?",
      difficulty: "Easy",
      category: "Personal",
      sampleAnswer: "My passion for exceptional customer service combined with my love of travel makes this role a natural fit. I've always been drawn to environments where I can meet people from all over the world and create meaningful moments for them. Beyond the travel aspect, I genuinely admire the professionalism, teamwork, and service standards that define cabin crew — I want to be part of a team that represents excellence every single day.",
      tips: [
        "Show genuine passion — not just 'free flights'",
        "Mention the service aspect, not just travel",
        "Research the airline's values and reference them",
        "Be specific about what draws you to this career",
      ],
    },
    {
      question: "Why Emirates/Etihad/Qatar Airways specifically?",
      difficulty: "Easy",
      category: "Personal",
      sampleAnswer: "Emirates is consistently rated among the world's best airlines, and I've personally experienced the exceptional service on several flights. What impresses me most is the diversity of the crew and the airline's commitment to investing in its people through world-class training. I want to grow with a carrier that sets the global standard for service excellence.",
      tips: [
        "Research the airline thoroughly before the interview",
        "Mention specific achievements, routes, or initiatives",
        "Reference their values or mission statement",
        "Show you chose THEM — not just any airline",
        "Verify any statistics you plan to cite (crew diversity figures, fleet numbers) directly with the airline before the interview",
      ],
    },
    {
      question: "Where do you see yourself in 5 years?",
      difficulty: "Medium",
      category: "Personal",
      sampleAnswer: "I'd love to have built a strong foundation as cabin crew, developing deep expertise in safety, service, and cross-cultural communication. Within 5 years, I'd aspire to progress into a senior cabin crew or pursuer role, taking on additional responsibility in mentoring newer crew members. Longer term, I'm genuinely open to opportunities in training or inflight service development — whatever allows me to contribute most to the airline's success.",
      tips: [
        "Show ambition but ground it in the airline's structure",
        "Don't say 'management' unless you know the airline's promotion paths",
        "Show commitment to growing WITH the airline",
        "Be realistic about the progression timeline",
      ],
    },
    {
      question: "How do you handle living away from family in a new city?",
      difficulty: "Medium",
      category: "Personal",
      sampleAnswer: "I've already thought about this carefully and I'm genuinely excited about the experience of building a new life in Dubai. I have a strong, supportive family who understand and encourage my career goals. I'm someone who adapts quickly to new environments — I've traveled extensively and lived in shared accommodation before. I know the crew community is strong, and I'm looking forward to building friendships with colleagues from around the world.",
      tips: [
        "Show you've thought about this realistically",
        "Demonstrate adaptability and independence",
        "Mention family support if true",
        "Show excitement about the lifestyle — not reluctance",
      ],
    },
  ],
  behavioral: [
    {
      question: "Tell me about a time you dealt with a difficult customer.",
      difficulty: "Medium",
      category: "Behavioral",
      sampleAnswer: "At my hotel, a guest was furious that his requested late checkout had not been communicated to housekeeping, and his room had been disturbed while he was still in it. I immediately apologized sincerely without making excuses, upgraded him to a suite for the rest of his stay at no charge, offered complimentary dining, and personally followed up three times that day. By check-out, he was genuinely appreciative and left a five-star review specifically mentioning my response.",
      tips: [
        "Always use the STAR method (Situation, Task, Action, Result)",
        "Take personal ownership — 'I did' not 'we did'",
        "Include a measurable positive outcome",
        "Show empathy and problem-solving, not just compliance",
      ],
    },
    {
      question: "Describe a time you worked in a team to achieve a difficult goal.",
      difficulty: "Medium",
      category: "Behavioral",
      sampleAnswer: "During a major hotel event hosting 200 international delegates, our events team was suddenly short-staffed by 40%. I stepped up to coordinate between three departments — F&B, concierge, and housekeeping — creating a real-time shared communication channel and reassigning tasks based on strengths. The event ran on schedule, the client rated it 9.8/10, and the GM recognized our team with a commendation letter.",
      tips: [
        "Show your specific contribution — not just the team's",
        "Demonstrate communication and leadership even as a team member",
        "Include the outcome and any recognition received",
        "Choose an example with genuine challenge and stakes",
      ],
    },
    {
      question: "Tell me about a time you went above and beyond for a customer.",
      difficulty: "Easy",
      category: "Behavioral",
      sampleAnswer: "A guest at my hotel mentioned in passing that it was her mother's birthday the next day and she wished she had planned something special. Entirely on my own initiative, I arranged for a birthday cake, flowers, and a handwritten card from the team to be in the room when she returned from dinner. She broke down in tears of joy — and later told my manager it was one of the most touching gestures she'd experienced. It required no extra budget — just attention and care.",
      tips: [
        "Show initiative — you acted without being asked",
        "Make the emotional impact clear",
        "Show it required creativity, not just following policy",
        "Keep it genuine and specific",
      ],
    },
    {
      question: "Describe a situation where you had a conflict with a colleague. How did you resolve it?",
      difficulty: "Hard",
      category: "Behavioral",
      sampleAnswer: "A colleague and I had different approaches to handling a recurring guest complaint procedure — I believed in immediate escalation, she preferred handling it independently. Rather than letting it create friction, I suggested we have a direct conversation to understand each other's reasoning. We found a middle ground: she'd handle the initial response, and we'd escalate together if unresolved within 10 minutes. It actually improved our process and our working relationship.",
      tips: [
        "Never speak negatively about the colleague",
        "Show you took initiative to resolve it professionally",
        "Demonstrate empathy and listening",
        "End with a positive resolution and lesson learned",
      ],
    },
    {
      question: "Tell me about a time you had to adapt quickly to an unexpected change or challenge at work.",
      difficulty: "Medium",
      category: "Behavioral",
      sampleAnswer: "During a peak season at my hotel, our entire ordering system went offline mid-service during a major corporate event. With no access to digital records, I immediately gathered the team, assigned each person specific tables to manage manually, created handwritten order sheets, and personally coordinated between the kitchen and the floor. We completed the event only 20 minutes behind schedule, the client was genuinely appreciative of our professionalism under pressure, and my manager cited my quick response in my end-of-year review.",
      tips: [
        "Use STAR format — the Action step is where you shine here",
        "Adaptability and calm under pressure are central to the cabin crew role — this question tests both",
        "Show that you took charge without waiting to be told — initiative is key",
        "The Result should show a positive outcome even under difficult conditions",
      ],
    },
  ],
  situational: [
    {
      question: "A passenger has a severe peanut allergy. You've just served a meal that contained traces of nuts — they didn't declare the allergy. What do you do?",
      difficulty: "Hard",
      category: "Situational",
      sampleAnswer: "My immediate priority is the passenger's safety. I would first calmly ask if they are feeling any symptoms and assess the situation without causing alarm to other passengers. I would retrieve the EpiPen from the first aid kit and alert the senior cabin crew immediately. If symptoms appear, I'd follow our emergency medical protocol — including requesting any medical professionals onboard and preparing for possible diversion. I'd document everything and brief the captain promptly.",
      tips: [
        "Safety ALWAYS comes first — state this clearly",
        "Mention alerting the senior crew",
        "Reference the first aid kit and medical protocols",
        "Show calm, systematic thinking — not panic",
      ],
    },
    {
      question: "You notice a fellow cabin crew member behaving rudely to a passenger. What do you do?",
      difficulty: "Medium",
      category: "Situational",
      sampleAnswer: "I'd act immediately but professionally. I'd step in and offer to assist the passenger, smoothly taking over the interaction so the situation doesn't escalate. Once the passenger was taken care of, I'd privately speak with my colleague — not to accuse, but to check if they were okay and let them know the impact it had. If the behavior was a pattern or serious, I would speak with the senior crew member — because ultimately the passenger experience and our team's standards are what matter.",
      tips: [
        "Show you'd intervene to protect the passenger",
        "Don't throw your colleague under the bus publicly",
        "Show professionalism in how you approach the colleague",
        "Mention escalation if needed — shows you understand hierarchy",
      ],
    },
    {
      question: "A passenger refuses to fasten their seatbelt during turbulence. How do you handle this?",
      difficulty: "Easy",
      category: "Situational",
      sampleAnswer: "I would approach the passenger warmly but firmly. I'd explain that the seatbelt sign is a safety requirement, not a suggestion, and briefly explain the real risk of turbulence injury. I'd use positive, calm language rather than confrontational commands. If they continued to refuse, I would escalate to the senior crew member and follow the airline's protocol — including informing the captain if necessary. Passenger safety is non-negotiable.",
      tips: [
        "Start with empathy, not authority",
        "Explain WHY it matters — not just 'it's policy'",
        "Show willingness to escalate if needed",
        "Emphasize that passenger safety is always the priority",
      ],
    },
    {
      question: "You're on a long-haul flight and a passenger starts to cry quietly. What do you do?",
      difficulty: "Easy",
      category: "Situational",
      sampleAnswer: "I'd approach discreetly and warmly — perhaps crouching down to their level rather than standing over them. I'd gently ask if they're okay and if there's anything I can do. Sometimes people just need a kind word, a glass of water, or simply to feel seen. I'd offer privacy or company depending on what they seem to need, check in on them again later, and ensure the senior crew is aware in case of any medical or emotional concerns.",
      tips: [
        "Show empathy as the first response — not protocol",
        "Respect their privacy while showing care",
        "Mention checking in again later — shows follow-through",
        "Demonstrate awareness that passengers are human beings, not tasks",
      ],
    },
    {
      question: "You discover an unattended bag in the overhead compartment and no passenger on the flight claims it. What do you do?",
      difficulty: "Hard",
      category: "Situational",
      sampleAnswer: "Security is my immediate priority. I would calmly and discreetly ask nearby passengers if the bag belongs to them, without drawing unnecessary attention or causing alarm. If no one claims it, I would immediately and quietly notify the senior cabin crew member and the captain — following the airline's security protocol for unattended items. This may include clearing the surrounding area, not touching or moving the bag independently, and liaising with ground security at our destination. I would document everything accurately and remain calm throughout.",
      tips: [
        "Never handle or move the bag independently — this is critical protocol",
        "Notify the senior crew and captain immediately — chain of command is everything in a security situation",
        "Act discreetly — preventing passenger panic is as important as the security response",
        "Show awareness that your airline's specific training will cover the exact steps — you are demonstrating your mindset, not reciting a specific manual",
      ],
    },
  ],
  knowledge: [
    {
      question: "What is the primary role of cabin crew?",
      difficulty: "Easy",
      category: "Knowledge",
      sampleAnswer: "The primary role of cabin crew is passenger safety. While exceptional service is a core part of what we do, every cabin crew member is first and foremost a safety professional, trained to handle emergencies, evacuations, medical situations, and security threats. The hospitality and service aspects of the role enhance the passenger experience, but they always come second to safety. This priority is reflected in every aspect of our training.",
      tips: [
        "Always say SAFETY first — this is non-negotiable",
        "Recruiters test this specifically — getting it wrong is disqualifying",
        "Show you understand both safety and service roles",
        "Reference training as proof of the safety priority",
      ],
    },
    {
      question: "What do you know about [Airline]'s current fleet and major routes?",
      difficulty: "Medium",
      category: "Knowledge",
      sampleAnswer: "Emirates operates one of the world's largest fleets, including significant numbers of the Airbus A380 — the world's largest passenger aircraft — and Boeing 777. Their hub at Dubai International connects to over 150 destinations across every continent. Emirates operates impressive ultra-long-haul routes including non-stop services to Perth and Auckland, and continues to expand its global network.",
      tips: [
        "Research the specific airline's fleet BEFORE the interview",
        "Know their hub airport code (DXB, AUH, DOH)",
        "Mention notable routes or recent network expansions — check the airline's newsroom for current information",
        "Show genuine interest in aviation — not just the travel",
        "Verify any specific statistics directly with the airline before citing them",
      ],
    },
    {
      question: "What would you do if you suspected a fellow crew member was under the influence of alcohol before a flight?",
      difficulty: "Hard",
      category: "Knowledge",
      sampleAnswer: "This would be an extremely serious situation, and my duty to passenger and crew safety would require immediate action regardless of any personal relationship with the crew member. I would discreetly but immediately alert the senior crew member or purser. It would not be appropriate for me to make accusations publicly, but I cannot in good conscience allow someone potentially impaired to work on a flight. Passenger safety must always override any concern about colleague relations.",
      tips: [
        "Show absolute clarity that safety comes first",
        "Don't hesitate — show confidence in this answer",
        "Mention reporting through the correct chain of command",
        "Show professionalism — not drama or judgment",
      ],
    },
    {
      question: "How would you handle serving alcohol to different cultural or religious backgrounds?",
      difficulty: "Medium",
      category: "Knowledge",
      sampleAnswer: "I approach every passenger with full respect for their personal choices and cultural background. My job is to offer and facilitate — never to judge. I would offer the beverage menu without assumption and serve exactly what the passenger requests. If a passenger declines alcohol for any reason, I'd immediately suggest alternative beverages with equal enthusiasm and care. The Middle East's diverse passenger mix means cultural sensitivity is central to excellent service.",
      tips: [
        "Show zero judgment in either direction",
        "Demonstrate cultural awareness and sensitivity",
        "Show service excellence regardless of the passenger's choice",
        "This tests your EQ as much as your knowledge",
      ],
    },
    {
      question: "What is the difference between a planned and an unplanned emergency in aviation?",
      difficulty: "Medium",
      category: "Knowledge",
      sampleAnswer: "A planned emergency is one where the crew has advance notice — for example, a declared technical issue requiring an emergency landing, or a medical situation developing over time. This allows the crew to brief passengers, prepare the cabin, check safety equipment, secure the galley, and coordinate with the captain and ground services. An unplanned emergency happens without warning — such as sudden severe turbulence, a rapid decompression, or a cabin fire. In that case, crew must respond immediately based on their training with no preparation time. In both cases the priority is identical — passenger safety — but a planned emergency allows for a more controlled, coordinated response.",
      tips: [
        "This question tests genuine aviation safety knowledge — study it before your interview",
        "The key distinction is preparation time: planned allows briefing and coordination, unplanned requires immediate instinctive response",
        "Always anchor both scenarios to passenger safety as the constant priority",
        "Mentioning specific examples (technical emergency vs sudden turbulence) shows real understanding, not just a memorised answer",
      ],
    },
  ],
};

const groupDiscussionTopics = [
  {
    topic: "Desert Island Survival",
    type: "Classic Scenario",
    description: "Your plane has made an emergency landing on an uninhabited island. You have limited supplies. As a group, decide which 10 items from a given list to keep, and how to prioritize survival, rescue, and group welfare.",
    tips: [
      "This tests leadership, teamwork and rational thinking",
      "Volunteer to summarize the group's decisions at the end",
      "Balance practical survival with group morale considerations",
      "Use aviation knowledge: signal mirrors, water before food",
    ],
    commonItems: ["Water", "First aid kit", "Flares", "Compass", "Rope", "Food rations", "Knife", "Tarpaulin", "Matches", "Radio"],
  },
  {
    topic: "How to Improve Passenger Experience on Long-Haul Flights",
    type: "Service Innovation",
    description: "As a group of cabin crew candidates, brainstorm and agree on the top 3 most impactful innovations or changes to enhance passenger wellbeing and satisfaction on flights over 10 hours.",
    tips: [
      "Show service innovation thinking — not just free upgrades",
      "Consider economy passengers — not just business/first",
      "Think about health, sleep, boredom, and connection",
      "Show you've thought about this from experience, not just theory",
    ],
  },
  {
    topic: "Handling a Passenger Disagreement Mid-Flight",
    type: "Scenario Role-Play",
    description: "Two passengers in adjacent seats are in a heated verbal dispute about a reclined seat. You are the cabin crew. As a group, decide on the best step-by-step approach to resolve the situation professionally.",
    tips: [
      "Emphasize de-escalation before authority",
      "Show empathy to both parties",
      "Discuss when to escalate to senior crew",
      "Consider the impact on surrounding passengers",
    ],
  },
  {
    topic: "What Makes the Perfect Cabin Crew Member?",
    type: "Values Discussion",
    description: "Your group must agree on the top 5 qualities that make an exceptional cabin crew member — and rank them in order of importance, with justification.",
    tips: [
      "Don't just say 'smile' — go deeper",
      "Safety awareness should rank highly",
      "Discuss cultural sensitivity and emotional intelligence",
      "This reveals your understanding of the role",
    ],
  },
  {
    topic: "Managing a Medical Emergency Onboard",
    type: "Emergency Scenario",
    description: "A passenger loses consciousness mid-flight. Walk through as a group exactly what steps should be taken — from the moment crew are alerted to landing at the destination.",
    tips: [
      "Safety and protocol knowledge is being tested here",
      "Mention calling for medical professionals onboard",
      "Discuss when to inform the captain about diversion",
      "Show calm, systematic thinking — not panic",
    ],
  },
];

// ---------------------------------------------------------------------------
// Access control
// ---------------------------------------------------------------------------

const mockExamQuestions = [
  // ── Situational ───────────────────────────────────────────────────────────
  { id: 1, type: "open", question: "You notice a passenger appears very anxious before takeoff. What do you do?", category: "Situational", difficulty: "Easy", modelAnswer: "Approach calmly and warmly, offer reassurance, explain procedures if needed, check in throughout flight." },
  { id: 2, type: "open", question: "A passenger becomes verbally aggressive because their meal choice is unavailable. How do you handle this?", category: "Behavioral", difficulty: "Medium", modelAnswer: "Stay calm, acknowledge frustration, apologise sincerely, offer alternatives, escalate to senior crew if needed." },
  { id: 3, type: "open", question: "During a flight, two passengers in the same row have a heated argument. What steps do you take?", category: "Situational", difficulty: "Medium", modelAnswer: "Intervene professionally, separate if possible, de-escalate calmly, document and inform senior crew." },
  { id: 4, type: "open", question: "Why do you want to work specifically for Emirates/a Middle Eastern airline?", category: "Personal", difficulty: "Easy", modelAnswer: "Show genuine airline knowledge — routes, values, service culture, crew diversity, training reputation." },
  { id: 5, type: "open", question: "A passenger is showing signs of a medical emergency (clutching chest). Walk me through your response.", category: "Emergency", difficulty: "Hard", modelAnswer: "Alert senior crew immediately, assess symptoms, retrieve the emergency medical kit and AED if cardiac arrest is suspected, follow the airline's emergency medical protocol, ask for medical professionals onboard, and prepare for possible diversion if needed." },
  { id: 6, type: "open", question: "You've been awake for 18 hours and have a 12-hour flight ahead. How do you ensure you deliver excellent service?", category: "Personal", difficulty: "Medium", modelAnswer: "Professional responsibility, rest strategies during layover, teamwork with crew, maintaining standards regardless of fatigue." },
  { id: 7, type: "open", question: "A child is travelling alone and seems frightened. How do you manage their journey?", category: "Situational", difficulty: "Easy", modelAnswer: "Introduce yourself warmly, explain who you are, ensure comfort, follow Unaccompanied Minor protocols." },
  { id: 8, type: "open", question: "A colleague is behaving unprofessionally during service. What do you do?", category: "Behavioral", difficulty: "Hard", modelAnswer: "Address privately after service, support the team during service, escalate to senior crew if passenger-facing, document if needed." },
  { id: 9, type: "open", question: "Describe a time you went above and beyond for someone. What was the outcome?", category: "Personal", difficulty: "Easy", modelAnswer: "Use STAR format — Situation, Task, Action, Result. Show empathy, initiative, and positive impact." },
  { id: 10, type: "open", question: "A passenger refuses to fasten their seatbelt during turbulence. How do you handle it?", category: "Situational", difficulty: "Medium", modelAnswer: "Calmly explain the safety regulation, use firm but polite tone, escalate to senior crew if non-compliant, document the refusal." },
  { id: 11, type: "open", question: "How would you handle a language barrier with a distressed passenger?", category: "Situational", difficulty: "Medium", modelAnswer: "Use simple words, gestures, translation apps or crew who speak the language, remain calm and patient." },
  { id: 12, type: "open", question: "What does excellent customer service mean to you in a cabin crew context?", category: "Personal", difficulty: "Easy", modelAnswer: "Anticipating needs, personalised service, cultural sensitivity, consistency under pressure, making passengers feel genuinely cared for." },

  // ── Multiple Choice ───────────────────────────────────────────────────────
  { id: 13, type: "multiple", question: "What is the primary purpose of the passenger safety briefing before takeoff?", category: "Safety", difficulty: "Easy", modelAnswer: "To ensure all passengers are aware of emergency procedures and safety equipment.", options: ["To entertain passengers during boarding", "To ensure passengers know emergency procedures and safety equipment", "To introduce the cabin crew team", "To explain the meal service"], correctOption: 1 },
  { id: 14, type: "multiple", question: "A passenger has an allergic reaction during the flight. What is your FIRST action?", category: "Emergency", difficulty: "Hard", modelAnswer: "Inform the senior crew member immediately so the emergency protocol can begin.", options: ["Give them water and wait", "Inform the senior crew member immediately", "Ask other passengers for antihistamines", "Announce over PA for a doctor"], correctOption: 1 },
  { id: 15, type: "multiple", question: "Which of the following is NOT an acceptable reason to upgrade a passenger?", category: "Behavioral", difficulty: "Medium", modelAnswer: "Personal preference for the passenger is not a valid or ethical reason for an upgrade.", options: ["Medical necessity approved by senior crew", "Operational reasons (overbooking)", "Personal preference for the passenger", "Unaccompanied minor needing closer supervision"], correctOption: 2 },
  { id: 16, type: "multiple", question: "How should you address a passenger who appears intoxicated and is requesting more alcohol?", category: "Situational", difficulty: "Hard", modelAnswer: "Politely decline and inform the senior crew member — serving more alcohol to an intoxicated passenger is against aviation regulations.", options: ["Serve them one last drink and then stop", "Politely decline and inform senior crew", "Ignore the request and avoid the passenger", "Ask other passengers to intervene"], correctOption: 1 },
  { id: 17, type: "multiple", question: "What does CRM stand for in aviation?", category: "Knowledge", difficulty: "Medium", modelAnswer: "Crew Resource Management — the use of all available resources to ensure safe and efficient operations.", options: ["Cabin Resource Management", "Crew Resource Management", "Customer Relations Manual", "Crisis Response Method"], correctOption: 1 },
  { id: 18, type: "multiple", question: "During an emergency evacuation, which of the following is a widely used cabin crew command?", category: "Emergency", difficulty: "Hard", modelAnswer: "A widely used evacuation command is: 'Release seatbelts, leave everything, come this way!' However, the exact wording varies by airline — you will learn your specific airline's commands during initial training.", options: ["Please gather your belongings and proceed to the exit", "Release seatbelts, leave everything, come this way", "Remain seated until further instructions", "Please walk calmly to the nearest exit"], correctOption: 1 },
  { id: 19, type: "multiple", question: "Which airline is headquartered in Doha, Qatar?", category: "Knowledge", difficulty: "Easy", modelAnswer: "Qatar Airways is headquartered at Hamad International Airport in Doha, Qatar.", options: ["Emirates", "Etihad Airways", "Qatar Airways", "flydubai"], correctOption: 2 },

  // ── Math / Time Zone ──────────────────────────────────────────────────────
  { id: 20, type: "multiple", question: "You depart Dubai (UTC+4) at 08:00 local time on a flight to London (UTC+1). The flight duration is 7 hours 30 minutes. What is the local arrival time in London?", category: "Math", difficulty: "Medium", modelAnswer: "Depart 08:00 Dubai (UTC+4) = 04:00 UTC. Add 7h30m = 11:30 UTC. London UTC+1 = 12:30 local time.", options: ["12:30", "13:30", "15:30", "11:30"], correctOption: 0 },
  { id: 21, type: "multiple", question: "A flight departs Bangkok (UTC+7) at 23:45 and arrives in Dubai (UTC+4) after 6 hours 10 minutes. What is the local arrival time in Dubai?", category: "Math", difficulty: "Hard", modelAnswer: "Depart 23:45 Bangkok (UTC+7) = 16:45 UTC. Add 6h10m = 22:55 UTC. Dubai UTC+4 = 02:55 next day.", options: ["02:55", "03:55", "01:55", "04:55"], correctOption: 0 },
  { id: 22, type: "multiple", question: "You are serving a row of 4 passengers. Each meal tray costs the airline $18.50. What is the total cost for the row?", category: "Math", difficulty: "Easy", modelAnswer: "4 × $18.50 = $74.00", options: ["$64.00", "$72.00", "$74.00", "$76.50"], correctOption: 2 },
  { id: 23, type: "multiple", question: "A flight from Doha (UTC+3) departs at 14:20 local time. It arrives in New York (UTC-5) after 14 hours 45 minutes. What is the local arrival time in New York?", category: "Math", difficulty: "Hard", modelAnswer: "Depart 14:20 Doha (UTC+3) = 11:20 UTC. Add 14h45m = 02:05 UTC next day. New York UTC-5 = 21:05 same day.", options: ["21:05", "22:05", "20:05", "23:05"], correctOption: 0 },
  { id: 24, type: "multiple", question: "You have 47 economy passengers and each is allowed 23kg of checked baggage. What is the total maximum checked baggage weight for the cabin?", category: "Math", difficulty: "Medium", modelAnswer: "47 × 23 = 1,081 kg", options: ["1,061 kg", "1,081 kg", "1,101 kg", "1,021 kg"], correctOption: 1 },
  { id: 25, type: "multiple", question: "A flight departs Abu Dhabi (UTC+4) at 06:30 and arrives in Paris (UTC+2) at 11:45 local Paris time. What is the actual flight duration?", category: "Math", difficulty: "Hard", modelAnswer: "Depart 06:30 Abu Dhabi (UTC+4) = 02:30 UTC. Arrive 11:45 Paris (UTC+2) = 09:45 UTC. Duration = 7 hours 15 minutes.", options: ["5h 15min", "6h 15min", "7h 15min", "8h 15min"], correctOption: 2 },
];

const _rdAirlineNotes = {
  emirates: {
    1: "Candidates widely report that Emirates uses an ATS called Taleo. Emirates is widely reported to receive 15,000+ applications per month — candidates consistently report that rejected CVs receive an automated response with no indication any human reviewed the application.",
    2: "Emirates minimum requirements: 160cm height, 212cm arm reach (standing on tiptoes). Women: signature red lip and neat bun or updo are expected at assessment. All tattoos must be completely covered by the uniform at all times.",
    3: "Candidates widely report that Emirates uses a platform called HireVue — widely reported to include multiple video questions, an English section, and a gamified cognitive task. Candidates widely report having around 30 seconds to prepare and 2–3 minutes to answer per video question. The gamified task is widely reported as the most commonly underestimated stage. Verify current platform details directly with Emirates as formats may change.",
    4: "Candidates widely report interview questions including 'Tell me about a time you went above and beyond for a customer' and 'Why Emirates?' Candidates widely report that mentioning travel as motivation is an immediate rejection trigger.",
    5: "Candidates widely report that Emirates assessment days have multiple observers watching all candidates simultaneously. The scenario is deliberately open-ended — no right answers exist. Candidates widely report that recruiters observe from the moment you arrive, including during registration and breaks.",
    6: "Emirates brand positioning: 'Fly Better' — associated publicly with excellence, diversity, innovation, and safety. Confirmed reapplication wait: 6 months. Post-interview wait: 30 days to 6 months. Maintain the same warm, authentic energy in every informal moment as in the formal interview.",
  },
  qatar: {
    1: "Qatar Airways uses its own careers portal. Application volume is extremely high for a Doha-based operation. Candidates widely report fast automated screening — a clean, keyword-rich single-column CV is as critical here as at any Gulf carrier.",
    2: "Qatar Airways height and arm reach requirements are similar to Emirates — verify directly before applying. Polished, elegant presentation is expected. All tattoos must be covered by the airline's uniform. Candidates report a refined, high-standard grooming expectation.",
    3: "Qatar Airways uses its own online portal with English assessment and screening questions. Candidates widely report a structured multi-stage screening process. Prepare STAR-format answers and practise written English before completing your application.",
    4: "Qatar Airways uses STAR-format interview questions. Candidates report that 'Why Qatar?' answers mentioning travel or luxury aspirations are flagged immediately. Qatar's 'Going Places Together' brand is widely associated with hospitality, quality, and care — these themes should be reflected in your answers. Verify current values on Qatar Airways' official careers page.",
    5: "Qatar Airways group exercises follow a similar observation framework to other Gulf carriers. Candidates report that cultural sensitivity and genuine warmth toward all group members are specifically noted — consistent with the airline's deep hospitality identity.",
    6: "Qatar Airways brand: 'Going Places Together' — widely associated with hospitality, quality, and care rooted in Qatari heritage. Candidates report that genuine warmth and cultural awareness are closely observed throughout the entire assessment day. Always verify current values on the Qatar Airways official careers page.",
  },
  etihad: {
    1: "Etihad uses its own online careers portal. Candidates report ATS-style CV filtering similar to other Gulf carriers. A clean, single-column, keyword-rich document is essential — the same formatting errors that trigger rejections at Emirates apply equally here.",
    2: "Etihad height and arm reach requirements are similar to Emirates — verify directly before applying. A refined, understated elegance is expected in grooming and presentation. All tattoos must be completely covered by the airline's uniform.",
    3: "Etihad's online application includes screening questions and an English proficiency component. Candidates report a structured assessment format comparable to other Gulf carriers. Prepare STAR-based answers and practise written English before completing your application.",
    4: "Etihad uses STAR-format interview questions. Candidates widely report that considered, thoughtful responses — reflecting genuine empathy and care — resonate more strongly than high-energy rehearsed answers. Research Etihad's current stated values on their official careers page before your interview.",
    5: "Etihad group exercises mirror the observation criteria of other Gulf carriers. Candidates widely report that genuine empathy toward other group members and a considered, calm approach are particularly valued — bring this to how you participate, not just what you say.",
    6: "Candidates widely report that Etihad's culture centres on empathy, diversity, and genuine responsibility toward passengers and colleagues. Those who come across as warm and considered — not just polished — are reported to progress. Reapplication wait: verify directly with Etihad. Always check their official careers page for current values and requirements.",
  },
  flydubai: {
    1: "flydubai uses an online application portal. The process is reported as less intensive than Emirates but a clean, professional, keyword-rich CV remains essential. Candidates report faster response times than at the Big Three carriers.",
    2: "flydubai height and arm reach requirements — verify directly with flydubai before applying. Professional and conservative grooming is expected. All tattoos must be covered by the uniform. Candidates report a professional standard consistent with a Gulf carrier.",
    3: "flydubai's online application is reported as less intensive than Emirates. However, candidates report English proficiency checks and screening questions that form part of the assessment. Complete your application carefully — it is your first impression.",
    4: "flydubai uses structured interview questions with STAR-format expectations. Candidates report a more conversational tone than Emirates, but genuine service motivation and specific real-life examples are equally important. Generic or travel-focused answers are flagged.",
    5: "flydubai assessment days are reported as smaller in scale than Emirates but follow the same group exercise observation format. Warmth, inclusion, and active listening are as important here as at any Gulf carrier — recruiters observe all candidates simultaneously.",
    6: "Candidates widely report that flydubai's culture focuses on reliability, value for money, and making travel accessible to more people. Showing genuine enthusiasm for this mission — rather than a five-star service aspiration — is reported to resonate well. Post-interview wait: approximately 25 days (widely reported by candidates). Reapply wait: verify directly with flydubai.",
  },
  airarabia: {
    1: "Air Arabia uses its own careers portal. Application volume is lower than at the Big Three, but a clean, single-column, keyword-rich CV remains essential. Candidates report faster response times and a more direct application process overall.",
    2: "Air Arabia height and arm reach requirements — verify directly with Air Arabia before applying. Professional and conservative grooming consistent with a Gulf carrier uniform standard is expected. All tattoos must be covered by the airline's uniform.",
    3: "Air Arabia's online screening is typically reported as more straightforward than the Big Three. However, a strong English proficiency check and a carefully completed application are essential — they form part of the recruiter's first impression of you.",
    4: "Air Arabia uses structured interview questions focused on genuine hospitality and service commitment. Candidates report that answers reflecting the airline's community-focused, accessibility-driven identity perform significantly better than generic service answers.",
    5: "Air Arabia group exercises reflect the airline's community-focused, warmth-first identity. Being genuinely inclusive and listening actively are reported as particularly valued — consistent with the airline's accessibility and warmth mission.",
    6: "Candidates widely report that Air Arabia's culture values affordability, warmth, and connecting communities. Authenticity and genuine hospitality instinct matter more here than polish. Post-interview response: approximately 2 weeks (widely reported by candidates). Reapply wait: verify directly with Air Arabia.",
  },
};

const _rdReasons = [
  {
    id: 1,
    emoji: "📄",
    label: "REASON 1",
    title: "Your CV Was Filtered Before a Human Saw It",
    subtitle: "The ATS trap is widely reported to eliminate the majority of applicants before any recruiter reads a single word.",
    accentColor: "text-red-400",
    borderColor: "border-red-500/30",
    bgColor: "from-red-950/40 to-slate-800",
    badgeBg: "bg-red-500/20 text-red-300 border-red-500/30",
    free: true,
    why: `Gulf carriers collectively receive hundreds of thousands of cabin crew applications every year. To manage this volume, airlines use Applicant Tracking Systems (ATS) — computer programs that scan CVs before any human reads them. If your CV fails the scan, you receive an automated rejection.

The ATS reads your document the way a computer reads text — left to right, top to bottom. Multi-column layouts, text boxes, embedded graphics, and design elements confuse the parser. Candidates widely report that plain, single-column Word documents consistently outperform beautifully designed Canva CVs — at every Gulf carrier. This is not about talent or experience. It is about format.`,
    testimonial: {
      quote: "I applied to the same airline three times using a two-column Canva CV I was really proud of. Each time: silence, then rejection within 48 hours. A friend who was already flying told me to delete the design entirely and use a plain Word document with the exact keywords from the job listing. My next application got me an assessment day invitation within 11 days.",
      source: "Composite experience drawn from cabin crew applicant community forums",
    },
    fix: [
      { step: "Use a single-column Word (.docx) document only — no Canva, no tables, no columns, no graphics", icon: "✅" },
      { step: "Add these keywords naturally in your experience sections: 'customer service,' 'hospitality,' 'emergency procedures,' 'multicultural team,' 'safety awareness,' 'first aid certified,' 'conflict resolution,' 'cabin crew'", icon: "🔑" },
      { step: "State height and arm reach explicitly — e.g. 'Height: 165cm | Arm Reach: 212cm (standing on tiptoes)' — in your personal profile header", icon: "📏" },
      { step: "Include a professional photo (Gulf airlines expect this — Western advice to omit photos does NOT apply here)", icon: "📸" },
      { step: "Keep it to 1–2 pages maximum with clear section headers: Personal Profile, Work Experience, Education, Skills, Languages", icon: "📐" },
      { step: "Answer the motivational field ('Why do you want to join [Airline]?') in full — never say 'I love to travel' or 'I want to see the world.' Candidates widely report this as an immediate rejection trigger across all Gulf carriers", icon: "⚠️" },
    ],
    youtubeSearch: "Gulf airline cabin crew CV ATS tips 2024",
    youtubeLabel: "How to Write an ATS-Proof Cabin Crew CV",
    stat: "All Gulf carriers use automated CV screening before human review",
  },
  {
    id: 2,
    emoji: "👗",
    label: "REASON 2",
    title: "Your Appearance Didn't Pass the Grooming Check",
    subtitle: "Recruiters assess presentation within moments of seeing you — before you say a word.",
    accentColor: "text-pink-400",
    borderColor: "border-pink-500/30",
    bgColor: "from-pink-950/40 to-slate-800",
    badgeBg: "bg-pink-500/20 text-pink-300 border-pink-500/30",
    free: true,
    why: `Cabin crew are the physical embodiment of the airline's brand. Emirates, Qatar Airways, Etihad, flydubai, and Air Arabia all invest in their crew's presentation — and they expect candidates to match their standards precisely. At CV drop-off and at the grooming check (which happens early in the assessment day), recruiters assess candidates against a strict checklist.

Visible exposed tattoos, incorrect makeup, visible piercings, the wrong attire, or the wrong hair style can all result in elimination — even if your interview performance is excellent. Candidates widely report being eliminated at this stage without understanding why, because no Gulf carrier provides this feedback.`,
    testimonial: {
      quote: "I made it to the final interview at a Gulf carrier twice and both times received a rejection. I later spoke to someone who had been on the panel and they mentioned my exposed forearm tattoo — which I thought was small and unimportant. Gulf carriers require all tattoos to be fully covered by the uniform at all times. I hadn't checked the specific uniform coverage areas.",
      source: "Composite experience drawn from cabin crew applicant community forums",
    },
    fix: [
      { step: "Skin: Clear, well-groomed skin is expected across all Gulf carriers. See a dermatologist if needed — this is a professional presentation requirement", icon: "✨" },
      { step: "Tattoos: Must be completely covered by the airline's uniform at all times. Check the specific uniform coverage for the carrier you are applying to — even a small tattoo on the inner forearm may be visible", icon: "🚫" },
      { step: "Women — Hair: Neat bun or updo, no loose hair. All Gulf carriers expect professional hair presentation at assessment day", icon: "💇‍♀️" },
      { step: "Women — Makeup: Professional, refined, and complete. Each airline has a signature crew look — arriving groomed to match their brand signals awareness and intent. Select your airline above for specific guidance", icon: "💄" },
      { step: "Women — Attire: Pencil skirt or tailored trousers, professional blazer, heels preferred across Gulf carriers. Conservative neckline. No excessive jewellery", icon: "👠" },
      { step: "Men — Be completely clean-shaven. Smart suit, polished shoes, conservative tie. Hair neatly styled. These expectations apply consistently across all five Gulf carriers", icon: "👔" },
      { step: "Height and reach: Requirements vary by airline. Select your airline above for specific details, or verify directly with each carrier before applying", icon: "📏" },
    ],
    youtubeSearch: "Gulf airline cabin crew grooming standards assessment day",
    youtubeLabel: "Grooming Standards for Gulf Airline Assessment Days",
    stat: "Presentation assessed immediately at assessment day — at every Gulf carrier",
  },
  {
    id: 3,
    emoji: "🎥",
    label: "REASON 3",
    title: "You Failed the Online Screening Stage",
    subtitle: "The online screening stage eliminates a significant number of applicants — before you ever meet a recruiter.",
    accentColor: "text-blue-400",
    borderColor: "border-blue-500/30",
    bgColor: "from-blue-950/40 to-slate-800",
    badgeBg: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    free: false,
    why: `Every major Gulf carrier now requires candidates to complete an online screening stage before being invited to an assessment day. Each airline uses its own platform or portal, with components that typically include an English language assessment and situational or STAR-format questions.

Candidates widely report the online screening stage as a significant elimination point. The most common mistake is treating it as less "real" than a face-to-face interview. The digital record goes directly to the recruitment team — every hesitation, restart, and rushed answer is logged. Select your airline above to see what to expect on their specific platform.`,
    testimonial: {
      quote: "I thought the online video interview would be easy because English is my strong suit. What I didn't prepare for was a timed cognitive task — it tests your processing speed under time pressure. I hesitated, started and restarted, and ran out of time. I never made it to the assessment day.",
      source: "Composite experience from candidate accounts shared across public recruitment forums",
    },
    fix: [
      { step: "Set up your recording environment before the interview: good lighting (face the light, don't sit with a window behind you), clean background, stable internet, phone or laptop at eye level", icon: "💡" },
      { step: "Practice looking directly into the camera lens — not at your own face on screen. This creates genuine eye contact", icon: "👁️" },
      { step: "Study the STAR method: Situation → Task → Action → Result. Practice answering out loud until it feels natural, not recited. Every answer must have all four parts", icon: "⭐" },
      { step: "English sections typically include: reading comprehension passages, multiple-choice sentence completions, and a short written response. Practice all three formats", icon: "📝" },
      { step: "Time yourself. Candidates widely report approximately 30 seconds to prepare and 2–3 minutes to answer per question. Speak at 75% of your normal speed — nervous candidates speak too fast and lose clarity", icon: "⏱️" },
      { step: "Complete your online screening for all airlines you're applying to in the same preparation window — the skills overlap heavily across all five carriers", icon: "📋" },
    ],
    youtubeSearch: "Gulf airline cabin crew online video interview tips 2024",
    youtubeLabel: "Online Screening & Video Interview — Gulf Airline Cabin Crew Guide",
    stat: "Online screening: widely reported as a high elimination stage across Gulf carriers",
  },
  {
    id: 4,
    emoji: "🎭",
    label: "REASON 4",
    title: "Your Answers Sounded Rehearsed or Generic",
    subtitle: "Gulf airline recruiters across all five carriers are trained to identify scripted, memorised answers — and they eliminate candidates who give them.",
    accentColor: "text-amber-400",
    borderColor: "border-amber-500/30",
    bgColor: "from-amber-950/40 to-slate-800",
    badgeBg: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    free: false,
    why: `This is one of the most commonly cited reasons candidates fail the final interview despite feeling it went well. The recruiter is not looking for perfect answers — they're looking for real people with genuine stories. When candidates memorise scripted responses, their answers lack the specific detail, emotional truth, and natural language that makes a story believable.

All five Gulf carriers — Emirates, Qatar Airways, Etihad, flydubai, and Air Arabia — use STAR-format situational questions at interview stage. The failure is almost always in the detail: stories without a clear Result, conflict examples where the candidate claims they "never really have conflicts," or motivational answers that mention travel — something candidates consistently report as an immediate rejection trigger across every Gulf airline interview.`,
    testimonial: {
      quote: "I attempted the same airline six times. Every time I made it to the final interview and was rejected. A coach reviewed my answers and told me immediately: 'Your story is good but you never tell them what happened in the end. You always describe what you did but never the outcome. The recruiter needs a complete story.' That was it. One change — adding the result — and I passed on my seventh attempt.",
      source: "Composite experience drawn from cabin crew applicant community forums",
    },
    fix: [
      { step: "NEVER say: 'I want to be cabin crew because I love to travel / meet people / see the world.' This is consistently flagged as an immediate red flag across all Gulf airline interview processes. Speak about service, safety, and the specific airline's values", icon: "🚫" },
      { step: "Every answer must follow STAR completely: Situation (brief context), Task (your specific role), Action (exactly what YOU did — use 'I', not 'we'), Result (measurable or observable outcome)", icon: "⭐" },
      { step: "For conflict questions: If you say 'I rarely have conflicts' or 'I get along with everyone' — you will be eliminated. Every professional has experienced conflict. Prepare a real example that shows you resolved it professionally", icon: "⚡" },
      { step: "Practice your answers OUT LOUD until they sound like a natural conversation, not a performance. Record yourself and listen back — if you sound like you're reading from a script, practice more", icon: "🎙️" },
      { step: "Prepare 8–10 real personal stories from your work history that cover: excellent customer service, working under pressure, handling conflict, making a decision without manager guidance, a mistake you made and learned from, teamwork", icon: "📖" },
      { step: "Weakness questions: Never say 'I'm a perfectionist' or 'I work too hard.' Pick a genuine area of development and show how you're actively addressing it", icon: "💪" },
    ],
    youtubeSearch: "cabin crew final interview STAR method fail tips 2024",
    youtubeLabel: "Why Candidates Fail the Cabin Crew Final Interview",
    stat: "Scripted answers: one of the most widely cited reasons for final-stage rejection",
  },
  {
    id: 5,
    emoji: "👥",
    label: "REASON 5",
    title: "You Failed the Group Exercise",
    subtitle: "Recruiters watch every candidate simultaneously. They're not looking for the best idea — they're watching how you behave.",
    accentColor: "text-teal-400",
    borderColor: "border-teal-500/30",
    bgColor: "from-teal-950/40 to-slate-800",
    badgeBg: "bg-teal-500/20 text-teal-300 border-teal-500/30",
    free: false,
    why: `The group exercise is the assessment stage most candidates misunderstand. Candidates focus entirely on what to say — what solutions, what ideas, what argument — when the recruiter is watching how you interact with other people. There are no right or wrong answers to the scenarios given. The exercise is designed to be open-ended precisely so that no single "correct" answer exists.

Multiple recruiters observe simultaneously, watching for: listening behaviour, how candidates treat quieter group members, whether they interrupt, how they respond to disagreement, and whether they maintain composure under social pressure. This maps directly to the cabin crew role — where crew interact with hundreds of passengers of different cultures, temperaments, and needs in a high-pressure environment. Candidates widely report this assessment pattern across all five Gulf carriers.`,
    testimonial: {
      quote: "I went into three Gulf airline assessment days thinking I needed to show leadership — speak up, contribute ideas, make the group follow a clear direction. Three rejections. Then someone who had passed told me: 'They're not hiring a manager. They want someone their passengers would feel safe with. Be warm, include everyone, listen more than you talk.' I passed the fourth time after completely changing my approach.",
      source: "Composite experience drawn from cabin crew applicant community forums",
    },
    fix: [
      { step: "Use inclusive language throughout: 'What does everyone think about this?', 'I'd like to build on what [name] said...', 'We as a group feel...', 'That's a great point — and I'd add...'", icon: "🤝" },
      { step: "If someone is quiet: actively bring them in. 'I'd love to hear what [name] thinks about this.' This is the team behaviour Gulf airline recruiters look for — it mirrors how crew support every passenger on board", icon: "💬" },
      { step: "Do not dominate. Speaking for more than 40% of the time is a red flag. Even if your ideas are good, monopolising the conversation signals poor team awareness", icon: "⚖️" },
      { step: "Do not stay silent. If you contribute fewer than 3–4 substantive points, you won't be noticed. The balance is: engaged but not dominant", icon: "🎯" },
      { step: "Never interrupt. Even if the other person is wrong. Wait for a natural pause, then contribute. Interrupting is one of the fastest ways to be eliminated across all Gulf airline assessment days", icon: "🤫" },
      { step: "Stay warm and calm throughout. If the discussion becomes heated, a calm de-escalation ('Can we refocus on the key question?') is exactly what recruiters want to see", icon: "😌" },
      { step: "Remember: recruiters observe you in breaks and during lunch too. The 'interview' begins when you walk through the door and doesn't end until you leave the building", icon: "👀" },
    ],
    youtubeSearch: "Gulf airline cabin crew assessment day group exercise tips",
    youtubeLabel: "Group Exercise Tips — Gulf Airline Assessment Day",
    stat: "Candidates widely report recruiters observing ALL candidates simultaneously",
  },
  {
    id: 6,
    emoji: "🧠",
    label: "REASON 6",
    title: "\"Cultural Fit\" — The Silent Rejection",
    subtitle: "The most common undisclosed rejection reason — and the hardest to argue with, because it's deliberately subjective.",
    accentColor: "text-purple-400",
    borderColor: "border-purple-500/30",
    bgColor: "from-purple-950/40 to-slate-800",
    badgeBg: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    free: false,
    why: `The rejection letter always says the same thing: "We regret to inform you that we have decided not to progress with your application." No reason given. No feedback. No indication of what went wrong. For many candidates — especially those who reached the final interview — this is the most devastating outcome because it offers nothing to improve on.

'Cultural fit' is the umbrella reason that covers everything from low energy to personality mismatch to values that don't align with the airline. All five Gulf carriers have specific internal cultures they protect carefully. Candidates also widely report that some recruitment events have specific intake targets that are outside any individual candidate's control — meaning some rejections may reflect factors unrelated to performance. What you can control: your energy, your alignment with their publicly stated values, and your consistency throughout the entire day. Select your airline above to see their specific values framework.`,
    testimonial: {
      quote: "I passed every stage of the assessment day with flying colours — grooming check, English test, group exercise, and I thought my final interview was excellent. Rejection email that evening. I contacted a coach who had been a recruiter at that airline. She told me: 'You were performing. The recruiter could feel the difference between who you were in the formal interview and who you were during the break. They want to see the same person in both.' That stuck with me.",
      source: "Composite experience drawn from cabin crew applicant community forums",
    },
    fix: [
      { step: "Research the airline's values before your interview. Select your airline above to see the specific values framework for each carrier. Prepare one real personal example for each value", icon: "🔍" },
      { step: "Mirror their language in your answers. Use phrases like 'world-class service,' 'diverse team,' 'safety-first culture,' 'passenger wellbeing.' Recruiters register subconsciously when candidates speak their language", icon: "🗣️" },
      { step: "Maintain consistent, warm energy ALL DAY. The formal interview is not the only moment you're being assessed. Your behaviour during registration, in the waiting area, during breaks, and at lunch is all observed", icon: "⚡" },
      { step: "Genuine enthusiasm reads differently from performed enthusiasm. Find the specific thing about this airline that genuinely excites you and speak from that place. Recruiters have interviewed thousands of candidates — they know the difference", icon: "❤️" },
      { step: "Prepare one thoughtful question to ask at the end of the final interview. Something specific to the airline and role, not something you could Google. Example: 'How does the crew culture here support new joiners adapting to life at base?'", icon: "❓" },
      { step: "If rejected for 'cultural fit' after addressing all of the above: understand that some rejections involve factors outside your control. Reapplication timeframes vary by airline — check directly with each carrier. This is not a reflection of your worth", icon: "🔄" },
    ],
    youtubeSearch: "cabin crew cultural fit rejection Gulf airline final interview",
    youtubeLabel: "Understanding the 'Cultural Fit' Rejection — Cabin Crew",
    stat: "Most commonly cited undisclosed reason for final-stage rejection",
  },
];

// Rejection Decoded is a free/paid split: reasons 1-2 (and their airline notes)
// ship in the client bundle as the lead magnet. Only the PAID parts live here —
// reasons 3-6 and their airline notes — released to Standard+ members.
const rejectionDecodedPaid = {
  reasons: _rdReasons.filter((r) => !r.free),
  airlineNotes: Object.fromEntries(
    Object.entries(_rdAirlineNotes).map(([air, notes]) => [
      air,
      Object.fromEntries(Object.entries(notes).filter(([id]) => Number(id) > 2)),
    ])
  ),
};

// After The Interview is a free/paid split: phases 1-2 (The Silence, The Medical)
// ship in the client bundle as the lead magnet. Only the PAID phase BODIES live
// here — the content + action-checklist insights for phases 3, 4, 5 — released to
// Standard+ members. The phase shells (title/headline/tagline/colours) stay in the
// bundle so free users see locked previews.
const afterTheInterviewPaid = {
  phases: [
    {
      id: 3,
      content: `The offer letter arrives after medical clearance and background checks. It contains your salary, benefits, contract terms, base location, and either your Date of Joining or a note that it will be confirmed shortly.

DOJ timing depends entirely on the airline's training class schedule. Classes run in cohorts at fixed intervals. If your medical clears the same week a class is forming, your DOJ could be days away. If you just missed a cycle, you wait for the next. The gap between offer and DOJ varies from immediate to several months — and candidates who have already resigned find this gap brutal.

The rule is simple: an offer letter without a confirmed DOJ date is still a conditional offer. Keep your current job until both are in hand.`,
      insights: [
        { icon: "📋", text: "Read every line of your offer letter. Check salary structure, contract duration, probation period, and every condition before signing" },
        { icon: "⏰", text: "Accept within the deadline stated — typically 5–7 days. Request an extension in writing if you need it" },
        { icon: "🚫", text: "Do NOT resign from your current employer until you have both a signed offer letter AND a confirmed DOJ date" },
        { icon: "🛂", text: "The airline arranges your employment visa — you do not apply separately. Never pay a third party claiming to assist with this" },
        { icon: "📑", text: "Start apostilling documents now: birth certificate, criminal record clearance, degree or diploma. Allow 2–6 weeks depending on your country" },
        { icon: "✉️", text: "If your DOJ is delayed beyond what was communicated, contact recruitment by email and keep every exchange in writing" },
      ],
    },
    {
      id: 4,
      content: `Most candidates spend the DOJ wait checking their email. The ones who perform best in training spend it preparing.

Initial joining training is intense — typically 7.5 to 8 weeks for the Big 3 carriers, shorter for flydubai and Air Arabia. Days start early, sessions run long, and assessments are continuous throughout. You are trained and certified on all aircraft types the airline operates from the start. Failing any module means remedial training or, in serious cases, failing out entirely.

What most candidates don't realise: the initial joining training is only the beginning. After completing it, you fly under senior crew supervision for a period (6 months at Emirates). Annual recurrent SEP training is then mandatory every year by law — typically a 2-day refresher covering door operations, fire procedures, medical scenarios, and CRM. When the airline introduces new aircraft types to its fleet, all crew undergo additional aircraft-specific type training before those aircraft enter service.

The practical side of relocation is equally real. New country, new banking, new transport, new cost of living — all of this hits in the first two weeks while you are also managing the most demanding professional training of your life. What you sort now, you will not have to sort under pressure.`,
      insights: [
        { icon: "🏃‍♀️", text: "Fitness: training is physically demanding with early starts and long practical sessions. Build stamina and endurance now, not on arrival day" },
        { icon: "💰", text: "Financial buffer: calculate 2–3 months of living expenses minimum. Airline cities are expensive, and salary is paid monthly — plan for the gap" },
        { icon: "📑", text: "Documents: apostille birth certificate, criminal record clearance, degree certificate. Start now — many countries take 4–6 weeks" },
        { icon: "🗣️", text: "Arabic basics: شكراً (shukran = thank you) · أهلاً (ahlan = hello) · من فضلك (min fadlak = please). Ten phrases signals real cultural respect" },
        { icon: "🌆", text: "City prep: learn the key neighbourhoods, public transport system, and app-based services for your base city before you arrive" },
        { icon: "🏦", text: "Banking: open a Wise or Revolut account for international transfers now. Your local bank account comes after you arrive — do not wait" },
        { icon: "🧠", text: "Mental health: stay connected to your support network. The anticipation plus the uncertainty is a real emotional challenge. Name it — it helps" },
      ],
    },
    {
      id: 5,
      content: `A mandatory wait period applies after rejection at any stage — typically 6 months for the Big 3, with shorter or unconfirmed periods for flydubai and Air Arabia. The clock starts from the date your rejection is confirmed.

Many cabin crew now flying for Gulf carriers failed on their first, second, or even third attempt. The pattern across successful candidates is consistent: they identified the exact stage they failed, targeted that specific weakness, and approached the next application as a materially different candidate. A repeat attempt without a specific improvement plan produces the same result.

The 6 months are not dead time. They are the best preparation window you will ever have — because now you know exactly what the process looks like from the inside.`,
      insights: [
        { icon: "🧘‍♀️", text: "Month 1: Process the rejection properly. Allow 2–3 weeks before starting your debrief. Rushed re-preparation and emotional burnout produce weak applications" },
        { icon: "🔍", text: "Month 1–2: Identify the exact stage you failed. Be honest. Use the Rejection Decoded section of this guidebook to diagnose your specific weak point" },
        { icon: "🎯", text: "Month 2–3: Target that stage exclusively. Failed HireVue? Daily English and STAR practice. Failed group exercise? Seek out group settings and practise inclusive language every day" },
        { icon: "🎥", text: "Month 3–4: Film yourself answering interview questions weekly. Watch them back. The gap between how you think you come across and how you actually appear is almost always larger than expected" },
        { icon: "✨", text: "Month 4–5: Refresh your materials — new professional photos, updated CV, revised application answers. Do not resubmit unchanged application materials" },
        { icon: "🚀", text: "Month 6: Apply — as a different, better-prepared candidate. Treat this as a new start, not a retry" },
        { icon: "✈️", text: "During the Big 3 wait: consider applying to flydubai or Air Arabia. The interview skills transfer directly — and the experience strengthens your Big 3 application" },
      ],
    },
  ],
};

const CONTENT = {
  "cv-guide":            { data: cvGuide,               requires: "standard" },
  "interview-questions": { data: interviewQuestions,    requires: "standard" },
  "group-discussion":    { data: groupDiscussionTopics, requires: "premium"  },
  "mock-exam":           { data: mockExamQuestions,     requires: "standard" },
  "rejection-decoded":   { data: rejectionDecodedPaid,  requires: "standard" },
  "after-the-interview": { data: afterTheInterviewPaid, requires: "standard" },
};

const TIER_RANK = { free: 0, standard: 1, premium: 2 };

export const handler = async (event) => {
  const ALLOWED_ORIGIN = "https://cabincrewguidebook.com";
  const cors = {
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
  const json = (statusCode, body) => ({
    statusCode,
    headers: { ...cors, "Content-Type": "application/json", "Cache-Control": "private, no-store" },
    body: JSON.stringify(body),
  });

  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers: cors, body: "" };
  if (event.httpMethod !== "POST") return json(405, { error: "Method not allowed" });

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    return json(500, { error: "Server not configured." });
  }

  // 1) Which content is being asked for?
  let key;
  try {
    ({ key } = JSON.parse(event.body || "{}"));
  } catch {
    return json(400, { error: "Bad request." });
  }
  const entry = CONTENT[key];
  if (!entry) return json(404, { error: "Unknown content." });

  // 2) Require a valid Supabase session.
  const authHeader = event.headers.authorization || event.headers.Authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  if (!token) return json(401, { error: "Please sign in to view this." });

  let email;
  try {
    const userRes = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      headers: { apikey: SUPABASE_SERVICE_KEY, Authorization: `Bearer ${token}` },
    });
    if (!userRes.ok) return json(401, { error: "Your session has expired. Please sign in again." });
    const authUser = await userRes.json();
    email = authUser?.email;
    if (!email) return json(401, { error: "Invalid session." });
  } catch {
    return json(401, { error: "Could not verify your session." });
  }

  // 3) Read the tier SERVER-SIDE. Never trust a tier sent by the client.
  let tier = "free";
  try {
    const tierRes = await fetch(
      `${SUPABASE_URL}/rest/v1/users?email=eq.${encodeURIComponent(email)}&select=tier`,
      { headers: { apikey: SUPABASE_SERVICE_KEY, Authorization: `Bearer ${SUPABASE_SERVICE_KEY}` } }
    );
    const rows = await tierRes.json();
    tier = rows?.[0]?.tier || "free";
  } catch {
    return json(500, { error: "Could not verify your membership." });
  }

  // 4) Enforce entitlement.
  if ((TIER_RANK[tier] ?? 0) < (TIER_RANK[entry.requires] ?? 99)) {
    return json(403, { error: "upgrade_required", requires: entry.requires, tier });
  }

  return json(200, { content: entry.data });
};
