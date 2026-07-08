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

/**
 * Announcements store. Phase 1 keeps the feed in localStorage so the demo feels
 * live and "read" state persists. Phase 2 will merge pushed items (FCM) into the
 * same store — `addAnnouncement` is the seam a push handler calls.
 */

const FEED_KEY = 'summit2026.feed.v1';
const READ_KEY = 'summit2026.read.v1';

interface AnnouncementsCtx {
  announcements: Announcement[]; // newest first, pinned pulled to top
  unreadCount: number;
  markAllRead: () => void;
  addAnnouncement: (a: Announcement) => void;
}

const Ctx = createContext<AnnouncementsCtx | null>(null);

function loadFeed(): Announcement[] {
  try {
    const raw = localStorage.getItem(FEED_KEY);
    if (raw) return JSON.parse(raw) as Announcement[];
  } catch {
    /* ignore */
  }
  return seedAnnouncements;
}

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
  const [feed, setFeed] = useState<Announcement[]>(loadFeed);
  const [read, setRead] = useState<Set<string>>(loadRead);

  useEffect(() => {
    localStorage.setItem(FEED_KEY, JSON.stringify(feed));
  }, [feed]);
  useEffect(() => {
    localStorage.setItem(READ_KEY, JSON.stringify([...read]));
  }, [read]);

  const announcements = useMemo(() => {
    return [...feed].sort((a, b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
      return b.timestamp.localeCompare(a.timestamp);
    });
  }, [feed]);

  const unreadCount = useMemo(
    () => feed.filter((a) => !read.has(a.id)).length,
    [feed, read],
  );

  const markAllRead = useCallback(() => {
    setRead(new Set(feed.map((a) => a.id)));
  }, [feed]);

  const addAnnouncement = useCallback((a: Announcement) => {
    setFeed((prev) => (prev.some((x) => x.id === a.id) ? prev : [a, ...prev]));
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
