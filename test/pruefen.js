/* Automatische Prüfung für Sonnenstand.
   Start:  node test/pruefen.js
   Einmalig vorher (falls die Bausteine aus dem Internet gesperrt sind):
           npm install --no-save --prefix test/.vendor leaflet@1.9.4 suncalc@1.9.0
   Braucht Node.js und Playwright (in der Claude-Cloud-Sitzung vorhanden).
   Bildschirmfotos landen in test/bildschirmfotos/ (werden nicht hochgeladen). */
const { chromium, devices } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const VENDOR = path.join(__dirname, '.vendor', 'node_modules');
const SHOTS = path.join(__dirname, 'bildschirmfotos');
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.svg': 'image/svg+xml',
                '.png': 'image/png', '.webmanifest': 'application/manifest+json', '.css': 'text/css' };
let fehler = 0;
const ok = (b, text) => { console.log((b ? '  ✔ ' : '  ✘ ') + text); if (!b) fehler++; };

function pngSize(file) {
    const b = fs.readFileSync(file);
    return [b.readUInt32BE(16), b.readUInt32BE(20)];
}

const server = http.createServer((req, res) => {
    let f = path.join(ROOT, decodeURIComponent(req.url.split('?')[0]));
    if (f.endsWith(path.sep)) f = path.join(f, 'index.html');
    if (!f.startsWith(ROOT) || !fs.existsSync(f)) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(f)] || 'application/octet-stream' });
    fs.createReadStream(f).pipe(res);
});

(async () => {
    console.log('Dateien:');
    const man = JSON.parse(fs.readFileSync(path.join(ROOT, 'manifest.webmanifest'), 'utf8'));
    ok(man.display === 'standalone', 'Manifest: startet als eigene App (standalone)');
    for (const [name, size] of [['icon-192.png', 192], ['icon-512.png', 512], ['icon-maskable-512.png', 512], ['apple-touch-icon.png', 180]]) {
        const f = path.join(ROOT, 'icons', name);
        ok(fs.existsSync(f) && pngSize(f).join() === `${size},${size}`, `Icon ${name} vorhanden (${size}×${size})`);
    }
    ok(man.icons.some(i => i.purpose === 'maskable'), 'Manifest: Android-Icon (maskable) eingetragen');
    for (const i of man.icons) ok(fs.existsSync(path.join(ROOT, i.src)), `Manifest-Icon existiert: ${i.src}`);
    const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
    ok(html.includes('rel="manifest"'), 'index.html verweist aufs Manifest');
    ok(fs.existsSync(path.join(ROOT, 'sw.js')), 'Service Worker (sw.js) vorhanden');

    await new Promise(r => server.listen(0, r));
    const url = `http://localhost:${server.address().port}/`;
    const browser = await chromium.launch();
    const ctx = await browser.newContext({ ...devices['Galaxy S9+'], permissions: [] });
    // Bausteine aus dem Internet: wenn gesperrt, lokale Kopie nehmen; Karte/Ortssuche abschalten
    await ctx.route(/unpkg\.com\/leaflet@1\.9\.4\/dist\/(.*)$/, r => {
        const f = path.join(VENDOR, 'leaflet', 'dist', r.request().url().split('/dist/')[1]);
        fs.existsSync(f) ? r.fulfill({ path: f }) : r.continue();
    });
    await ctx.route(/suncalc\.min\.js$/, r => {
        const f = path.join(VENDOR, 'suncalc', 'suncalc.js');
        fs.existsSync(f) ? r.fulfill({ path: f, contentType: 'text/javascript' }) : r.continue();
    });
    await ctx.route(/openstreetmap\.org/, r => r.abort());

    const page = await ctx.newPage();
    const jsFehler = [];
    page.on('pageerror', e => jsFehler.push(e.message));
    await page.goto(url);
    await page.waitForFunction(() => /\d\d:\d\d/.test(document.getElementById('sunrise').textContent), null, { timeout: 15000 });

    console.log('App im Browser (Handy-Größe):');
    ok(jsFehler.length === 0, 'Keine Programmfehler' + (jsFehler.length ? ': ' + jsFehler.join(' | ') : ''));
    ok(/^\d\d:\d\d$/.test(await page.textContent('#sunrise')), 'Sonnenaufgang wird angezeigt');
    ok(/^\d\d:\d\d$/.test(await page.textContent('#sunset')), 'Sonnenuntergang wird angezeigt');
    const farben = await page.evaluate(() => {
        const cs = getComputedStyle(document.documentElement);
        return { blau: cs.getPropertyValue('--mets-blue').trim(), orange: cs.getPropertyValue('--mets-orange').trim() };
    });
    ok(farben.blau.toUpperCase() === '#002D72' && farben.orange.toUpperCase() === '#FF5910', 'Mets-Farben gesetzt (Blau #002D72, Orange #FF5910)');
    const sw = await page.evaluate(async () => {
        const reg = await Promise.race([navigator.serviceWorker.ready, new Promise(r => setTimeout(() => r(null), 8000))]);
        return !!(reg && reg.active);
    });
    ok(sw, 'Service Worker läuft (App ist installierbar / offline-fähig)');
    const breite = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
    ok(breite, 'Nichts ragt seitlich über den Bildschirm');
    const kaesten = await page.evaluate(() => [...document.querySelectorAll('.card')].every(card => {
        const r = card.getBoundingClientRect();
        return [...card.querySelectorAll('.mini, .big-time')].every(k => k.getBoundingClientRect().right <= r.right + 0.5);
    }));
    ok(kaesten, 'Kleine Kästen bleiben innerhalb ihrer Karte');

    // Offline-Test: Seite neu laden ohne Internet
    await ctx.setOffline(true);
    await page.reload();
    ok(/Sonnenstand/.test(await page.title()), 'App startet auch offline');
    await ctx.setOffline(false);

    fs.mkdirSync(SHOTS, { recursive: true });
    await page.reload();
    await page.waitForFunction(() => /\d\d:\d\d/.test(document.getElementById('sunrise').textContent));
    await page.screenshot({ path: path.join(SHOTS, 'handy-oben.png') });
    await page.screenshot({ path: path.join(SHOTS, 'handy-ganz.png'), fullPage: true });

    await browser.close();
    server.close();
    console.log(fehler ? `\n${fehler} Prüfung(en) FEHLGESCHLAGEN` : '\nAlle Prüfungen bestanden ✔');
    process.exit(fehler ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
