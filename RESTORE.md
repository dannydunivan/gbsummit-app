# Rollback / restore points

## v1.0-team-preview — the version shared with the GBM team (2026-07-07)

The known-good build shared for team review, live at
https://gbm-summit-2026.netlify.app (Netlify deploy `6a4c1b189073ebcd6ee45d6c`).

Three independent ways to get back to it:

1. **Netlify (fastest, no rebuild).** Every deploy is kept immutably.
   - View it anytime at the permanent URL:
     https://6a4c1b189073ebcd6ee45d6c--gbm-summit-2026.netlify.app
   - To make it the live production version again: Netlify dashboard →
     gbm-summit-2026 → Deploys → select deploy `6a4c1b18…` → **Publish deploy**.
     (Or CLI: `netlify rollback` steps back one deploy;
     `netlify api restoreSiteDeploy --data '{"site_id":"d5583fc0-8787-4bd5-92f8-56027e940f91","deploy_id":"6a4c1b189073ebcd6ee45d6c"}'`
     restores this exact one.)

2. **Git.** The repo baseline commit is tagged:
   `git checkout v1.0-team-preview` (or `git diff v1.0-team-preview` to see
   everything that changed since).

3. **Zip archives** (source + the exact deployed `dist/`) in
   `~/Claude Code/gbsummit-backups/`:
   - `2026-07-07_v1-team-preview_source.zip`
   - `2026-07-07_v1-team-preview_dist.zip` — unzip and
     `netlify deploy --prod --dir=dist` reproduces the deploy byte-for-byte.
