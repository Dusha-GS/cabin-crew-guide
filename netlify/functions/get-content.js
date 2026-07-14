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

const CONTENT = {
  "cv-guide":            { data: cvGuide,               requires: "standard" },
  "interview-questions": { data: interviewQuestions,    requires: "standard" },
  "group-discussion":    { data: groupDiscussionTopics, requires: "premium"  },
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
