// netlify/edge-functions/og-meta.js
//
// PER-PAGE SOCIAL PREVIEWS + RAW-HTML SEO.
// Social crawlers (WhatsApp, Facebook, Instagram, LinkedIn, X) do NOT run
// JavaScript, so without this every shared section link previews with the
// HOME title/description. This edge function rewrites <title>, meta
// description, canonical, og:* and robots in the raw HTML per path, at the
// CDN, before the response leaves Netlify. Google also gets correct raw
// canonicals (no longer "/" until JS runs).
//
// KEEP IN SYNC with SEO_META / SECTION_PATHS in src/App.tsx — a CI guard
// asserts the paths and sample titles match.
// onError: "bypass" — if this function ever throws, Netlify serves the
// untouched page instead of an error. SEO degrades gracefully; the site never breaks.

const DEFAULT_DESC = "Everything you need to pass a Middle Eastern cabin crew interview: real interview questions with sample answers, a CV guide, dress code, mock exams and AI interview practice for Emirates, Qatar Airways and Etihad.";
const DEFAULT_OG_DESC = "Real interview questions with sample answers, a CV guide, dress code, mock exams and AI interview practice for Emirates, Qatar Airways and Etihad.";
const DEFAULT_OG_TITLE = "Cabin Crew Interview Guidebook — Middle Eastern Airlines";
const ORIGIN = "https://cabincrewguidebook.com";

const SEO = {
  "/airlines": { title: "Airlines Hiring Cabin Crew — Emirates, Qatar, Etihad, flydubai & Air Arabia", description: "Compare the Gulf airlines that hire cabin crew — Emirates, Qatar Airways, Etihad, flydubai and Air Arabia: their bases, fleets, culture and what each one looks for.", index: true },
  "/requirements": { title: "Cabin Crew Requirements — Height, Arm Reach, Age & Eligibility (Gulf Airlines)", description: "The real cabin crew requirements for Emirates, Qatar Airways and Etihad: minimum height and arm reach, age, education, languages, tattoos and grooming standards.", index: true },
  "/dress-code": { title: "Cabin Crew Interview Dress Code & Grooming Standards — Gulf Airlines", description: "How to dress and groom for a Gulf airline cabin crew assessment day: attire, hair, makeup, tattoo cover and the presentation standards recruiters check first.", index: true },
  "/code-of-conduct": { title: "Cabin Crew Code of Conduct & Professional Standards", description: "The professional conduct and standards expected of cabin crew for Middle Eastern airlines — on duty, on layover and online.", index: true },
  "/open-days": { title: "Cabin Crew Open Days & Assessment Dates — Emirates, Qatar, Etihad", description: "How cabin crew open days and online assessments work for Gulf airlines, and what to expect from the recruitment process, step by step.", index: true },
  "/premium": { title: "Pricing — Cabin Crew Interview Guidebook (Standard & Premium)", description: "Standard $15/month and Premium $25/month: the full interview guidebook, mock exam, CV guide, unlimited AI mock interviews and more. Cancel anytime.", index: true },
  "/rejection-decoded": { title: "Why Cabin Crew Applications Get Rejected — Rejection Decoded", description: "The real reasons candidates get rejected by Emirates, Qatar Airways and Etihad — from the ATS that filters your CV to the grooming check and group exercise — and how to fix each one.", index: true },
  "/after-the-interview": { title: "After the Cabin Crew Interview — The Offer, Medical, Wait & Comeback", description: "What really happens after your cabin crew interview: the silence, the medical, the offer letter and joining-date wait, and how to come back stronger after a rejection.", index: true },
  "/terms": { title: "Terms of Service — Cabin Crew Interview Guidebook", description: "Terms of Service for the Cabin Crew Interview Guidebook, including subscription, cancellation and the EU right of withdrawal.", index: true },
  "/privacy": { title: "Privacy Policy — Cabin Crew Interview Guidebook", description: "How the Cabin Crew Interview Guidebook collects, uses and protects your data, and the third-party processors involved.", index: true },
  "/cv-guide": { title: "Cabin Crew CV Guide — Cabin Crew Interview Guidebook", description: "A step-by-step CV guide for Gulf airline cabin crew applications.", index: false },
  "/interview-questions": { title: "Cabin Crew Interview Questions & Answers", description: "Real cabin crew interview questions with sample answers.", index: false },
  "/group-discussion": { title: "Cabin Crew Group Discussion Practice", description: "Practice topics and technique for the cabin crew group exercise.", index: false },
  "/mock-exam": { title: "Cabin Crew Mock Exam", description: "A timed cabin crew mock exam with situational, knowledge and maths questions.", index: false },
  "/mock-interview": { title: "AI Mock Interview — Cabin Crew", description: "Practice a realistic cabin crew interview with an AI recruiter.", index: false },
  "/cv-review": { title: "AI CV Review — Cabin Crew", description: "Get your cabin crew CV reviewed against Gulf airline standards.", index: false },
  "/ask-cabin-crew": { title: "Ask Cabin Crew", description: "Ask former cabin crew your recruitment questions.", index: false },
  "/account": { title: "My Account — Cabin Crew Interview Guidebook", description: "Manage your Cabin Crew Interview Guidebook account.", index: false },
};

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export default async (request, context) => {
  const response = await context.next();
  const type = response.headers.get("content-type") || "";
  if (!type.includes("text/html")) return response;

  const path = new URL(request.url).pathname.replace(/\/+$/, "") || "/";
  const meta = SEO[path];
  if (!meta) return response;

  let html = await response.text();
  const url = ORIGIN + path;

  html = html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(meta.title)}</title>`)
    .replaceAll(DEFAULT_DESC, esc(meta.description))
    .replaceAll(DEFAULT_OG_DESC, esc(meta.description))
    .replaceAll(DEFAULT_OG_TITLE, esc(meta.title))
    .replace(/(rel="canonical"\s+href=")[^"]*(")/, `$1${url}$2`)
    .replace(/(property="og:url"\s+content=")[^"]*(")/, `$1${url}$2`);

  if (!meta.index) {
    html = html.replace(/(name="robots"\s+content=")[^"]*(")/, `$1noindex, follow$2`);
  }

  return new Response(html, { status: response.status, headers: response.headers });
};

export const config = {
  path: [
    "/airlines", "/requirements", "/dress-code", "/code-of-conduct", "/open-days",
    "/premium", "/rejection-decoded", "/after-the-interview", "/terms", "/privacy",
    "/cv-guide", "/interview-questions", "/group-discussion", "/mock-exam",
    "/mock-interview", "/cv-review", "/ask-cabin-crew", "/account",
  ],
  onError: "bypass",
};
