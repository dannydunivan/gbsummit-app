/**
 * Summit 2026 — content types.
 * All event content lives under src/content/2026/ so the yearly rebuild is a
 * folder swap (see README "Yearly rebuild").
 */

export type SessionType =
  | 'worship'
  | 'keynote'
  | 'training'
  | 'business'
  | 'kids'
  | 'youth'
  | 'break';

export type DayId = '2026-07-13' | '2026-07-14' | '2026-07-15';

export interface Session {
  id: string;
  day: DayId;
  startTime: string; // 24h "HH:MM" local
  endTime: string; // 24h "HH:MM" local
  title: string;
  type: SessionType;
  location: string;
  speakerIds: string[];
  description: string;
  /** Present on General Association (business) sessions — live packet site. */
  packetUrl?: string;
  /** Marks a breakout block whose detail links to the full breakout catalog. */
  breakouts?: boolean;
}

export interface Speaker {
  id: string;
  name: string;
  role: string;
  /** Public path to the bundled headshot; falls back to initials if absent. */
  photo?: string;
  bio: string;
  sessionIds: string[];
}

export interface Announcement {
  id: string;
  timestamp: string; // ISO — when it was delivered/created
  scheduledFor?: string; // ISO — BACKEND SEAM: admin scheduler queues delivery
  title: string;
  body: string;
  pinned: boolean;
}

export interface Breakout {
  id: string;
  title: string;
  presenter: string;
  description: string;
  /** Room location (from gbsummit.org). */
  location: string;
  /** Which Tuesday breakout block: 1 (1:30 PM) or 2 (3:00 PM). */
  session: 1 | 2;
}
