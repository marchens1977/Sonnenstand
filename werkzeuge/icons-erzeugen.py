"""Erzeugt alle App-Symbole (Icons) aus werkzeuge/icon-vorlage.svg.

Start (aus dem Projektordner):  python3 werkzeuge/icons-erzeugen.py
Braucht Node.js mit Playwright/Chromium (in der Claude-Cloud-Sitzung vorhanden).
"""
import pathlib, subprocess, json, sys

root = pathlib.Path(__file__).resolve().parent.parent
tpl = (root / 'werkzeuge' / 'icon-vorlage.svg').read_text(encoding='utf-8')
icons = root / 'icons'
icons.mkdir(exist_ok=True)

# Normales Icon: abgerundetes Quadrat
rund = tpl.replace('<!--BG-->', '<rect width="512" height="512" rx="112" fill="url(#sky)"/>')
# "Maskable" Icon: volle Fläche, Motiv verkleinert (Android schneidet Ränder ab)
maske = tpl.replace('<!--BG-->', '<rect width="512" height="512" fill="url(#sky)"/>') \
           .replace('<g id="motiv">', '<g id="motiv" transform="translate(256 270) scale(0.78) translate(-256 -270)">')
# Apple: ohne Rundung (iOS rundet selbst)
apple = maske

(icons / 'icon.svg').write_text(rund, encoding='utf-8')
jobs = [(rund, 'icon-192.png', 192), (rund, 'icon-512.png', 512),
        (maske, 'icon-maskable-512.png', 512), (apple, 'apple-touch-icon.png', 180)]

js = """
const { chromium } = require('playwright');
const jobs = JSON.parse(process.argv[1]);
(async () => {
  const b = await chromium.launch();
  for (const [svg, out, size] of jobs) {
    const p = await b.newPage({ viewport: { width: size, height: size } });
    await p.setContent(`<html><body style="margin:0;background:transparent">${svg.replace('<svg ', `<svg width="${size}" height="${size}" `)}</body></html>`);
    await p.screenshot({ path: out, omitBackground: true });
    await p.close();
  }
  await b.close();
})();
"""
arg = json.dumps([[s, str(icons / n), z] for s, n, z in jobs])
subprocess.run(['node', '-e', js, arg], check=True)
print('Icons erzeugt in', icons)
