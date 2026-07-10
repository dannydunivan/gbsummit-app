import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { fileURLToPath, URL } from 'node:url';
import { readFileSync } from 'node:fs';
/**
 * Serve + emit the canonical announcements data as /announcements.json.
 * The same file is bundled into the app as the instant-paint seed
 * (src/content/2026/announcements.ts); this plugin exposes it as a
 * runtime-fetchable asset so redeploys update the feed without a new app
 * bundle, and so the scheduled push sender can read it.
 */
var ANNOUNCEMENTS_SRC = fileURLToPath(new URL('./src/content/2026/announcements.json', import.meta.url));
function announcementsJson() {
    return {
        name: 'announcements-json',
        configureServer: function (server) {
            server.middlewares.use(function (req, res, next) {
                var _a;
                if (((_a = req.url) === null || _a === void 0 ? void 0 : _a.split('?')[0]) !== '/announcements.json')
                    return next();
                res.setHeader('Content-Type', 'application/json');
                res.end(readFileSync(ANNOUNCEMENTS_SRC));
            });
        },
        generateBundle: function () {
            this.emitFile({
                type: 'asset',
                fileName: 'announcements.json',
                source: readFileSync(ANNOUNCEMENTS_SRC, 'utf8'),
            });
        },
    };
}
// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    plugins: [
        react(),
        announcementsJson(),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['icons/apple-touch-icon.png', 'icons/icon.svg', 'brand/**/*'],
            manifest: {
                name: 'GBM Summit 2026',
                short_name: 'Summit 2026',
                description: 'The official app for General Baptist Ministries Summit 2026 — schedule, speakers, and event alerts.',
                id: '/',
                start_url: '/',
                scope: '/',
                display: 'standalone',
                orientation: 'portrait',
                background_color: '#F4F4F5',
                theme_color: '#1A1A1C',
                categories: ['events', 'lifestyle'],
                icons: [
                    { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
                    { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
                    { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
                    { src: 'icons/icon.svg', sizes: 'any', type: 'image/svg+xml' },
                ],
            },
            workbox: {
                // push-sw.js displays Web Push notifications alongside Workbox.
                importScripts: ['push-sw.js'],
                globPatterns: ['**/*.{js,css,html,svg,png,jpg,ico,woff2}'],
                // Don't precache the feed or the push helper — both must update
                // without waiting for a new service-worker install.
                globIgnores: ['**/push-sw.js', '**/announcements.json'],
                navigateFallback: 'index.html',
                // Navigations to real files (e.g. /packet.pdf) must hit the network,
                // not the app shell — without this the packet opens the 404 screen
                // inside the installed PWA. Routes never contain a dot.
                navigateFallbackDenylist: [/\/[^/?]+\.[a-z0-9]+(\?.*)?$/i],
                runtimeCaching: [
                    {
                        // Live announcements feed: always try the network, fall back to
                        // the last good copy when offline.
                        urlPattern: function (_a) {
                            var url = _a.url;
                            return url.pathname === '/announcements.json';
                        },
                        handler: 'NetworkFirst',
                        options: {
                            cacheName: 'announcements-feed',
                            networkTimeoutSeconds: 4,
                            cacheableResponse: { statuses: [0, 200] },
                        },
                    },
                    {
                        urlPattern: function (_a) {
                            var url = _a.url;
                            return url.origin === 'https://fonts.googleapis.com';
                        },
                        handler: 'StaleWhileRevalidate',
                        options: { cacheName: 'google-fonts-stylesheets' },
                    },
                    {
                        urlPattern: function (_a) {
                            var url = _a.url;
                            return url.origin === 'https://fonts.gstatic.com';
                        },
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'google-fonts-webfonts',
                            expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 },
                            cacheableResponse: { statuses: [0, 200] },
                        },
                    },
                ],
            },
        }),
    ],
});
