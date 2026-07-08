/**
 * Content for the Info tab — the event "guide": the two venues and the full
 * Kids & Youth programming grid. Dining and Contact live on their own pages.
 *
 * Kids/Youth times and locations are from gbsummit.org/schedule.
 */

export interface DayPlan {
  day: string; // e.g. "Monday, July 13"
  items: string[];
}

export interface ProgramTrack {
  id: string;
  title: string;
  icon: string;
  audience: string;
  location: string;
  days: DayPlan[];
  note?: string;
}

export const programs: ProgramTrack[] = [
  {
    id: 'kids',
    title: 'Kids Programming',
    icon: '🧒',
    audience: 'Nursery – 6th grade',
    location: 'Connection Point Church',
    days: [
      { day: 'Monday, July 13', items: ['10:00 – 11:30 AM', '2:00 – 4:00 PM', '7:00 – 9:00 PM'] },
      { day: 'Tuesday, July 14', items: ['9:00 AM – 4:30 PM', '7:00 – 9:00 PM'] },
      { day: 'Wednesday, July 15', items: ['9:00 AM – 12:00 PM'] },
    ],
    note: 'Tuesday is a full day — send your child with a change of clothes.',
  },
  {
    id: 'youth',
    title: 'Youth Programming',
    icon: '🧑‍🎤',
    audience: '7th – 12th grade',
    location: 'Connection Point Church & off-site',
    days: [
      {
        day: 'Monday, July 13',
        items: ['2:00 PM — Youth Kick-Off Service', '7:00 PM — Student Section in Session 2'],
      },
      {
        day: 'Tuesday, July 14',
        items: [
          '8:00 AM – 4:00 PM — Day Out at Cape Girardeau Sportsplex with Mission in Motion',
          '7:00 PM — Student Section in Session 4',
        ],
      },
      { day: 'Wednesday, July 15', items: ['9:00 AM – 12:00 PM — Youth Gathering (Civic Center Gym)'] },
    ],
  },
];
