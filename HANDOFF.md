# GBM Summit 2026 PWA — Session Handoff (v2, 2026-07-08)

Paste this into a new session as context. It captures the current state of the
live app, every decision made, the environment quirks, and the plan for
continuing development. It supersedes `~/Downloads/Summit2026-App-Handoff.md`
(the original brief that started the build).

---

## 1. What this is

The **installable PWA event app** for General Baptist Ministries **Summit 2026**
— July 13–15, 2026 · Connection Point Church, 358 E Deerwood Dr., Jackson, MO
(+ the **Jackson Civic Center**, 381 E Deerwood Dr., directly across the road,
as the secondary site).

- **Project:** `~/Claude Code/gbsummit-app` (git repo; this file lives in it)
- **LIVE:** https://gbm-summit-2026.netlify.app — already shared with the GBM team
- **Client/user:** Dr. Danny Dunivan, President of GBM (also a keynote speaker)
- The old Expo mockup at `~/Claude Code/summit2026` was the original content
  source — it is now **outdated**; this repo is the source of truth.

## 2. Stack + layout

Vite + React + TypeScript · `vite-plugin-pwa` (installable, offline) ·
React Router. No UI libraries; design tokens are CSS variables.

Read these first to orient:
- `src/content/2026/` — **ALL event content** (sessions, speakers, breakouts,
  announcements, dining, info, event constants). Yearly rebuild = swap folder.
- `src/lib/time.ts` — real-clock logic; three event phases (before/during/after)
- `src/state/announcements.tsx` — timestamp-gated feed (see §4)
- `src/routes/` — Home, Schedule, Info, SessionDetail, SpeakerDetail,
  Breakouts, Dining, Contact, NotFound
- `src/styles/tokens.css` — brand (red #D8322F, ink #1A1A1C; Urbanist+Poppins)
- `RESTORE.md` — rollback procedure; `README.md` — partially stale (see §7)

## 3. Deploy + infrastructure (all working, verified)

- **Netlify site** `gbm-summit-2026`, id `d5583fc0-8787-4bd5-92f8-56027e940f91`,
  team "General Baptist Ministries". The Mac's netlify-cli is **already
  authenticated** (token in `~/Library/Preferences/netlify/config.json`).
- **Deploy:** `npm run build && netlify deploy --prod --dir=dist` (manual; NOT
  git-connected yet). Commit each batch to git afterward.
- **Contact form:** Netlify Forms, form name `contact` → email notification to
  **carol.lawrence@generalbaptist.com** (hook verified end-to-end). The hidden
  static `<form name="contact">` in `index.html` is REQUIRED for detection —
  never remove it. Site setting `processing_settings.ignore_html_forms` was
  PATCHed to `false` to enable detection.
- **Rollback:** tag `v1.0-team-preview` = the version first shared with the
  team; permanent URL
  https://6a4c1b189073ebcd6ee45d6c--gbm-summit-2026.netlify.app; zips in
  `~/Claude Code/gbsummit-backups/`. Full procedure in `RESTORE.md`.

## 4. Key behaviors already built (don't regress these)

- **Real clock, three phases** (`time.ts`): pre-event countdown card on Home →
  live "Happening Now" during July 13–15 → "That's a wrap" after. No demo clock.
- **Announcements are timestamp-gated**: items in
  `src/content/2026/announcements.ts` appear only once their `timestamp`
  passes, so event-day seeds behave like scheduled announcements. Deployed
  content is source of truth; localStorage stores **read ids only**
  (`summit2026.read.v1`). All content must be TRUE — no invented logistics
  (WiFi/parking items were removed deliberately).
- **Packet button** on the General Association session opens `/packet.pdf` —
  currently a branded placeholder. **Swap in the client's real PDF at
  `public/packet.pdf` (same filename) + redeploy; zero code changes.**
- **Hero logo**: uses `public/brand/summit26-logo-white.png` (pixel-processed
  white-letter variant for the dark hero; original black-letter file kept).
  The "26" in the red box is a transparent cutout by design.
- **Speaker headshots** in `public/brand/speakers/` were re-downloaded from
  each speaker's own gbsummit.org image URL — the name↔face mapping is correct.
- **Dining page**: client-curated list with verified street addresses
  (tappable → Google Maps) + "Coffee & Dessert" subsections per city. Tokyo
  Sushi and American Ice Cream are closed Mondays (noted on cards).
- Schedule default day uses LOCAL date (`localDateId`) — do not reintroduce
  `toISOString()` (UTC picked the wrong day in the evening).

## 5. Environment — critical for any session on this Mac

- **No system Node/npm/Homebrew.** Prefix EVERY Node command:
  `export PATH="$HOME/.local/node/node-v22.14.0-darwin-arm64/bin:$PATH"`
- Dev server via Claude_Preview MCP: config name **`gbsummit-app`** (port 5173)
  in `~/Claude Code/.claude/launch.json`.
- Editing files while the dev server runs can leave stale HMR errors in the
  preview console (stack traces with `?t=` URLs) — reload; not real bugs.
- The preview sandbox blocks Notification permission — the install card shows
  "alerts blocked" there; fine on real devices.
- Squarespace images download as WebP regardless of extension — convert with
  `sips -s format jpeg IN --out OUT.jpg`. Working dir has a space
  (`~/Claude Code/`) — quote paths. Use absolute binary paths (`/bin/rm`,
  `/usr/bin/zip`) in loops.
- Git commits: `-c user.name="Danny Dunivan" -c user.email="danny.dunivan@generalbaptist.com"`.

## 6. Waiting on the client (Danny)

1. **Civic Center copy** — he offered wording for the secondary-site
   description; placeholder lives in `VENUES.civic.blurb` (`src/content/2026/event.ts`).
2. **Real business packet PDF** → replace `public/packet.pdf`.
3. **Custom domain `app.gbsummit.org`** — CNAME as a Netlify custom domain
   (NOT a redirect; PWA install/push are origin-scoped). Declined "for now" —
   should happen BEFORE wide promotion/QR codes, since installs don't migrate
   across origins. Claude generates the DNS instructions once the domain is
   added in Netlify.
4. Ongoing content edits as his team reviews the live link.

## 7. Remaining development plan (reviewed + agreed, in priority order)

P1 — on-site correctness/polish (small, do in one batch):
1. 60-second re-render tick so "Happening Now" updates while the app stays open.
2. Sticky day-tabs on Schedule have no background — content scrolls through
   them (`.day-tabs` in `src/styles/app.css`).
3. Image slimming: hero is 1.4 MB, headshots full-res; precache is ~2.9 MB.
   Resize (hero ~960w, headshots ~400px) to get first install under ~1 MB.

P2 — structural:
4. **No-backend announcements bridge:** move the feed to a runtime-fetched
   `announcements.json` (network-first, cache fallback) + set up GitHub +
   git-connected Netlify deploy → during the event, editing one JSON file in
   the GitHub web UI updates every phone in ~1 min without Firebase. (No push
   notification — feed only. Set expectations.)
5. Hourly `registration.update()` check so mid-event redeploys reach phones
   that stay open.
6. Dead-code sweep: README still describes removed Registration card and old
   "Know Before You Go"; `EVENT.registrationUrl/tagline/highlights/venuePhone`
   and `Speaker.sessionIds` are unused; orphaned CSS from the old Info tab
   (`.venue-card`, `.info-facts`, `.tbd-flag`, `.price-*`, `.nearby*`).

Phase 2 (needs client decisions): Firebase FCM web push + a simple admin page
to post announcements (`addAnnouncement` in `src/state/announcements.tsx` is
the seam; register FCM token on permission grant in `src/state/install.ts`).
Needs: Firebase project owner + admin email (use a durable org address).

Phase 3: yearly-rebuild kit — `content/2027/` swap doc.

## 8. Working agreements with Danny

- He sends edits conversationally, often in batches; make them, **verify on the
  deployed site** (curl the built JS for spot-checks), deploy, commit.
- **No fabricated facts** — every venue/room/time/address/restaurant must trace
  to gbsummit.org, a web search verification, or Danny himself. Flag anything
  unverified rather than shipping it.
- Don't ask permission for reversible in-scope work; do confirm before
  destructive/outward-facing actions (his Netlify account, emails, DNS).
- Danny is nontechnical about tooling (asks "what do I click"), so explain
  operational steps plainly; he's decisive about content and scope.
