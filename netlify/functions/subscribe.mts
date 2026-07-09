import { createHash } from 'node:crypto';
import { getStore } from '@netlify/blobs';

/**
 * POST /api/subscribe — store a Web Push subscription (one blob per device,
 * keyed by a hash of the push endpoint so re-subscribing is idempotent).
 * Dead subscriptions are pruned by send-pushes.mts when delivery returns
 * 404/410.
 */
export default async (req: Request): Promise<Response> => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  let sub: { endpoint?: string; keys?: { p256dh?: string; auth?: string } };
  try {
    sub = await req.json();
  } catch {
    return new Response('Invalid JSON', { status: 400 });
  }
  if (!sub?.endpoint?.startsWith('https://') || !sub.keys?.p256dh || !sub.keys?.auth) {
    return new Response('Invalid subscription', { status: 400 });
  }

  const key = createHash('sha256').update(sub.endpoint).digest('hex');
  await getStore('push-subs').setJSON(key, sub);

  return new Response(JSON.stringify({ ok: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
};
