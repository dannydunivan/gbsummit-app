/**
 * Web Push subscription client.
 *
 * Standard browser push (VAPID), no Firebase: the service worker subscribes
 * with the public key below, the subscription is stored server-side by
 * netlify/functions/subscribe.mts, and netlify/functions/send-pushes.mts
 * delivers announcements to every stored subscription on a schedule.
 *
 * The public key is safe to ship in the bundle; the private half lives only
 * in Netlify env vars (VAPID_PRIVATE_KEY).
 */
export const VAPID_PUBLIC_KEY =
  'BMaohGvrAu7Ib7QAo-xnojZRbNXhYLuUCD9JTH3Bc7Oz_lVwuZDim2R6cXUHosK21qdhHWBYz7fNA9FdH-rDRoM';

export function pushSupported(): boolean {
  return 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
}

function urlBase64ToUint8Array(base64: string): Uint8Array<ArrayBuffer> {
  const padding = '='.repeat((4 - (base64.length % 4)) % 4);
  const raw = atob((base64 + padding).replace(/-/g, '+').replace(/_/g, '/'));
  const bytes = new Uint8Array(new ArrayBuffer(raw.length));
  for (let i = 0; i < raw.length; i += 1) bytes[i] = raw.charCodeAt(i);
  return bytes;
}

/**
 * Subscribe this device and register the subscription with the server.
 * Call only after Notification.permission === 'granted'. Returns true when
 * the server accepted the subscription.
 */
export async function subscribeToPush(): Promise<boolean> {
  if (!pushSupported()) return false;
  const reg = await navigator.serviceWorker.ready;
  const sub =
    (await reg.pushManager.getSubscription()) ??
    (await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
    }));
  const res = await fetch('/api/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(sub),
  });
  return res.ok;
}

/**
 * On app load: if the user already granted alerts, quietly re-register the
 * subscription so the server store stays fresh (subscriptions can rotate).
 * Never throws — offline or dev (no SW) is fine.
 */
export function syncPushSubscription(): void {
  if (!pushSupported() || Notification.permission !== 'granted') return;
  subscribeToPush().catch(() => {
    /* offline or no active SW (dev server) — retry next launch */
  });
}
