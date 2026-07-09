import type { Announcement } from './types';
import announcementsData from './announcements.json';

/**
 * The announcements feed. The canonical data lives in `announcements.json`
 * (single source of truth): it is bundled here as the instant-paint seed AND
 * served as `/announcements.json` (see the plugin in vite.config.ts), which
 * the app re-fetches at runtime and the push sender reads on a schedule.
 *
 * Items only appear once their `timestamp` has passed (see
 * src/state/announcements.tsx), so event-day items are effectively scheduled:
 * they surface — and push — automatically at the right moment during Summit.
 * Timestamps are Central time (parsed device-local in the app, with an
 * explicit -05:00 offset in netlify/functions/send-pushes.mts).
 *
 * EVERYTHING here must be true and sourced from gbsummit.org or the client —
 * no invented logistics.
 */
export const seedAnnouncements: Announcement[] = announcementsData;
