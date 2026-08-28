# NexaNet

Marketing and recruiting site for NexaNet — a technology staffing and workforce
solutions partner. Built with Next.js (App Router), TypeScript, Tailwind CSS,
Framer Motion, and React Three Fiber for the two 3D visualizations.

## Stack

- **Next.js 15** (App Router, Route Handlers, Metadata API)
- **TypeScript**, **Tailwind CSS**
- **Framer Motion** for interaction/motion, **GSAP + ScrollTrigger** for the
  scroll-driven recruiting-methodology timeline
- **React Three Fiber / drei / three** for the hero talent-network graphic and
  the expertise constellation — both degrade to a static/DOM fallback without
  WebGL, on `prefers-reduced-motion`, and render fewer nodes on small viewports
- **Zod** for form validation
- **@netlify/blobs** for form-submission storage (see below)

## Content architecture

Page copy and structured content live under `content/` as typed data
(`services.ts`, `expertise.ts`, `industries.ts`, `jobs.ts`, `methodology.ts`,
`site.ts`) rather than being hardcoded into JSX — swap these for a real CMS
or API later without touching page/component code.

## Forms

`/contact` (Find Talent) and `/talent` (join the network / submit a resume)
post to `app/api/contact` and `app/api/talent`, which validate with Zod and
persist to Netlify Blobs via `lib/submissions.ts`. Netlify Blobs auto-provisions
per site when deployed on Netlify — **no submissions are emailed or sent to a
CRM out of the box.** Wire a real email/CRM/ATS integration in
`lib/submissions.ts` before relying on these forms for live leads.

## Local development

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` to configure optional analytics
(`NEXT_PUBLIC_ANALYTICS_DOMAIN` — unset by default, so no analytics script
loads until configured).

## Deployment

Deploys on Netlify via `netlify.toml` (`npm run build`; Netlify auto-detects
the Next.js App Router and installs the Next.js Runtime).
