# Hurudza AI Technology Solutions — Marketing Website

A Vite-powered marketing site for Hurudza AI Technology Solutions (AI audits, consultation,
boot camps, and hiring AI employees).

## Run locally
```bash
npm install
npm run dev
```

## Build for production
```bash
npm run build
```
Output lands in `dist/` — deploy that folder to Netlify, Vercel, GitHub Pages, or any static host.

## Structure
- `index.html` — all page markup (single-page site, anchor-linked sections)
- `src/style.css` — design system (brand colors sampled from the logo, type, layout, responsive rules)
- `src/main.js` — nav behavior, hero word rotator, carousel, scroll reveals, contact form
- `public/logo.png` — your logo with a transparent background, used in the nav and footer

## Brand colors (sampled from your logo)
- Deep green `#11422D` — primary text, buttons
- Sage green `#82A762` — secondary accent, icons
- Gold `#E3AE0E` (text-safe) / `#FED034` (true logo gold) — accents, highlights

## Editing content
- Services / pricing: `.services__grid` in `index.html`
- AI employee roles: `.hire__grid`
- News & past projects: `.news__grid` / `.projects__grid`
- Contact details: `.contact__details`
