# Gumb „Instaliraj aplikaciju" u burger meniju

Datum: 2026-08-31

## Problem

Radio Roža je instalabilan PWA (manifest je ispravan, ikone postoje), ali korisnici
to ne znaju. Malo tko zna da se stranica može dodati na početni zaslon mobitela —
posebno na iOS-u, gdje je postupak skriven u Podijeli izborniku.

## Cilj

Ponuditi vidljiv gumb koji na Androidu otvara sistemski dijalog za instalaciju, a
na iOS-u pokazuje upute. Gumb se ne prikazuje kad instalacija nije moguća ili je
aplikacija već instalirana.

## Nije u opsegu

- **Service worker.** Analiza (vidi raspravu 2026-08-31) pokazala je da bi donio
  malo: MediaSession već daje kontrole na zaključanom ekranu, `_headers` već
  keširaju shell kao `immutable`, hls.js je već lijeni import, a offline za live
  radio nema smisla. Jedina prava dobit bio bi web push, a to je backend projekt
  (VAPID, baza pretplata, slač u roza-cms) i ide u vlastiti spec ako se ikad
  pokrene.
- **Push notifikacije, offline čitanje članaka, manifest `shortcuts`.**
- **Prijenos postavki u instaliranu aplikaciju.** Instalirani iOS PWA ima odvojen
  storage od Safarija, pa `rr:autoplay` i `rr:volume` kreću od defaulta. Poznato,
  prihvaćeno, ne rješavamo.

## Arhitektura

Tri datoteke.

### 1. `src/lib/stores/install.svelte.ts` (nova)

Rune store u stilu postojećeg `PlayerSettings` — klasa s `$state` poljima i jedan
izvezeni singleton.

```ts
export type InstallMode = 'prompt' | 'ios' | 'none';
```

Stanje:

- `deferredPrompt = $state<BeforeInstallPromptEvent | null>(null)` — spremljeni
  event; jednokratan je, briše se nakon `prompt()`.
- `installed = $state(false)` — je li aplikacija već pokrenuta kao instalirana.
- `mode: InstallMode` — `$derived`:
  - `installed` → `'none'`
  - `deferredPrompt !== null` → `'prompt'`
  - iOS i nije instalirano → `'ios'`
  - inače → `'none'`

Redoslijed provjera je bitan: postojanje deferred eventa je primarni uvjet, pa
prepoznavanje platforme po `userAgent`-u ostaje na sporednoj grani.

Metode:

- `capture(e)` — poziva `e.preventDefault()` (bez toga Chrome pokaže vlastitu
  traku, a spremljeni event postane neupotrebljiv) i sprema event.
- `async promptInstall()` — poziva `deferredPrompt.prompt()`, čeka `userChoice`,
  zatim postavlja `deferredPrompt = null` bez obzira na ishod. Posljedica: ako
  korisnik odustane od dijaloga, stavka nestaje do sljedećeg učitavanja stranice
  (event je jednokratan i preglednik ga tada šalje ponovno). To je prihvaćeno —
  alternativa bi bila zadržati mrtvi gumb koji više ništa ne radi.
- `markInstalled()` — `installed = true`, `deferredPrompt = null`.

Detekcija:

- **Instalirano:** `matchMedia('(display-mode: standalone)').matches` ili
  `navigator.standalone === true` (iOS). Čita se lijeno, u browseru — modul se
  evaluira i u SSR-u, pa svaki pristup `window`/`navigator` mora biti zaštićen
  isto kao `readStorage` u `settings.svelte.ts`.
- **iOS:** `/iPad|iPhone|iPod/.test(navigator.userAgent)` ili
  (`/Macintosh/` i `navigator.maxTouchPoints > 1`) — iPadOS se predstavlja kao
  Mac. Ne razlikujemo Safari od Chrome/Firefoxa na iOS-u; svi od 16.4 imaju
  Dodaj na početni zaslon u Podijeli izborniku.

Tip `BeforeInstallPromptEvent` ne postoji u TS DOM libu — deklarira se lokalno u
ovoj datoteci (`interface BeforeInstallPromptEvent extends Event` s `prompt()` i
`userChoice`).

### 2. `src/routes/+layout.svelte`

Registracija slušatelja u `$effect` (dakle client-only), globalno i rano:

```
window.addEventListener('beforeinstallprompt', capture)
window.addEventListener('appinstalled', markInstalled)
```

Oba se uklanjaju u cleanupu. Slušatelj **mora** biti ovdje, a ne u `Nav.svelte`:
event može stići tek nakon što korisnik nešto napravi na stranici, dakle
potencijalno prije nego što je burger izbornik ikad otvoren. Vidljivost gumba je
`$derived` iz storea, ne izračun pri montiranju.

### 3. `src/lib/components/Nav.svelte`

Nova zadnja stavka u `mobile-menu` listi (trenutno linije 145-155), odvojena
tankom crtom od navigacijskih linkova. Renderira se samo kad je
`install.mode !== 'none'`.

- Label: **Instaliraj aplikaciju** — velikim početnim slovom, kao ostale stavke
  izbornika (`PlayerMenu` koristi mala slova, ali ovdje je registar drugačiji).
  Ispred labela strelica prema dolje (inline SVG, kao ostale ikone u Nav-u).
- `mode === 'prompt'` → klik zove `install.promptInstall()` i zatvara izbornik.
- `mode === 'ios'` → klik zatvara izbornik i otvara panel s uputama.

Burger izbornik je već samo mobilni (postojeći CSS), pa je gumb time besplatno
ograničen na uređaje gdje instalacija ima smisla.

#### iOS panel s uputama

Lokalni `iosHelpOpen = $state(false)` u `Nav.svelte`. Koristi **postojeći**
backdrop + `Escape` obrazac iz iste datoteke (`onKeydown` na `svelte:window`,
`.backdrop` element, `fly`/`fade` tranzicije) — bez novih komponenti i bez novih
ovisnosti. `Escape` i klik na backdrop zatvaraju panel.

Sadržaj:

> **Dodaj Radio Rožu na početni zaslon**
>
> 1. Dodirni ikonu Podijeli u donjoj traci preglednika
> 2. Odaberi „Dodaj na početni zaslon"
> 3. Potvrdi s „Dodaj"
>
> Stigla si iz Instagrama ili Facebooka? Prvo otvori stranicu u Safariju — u
> pregledniku unutar aplikacije te opcije nema.

Zadnji redak nije ukras: velik dio prometa dolazi iz in-app webviewa gdje Dodaj
na početni zaslon uopće ne postoji, pa bi upute bez toga završile u slijepoj
ulici.

Pristupačnost: gumb je `<button>` s `aria-expanded` vezanim na `iosHelpOpen`,
panel ima `role="dialog"` i `aria-label`.

## Ponašanje po platformama

| Situacija | Ishod |
|---|---|
| Android Chrome, neinstalirano | Stavka vidljiva → sistemski dijalog |
| iOS Safari/Chrome, neinstalirano | Stavka vidljiva → panel s uputama |
| Već instalirano (bilo gdje) | Stavke nema |
| Desktop | Burger izbornik se ne prikazuje |
| Firefox Android i ostali bez API-ja | Stavke nema |

## Verifikacija

1. `yarn check` i `yarn lint` prolaze.
2. **Android Chrome na Netlify deploy previewu** — stavka se pojavi, klik otvori
   sistemski dijalog, nakon instalacije stavka nestane. Localhost i desktop nisu
   reprezentativni; bez service workera desktop Chrome može ponuditi samo
   „prečac" umjesto instalacije.
3. **iPhone Safari** — stavka se pojavi, panel se otvori, `Escape` i backdrop ga
   zatvaraju. Nakon dodavanja na početni zaslon stavke više nema.
4. Provjera da se ništa ne lomi u SSR-u (`yarn build` + `yarn preview`).

Napomena za testiranje na iOS-u: Firefox Focus kao content blocker blokira web
fontove — ako izgled odstupa, prvo isključi blocker.
