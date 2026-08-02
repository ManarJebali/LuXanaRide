# Content Guide — LuXana Ride (LXR)

This site now uses your real catalogue data (S1, S2, T1, T2) extracted from
`catalogue Scooters electriques 08-04-2026.pdf`, in French (default), English,
and Arabic. A few things are still placeholders and must be replaced before
this goes live to real customers.

## 1. Contact information — now real

`lib/i18n/dictionaries/{fr,en,ar}.json` → `common` key holds the real values,
already live everywhere (header, footer, contact page, WhatsApp button):

- Phone: `+216 93 339 582`
- General email: `luxanaride@gmail.com`
- Management/CEO email: `hatemsi.luxanaride@gmail.com` (shown on the Contact
  page under "Direction" / "Management" / "الإدارة")
- Address: `Rue 23 Janvier, Route de Moknine, Teboulba 5080, Monastir, Tunisia`
  — shown on the Contact page and in the footer, with a live Google Map.

The Contact page map (`components/GoogleMap.tsx`) uses Google's free,
no-API-key `output=embed` iframe by default — it works immediately with no
setup. If you want the officially supported Maps Embed API instead (nicer
styling controls, requires a Google Cloud project with the Maps Embed API
enabled and billing set up), set `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` in
`.env.local` — the component automatically switches to the key-based embed
URL when that variable is present.

## 2. Pricing

No prices were in the catalogue, so none are shown anywhere on the site —
every page routes visitors to the inquiry form for pricing, matching how the
catalogue itself doesn't list prices. If you want prices public, they'll need
to be added to `lib/data/scooters.json` / `tricycles.json` and to the card /
detail components.

## 3. Product photography

- **S1** (`public/images/s1.jpg`), **T1** (`t1.jpg`), and **T2** (`t2.jpg`)
  are your own catalogue photos, clean.
- **S2** (`public/images/s2.jpg`) had a visible supplier watermark
  ("www.shilumoto.com") baked in from the catalogue. It's been cleaned up
  with automated inpainting (OpenCV) — the watermark is no longer noticeable
  at normal viewing size, though a very faint trace survives on close zoom
  near the seat. If you can get an unwatermarked source photo from your
  supplier at some point, that would still be the cleanest long-term fix.
- All four images are single shots (no multi-angle gallery) because that's
  all the catalogue had. Adding more angles just means dropping additional
  files in `public/images/` and extending the `gallery`-style rendering in
  `components/VehicleDetail.tsx` if you want a thumbnail switcher back.

## 4. Logo — done

`public/images/logo.svg` is your real logo file, used directly in the header,
footer (via `components/Logo.tsx`), and as the favicon (`app/icon.svg`). The
color theme (red `#E23B2E` / black, `tailwind.config.ts`) matches it.

One note: the file is a ~1.7 MB vector with ~2,500 paths (looks like an
auto-traced export from a raster image rather than a native vector design).
It works fine as-is, but if you ever get the original design file (e.g. from
whoever made the logo) in a lighter vector format, swapping it in would
reduce page weight slightly.

## 5. Vehicle data — how to edit

`lib/data/scooters.json` (S1, S2) and `lib/data/tricycles.json` (T1, T2) hold
all specs and copy. Each vehicle has:

- `specs`: locale-independent raw values (motor power, top speed, range,
  charge time, controller, tires, load capacity) — same across fr/en/ar.
- `content.fr` / `content.en` / `content.ar`: name, tagline, brake
  description, overview paragraphs, and feature bullets — fully translated
  per language.

To add a new model, copy an existing object, give it a new `slug`, and fill
in `content` for all three locales — listing pages, detail routes, the
sitemap, and JSON-LD all pick it up automatically via `generateStaticParams`.

The shared warranty table (frame, fork, motor/controller, battery, etc.) is
not per-vehicle — it's in `lib/i18n/dictionaries/*.json` under `warranty`,
since the catalogue presents it as one policy across the whole lineup.

## 6. Forms and email delivery — working, with one limitation

`components/InquiryForm.tsx` posts to `app/api/inquiry/route.ts`, which sends
mail via [Resend](https://resend.com). This is live and tested — a real form
submission was sent and delivered successfully.

Current `.env.local` (gitignored, never committed):
- `RESEND_API_KEY` — set, working.
- `INQUIRY_FROM_EMAIL=onboarding@resend.dev` — Resend's shared sandbox sender,
  used because no domain is verified yet.
- `INQUIRY_TO_EMAIL=manarjebali123@gmail.com` — **temporary.** Resend's
  sandbox mode only allows sending to the email address the Resend account
  was signed up with. It refuses to send to `luxanaride@gmail.com` (or any
  other address) until a domain is verified.

**To fix this properly:** once LuXana Ride has a domain (even a cheap one
just for email), add it under **Domains** in the Resend dashboard, add the
DNS records it gives you, wait for verification, then:
1. Change `INQUIRY_FROM_EMAIL` to an address on that domain (e.g.
   `contact@yourdomain.com`).
2. Change `INQUIRY_TO_EMAIL` back to `luxanaride@gmail.com`.
3. Restart the server.

Until then, every real inquiry submitted on the live site will land in
`manarjebali123@gmail.com`, not the LuXana Ride inbox — worth checking that
inbox in the meantime.

The hidden `company` field is a honeypot spam trap — leave it in place.

## 7. Privacy Policy & Terms of Use — added

`/privacy` and `/terms` (in all 3 languages) are live, linked from the
footer, and included in the sitemap. Content lives in
`lib/i18n/dictionaries/*.json` under `legal.privacy` and `legal.terms`
(`components/LegalPage.tsx` renders both from the same shared layout).

**Important:** this is reasonable generic boilerplate — data collected via
the contact form, no cookies/tracking, no online sales, Tunisian governing
law — written to match how this specific site actually works. It is not a
substitute for review by a lawyer familiar with Tunisian consumer/data-
protection law, especially before scaling up data collection (e.g. adding
analytics or an account system later).

## 8. Languages

Default locale is French (`/fr`), with `/en` and `/ar` (RTL, Noto Kufi
Arabic) fully translated. Visiting `/` redirects to `/fr` via `proxy.ts`. To
add a fourth language, add it to `lib/i18n/config.ts` `locales`, add a
dictionary file, and add its translations to both vehicle data files.
