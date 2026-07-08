import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { seedAnnouncements, type Announcement } from '@/content/2026';
import { appNow } from '@/lib/time';

/**
 * Announcements store.
 *
 * The deployed seed is ALWAYS the source of truth for content — localStorage
 * only remembers which ids the user has read, so redeploying corrected or new
 * announcements reaches every visitor. Items are timestamp-gated: an item
 * appears only once its `timestamp` has passed, which makes event-day seeds
 * behave like scheduled announcements.
 *
 * `addAnnouncement` is the Phase 2 seam — a push handler will call it so a
 * pushed item also lands in the visible feed (in-memory for now).
 */

const READ_KEY = 'summit2026.read.v1';
/** v1.0 persisted the whole feed; clear it so stale content can't linger. */
const LEGACY_FEED_KEY = 'summit2026.feed.v1';

interface AnnouncementsCtx {
  announcements: Announcement[]; // visible: released, pinned first, newest first
  unreadCount: number;
  markAllRead: () => void;
  addAnnouncement: (a: Announcement) => void;
}

const Ctx = createContext<AnnouncementsCtx | null>(null);

function loadRead(): Set<string> {
  try {
    const raw = localStorage.getItem(READ_KEY);
    if (raw) return new Set(JSON.parse(raw) as string[]);
  } catch {
    /* ignore */
  }
  return new Set();
}

export function AnnouncementsProvider({ children }: { children: ReactNode }) {
  const [read, setRead] = useState<Set<string>>(loadRead);
  const [pushed, setPushed] = useState<Announcement[]>([]);

  useEffect(() => {
    try {
      localStorage.removeItem(LEGACY_FEED_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(READ_KEY, JSON.stringify([...read]));
  }, [read]);

  const announcements = useMemo(() => {
    const now = appNow().getTime();
    return [...seedAnnouncements, ...pushed]
      .filter((a) => new Date(a.timestamp).getTime() <= now)
      .sort((a, b) => {
        if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
        return b.timestamp.localeCompare(a.timestamp);
      });
  }, [pushed]);

  const unreadCount = useMemo(
    () => announcements.filter((a) => !read.has(a.id)).length,
    [announcements, read],
  );

  const markAllRead = useCallback(() => {
    setRead(new Set(announcements.map((a) => a.id)));
  }, [announcements]);

  const addAnnouncement = useCallback((a: Announcement) => {
    setPushed((prev) => (prev.some((x) => x.id === a.id) ? prev : [a, ...prev]));
  }, []);

  const value: AnnouncementsCtx = {
    announcements,
    unreadCount,
    markAllRead,
    addAnnouncement,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAnnouncements(): AnnouncementsCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useAnnouncements must be used within AnnouncementsProvider');
  return ctx;
}
