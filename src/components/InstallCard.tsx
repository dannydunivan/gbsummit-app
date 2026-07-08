import { useState } from 'react';
import { Icon } from './Icon';
import {
  isIOS,
  isStandalone,
  notificationsSupported,
  useInstallPrompt,
  useNotificationPermission,
} from '@/state/install';

const DISMISS_KEY = 'summit2026.installcard.dismissed';

/**
 * Onboarding for installing the app + enabling event alerts.
 *
 * iPhone/iPad: push only works after "Add to Home Screen" (iOS 16.4+), so we
 * walk them through Share → Add to Home Screen first. Android/desktop: offer the
 * native install prompt, then an "Enable alerts" button.
 */
export function InstallCard() {
  const ios = isIOS();
  const standalone = isStandalone();
  const { canInstall, promptInstall } = useInstallPrompt();
  const { permission, request } = useNotificationPermission();
  const [dismissed, setDismissed] = useState(
    () => localStorage.getItem(DISMISS_KEY) === '1',
  );

  const alertsOn = permission === 'granted';

  // Nothing useful to offer, or the user dismissed it: hide.
  const fullyDone = standalone && (alertsOn || !notificationsSupported());
  if (dismissed || fullyDone) return null;

  const dismiss = () => {
    localStorage.setItem(DISMISS_KEY, '1');
    setDismissed(true);
  };

  // --- iOS, not yet installed: show Add to Home Screen instructions ---------
  if (ios && !standalone) {
    return (
      <section>
        <div className="card card-pad install-card">
          <button className="install-dismiss" onClick={dismiss} aria-label="Dismiss">
            ✕
          </button>
          <div className="install-icon">
            <Icon name="bell" size={24} />
          </div>
          <h3>Get event alerts on your iPhone</h3>
          <p className="muted">
            Add Summit 2026 to your Home Screen to receive push alerts and use it offline at the venue.
          </p>
          <ol className="install-steps">
            <li>
              Tap the <strong>Share</strong> button
              <span className="ios-share" aria-hidden="true">
                {' '}⬆️
              </span>{' '}
              in Safari
            </li>
            <li>
              Choose <strong>Add to Home Screen</strong>
            </li>
            <li>
              Open Summit 2026 from your Home Screen and tap <strong>Enable Alerts</strong>
            </li>
          </ol>
        </div>
      </section>
    );
  }

  // --- Installed (or desktop) but alerts not on: offer enable --------------
  return (
    <section>
      <div className="card card-pad install-card">
        <button className="install-dismiss" onClick={dismiss} aria-label="Dismiss">
          ✕
        </button>
        <div className="install-icon">
          <Icon name="bell" size={24} />
        </div>
        <h3>Stay in the loop</h3>
        <p className="muted">
          Turn on alerts for schedule changes, room moves, and announcements during Summit.
        </p>
        <div className="install-actions">
          {!standalone && canInstall && (
            <button className="btn btn-dark" onClick={promptInstall}>
              Install app <Icon name="external" size={16} />
            </button>
          )}
          {notificationsSupported() && permission !== 'denied' && (
            <button className="btn btn-primary" onClick={request} disabled={alertsOn}>
              {alertsOn ? (
                <>
                  <Icon name="check" size={16} /> Alerts on
                </>
              ) : (
                <>
                  <Icon name="bell" size={16} /> Enable Alerts
                </>
              )}
            </button>
          )}
          {permission === 'denied' && (
            <p className="faint install-denied">
              Alerts are blocked. Enable notifications for this site in your browser settings.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
