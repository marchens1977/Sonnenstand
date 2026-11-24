/* Service Worker = Hintergrund-Helfer der App.
   Er merkt sich die App-Dateien, damit Sonnenstand auch ohne Internet startet.
   Bei jeder Änderung an der App: VERSION um 1 erhöhen. */
const VERSION = 'sonnenstand-v1';
const APP_FILES = [
    './',
    './index.html',
    './manifest.webmanifest',
    './icons/icon.svg',
    './icons/icon-192.png',
    './icons/icon-512.png',
    './icons/icon-maskable-512.png',
    './icons/apple-touch-icon.png',
    'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
    'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
    'https://cdnjs.cloudflare.com/ajax/libs/suncalc/1.9.0/suncalc.min.js'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(VERSION)
            .then(cache => Promise.all(APP_FILES.map(url => cache.add(url).catch(() => null))))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', event => {
    const req = event.request;
    if (req.method !== 'GET') return;
    const url = new URL(req.url);

    // Eigene App-Dateien: erst Internet (immer aktuell), sonst gespeicherte Kopie
    if (url.origin === self.location.origin) {
        event.respondWith(
            fetch(req).then(res => {
                if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
                return res;
            }).catch(() => caches.match(req).then(r => r || caches.match('./index.html')))
        );
        return;
    }

    // Bausteine (Leaflet, SunCalc): gespeicherte Kopie zuerst
    if (APP_FILES.includes(req.url)) {
        event.respondWith(caches.match(req).then(r => r || fetch(req)));
    }
    // Alles andere (Karte, Ortssuche) geht normal übers Internet
});
