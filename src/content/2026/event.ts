/**
 * Event-level constants. Ported from the mockup's data/event.ts.
 */
export const EVENT = {
  name: 'Summit 2026',
  org: 'General Baptist Ministries',
  datesLabel: 'July 13–15, 2026',
  venueName: 'Connection Point Church',
  venueAddress: '358 E Deerwood Dr., Jackson, MO 63755',
  venueShort: 'Jackson, MO',
  venuePhone: '(573) 785-7746',
  referenceSite: 'https://www.gbsummit.org',
  registrationUrl: 'https://secure.qgiv.com/for/summit2026',
  tagline:
    'Join us at Connection Point Church for your chance to be inspired, connect with other mission-driven individuals, and learn together.',
  highlights: [
    'Powerful worship',
    'Inspiring keynotes',
    'Specialized training',
    'Kids & youth activities',
  ],
};

/** Email that Summit questions (the Contact form) are routed to. */
export const CONTACT_EMAIL = 'carol.lawrence@generalbaptist.com';

/**
 * Summit runs across two venues on the same street. Connection Point is the
 * main site; the Jackson Civic Center (directly across E Deerwood Dr.) is the
 * secondary site — it hosts the missionary breakfast, several breakouts, the
 * Wednesday trainings, and the youth gathering.
 *
 * NOTE: `civic.blurb` is placeholder copy — replace with the client's wording.
 */
export const VENUES = {
  main: {
    name: 'Connection Point Church',
    role: 'Main site',
    address: '358 E Deerwood Dr., Jackson, MO 63755',
    blurb: 'Home base for Summit — worship, keynotes, the General Association meeting, and several breakouts.',
  },
  civic: {
    name: 'Jackson Civic Center',
    role: 'Secondary site · across the road',
    address: '381 E Deerwood Dr., Jackson, MO 63755',
    blurb:
      'Directly across E Deerwood Dr. from Connection Point. Hosts the Tuesday Breakfast with the Missionaries (Gym), several afternoon breakouts (Meeting Rooms North & South and the Lounge), the Wednesday Church Leadership Network trainings, and the Wednesday Youth Gathering.',
  },
} as const;

/** Registration pricing shown on the Home registration card. */
export const REGISTRATION_PRICING = [
  { label: 'Individuals — Adults & Teens', price: '$80' },
  { label: 'Church Block', price: '$600' },
  { label: 'Kids — Nursery–6th Grade', price: '$40' },
];

export interface Config {
  /** Controls Home: registration card prominent (false) vs. demoted (true). */
  eventStarted: boolean;
  /** Drives "Coming Up Next" + the announcements demo. ISO local string. */
  currentTime: string;
}

/**
 * Demo defaults. currentTime sits mid-morning on Day 1 so "Coming Up Next" and
 * the feed have something to show immediately. In production these come from the
 * real clock; see src/state/config.tsx.
 */
export const DEFAULT_CONFIG: Config = {
  eventStarted: true,
  currentTime: '2026-07-13T10:15:00',
};
