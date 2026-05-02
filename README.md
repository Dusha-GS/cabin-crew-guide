# ✈ Cabin Crew Interview Guidebook
### Middle Eastern Airlines Edition — Powered by Claude AI

A complete, production-ready cabin crew interview preparation platform with AI-powered mock interviews and CV review, built with React + TypeScript + Vite, deployable to Netlify and sold via Whop.

---

## 🚀 Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Create your .env.local file (copy from .env.example)
cp .env.example .env.local

# 3. Add your Anthropic API key to .env.local
VITE_ANTHROPIC_API_KEY=sk-ant-...

# 4. Start the dev server
npm run dev
```

Open http://localhost:5173

---

## 🤖 AI Features (Powered by Claude)

### AI Mock Interview (`/ai-mock-interview`)
- Claude acts as a senior recruiter for Emirates, Etihad, Qatar Airways, flydubai, or Air Arabia
- Real conversation — one question at a time, with natural follow-ups
- Instant feedback on each answer
- Full final assessment with score, strengths, improvement areas, and action plan
- 3 difficulty levels: Beginner / Intermediate / Advanced

### AI CV Review (`/ai-cv-review`)
- Paste your CV text and get instant recruiter-level feedback
- Tailored to specific airlines (Emirates, Etihad, Qatar Airways)
- Score out of 10, strengths, critical issues, line-by-line rewrites
- Top 5 quick wins specific to their actual CV content

### AI-Powered Mock Exam (`/mock-exam`)
- 8 scenario-based questions
- Optional Claude AI scoring: score, verdict, strength, improvement tip
- Toggle AI scoring on/off
- Full end-of-exam review with per-question breakdown

---

## 🌐 Deploying to Netlify

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/cabin-crew-guide.git
git push -u origin main
```

### Step 2: Connect to Netlify
1. Go to [netlify.com](https://netlify.com) → New site from Git
2. Connect your GitHub repo
3. Build settings are auto-detected from `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Functions directory: `netlify/functions`

### Step 3: Add Environment Variable
In Netlify → Site Settings → Environment Variables:
```
ANTHROPIC_API_KEY = sk-ant-your-actual-key-here
```
⚠️ Use `ANTHROPIC_API_KEY` (not `VITE_ANTHROPIC_API_KEY`) — this is the server-side key

### Step 4: Deploy
Netlify will auto-deploy on every push to main.

---

## 🔐 API Key Security

| Environment | How it works |
|-------------|-------------|
| **Production (Netlify)** | API calls go through `netlify/functions/claude.js` — key stays server-side, **never exposed to browser** |
| **Local dev** | Uses `VITE_ANTHROPIC_API_KEY` from `.env.local` — direct API calls for convenience |

The `netlify/functions/claude.js` serverless function is the secure proxy between your frontend and Anthropic's API.

---

## 💰 Whop Integration

1. Create your product on [whop.com](https://whop.com)
2. Set price to $25 (one-time)
3. Update the Whop link in `src/components/PremiumSection.tsx`:
   ```typescript
   const WHOP_LINK = "https://whop.com/your-actual-product-link";
   ```
4. For gating premium content, use Whop's OAuth to verify membership before showing premium sections

---

## 📁 Project Structure

```
cabin-crew-guide/
├── netlify/
│   └── functions/
│       └── claude.js          ← Secure API proxy (Netlify serverless)
├── src/
│   ├── components/
│   │   ├── AIMockInterviewSection.tsx   ← NEW: Claude AI interview chat
│   │   ├── AICVReviewSection.tsx        ← NEW: Claude AI CV analyzer
│   │   ├── MockExamSection.tsx          ← UPGRADED: Claude AI scoring
│   │   ├── PremiumSection.tsx           ← UPGRADED: Whop payment link
│   │   ├── Header.tsx
│   │   ├── HeroSection.tsx              ← UPGRADED: AI features featured
│   │   ├── AirlinesSection.tsx
│   │   ├── RequirementsSection.tsx
│   │   ├── DressCodeSection.tsx
│   │   ├── CVGuideSection.tsx
│   │   ├── InterviewQASection.tsx
│   │   ├── GroupDiscussionSection.tsx
│   │   ├── CodeOfConductSection.tsx
│   │   └── BackButton.tsx
│   ├── data/
│   │   └── guideData.ts                 ← All static content
│   ├── hooks/
│   │   └── useClaude.ts                 ← Central Anthropic API hook
│   ├── utils/
│   │   └── cn.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .env.example                         ← Copy to .env.local for dev
├── netlify.toml                         ← Netlify build config
├── vite.config.ts
├── tailwind.config.js
└── package.json
```

---

## 🛠 Tech Stack

- **React 18** + **TypeScript** + **Vite**
- **Tailwind CSS v3** for styling
- **Anthropic Claude Sonnet 4** for all AI features
- **Netlify Functions** for secure serverless API proxy
- **Whop** for payment and membership gating

---

## 📝 Customization

### Change the AI model
In `netlify/functions/claude.js`:
```javascript
model: "claude-sonnet-4-6", // Change to claude-opus-4-6 for more power
```

### Add more interview questions
Edit `src/data/guideData.ts` → `interviewQuestions` object

### Update the Whop link
Edit `src/components/PremiumSection.tsx` → `const WHOP_LINK = "..."`

### Add more airlines
Edit `src/data/guideData.ts` → `airlines` and `requirements` arrays

---

## 🚢 Launch Checklist

- [ ] `.env.local` created with `VITE_ANTHROPIC_API_KEY`
- [ ] Site tested locally (`npm run dev`)
- [ ] Pushed to GitHub
- [ ] Connected to Netlify
- [ ] `ANTHROPIC_API_KEY` set in Netlify environment variables
- [ ] Netlify deploy successful
- [ ] AI Mock Interview tested on live site
- [ ] AI CV Review tested on live site
- [ ] Whop product created and link updated in PremiumSection.tsx
- [ ] Custom domain connected (optional)
- [ ] Listed on Whop marketplace

---

*Built with Claude AI by Anthropic • Ready for Netlify • Sell on Whop*
