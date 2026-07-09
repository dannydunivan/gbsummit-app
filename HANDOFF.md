# GBM Summit 2026 PWA — Session Handoff (v3, 2026-07-08 evening)

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
  A 60-second tick (`src/lib/useNow.ts`) re-renders Home/Schedule/announcements
  so live state tracks the clock while the app stays open.
- **WEB PUSH IS LIVE (built + verified on Danny's iPhone 2026-07-08).**
  Standard VAPID Web Push, NO Firebase (Danny's Google login exists via
  `firebase login` on this Mac but is unused — kept for a possible Phase 2
  admin console). Architecture:
  - `src/lib/push.ts` — VAPID public key + subscribe; `install.ts` subscribes
    on permission grant; `main.tsx` re-syncs each launch.
  - `POST /api/subscribe` → `netlify/functions/subscribe.mts` → Netlify Blobs
    store `push-subs` (key = sha256 of endpoint, idempotent).
  - `netlify/functions/send-pushes.mts` — scheduled `*/5 * * * *` (in-code
    config; VERIFIED firing in prod). Reads live `/announcements.json`,
    pushes newly released items, prunes 404/410 subs, records sent ids in
    Blobs store `push-state` key `pushed-ids`. Items released >1h ago are
    marked silently (no first-run/outage blast). Parses naive Central
    timestamps with pinned `-05:00` (July = CDT).
  - VAPID keys in Netlify env vars (`VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`,
    `VAPID_SUBJECT`); private key exists NOWHERE else. Public key is also
    hardcoded in `src/lib/push.ts` (safe, by design). Regenerating keys
    orphans all subscriptions — don't.
  - `public/push-sw.js` (importScripts'd into the Workbox SW) shows
    notifications + focuses/opens app on tap. It and `/announcements.json`
    are excluded from precache and served `Cache-Control: no-cache`.
  - Prod log check: `netlify logs --source functions --function send-pushes`
    (streams live; `--since` history queries are unreliable — a "no logs"
    answer does NOT mean the cron isn't firing).
- **Announcements are timestamp-gated AND now runtime-fetched**: canonical
  data is `src/content/2026/announcements.json` — bundled as instant-paint
  seed AND served as `/announcements.json` (plugin in vite.config.ts), which
  the app re-fetches every 5 min (network-first, SW cache fallback). A
  redeploy updates open apps in ~5 min; release (`timestamp` passing) also
  triggers the push above. localStorage stores **read ids only**
  (`summit2026.read.v1`). All content must be TRUE — no invented logistics
  (WiFi/parking items were removed deliberately). `/api/*` must stay ABOVE
  the catch-all in `public/_redirects` (processed before netlify.toml).
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
   should happen BEFORE wide promotion/QR codes, since installs (and now push
   subscriptions) don't migrate across origins. Claude generates the DNS
   instructions once the domain is added in Netlify.
4. **GitHub decision still open** — discussed for the live-edit announcements
   bridge; he wants "me + 1–2 team members" as posters but paused on account
   ownership (GBM org account vs personal). Push shipped WITHOUT GitHub
   (Netlify functions + Blobs), so GitHub is now only needed for
   edit-without-Claude during the event.
5. **His planned announcements** — invited to send the full list (text +
   release day/time each) to bake into announcements.json before July 13.
6. **Team re-onboarding** — team members who installed before 2026-07-08
   evening should delete + re-add the app and tap Enable Alerts to get push.
7. Ongoing content edits as his team reviews the live link.

## 7. Remaining development plan

DONE 2026-07-08: all of P1 (60s tick, day-tabs background, image slimming —
precache 2.9 MB → 955 KiB); runtime-fetched announcements.json; **Web Push
end-to-end** (was "Phase 2 Firebase FCM" — shipped Firebase-free instead,
see §4). Both deployed + verified live.

Remaining, in priority order:
1. **Posting announcements during the event**: today = edit
   `src/content/2026/announcements.json`, build, deploy (Claude does it;
   push + feed then flow automatically). To remove Claude from the loop,
   finish the GitHub bridge (repo + git-connected Netlify deploy + edit in
   GitHub web UI) — BLOCKED on Danny's account-ownership decision (§6.4).
2. Hourly `registration.update()` check so mid-event redeploys reach phones
   that stay open. (Less urgent now: the feed itself refreshes every 5 min
   without a SW update; only app-shell changes need this.)
3. Dead-code sweep: README badly stale (predates push); unused
   `EVENT.registrationUrl/tagline/highlights/venuePhone`, `Speaker.sessionIds`;
   orphaned CSS from the old Info tab (`.venue-card`, `.info-facts`,
   `.tbd-flag`, `.price-*`, `.nearby*`).
4. Possible admin page for posting announcements (the `addAnnouncement` seam
   in `src/state/announcements.tsx` still exists) — only if Danny wants it;
   would pair with a `POST /api/announce` function writing to Blobs.

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
