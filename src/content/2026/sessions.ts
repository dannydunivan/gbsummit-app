import type { DayId, Session } from './types';

/**
 * Business-session packet. Served from public/packet.pdf — currently a
 * placeholder page; swap in the real PDF from the client when it arrives
 * (same filename, redeploy — no code change needed).
 */
export const PACKET_URL = '/packet.pdf';

export const DAYS: { id: DayId; label: string; short: string }[] = [
  { id: '2026-07-13', label: 'Monday, July 13', short: 'Mon' },
  { id: '2026-07-14', label: 'Tuesday, July 14', short: 'Tue' },
  { id: '2026-07-15', label: 'Wednesday, July 15', short: 'Wed' },
];

/**
 * Real Summit 2026 agenda from gbsummit.org/schedule. Kids/Youth blocks are
 * added (the event advertises "activities for kids and youth"); exact times for
 * those are placeholders pending the printed program.
 */
export const sessions: Session[] = [
  // ---------------------------------------------------------------- MONDAY
  {
    id: 's-mon-doors',
    day: '2026-07-13',
    startTime: '08:00',
    endTime: '10:00',
    title: 'Doors Open & Registration',
    type: 'break',
    location: 'Main Lobby',
    speakerIds: [],
    description:
      'Pick up your badge and program at the Help Desk in the Main Lobby. First time at Summit? Visit the Info tab for everything you need to know before you go.',
  },
  {
    id: 's-mon-ga',
    day: '2026-07-13',
    startTime: '10:00',
    endTime: '11:30',
    title: 'General Association Meeting',
    type: 'business',
    location: 'Worship Center',
    speakerIds: [],
    description: 'The business meeting of the General Association: reports, the agenda, and any motions.',
    packetUrl: PACKET_URL,
  },
  {
    id: 's-mon-lunch',
    day: '2026-07-13',
    startTime: '11:30',
    endTime: '14:00',
    title: 'Lunch Break',
    type: 'break',
    location: 'On your own',
    speakerIds: [],
    description:
      'Lunch is on your own. See Where to Eat (from Home or the Info tab) for nearby Jackson and Cape Girardeau options.',
  },
  {
    id: 's-mon-s1',
    day: '2026-07-13',
    startTime: '14:00',
    endTime: '15:30',
    title: 'Session 1 with Vince Daniel',
    type: 'keynote',
    location: 'Worship Center',
    speakerIds: ['sp-daniel'],
    description: 'Our first Main Session, with Vince Daniel, VP for National Missions.',
  },
  {
    id: 's-mon-dinner',
    day: '2026-07-13',
    startTime: '16:00',
    endTime: '19:00',
    title: 'Dinner Break',
    type: 'break',
    location: 'On your own',
    speakerIds: [],
    description: 'Dinner is on your own ahead of the evening session.',
  },
  {
    id: 's-mon-s2',
    day: '2026-07-13',
    startTime: '19:00',
    endTime: '20:30',
    title: 'Session 2 with Clint Cook',
    type: 'keynote',
    location: 'Worship Center',
    speakerIds: ['sp-cook'],
    description: 'Monday evening Main Session, with Clint Cook, Lead Pastor of Real Life Church.',
  },

  // --------------------------------------------------------------- TUESDAY
  {
    id: 's-tue-breakfast',
    day: '2026-07-14',
    startTime: '07:30',
    endTime: '08:30',
    title: 'Breakfast with the Missionaries',
    type: 'break',
    location: 'Civic Center Gym',
    speakerIds: [],
    description: 'Start the day over breakfast and hear from our missionaries, across the road at the Civic Center Gym.',
  },
  {
    id: 's-tue-doors',
    day: '2026-07-14',
    startTime: '08:30',
    endTime: '09:00',
    title: 'Doors Open',
    type: 'break',
    location: 'Worship Center',
    speakerIds: [],
    description: 'Doors open for the Tuesday program.',
  },
  {
    id: 's-tue-s3',
    day: '2026-07-14',
    startTime: '09:00',
    endTime: '11:00',
    title: 'Session 3: The 4 x 10',
    type: 'keynote',
    location: 'Worship Center',
    speakerIds: ['sp-brooks', 'sp-owens', 'sp-pusey', 'sp-washington'],
    description:
      'Four leaders, ten minutes each, one big idea apiece — Jarod Brooks (Connection Point Church), Kellie Owens (Liberty Hill Church), Phillip Pusey (Heavenly Highway General Baptist Church), and Brennan Washington (City Light Church).',
  },
  {
    id: 's-tue-super',
    day: '2026-07-14',
    startTime: '11:00',
    endTime: '13:30',
    title: 'Super Session Training (with Boxed Lunch)',
    type: 'training',
    location: 'Connection Point — 3 tracks',
    speakerIds: ['sp-clifton', 'sp-lake', 'sp-pratt'],
    description:
      'Three concurrent training tracks with a boxed lunch — choose one: Church Revitalization with Mark Clifton (Main Auditorium), Leadership Development with Mac Lake (Kids K–3rd Room), or Spiritual Formation with Dr. Jim Pratt (Café).',
  },
  {
    id: 's-tue-bo1',
    day: '2026-07-14',
    startTime: '13:30',
    endTime: '14:45',
    title: 'Breakout Session 1',
    type: 'training',
    location: 'Connection Point & Civic Center',
    speakerIds: [],
    breakouts: true,
    description:
      'The first of two breakout blocks — five options across Connection Point and the Civic Center. Browse the full catalog and pick the one for you.',
  },
  {
    id: 's-tue-bo2',
    day: '2026-07-14',
    startTime: '15:00',
    endTime: '16:00',
    title: 'Breakout Session 2',
    type: 'training',
    location: 'Connection Point & Civic Center',
    speakerIds: [],
    breakouts: true,
    description:
      'A second round of five breakouts across Connection Point and the Civic Center. See the full catalog.',
  },
  {
    id: 's-tue-dinner',
    day: '2026-07-14',
    startTime: '16:00',
    endTime: '19:00',
    title: 'Dinner Break',
    type: 'break',
    location: 'On your own',
    speakerIds: [],
    description: 'Dinner is on your own ahead of the evening session.',
  },
  {
    id: 's-tue-s4',
    day: '2026-07-14',
    startTime: '19:00',
    endTime: '21:00',
    title: 'Session 4 & Commissioning Service',
    type: 'keynote',
    location: 'Worship Center',
    speakerIds: ['sp-dunivan'],
    description:
      'Tuesday evening Main Session with Dr. Danny Dunivan, President of General Baptist Ministries, followed by the Commissioning Service.',
  },

  // ------------------------------------------------------------- WEDNESDAY
  {
    id: 's-wed-doors',
    day: '2026-07-15',
    startTime: '08:30',
    endTime: '09:00',
    title: 'Doors Open',
    type: 'break',
    location: 'Worship Center',
    speakerIds: [],
    description: 'Doors open for the final morning of Summit.',
  },
  {
    id: 's-wed-cln',
    day: '2026-07-15',
    startTime: '09:00',
    endTime: '11:30',
    title: 'Church Leadership Network Trainings',
    type: 'training',
    location: 'Civic Center',
    speakerIds: [],
    description:
      'Two paths to close Summit, both at the Civic Center — Path 1: Leading in Tough Cultural Moments (Meeting Room North) · Path 2: Leading Yourself Well and Persevering in Ministry (Meeting Room South).',
  },
];

export const sessionById = (id: string) => sessions.find((s) => s.id === id);

export const sessionsForDay = (day: DayId) =>
  sessions
    .filter((s) => s.day === day)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

export const sessionsForSpeaker = (speakerId: string) =>
  sessions.filter((s) => s.speakerIds.includes(speakerId));
