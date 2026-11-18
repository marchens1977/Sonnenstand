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

**Online:** noch nicht sicher festgehalten – vermutlich über GitHub Pages
(`https://marchens1977.github.io/Sonnenstand/`). Bitte bestätigen und hier eintragen.

### Technischer Aufbau
- Alles steckt in **einer einzigen Datei: `index.html`** (Aussehen, Text und Programm-Logik).
- Fremde Bausteine (werden aus dem Internet geladen, kein Zugangsschlüssel nötig):
  - **SunCalc** – rechnet die Sonnenzeiten und den Sonnenstand aus.
  - **Leaflet** – zeigt die Karte an.
  - **OpenStreetMap** – liefert die Kartenbilder (per Farbfilter dunkel eingefärbt).
  - **Nominatim** (von OpenStreetMap) – Ortssuche und Ortsname zu GPS-Koordinaten.

## 2. Wichtige Regeln und Entscheidungen
- Die App soll ohne Zugangsschlüssel (API-Key) auskommen. Deshalb Karte von OpenStreetMap
  statt CARTO.
- Die App bleibt eine einzelne Datei, damit sie einfach zu verstehen und hochzuladen ist.
- Dunkles Design (Nachthimmel-Look).
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

## 4. Offene Ideen / nächste Schritte
- Mondaufgang, Monduntergang und Mondphase
- Lieblingsorte speichern
- App aufs Handy „installieren“ (Symbol auf dem Startbildschirm, sog. PWA)
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
- Noch keine. Die erste automatische Prüfung wird bei der nächsten Code-Änderung angelegt.

### Tests für den Nutzer (kann Claude nicht selbst prüfen)
- App auf dem Samsung-Handy in Chrome öffnen: Sieht alles gut aus? Funktioniert der GPS-Knopf?
