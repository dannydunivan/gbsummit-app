import { useEffect, useState } from 'react';
import { subscribeToPush } from '@/lib/push';

/**
 * Install + notification onboarding helpers.
 *
 * Platform reality (handoff §6):
 *  - Android / desktop: Web Push works after the user allows notifications.
 *  - iPhone / iPad: push works ONLY after "Add to Home Screen" (iOS 16.4+), so
 *    iOS users must install first, then enable alerts.
 *
 * Phase 1 wires the UX (detect platform, install prompt, permission request).
 * Phase 2 attaches Firebase Cloud Messaging to `enableNotifications`.
 */

export function isIOS(): boolean {
  const ua = navigator.userAgent;
  const iOSDevice = /iPad|iPhone|iPod/.test(ua);
  // iPadOS 13+ reports as Mac; detect touch to disambiguate.
  const iPadOS = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
  return iOSDevice || iPadOS;
}

export function isStandalone(): boolean {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    // iOS Safari legacy flag
    (navigator as unknown as { standalone?: boolean }).standalone === true
  );
}

export function notificationsSupported(): boolean {
  return 'Notification' in window && 'serviceWorker' in navigator;
}

export type NotifPermission = 'default' | 'granted' | 'denied' | 'unsupported';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

/**
 * Tracks the browser's `beforeinstallprompt` (Chrome/Edge/Android) so we can
 * offer a native "Install" button. iOS never fires this — there we show manual
 * "Add to Home Screen" instructions instead.
 */
export function useInstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(isStandalone());

  useEffect(() => {
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
    };
    const onInstalled = () => {
      setInstalled(true);
      setDeferred(null);
    };
    window.addEventListener('beforeinstallprompt', onPrompt);
    window.addEventListener('appinstalled', onInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  const promptInstall = async () => {
    if (!deferred) return false;
    await deferred.prompt();
    const choice = await deferred.userChoice;
    setDeferred(null);
    return choice.outcome === 'accepted';
  };

  return { canInstall: !!deferred, installed, promptInstall };
}

/** Current notification permission, reactive to a request. */
export function useNotificationPermission() {
  const [permission, setPermission] = useState<NotifPermission>(
    notificationsSupported() ? (Notification.permission as NotifPermission) : 'unsupported',
  );

  const request = async (): Promise<NotifPermission> => {
    if (!notificationsSupported()) return 'unsupported';
    const result = await Notification.requestPermission();
    setPermission(result as NotifPermission);
    if (result === 'granted') {
      // Register this device for Web Push announcements (src/lib/push.ts).
      subscribeToPush().catch(() => {
        /* offline or no active SW — syncPushSubscription retries next launch */
      });
    }
    return result as NotifPermission;
  };

  return { permission, request };
}
