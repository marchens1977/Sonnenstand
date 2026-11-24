# Projekt-Tagebuch: Sonnenstand

## 1. Worum geht es?

**Sonnenstand** ist eine kleine Web-App (läuft im Browser, z. B. Chrome auf dem Handy).
Sie zeigt für einen Ort und ein Datum, wo die Sonne steht und wann sie auf- und untergeht.

Funktionen:
- Himmel mit echter Sonnenkurve und Countdown bis Sonnenaufgang/-untergang
- Datum wählen (Tag vor/zurück, Knopf „Heute“)
- Zeiten: Sonnenaufgang, Sonnenuntergang, Dämmerung, Sonnenmittag, höchster Sonnenstand,
  Tageslänge (mit Unterschied zum Vortag), goldene Stunde morgens und abends
- Tagesverlauf als farbiger Balken
- Sonne jetzt: Höhe, Himmelsrichtung, Schattenlänge
- Ort suchen oder per GPS bestimmen, dunkle Karte
- **Als App installierbar** (PWA): eigenes Icon auf dem Startbildschirm, startet auch ohne Internet

**Online:** noch nicht sicher festgehalten – vermutlich über GitHub Pages
(`https://marchens1977.github.io/Sonnenstand/`). Bitte bestätigen und hier eintragen.

### Technischer Aufbau
- Die App selbst steckt in **einer Datei: `index.html`** (Aussehen, Text und Programm-Logik).
- Für die Installation als App gibt es zusätzlich:
  - `manifest.webmanifest` – App-Steckbrief (Name, Farben, Icons).
  - `sw.js` – „Service Worker“: Hintergrund-Helfer, der die App-Dateien speichert (offline-fähig).
    **Bei jeder Änderung an der App die Zahl in `VERSION` um 1 erhöhen**, damit Handys die neue Version holen.
  - `icons/` – App-Symbole (werden aus `werkzeuge/icon-vorlage.svg` erzeugt).
- Fremde Bausteine (werden aus dem Internet geladen, kein Zugangsschlüssel nötig):
  - **SunCalc** – rechnet die Sonnenzeiten und den Sonnenstand aus.
  - **Leaflet** – zeigt die Karte an.
  - **OpenStreetMap** – liefert die Kartenbilder (per Farbfilter dunkel eingefärbt).
  - **Nominatim** (von OpenStreetMap) – Ortssuche und Ortsname zu GPS-Koordinaten.

## 2. Wichtige Regeln und Entscheidungen
- Die App soll ohne Zugangsschlüssel (API-Key) auskommen. Deshalb Karte von OpenStreetMap
  statt CARTO.
- Die App-Logik bleibt in einer einzelnen Datei; nur Manifest, Service Worker und Icons kommen dazu.
- Design in den Farben der **New York Mets**: Blau `#002D72` (Hintergrund, Karten) und Orange `#FF5910`
  (Knöpfe, Sonnenkurve, Akzente), dazu Weiß. Nur die Farben – **kein** Mets-Logo (geschützt).
- „Herunterladbare App“ = installierbare Web-App (PWA) statt Android-APK: kostenlos, aktualisiert sich selbst.
- Keine persönlichen oder geheimen Daten in dieses Projekt schreiben (keine E-Mail-Adressen,
  Passwörter, API-Schlüssel).

## 3. Verlauf
- **10.11.2026** – Erste Versionen per Hand auf GitHub hochgeladen.
- **15.11.2026** – Umbenennung in „Sonnenstand“, Datumsfehler behoben, Sonnenbogen korrigiert,
  Dämmerungszeiten ergänzt.
- **15.11.2026** – Knöpfe „Gestern“ und „Morgen“ entfernt, „Heute“ bleibt.
- **15.11.2026** – Neues Design: Himmel mit Sonnenkurve, Countdown, Tagesverlauf, Himmelskarte,
  dunkle Karte.
- **15.11.2026** – Karte auf OpenStreetMap umgestellt (kein Zugangsschlüssel nötig).
- **16.11.2026** – Dieses Projekt-Tagebuch (`CLAUDE.md`) angelegt (PR #1).
- **18.11.2026** – Regel „Hilfsprogramme und Tests gehören ins Projekt“ ergänzt.
- **24.11.2026** – Design auf Mets-Farben (Blau/Orange) umgestellt. App installierbar gemacht
  (Manifest, Service Worker, eigenes Icon: orange Sonne über weißem Horizont auf Mets-Blau,
  Knopf „Installieren“). Darstellung auf schmalen Handys repariert (Kästen ragten über den Rand).
  Erste automatische Prüfung `test/pruefen.js` angelegt.

## 4. Offene Ideen / nächste Schritte
- Mondaufgang, Monduntergang und Mondphase
- Lieblingsorte speichern
- Erinnerung vor der goldenen Stunde (für Fotos)
- Online-Adresse der App prüfen und oben eintragen

## 5. Hinweise zur Zusammenarbeit
- Der Nutzer ist **Programmier-Laie**. Immer **einfaches Deutsch**, Fachbegriffe kurz erklären.
- **Kleine, nummerierte Schritte.** Klar sagen, was Claude übernimmt und was der Nutzer selbst tun muss.
- Claude soll **alles übernehmen, was möglich ist** – auch Pull Request (Änderungsvorschlag auf
  GitHub) anlegen und mergen (in die Hauptversion übernehmen).
- Hardware des Nutzers: nur **Samsung-Smartphone (Chrome)** und **Raspberry Pi 400**.
  Die App muss also vor allem auf dem Handy gut aussehen und funktionieren.

## 6. Modell-Hinweis
Wenn du nicht auf Opus läufst (z. B. Fable) und eine Aufgabe abgeschlossen ist, erinnere den
Nutzer am Ende der Antwort:
„Tipp: Du kannst jetzt mit /model claude-opus-5-5 zurückstellen.“

## 7. Tagebuch pflegen
Nach jeder größeren Änderung dieses Tagebuch aktualisieren (vor allem „Verlauf“ und „Offene Ideen“).

## 8. Hilfsprogramme und Tests gehören ins Projekt
1. Automatische Prüfungen (Tests) und Hilfsprogramme, die über eine einzelne Aufgabe hinaus
   nützlich sind, werden im Projekt gespeichert (z. B. Ordner `werkzeuge/` oder `test/`) –
   nicht nur im Arbeitsbereich der Sitzung, der beim Archivieren verloren geht.
2. Im Tagebuch steht, wie man sie startet und was sie prüfen.
3. Nach jeder Code-Änderung die vorhandenen Prüfungen laufen lassen; bei neuen Funktionen
   passende Prüfpunkte ergänzen.
4. Gibt es noch keine automatische Prüfung, bei der nächsten Code-Änderung eine einfache anlegen.
5. Was Claude nicht selbst testen kann (z. B. echte Anmeldungen, das echte Handy, den
   Raspberry Pi), im Tagebuch als Test für den Nutzer vermerken.

### Vorhandene Prüfungen und Hilfsprogramme
- **`test/pruefen.js`** – startet die App in einem Handy-großen Test-Browser und prüft:
  Manifest und Icons (Größen), keine Programmfehler, Sonnenzeiten werden angezeigt, Mets-Farben gesetzt,
  Service Worker läuft, nichts ragt über den Rand, App startet auch offline. Macht Bildschirmfotos
  nach `test/bildschirmfotos/` (nicht im Repository).
  - Einmalig: `npm install --no-save --prefix test/.vendor leaflet@1.9.4 suncalc@1.9.0`
    (lokale Kopie der Bausteine, falls das Internet in der Sitzung gesperrt ist)
  - Start: `node test/pruefen.js`
- **`werkzeuge/icons-erzeugen.py`** – erzeugt alle Icons in `icons/` aus `werkzeuge/icon-vorlage.svg`.
  Start: `python3 werkzeuge/icons-erzeugen.py` (Icon ändern = Vorlage ändern, dann neu erzeugen).

### Tests für den Nutzer (kann Claude nicht selbst prüfen)
- [ ] App auf dem Samsung-Handy in Chrome öffnen: Sieht alles gut aus? Funktioniert der GPS-Knopf?
- [ ] Neue Farben (Blau/Orange) gefallen?
- [ ] Karte „Als App installieren“ erscheint (oder Chrome-Menü ⋮ → „App installieren“ /
      „Zum Startbildschirm hinzufügen“) → installieren.
- [ ] Icon auf dem Startbildschirm sieht gut aus (orange Sonne auf Blau).
- [ ] App über das Icon öffnen: startet ohne Browserleiste.
- [ ] Flugmodus an → App öffnen: startet trotzdem (Karte und Ortssuche brauchen aber Internet).
