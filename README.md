# DIS Group website – lokale, bewerkbare kopie

Statische kopie van **https://disgroup.nl** (WordPress-site), gemaakt met `wget --mirror` op 13 oktober 2026.
Alle pagina's, afbeeldingen, CSS, JavaScript en lettertypen staan lokaal; links zijn relatief gemaakt
en tracking (Google Tag Manager) is verwijderd.

## Structuur

```
index.html                  Homepage
contact/                    Contactpagina
diensten/                   Diensten (+ consultancy, development, functioneel-beheer, power-bi)
sectoren-bouwnijverheid/    Sectoren (+ erp-oplossing-voor-bouwbedrijven, gww-infra, installatietechniek)
sectoren/                   Oudere sectorpagina's
over-ons/                   Over ons, ons verhaal, ons team
teamlid/                    Profielpagina's teamleden
referenties/, reference/    Referentie-overzicht en klantcases
dis-nieuws-dis-group/       Nieuwsoverzicht
nieuwsbericht/              Losse nieuwsberichten
werken-bij/, vacature/      Werken bij, vacatureoverzicht en vacatures
developer-verhaal/          Verhalen van developers
privacy-policy.html         Privacyverklaring
wp-content/, wp-includes/   Thema, plugins, CSS, JS, fonts en uploads (afbeeldingen/pdf's)
```

Elke pagina is een map met een `index.html`. Bewerken kan direct in die HTML-bestanden.

## Lokaal bekijken

```bash
cd disgroup-site
python3 -m http.server 8000
```

Open daarna <http://localhost:8000/>. Je kunt `index.html` ook rechtstreeks in de browser openen
(dubbelklik), maar via de webserver werkt alles het betrouwbaarst.

## Nieuwe pagina toevoegen (bijv. een AI-sectie)

1. Kopieer een bestaande pagina met een passende opmaak, bijvoorbeeld een dienst:
   ```bash
   mkdir -p diensten/ai
   cp diensten/power-bi/index.html diensten/ai/index.html
   ```
   Kopieer naar een map op **dezelfde diepte**, dan blijven de relatieve paden (`../../wp-content/...`) kloppen.
   Kies je een andere diepte, pas dan het aantal `../` in de paden aan.
2. Pas in `diensten/ai/index.html` de `<title>`, kop(pen), teksten en afbeeldingen aan.
   Nieuwe afbeeldingen kun je bijvoorbeeld in `wp-content/uploads/ai/` zetten.
3. Voeg een link toe in het menu. Het menu staat in elke pagina; zoek naar `diensten/power-bi/index.html`
   en voeg een vergelijkbare `<li>`-regel toe. Wil je het in alle pagina's tegelijk doen, gebruik dan
   zoeken-en-vervangen in je editor (VS Code: Ctrl+Shift+H) of een `sed`-script.
4. Controleer lokaal en commit:
   ```bash
   git add . && git commit -m "AI-pagina toegevoegd"
   ```

## Preview delen met collega's

- **Netlify Drop** (snelst, geen account nodig voor een tijdelijke link): ga naar <https://app.netlify.com/drop>
  en sleep de map `disgroup-site` in het venster. Je krijgt direct een deelbare URL.
- **GitHub Pages**: maak een (eventueel privé*) repository, `git remote add origin <url>`, `git push -u origin main`,
  en zet in *Settings → Pages* de bron op branch `main`, map `/ (root)`.
  (*Pages op privé-repo's vereist een betaald GitHub-abonnement.)
- **Zip**: stuur `disgroup-site.zip`; de ontvanger pakt uit en draait `python3 -m http.server`.

Let op: dit is een kopie van publieke content van DIS Group; deel previews alleen intern.

## Bekende beperkingen

- **Formulieren** (contact, solliciteren) werken niet: die posten naar WordPress/reCAPTCHA op de live server.
- **Dynamische onderdelen** (filters/"meer laden" in nieuws of vacatures, zoeken) die AJAX/`wp-json` gebruiken werken niet offline.
- Links naar `/nieuws/` en `/sectoren/` (overzicht) gaven ook live een 404 en blijven naar disgroup.nl wijzen.
- Externe embeds (bijv. Google reCAPTCHA, YouTube, Google Fonts indien gebruikt) worden nog van internet geladen.

## Aanvraagformulier AI-werksessie (`diensten/agentic-ai/#plan-sessie`)

De site is statisch, dus het formulier verstuurt via een externe dienst. De instelling staat bovenaan
`wp-content/uploads/ai/plan-sessie.js`:

```js
var FORM_ENDPOINT = 'https://formsubmit.co/ajax/rjaprins@gmail.com';
var CONTACT_URL = '../../contact/index.html'; // link bij een fout (geen e-mailadres zichtbaar)
```

- **FormSubmit (huidig):** de eerste echte aanvraag stuurt een activatiemail naar het ingestelde adres;
  klik op de link daarin, daarna komen aanvragen gewoon binnen. Extra velden `_subject`, `_template=table`
  en de honeypot `_honey` staan als verborgen velden in het formulier.
- **Adres verbergen (aanbevolen):** na de eerste echte inzending stuurt FormSubmit een activatiemail. Daarna krijg je een willekeurige alias; vervang `rjaprins@gmail.com` in `FORM_ENDPOINT` door die alias (`https://formsubmit.co/ajax/<alias>`), zodat het adres ook niet meer in de paginabron staat. Bezoekers zien het adres nergens in de succes- of foutmelding.
- **Ander adres (bijv. DIS):** vervang het e-mailadres in `FORM_ENDPOINT`, bijv.
  `https://formsubmit.co/ajax/info@disgroup.nl`. Ook dan volgt eenmalig een activatiemail.
- **Formspree:** maak een formulier aan op formspree.io en zet `FORM_ENDPOINT` op
  `https://formspree.io/f/<jouw-id>`. Het script post JSON met `Accept: application/json`, wat Formspree
  ondersteunt; de `_`-velden van FormSubmit worden dan als gewone velden meegestuurd (onschuldig) en kun je
  desgewenst uit de HTML verwijderen.
