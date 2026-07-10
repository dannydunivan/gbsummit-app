import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles/tokens.css';
import './styles/global.css';
import './styles/app.css';
import { App } from './App';
import { AnnouncementsProvider } from './state/announcements';
import { syncPushSubscription } from './lib/push';

// Keep this device's push registration fresh if alerts were already granted.
syncPushSubscription();

// Warm the GA packet into the SW cache while the app is idle, so the packet
// button is instant (and works offline) even on weak venue WiFi. ~0.9 MB,
// once per device; later opens revalidate cheaply via ETag.
function warmPacketCache() {
  window.setTimeout(() => {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      fetch('/packet.pdf').catch(() => {
        /* offline — will warm on a later open */
      });
    }
  }, 8000);
}
warmPacketCache();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AnnouncementsProvider>
        <App />
      </AnnouncementsProvider>
    </BrowserRouter>
  </StrictMode>,
);
