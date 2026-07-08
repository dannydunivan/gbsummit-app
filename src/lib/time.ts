import { type Session, sessions } from '@/content/2026';

/**
 * Real-clock time helpers. The app has three phases:
 *   before — pre-event: Home shows a countdown + the first thing coming up
 *   during — July 13–15: "Happening Now" / "Coming Up Next" run live
 *   after  — post-event: Home shows a wrap-up card
 *
 * Session times are parsed as device-local time. Attendees are on site
 * (Central), so this is correct where it matters; remote viewers may see
 * live-state shifted by their offset, which is standard for event apps.
 */

export const EVENT_START = new Date('2026-07-13T00:00:00');
/** Exclusive end — first moment after the event. */
export const EVENT_END = new Date('2026-07-16T00:00:00');

export type EventPhase = 'before' | 'during' | 'after';

export function appNow(): Date {
  return new Date();
}

export function eventPhase(now: Date = appNow()): EventPhase {
  if (now < EVENT_START) return 'before';
  if (now < EVENT_END) return 'during';
  return 'after';
}

/** Whole days until the event starts (ceil), for the pre-event countdown. */
export function daysUntilEvent(now: Date = appNow()): number {
  return Math.max(0, Math.ceil((EVENT_START.getTime() - now.getTime()) / 86_400_000));
}

/** Local YYYY-MM-DD for `d` (NOT toISOString — that's UTC and shifts the date in the evening). */
export function localDateId(d: Date): string {
  return new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(d);
}

/** "HH:MM" (24h) on the session's day → a local Date. */
function sessionStart(s: Session): Date {
  return new Date(`${s.day}T${s.startTime}:00`);
}
function sessionEnd(s: Session): Date {
  return new Date(`${s.day}T${s.endTime}:00`);
}

/** Format "HH:MM" 24h → "8:00 AM". */
export function formatTime(hhmm: string): string {
  const [h, m] = hhmm.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m).padStart(2, '0')} ${period}`;
}

export function formatTimeRange(start: string, end: string): string {
  return `${formatTime(start)} – ${formatTime(end)}`;
}

/** Sessions currently in progress at `now`, sorted by start. */
export function liveSessions(now: Date): Session[] {
  return sessions
    .filter((s) => sessionStart(s) <= now && now < sessionEnd(s))
    .sort((a, b) => a.startTime.localeCompare(b.startTime));
}

/** The next session(s) to start after `now`, sharing the earliest start time. */
export function upcomingSessions(now: Date): Session[] {
  const future = sessions
    .filter((s) => sessionStart(s) > now)
    .sort((a, b) => sessionStart(a).getTime() - sessionStart(b).getTime());
  if (future.length === 0) return [];
  const nextStart = sessionStart(future[0]).getTime();
  return future.filter((s) => sessionStart(s).getTime() === nextStart);
}

/**
 * "Coming Up Next" pick: prefer a marquee live/next session (skip pure breaks
 * unless nothing else qualifies). Returns null once the event is over.
 */
export function comingUpNext(now: Date): { session: Session; live: boolean } | null {
  const live = liveSessions(now).filter((s) => s.type !== 'break');
  if (live.length) return { session: live[0], live: true };

  const anyLive = liveSessions(now);
  const upcoming = upcomingSessions(now).filter((s) => s.type !== 'break');
  if (upcoming.length) return { session: upcoming[0], live: false };
  if (anyLive.length) return { session: anyLive[0], live: true };

  const anyUpcoming = upcomingSessions(now);
  if (anyUpcoming.length) return { session: anyUpcoming[0], live: false };
  return null;
}

/** Relative "2h ago" / "just now" for the announcements feed. */
export function relativeTime(iso: string, now: Date = appNow()): string {
  const then = new Date(iso);
  const diffMs = now.getTime() - then.getTime();
  const mins = Math.round(diffMs / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 7) return `${days}d ago`;
  return then.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}
