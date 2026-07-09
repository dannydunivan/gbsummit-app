# How to Post an Announcement (Summit 2026 app)

Anyone with access to this GitHub project can post or edit announcements
from any browser — phone or computer. No software needed.

**What happens when you save:** within about 2 minutes the announcement is
live. If its time has already passed it appears in the app feed right away;
if its time is in the future it appears (and sends a push notification to
opted-in phones) automatically at that time. Push notifications go out
within 5 minutes of the announcement's set time.

## Steps

1. Open the announcements file for editing (bookmark this link):

   **https://github.com/dannydunivan/gbsummit-app/edit/main/src/content/2026/announcements.json**

2. You'll see a list of announcements. Each one looks like this:

   ```
   {
     "id": "a-lunch-mon",
     "timestamp": "2026-07-13T11:30:00",
     "title": "Lunch on your own",
     "body": "The Monday lunch break runs 11:30–2:00 — see Where to Eat for nearby options.",
     "pinned": false
   },
   ```

3. To add a new one: copy an existing block (from `{` to `},`), paste it
   after another block's `},`, and change the four values:

   - **id** — any short unique label, e.g. `"a-room-change-1"`. Never reuse
     an old id (the app uses it to avoid double-sending pushes).
   - **timestamp** — when it should appear/push, in **Central time**,
     formatted exactly like `"2026-07-14T15:45:00"` (year-month-day, capital
     T, then hour:minute:second on a 24-hour clock — 3:45 PM = `15:45:00`).
     Use a time 1–2 minutes in the past to send **immediately**.
   - **title** — short headline (this is the notification's bold line).
   - **body** — a sentence or two.
   - Keep `"pinned": false` (only one announcement should ever be pinned —
     the pinned one sticks to the top of the feed).

4. To fix a typo in an existing announcement: just edit the title/body text.
   (Don't change its id or timestamp — a text fix should not re-send.)

5. Click the green **Commit changes...** button (top right), then the green
   **Commit changes** button in the pop-up. Done.

## Rules of thumb

- Mind the commas: every announcement block ends with `},` except the last
  one before the final `]`, which ends with `}`. If the format is broken,
  the update simply won't go out — nothing breaks, but nothing updates.
  Check https://github.com/dannydunivan/gbsummit-app/actions — a red X
  means your edit didn't publish (open it, or re-check your commas).
- Keep quotes as plain `"` characters and don't delete the brackets.
- Announcements more than 1 hour past their timestamp never push — feed only.
- Everything must be TRUE and verified — no guessed room numbers or times.
