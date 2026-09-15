# Aman Baid, AMFI Registered Mutual Fund Distributor

Personal website for an AMFI registered mutual fund distributor (ARN-369983):
credentials a visitor can independently verify, what I do, five financial
calculators, and a WhatsApp CTA on every section.

**Live:** https://amanbaid99.github.io/mutualfund/

## Stack

React 18 + TypeScript + Vite 6 + Tailwind CSS v4. No backend, no database, no
analytics, no forms. The whole site is static files, and the only outbound
action is a `wa.me` deep link.

## Local development

```bash
npm install
npm run dev      # http://localhost:5173/mutualfund/
npm run build    # type check + production build into dist/
npm run preview  # serve the built output
```

## Editing the site

| What you want to change | Where |
| --- | --- |
| Name, ARN, EUIN, phone, email, photo | `src/config/site.ts` |
| WhatsApp pre-written messages | `src/lib/whatsapp.ts` |
| Colours, fonts, radii, shadows | `@theme` block in `src/index.css` |
| Services offered | `src/components/Services.tsx` |
| FAQ questions | `src/components/Faq.tsx` |
| Calculator maths | `src/lib/calc.ts` |
| Statutory disclaimer | `src/components/Footer.tsx` |

`src/config/site.ts` is the single source of truth for every personal detail.
Change it there and it updates everywhere, including the footer disclaimer.

### Adding your photo

Drop a portrait into `public/` (e.g. `public/aman.jpg`) and set
`photo: './aman.jpg'` in `src/config/site.ts`. Until then the hero shows a
designed ARN credential card instead.

## Deployment

Every push to `main` triggers `.github/workflows/deploy.yml`, which type
checks, builds and publishes to GitHub Pages.

One-time setup: **Settings → Pages → Build and deployment → Source:
GitHub Actions**.

The build is served from `/mutualfund/`, so `vite.config.ts` sets `base`
accordingly. For a custom domain, set `BASE_PATH: /` in the workflow and add a
`public/CNAME` file containing the domain.

## Calculators

Five calculators in `src/lib/calc.ts`, following the conventions AMFI and AMC
calculators use (SIP instalments at the start of each month, annual rate
divided by 12):

- **SIP**: monthly investment growth, with an optional annual step-up
- **Goal**: monthly SIP needed to hit a target, adjusted for inflation
- **Lump sum**: one-time investment growth and effective CAGR
- **Retirement**: corpus needed, using an inflation-adjusted annuity
- **SWP**: how long a corpus survives a monthly withdrawal

A ₹10,000 monthly SIP at 12% for 10 years returns ₹23,23,391, matching the
standard industry figure.

Nothing is stored or transmitted. Results are computed in the browser, and the
"Discuss these numbers" button carries them into a WhatsApp draft.

## Compliance notes

The footer carries the mandatory market-risk disclaimer, the ARN and EUIN, and
a statement that registration is not an endorsement by AMFI or SEBI. The
calculators are labelled as illustrations rather than projections. The site
states that no money is ever collected from investors. Review these before
each deployment if your registration details change.
