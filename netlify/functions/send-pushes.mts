import type { Config } from '@netlify/functions';
import { getStore } from '@netlify/blobs';
import webpush from 'web-push';

/**
 * Scheduled push sender (every 5 minutes).
 *
 * Reads the deployed /announcements.json, finds items whose timestamp has
 * just passed and that haven't been pushed yet, and delivers them to every
 * stored Web Push subscription. State lives in Netlify Blobs:
 *   push-subs  — one blob per device subscription (see subscribe.mts)
 *   push-state — "pushed-ids": announcement ids already sent
 *
 * Guards:
 *  - Announcement timestamps are naive Central-time strings; the app parses
 *    them device-local, but this function runs in UTC, so we pin the event's
 *    offset (July = CDT, UTC-5) when comparing.
 *  - Items released more than RECENT_WINDOW ago are marked sent WITHOUT
 *    notifying — so the first run (or a long outage) never blasts phones
 *    with old news.
 */

const RECENT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const CENTRAL_OFFSET = '-05:00'; // CDT during Summit week (July)

interface FeedItem {
  id: string;
  timestamp: string;
  title: string;
  body: string;
}

export default async (): Promise<Response> => {
  const { VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY, VAPID_SUBJECT, URL: SITE_URL } = process.env;
  if (!VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY) {
    return new Response('VAPID keys not configured', { status: 500 });
  }
  webpush.setVapidDetails(
    VAPID_SUBJECT ?? 'mailto:danny.dunivan@generalbaptist.com',
    VAPID_PUBLIC_KEY,
    VAPID_PRIVATE_KEY,
  );

  const site = SITE_URL ?? 'https://gbm-summit-2026.netlify.app';
  const feedRes = await fetch(`${site}/announcements.json`);
  if (!feedRes.ok) return new Response(`Feed fetch failed: ${feedRes.status}`, { status: 502 });
  const feed = (await feedRes.json()) as FeedItem[];

  const state = getStore('push-state');
  const pushedIds = new Set<string>((await state.get('pushed-ids', { type: 'json' })) ?? []);

  const now = Date.now();
  const due: FeedItem[] = [];
  let markedSilently = 0;
  for (const item of feed) {
    if (pushedIds.has(item.id)) continue;
    const released = new Date(`${item.timestamp}${CENTRAL_OFFSET}`).getTime();
    if (Number.isNaN(released) || released > now) continue; // not yet due
    if (now - released > RECENT_WINDOW_MS) {
      pushedIds.add(item.id); // old news: record, don't notify
      markedSilently += 1;
      continue;
    }
    due.push(item);
  }

  let delivered = 0;
  let pruned = 0;
  if (due.length > 0) {
    const subsStore = getStore('push-subs');
    const { blobs } = await subsStore.list();
    const subs = await Promise.all(
      blobs.map(async ({ key }) => ({
        key,
        sub: (await subsStore.get(key, { type: 'json' })) as webpush.PushSubscription,
      })),
    );

    for (const item of due) {
      const payload = JSON.stringify({
        title: item.title,
        body: item.body,
        url: '/',
        tag: item.id,
      });
      // Modest parallelism: hundreds of devices finish in a few seconds.
      const CHUNK = 20;
      for (let i = 0; i < subs.length; i += CHUNK) {
        await Promise.all(
          subs.slice(i, i + CHUNK).map(async ({ key, sub }) => {
            try {
              await webpush.sendNotification(sub, payload, { TTL: 60 * 60 * 4 });
              delivered += 1;
            } catch (err) {
              const status = (err as { statusCode?: number }).statusCode;
              if (status === 404 || status === 410) {
                await subsStore.delete(key); // device unsubscribed/expired
                pruned += 1;
              }
            }
          }),
        );
      }
      pushedIds.add(item.id);
    }
  }

  if (due.length > 0 || markedSilently > 0) {
    await state.setJSON('pushed-ids', [...pushedIds]);
  }

  const summary = `due=${due.length} delivered=${delivered} pruned=${pruned} silent=${markedSilently}`;
  console.log(`[send-pushes] ${summary}`);
  return new Response(summary);
};

export const config: Config = {
  schedule: '*/5 * * * *',
};
