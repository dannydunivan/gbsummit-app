import type { Announcement } from './types';

/**
 * The announcements feed. Items only appear once their `timestamp` has passed
 * (see src/state/announcements.tsx), so event-day items below are effectively
 * scheduled: they surface automatically at the right moment during Summit.
 *
 * EVERYTHING here must be true and sourced from gbsummit.org or the client —
 * no invented logistics. Phase 2 replaces/extends this with live-pushed items.
 */
export const seedAnnouncements: Announcement[] = [
  {
    id: 'a-welcome',
    timestamp: '2026-07-06T12:00:00',
    title: 'Welcome to Summit 2026!',
    body:
      'We can’t wait to see you July 13–15 at Connection Point Church in Jackson, MO. Doors open and registration begins Monday at 8:00 AM.',
    pinned: true,
  },
  {
    id: 'a-plan',
    timestamp: '2026-07-07T09:00:00',
    title: 'Plan your week',
    body:
      'Browse the three-day Schedule, pick your Tuesday breakouts from the catalog, and check Where to Eat for options in Jackson and Cape Girardeau.',
    pinned: false,
  },
  {
    id: 'a-ga',
    timestamp: '2026-07-13T09:30:00',
    title: 'General Association Meeting at 10:00',
    body:
      'The business meeting of the General Association begins at 10:00 AM in the Worship Center. Open the packet from the session details in the Schedule.',
    pinned: false,
  },
  {
    id: 'a-lunch-mon',
    timestamp: '2026-07-13T11:30:00',
    title: 'Lunch on your own',
    body:
      'The Monday lunch break runs 11:30–2:00 — see Where to Eat for nearby options. Session 1 with Vince Daniel starts at 2:00 PM in the Worship Center.',
    pinned: false,
  },
  {
    id: 'a-breakfast',
    timestamp: '2026-07-14T07:00:00',
    title: 'Breakfast with the Missionaries',
    body:
      'Tuesday starts at 7:30 AM with Breakfast with the Missionaries in the Civic Center Gym, directly across the road from Connection Point.',
    pinned: false,
  },
  {
    id: 'a-breakouts',
    timestamp: '2026-07-14T12:30:00',
    title: 'Breakouts this afternoon',
    body:
      'Breakout Session 1 (1:30) and Session 2 (3:00) run across Connection Point and the Civic Center. Browse the full catalog from the Schedule.',
    pinned: false,
  },
  {
    id: 'a-commissioning',
    timestamp: '2026-07-14T18:30:00',
    title: 'Commissioning Service tonight',
    body:
      'Join us at 7:00 PM for Session 4 with Dr. Danny Dunivan and the Commissioning Service in the Worship Center.',
    pinned: false,
  },
];
