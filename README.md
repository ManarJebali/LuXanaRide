# LuXana Ride

A trilingual (French / English / Arabic) marketing and lead-generation website for **LuXana Ride**, an electric scooter and tricycle distributor based in Monastir, Tunisia. Built with Next.js 16 (App Router), TypeScript, and Tailwind CSS, and deployed on Vercel.

**Live site:** https://ev-dealership.vercel.app

## What it does

LuXana Ride sells electric two- and three-wheelers but doesn't sell online — the site's job is to present the real product lineup clearly and convert visitors into qualified leads (quote requests, test-ride bookings, warranty questions), not to run a checkout flow.

- **Product catalog** — two electric scooters (S1, S2) and two electric tricycles (T1, T2), with real specs (motor power, range, charge time, brakes, load capacity) sourced from the distributor's own catalogue.
- **Trilingual, French-first** — every page is fully translated across French (default), English, and Arabic, with correct right-to-left layout and a dedicated Arabic typeface for the Arabic locale.
- **Lead capture** — a reusable inquiry form (quote / test ride / warranty question / general) on every vehicle page and the contact page, wired to real email delivery via Resend, with spam honeypot protection and server-side validation.
- **Real contact channels** — phone, email, WhatsApp deep link, and an embedded Google Map to the showroom address.
- **SEO-ready** — per-locale metadata, JSON-LD structured data on vehicle pages, and a generated sitemap covering all locale × route combinations.
- **Legal pages** — Privacy Policy and Terms of Use, translated into all three languages.

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack, Server Components) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| i18n | Custom `[locale]` segment routing + dictionary-based translations (no external i18n library) |
| Email | [Resend](https://resend.com) |
| Hosting | Vercel |

## Project structure

```
app/
  [locale]/            # Every page is nested under a locale segment (fr, en, ar)
    page.tsx           # Home
    scooters/          # Listing + [slug] detail page
    tricycles/         # Listing + [slug] detail page
    about/
    contact/
    privacy/
    terms/
    layout.tsx          # Root layout — sets <html lang/dir>, loads fonts, renders Header/Footer
  api/inquiry/          # Form submission endpoint (Resend)
  sitemap.ts / robots.ts
components/              # Header, Footer, Hero, VehicleCard, InquiryForm, GoogleMap, etc.
lib/
  data/                  # scooters.json / tricycles.json — specs + per-locale copy
  i18n/                  # locale config + fr.json / en.json / ar.json dictionaries
  vehicles.ts            # data access helpers
proxy.ts                 # Locale-detection middleware (redirects "/" -> "/fr")
```

## Getting started

```bash
npm install
cp .env.local.example .env.local   # then fill in the values below
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — it redirects to `/fr`.

### Environment variables

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Resend API key used to send inquiry-form emails |
| `INQUIRY_FROM_EMAIL` | Sender address for outgoing emails |
| `INQUIRY_TO_EMAIL` | Inbox that receives form submissions |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Optional — enables the official Google Maps Embed API on the Contact page; without it, the map falls back to Google's free no-key embed |

See [CONTENT_GUIDE.md](./CONTENT_GUIDE.md) for details on editing vehicle data, translations, and current known limitations (e.g. Resend sandbox restrictions until a domain is verified).

## Scripts

```bash
npm run dev      # start the dev server
npm run build    # production build
npm run start    # run the production build locally
npm run lint     # lint
```

## Deployment

Deployed via the Vercel CLI (`vercel --prod`). Environment variables are configured separately in the Vercel project settings — `.env.local` is never committed or deployed.
