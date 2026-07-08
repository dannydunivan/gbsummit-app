import type { Announcement } from './types';

/**
 * Seed announcements — the durable feed shown on Home. In Phase 1 this is the
 * local demo feed; in Phase 2 a real push (FCM) delivers new items that also
 * land here. One item is pinned.
 *
 * BACKEND SEAM — an admin scheduler will create these with a `scheduledFor`
 * timestamp; real push (FCM) delivers them.
 */
export const seedAnnouncements: Announcement[] = [
  {
    id: 'a-welcome',
    timestamp: '2026-07-10T15:00:00',
    title: 'Welcome to Summit 2026!',
    body:
      'We can’t wait to see you July 13–15 at Connection Point Church in Jackson, MO. Pick up your badge at the Help Desk when you arrive, and check the Info tab if it’s your first Summit.',
    pinned: true,
  },
  {
    id: 'a-parking',
    timestamp: '2026-07-13T07:30:00',
    title: 'Doors & parking are open',
    body:
      'Doors open at 8:00 AM with registration. Use the main Deerwood Dr. entrance; overflow parking is signed along the east side.',
    pinned: false,
  },
  {
    id: 'a-wifi',
    timestamp: '2026-07-13T07:45:00',
    title: 'Guest WiFi is live',
    body: 'Network: Summit2026 · Password: welcome2026. Open to all attendees all three days.',
    pinned: false,
  },
  {
    id: 'a-ga',
    timestamp: '2026-07-13T09:40:00',
    title: 'General Association Meeting at 10:00',
    body:
      'Delegates, please be seated by 9:55 in the Worship Center. The live packet has the agenda, reports, and any motions — open it from the Schedule.',
    pinned: false,
  },
  {
    id: 'a-lunch-mon',
    timestamp: '2026-07-13T11:30:00',
    title: 'Lunch on your own today',
    body:
      'Monday lunch is on your own (11:30–2:00). See the Info tab for nearby Jackson and Cape Girardeau options.',
    pinned: false,
  },
  {
    id: 'a-breakouts',
    timestamp: '2026-07-14T08:30:00',
    title: 'Tuesday breakouts posted',
    body:
      'Breakout Sessions 1 & 2 run this afternoon across the Breakout Rooms. Browse presenters and topics in the Schedule.',
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
  {
    id: 'a-photo',
    timestamp: '2026-07-15T11:25:00',
    scheduledFor: '2026-07-15T11:25:00',
    title: 'Group photo after the trainings',
    body: 'Join us on the front steps right after the Wednesday trainings for the Summit 2026 group photo!',
    pinned: false,
  },
];
