import { useEffect, useState } from 'react';
import { appNow } from '@/lib/time';

/**
 * Current time, re-evaluated on a fixed tick so live/next state ("Happening
 * Now", timestamp-gated announcements, LIVE badges) tracks the real clock
 * while the app stays open on a phone.
 */
export function useNow(intervalMs = 60_000): Date {
  const [now, setNow] = useState(appNow);
  useEffect(() => {
    const id = setInterval(() => setNow(appNow()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return now;
}
