# ✈ Cabin Crew Interview Guidebook

**cabincrewguidebook.com** — a production cabin crew interview-preparation platform for the Middle
Eastern airlines (Emirates, Qatar Airways, Etihad, flydubai, Air Arabia): interview questions with
sample answers, CV guide, dress code, mock exams, and AI-powered mock interviews & CV review.

Built with React 18 + TypeScript + Vite + Tailwind. Deployed on Netlify. Subscriptions via Stripe.

---

## Stack

| Layer | Service |
|---|---|
| Hosting / CDN / functions | Netlify (auto-deploys `main` when CI is green) |
| Auth + database | Supabase (Postgres, RLS) + Cloudflare Turnstile bot protection |
| Payments | Stripe subscriptions (Standard $15/mo · Premium $25/mo) |
| Transactional + lifecycle email | Resend |
| AI features | Anthropic Claude via a session-verified, rate-limited serverless function |
| Monitoring | Sentry (errors, EU) · PostHog (analytics, EU, consent-gated) · daily health-check email |

## Architecture notes

- **Paid content never ships to the browser.** It lives in `netlify/functions/get-content.js`,
  released only to a valid Supabase session whose tier (checked server-side) covers it.
- **Real per-page URLs + SEO.** Sections have real paths (`/airlines`, `/rejection-decoded`, …);
  `applySeo()` sets per-page meta; the `og-meta` edge function injects it into raw HTML for social
  crawlers; unknown paths return a real 404.
- **Route-level code splitting** (`React.lazy`) keeps the initial bundle small.
- **Guard tests** (`tests/guards.test.js`, no dependencies) encode every bug we've had and every
  protection we rely on. CI runs type-check → build → guards → dependency audit on every push.
  A change that reintroduces a known bug fails the build.

## Local development

```bash
npm install
npm run dev      # local dev server
npm run build    # type-check + production build (required before npm test)
npm test         # guard tests against the built output
```

Environment variables are documented in `.env.example`. Secrets live in Netlify env vars —
never in this repo.

## Deploying

Push to `main`. GitHub Actions runs CI; Netlify builds and publishes only if it passes.
Scheduled functions: daily health check (06:00 UTC), lifecycle emails (09:00 UTC),
nightly encrypted DB backup via GitHub Actions (03:00 UTC).

---

*Owned and operated by Elysium Living FZ-LLC.*
