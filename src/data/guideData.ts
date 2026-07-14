// src/data/guideData.ts
// All static content for the Cabin Crew Interview Guidebook

// ─── DISCLAIMER ───────────────────────────────────────────────────────────────
// All airline requirements, processes, fleet figures, and route information
// shown in this guide are based on publicly available information and
// candidate-reported experiences. They are subject to change at any time.
// Always verify current requirements directly with each airline before applying.
// ─────────────────────────────────────────────────────────────────────────────

export const airlines = [
  {
    id: "emirates",
    name: "Emirates",
    base: "Dubai, UAE",
    hub: "Dubai International (DXB)",
    founded: "1985",
    fleet: "260+ aircraft",
    destinations: "150+ destinations",
    color: "#C41E3A",
  },
  {
    id: "etihad",
    name: "Etihad Airways",
    base: "Abu Dhabi, UAE",
    hub: "Abu Dhabi International (AUH)",
    founded: "2003",
    fleet: "100+ aircraft",
    destinations: "68+ destinations",
    color: "#C8A96E",
  },
  {
    id: "qatar",
    name: "Qatar Airways",
    base: "Doha, Qatar",
    hub: "Hamad International (DOH)",
    founded: "1997",
    fleet: "200+ aircraft",
    destinations: "160+ destinations",
    color: "#8B0000",
  },
  {
    id: "flydubai",
    name: "flydubai",
    base: "Dubai, UAE",
    hub: "Dubai International (DXB) T2",
    founded: "2009",
    fleet: "70+ aircraft",
    destinations: "90+ destinations",
    color: "#FF6B35",
  },
  {
    id: "airarabia",
    name: "Air Arabia",
    base: "Sharjah, UAE",
    hub: "Sharjah International (SHJ)",
    founded: "2003",
    fleet: "60+ aircraft",
    destinations: "170+ destinations",
    color: "#E4002B",
  },
];

export const requirements = {
  emirates: {
    minAge: 21,
    minHeight: "212cm arm reach (barefoot, tiptoes allowed)",
    education: "High school / secondary school minimum",
    experience: "Customer-facing or hospitality experience preferred",
    languages: "Fluent English required; additional languages a plus",
    passport: "Valid passport with ability to travel worldwide",
    swimming: "Must be able to swim 25m unaided",
    medical: "Fit medical examination required",
    other: [
      "No visible piercings — women are permitted one stud earring per earlobe only; men are not permitted any piercings or jewellery in uniform (widely reported by candidates)",
      "No visible tattoos when in uniform",
      "Clear complexion — airlines widely report this as a grooming standard; verify current requirements directly with Emirates",
      "Arm reach of 212cm minimum — reach test is performed barefoot (shoes removed); tiptoes are allowed",
      "Willingness to relocate to Dubai",
    ],
  },
  etihad: {
    minAge: 21,
    minHeight: "212cm arm reach (barefoot, tiptoes allowed — verify directly with Etihad)",
    education: "High school minimum",
    experience: "Hospitality or customer service preferred",
    languages: "Fluent English; Arabic or other languages advantageous",
    passport: "Valid passport enabling worldwide travel",
    swimming: "Must be able to swim",
    medical: "Fit medical examination",
    other: [
      "Willingness to relocate to Abu Dhabi",
      "Flexible schedule including nights, weekends, holidays",
      "No visible tattoos in uniform",
      "Professional appearance at all times",
      "Valid driving license may be advantageous — verify directly with Etihad",
    ],
  },
  qatar: {
    minAge: 21,
    minHeight: "212cm arm reach — performed barefoot; tiptoes allowed (verify directly with Qatar Airways)",
    education: "High school certificate minimum",
    experience: "Customer service experience preferred",
    languages: "Excellent English; additional languages valued",
    passport: "Eligible for worldwide travel",
    swimming: "Able to swim 25m",
    medical: "Pass Qatar Airways medical examination",
    other: [
      "Willingness to relocate to Doha, Qatar",
      "No visible tattoos",
      "Polished, professional presentation",
      "Strong interpersonal and cultural awareness",
      "Physically fit for duty requirements",
    ],
  },
  flydubai: {
    minAge: 21,
    minHeight: "212cm arm reach (verify directly with flydubai)",
    education: "High school certificate",
    experience: "Customer-facing experience",
    languages: "Fluent English required",
    passport: "Valid passport, unrestricted travel",
    swimming: "Basic swimming ability",
    medical: "Medical fitness certificate",
    other: [
      "Willingness to be based in Dubai",
      "Flexible to work irregular hours",
      "No visible tattoos in uniform",
      "Customer-focused attitude",
    ],
  },
  airarabia: {
    minAge: 20,
    minHeight: "Min. 160cm (female) / 170cm (male) — ability to reach overhead compartments required; verify exact reach requirement directly with Air Arabia",
    education: "Secondary school certificate",
    experience: "Customer service background",
    languages: "English fluency; Arabic a strong advantage",
    passport: "Valid passport",
    swimming: "Able to swim",
    medical: "Medically fit",
    other: [
      "Based in Sharjah, UAE",
      "Flexible working hours",
      "Cultural awareness and sensitivity",
      "No visible tattoos in uniform",
    ],
  },
};

export const interviewStages = {
  emirates: [
    {
      stage: 1,
      title: "Online Application",
      description: "Submit your CV, photos, and personal information via Emirates careers portal.",
      tips: [
        "Professional headshot on white background",
        "Full-length photo in smart attire",
        "Updated CV in PDF format",
      ],
    },
    {
      stage: 2,
      title: "Open Day / Recruitment Event",
      description: "Large group event where recruiters assess your initial presentation, communication, and personality.",
      tips: [
        "Arrive 15–30 mins early",
        "Dress smartly — business attire",
        "Smile, be friendly to everyone",
      ],
    },
    {
      stage: 3,
      title: "Reach Test",
      description: "Physical test to verify you can reach 212cm overhead — simulating access to emergency equipment.",
      tips: [
        "The reach test is performed barefoot — remove shoes before the test",
        "Tiptoes are allowed — practice your barefoot tiptoe reach at home until you consistently hit 212cm",
        "Stretch your arms fully — one arm extended upward",
      ],
    },
    {
      stage: 4,
      title: "Group Exercise",
      description: "Small group discussion or problem-solving activity observed by recruiters assessing teamwork.",
      tips: [
        "Participate actively",
        "Include quieter members",
        "Show leadership without dominating",
      ],
    },
    {
      stage: 5,
      title: "1-on-1 Interview",
      description: "Formal interview with a senior recruiter — behavioral, situational and personal questions.",
      tips: [
        "Use STAR method",
        "Research Emirates thoroughly",
        "Prepare specific examples",
      ],
    },
    {
      stage: 6,
      title: "Final Selection / Medical",
      description: "Background checks, medical examination and final offer for successful candidates.",
      tips: [
        "Respond promptly to all communications",
        "Prepare documents in advance",
        "Stay patient — Emirates post-interview process is widely reported as 30 days to 6 months",
      ],
    },
  ],
  etihad: [
    {
      stage: 1,
      title: "Online Application",
      description: "Apply through Etihad careers portal with CV and photos.",
      tips: [
        "White background headshot",
        "Professional attire photos",
        "Complete all fields carefully",
      ],
    },
    {
      stage: 2,
      title: "Assessment Day",
      description: "Group exercises and initial assessments at Etihad's recruitment events.",
      tips: [
        "Research Etihad's values",
        "Show genuine enthusiasm",
        "Be warm and professional",
      ],
    },
    {
      stage: 3,
      title: "Reach & Physical Assessment",
      description: "Verify 212cm reach requirement and overall physical presentation.",
      tips: [
        "Reach test is performed barefoot — remove shoes before the test",
        "Tiptoes are allowed — practice your barefoot tiptoe reach to 212cm",
        "Maintain good posture throughout",
      ],
    },
    {
      stage: 4,
      title: "Group Discussion",
      description: "Team scenario-based exercise with recruiter observation.",
      tips: [
        "Listen as much as you speak",
        "Show teamwork skills",
        "Stay positive and constructive",
      ],
    },
    {
      stage: 5,
      title: "Individual Interview",
      description: "Personal interview focusing on service experience and motivation.",
      tips: [
        "Know Etihad's routes and fleet",
        "Prepare customer service stories",
        "Show cultural awareness",
      ],
    },
    {
      stage: 6,
      title: "Medical & Offer",
      description: "Medical check and final paperwork for selected candidates.",
      tips: [
        "Be honest in medical disclosure",
        "Prepare all documents",
        "Ask questions about relocation",
      ],
    },
  ],
  qatar: [
    {
      stage: 1,
      title: "Application",
      description: "Online application via Qatar Airways careers or at an open day.",
      tips: [
        "Research Qatar Airways extensively",
        "Tailor your CV to the role",
        "Include a professional headshot",
      ],
    },
    {
      stage: 2,
      title: "Open Day",
      description: "Initial screening event — presentation, group activity and reach test.",
      tips: [
        "Dress elegantly — they value polish",
        "Arrive early and confident",
        "Show warmth and approachability",
      ],
    },
    {
      stage: 3,
      title: "Reach Test",
      description: "212cm reach test — performed barefoot with shoes removed. Tiptoes are allowed. Multiple candidate sources confirm this applies at Qatar Airways assessment days — verify directly with Qatar Airways before your event.",
      tips: [
        "Remove shoes before the reach test — it is performed barefoot",
        "Tiptoes are allowed — practice your barefoot tiptoe reach at home",
        "One arm extended upward — practice consistently reaching 212cm",
      ],
    },
    {
      stage: 4,
      title: "Group Activity",
      description: "Collaborative exercise assessing teamwork and communication.",
      tips: [
        "Use inclusive language",
        "Summarize the group's points",
        "Show leadership calmly",
      ],
    },
    {
      stage: 5,
      title: "Final Interview",
      description: "In-depth interview with Qatar Airways senior recruiters.",
      tips: [
        "Know Qatar's Skytrax ratings",
        "Prepare STAR-format answers",
        "Show commitment to relocating to Doha",
      ],
    },
    {
      stage: 6,
      title: "Training & Offer",
      description: "Successful candidates receive an offer and begin training in Doha.",
      tips: [
        "Intensive initial training in Doha — duration varies; verify directly with Qatar Airways",
        "Be prepared for a demanding program",
        "Embrace the multicultural environment",
      ],
    },
  ],
  flydubai: [
    {
      stage: 1,
      title: "Online Application",
      description: "Apply via flydubai careers website.",
      tips: [
        "Highlight customer service experience",
        "Include professional photos",
        "Keep CV concise",
      ],
    },
    {
      stage: 2,
      title: "Screening & Assessment",
      description: "Group assessment day with presentation and activities.",
      tips: [
        "Show enthusiasm for the low-cost carrier model",
        "Highlight adaptability",
        "Be friendly and approachable",
      ],
    },
    {
      stage: 3,
      title: "Interview",
      description: "Individual interview with HR and operations team.",
      tips: [
        "Research flydubai routes",
        "Show flexibility with schedules",
        "Emphasize cost-consciousness and efficiency",
      ],
    },
    {
      stage: 4,
      title: "Medical & Offer",
      description: "Medical examination and final onboarding.",
      tips: [
        "Process is typically faster than the Big 3 — candidates widely report",
        "Dubai residence visa provided",
        "Training based in Dubai",
      ],
    },
  ],
  airarabia: [
    {
      stage: 1,
      title: "Application",
      description: "Apply online or attend Air Arabia recruitment days in Sharjah.",
      tips: [
        "Highlight any Arabic language skills",
        "Show cultural sensitivity",
        "Customer service focus",
      ],
    },
    {
      stage: 2,
      title: "Screening Day",
      description: "Group assessment and initial interview at Sharjah HQ.",
      tips: [
        "Dress professionally",
        "Show enthusiasm for the brand",
        "Highlight budget airline adaptability",
      ],
    },
    {
      stage: 3,
      title: "Interview & Medical",
      description: "Individual interview and medical clearance for final candidates.",
      tips: [
        "Sharjah-based role — show you are prepared to live in the UAE",
        "Multicultural crew environment",
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// PAID CONTENT REMOVED FROM THE CLIENT BUNDLE (14 July 2026)
//
//   cvGuide, interviewQuestions, groupDiscussionTopics
//
// These used to live here and were therefore downloaded by EVERY visitor,
// paying or not. They now live server-side in netlify/functions/get-content.js
// and are released only to a signed-in user whose tier is verified server-side.
// Components fetch them via src/hooks/usePaidContent.ts.
// DO NOT move paid content back into this file.
// ---------------------------------------------------------------------------


export const codeOfConduct = [
  {
    icon: "✈️",
    category: "Safety & Security",
    rules: [
      "Safety is ALWAYS the number one priority — above comfort, service and all else",
      "Report any security concerns immediately to the senior crew and captain",
      "Never share confidential operational information",
      "Remain alert and vigilant throughout all flights",
      "Adhere to all safety protocols without exception",
      "Ensure all safety equipment is checked and operational before departure",
    ],
  },
  {
    icon: "👔",
    category: "Professional Appearance",
    rules: [
      "Uniform must be immaculate from reporting time to release",
      "No modifications to uniform without approval",
      "Grooming standards must be maintained throughout duty",
      "No visible tattoos or piercings outside of policy",
      "Uniform must be replaced if damaged during duty",
      "Personal hygiene standards must be impeccable at all times",
    ],
  },
  {
    icon: "🤝",
    category: "Passenger Relations",
    rules: [
      "Treat every passenger with dignity, respect and warmth",
      "Never discriminate based on nationality, religion, gender or class",
      "Maintain confidentiality regarding passenger information",
      "Address passenger complaints professionally without dismissal",
      "Exceed passenger expectations at every opportunity",
      "Cultural sensitivity must be demonstrated at all times",
    ],
  },
  {
    icon: "👥",
    category: "Teamwork & Crew Relations",
    rules: [
      "Support fellow crew members especially during high-pressure situations",
      "Follow the chain of command and respect seniority",
      "Report colleague conduct concerns through appropriate channels",
      "Maintain positive, professional relationships with all crew",
      "Conflicts are resolved privately and professionally",
      "No gossiping about colleagues, passengers or the airline",
    ],
  },
  {
    icon: "🌍",
    category: "Layover & Off-Duty Conduct",
    rules: [
      "Represent the airline professionally even when off duty",
      "Adhere to local laws and cultural customs at all destinations",
      "Alcohol is prohibited during duty periods including duty day",
      "Maintain fitness for duty at all times during rostered periods",
      "Airline-provided accommodation must be respected",
      "Report any incidents occurring during layover to the airline",
    ],
  },
  {
    icon: "📱",
    category: "Social Media & Privacy",
    rules: [
      "Never photograph or film passengers without explicit consent",
      "No posting of confidential flight information online",
      "Personal social media must not reflect poorly on the airline",
      "Avoid controversial or inflammatory content online",
      "Do not identify passengers or their travel details publicly",
      "Be mindful that you represent the airline brand at all times",
    ],
  },
];
