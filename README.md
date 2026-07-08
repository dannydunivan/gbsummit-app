# GBM Summit 2026 — PWA

An installable, offline-capable web app for **General Baptist Ministries Summit 2026**
(July 13–15, 2026 · Connection Point Church, Jackson, MO).

Built as a true web app (PWA) — no App Store, no Play Store. Reached at a custom
subdomain, recreated each year with fresh content.

## Stack

- **Vite + React + TypeScript**
- **vite-plugin-pwa** — service worker, installable manifest, offline caching
- **React Router** — 3 tabs + detail routes
- Design tokens as **CSS variables** (`src/styles/tokens.css`)
- Fonts via Google Fonts (**Urbanist** display + **Poppins** UI)
- Content lives in a swappable **`src/content/2026/`** folder

## Structure

```
public/
  brand/            logo, hero, gb logo, speaker headshots
  icons/            PWA + Apple touch icons (icon.svg is the master)
  _redirects        Netlify SPA fallback
src/
  content/2026/     ← ALL event content for the year (swap this each year)
  components/        Icon, TabBar, SessionCard, SpeakerAvatar, InstallCard, …
  routes/            Home, Schedule, Info, SessionDetail, SpeakerDetail, Breakouts
  state/             announcements store, install/notification hooks
  styles/            tokens.css (brand), global.css, app.css
  lib/time.ts        schedule / "Coming Up Next" helpers
```

### Three tabs (MVP scope)

- **Home** — hero, "Coming Up Next / Happening Now", install + alerts onboarding,
  the announcements feed, registration, quick links.
- **Schedule** — day-tabbed agenda → session detail. Speakers and the General
  Association business-packet link live inside session detail.
- **Info** ("Know Before You Go") — venue/directions plus Check-In, WiFi, Parking,
  Meals, Kids & Youth, and Help all on one screen.

Speakers and the Breakout catalog are reachable from sessions (not their own tab).

## Local development

This machine has **no system Node**. Use the standalone Node and prefix PATH:

```sh
export PATH="$HOME/.local/node/node-v22.14.0-darwin-arm64/bin:$PATH"
npm install
npm run dev       # http://localhost:5173
npm run build     # typecheck + production build → dist/
npm run preview   # serve the built app
```

## Deploy (Netlify)

`netlify.toml` is committed (build `npm run build`, publish `dist`, SPA fallback,
no-cache for `sw.js` / `index.html`).

- **Phase 1 (now):** deploy to a temporary `*.netlify.app` URL. Git-connected
  continuous deploy is recommended; manual zip-drop of `dist/` is the fallback.
- **Custom domain:** add `app.gbsummit.org` as a Netlify **custom domain** (CNAME,
  not a redirect) — PWA install + push are scoped to the exact origin. Once the
  Netlify site exists, add one CNAME record (`app` → Netlify's target) at the DNS
  host. The main site stays on Squarespace.

## Push notifications

Phase 1 wires the **UX**: platform detection, the install prompt, and the
notification-permission request (`src/state/install.ts`, `InstallCard`).

- **Android / desktop:** alerts work after the user taps "Enable Alerts."
- **iPhone / iPad:** push works **only after "Add to Home Screen"** (iOS 16.4+),
  so iOS users get Add-to-Home-Screen instructions first, then Enable Alerts.

Phase 2 attaches **Firebase Cloud Messaging** at the marked seam (register the FCM
token on `granted`; a pushed announcement calls `addAnnouncement` so it also lands
in the persistent feed). Needs a Firebase project + admin email(s).

## Yearly rebuild

Next year is a content swap, not a rewrite:

1. Copy `src/content/2026/` → `src/content/2027/` and update sessions, speakers,
   breakouts, announcements, event details, and Info.
2. Drop new images into `public/brand/` (+ speaker headshots) and regenerate
   `public/icons/` from `icon.svg` if the logo changes.
3. Rebrand by editing `src/styles/tokens.css` (colors) — one file.
4. Point the barrel import in code from `content/2026` to `content/2027`.
5. `npm run build` → redeploy.

## Content status

Real, verbatim content is ported from gbsummit.org (10 speakers + bios, the
3-day schedule, 10 breakouts, announcements seed). Items still awaiting the client
are flagged **TBD** in the Info tab and the business-packet URL points at a
placeholder — see `~/Downloads/Summit2026-NEEDS-FROM-CLIENT.md`.
