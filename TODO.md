# Ručni zadaci

Stvari koje traže tvoju odluku, pristup računima ili stvarni uređaj — ostatak optimizacija je
odrađen u kodu (vidi git log).

## Sadržaj i računi

1. **CMS — regeneriraj varijante slika za starije uploade.** Noviji uploadi u Media kolekciji
   imaju small/medium/og varijante, stariji samo original. Kod sada koristi varijante s
   fallbackom na original, pa stare slike i dalje idu u punoj veličini. U Payload adminu ponovno
   spremi (ili re-uploadaj) starije slike.

2. **Coveri emisija hostani na mar-com.hr.** `src/lib/data/shows.ts` za više emisija vuče covere
   s `www.mar-com.hr` — vanjski server izvan tvoje kontrole; ako se ugasi, coveri nestaju.
   Skini ih, stavi u `static/images/shows/` (webp, max 800px) i ažuriraj putanje u shows.ts.

3. **Default OG slika (1200×630).** Stranice bez vlastite slike (naslovnica, program, kontakt…)
   nemaju og:image pri dijeljenju na društvenim mrežama. Treba brendirana slika 1200×630 —
   stavi je u `static/images/og-default.png` i javi da je uvežem u Seo komponentu.

4. **Potvrdi kanonsku domenu.** U `svelte.config.js` (prerender.origin) i `static/robots.txt`
   postavljeno je `https://radio-roza.org` (bez www). Ako je kanonska verzija drukčija,
   promijeni na oba mjesta. Provjeri i Netlify redirect www → apex.

5. **CC BY-SA linija u footeru** — i dalje placeholder dok ekipa ne potvrdi licenciju.

6. **Google Search Console** — dodaj property i pošalji `https://radio-roza.org/sitemap.xml`.

## Provjere nakon deploya

7. **Netlify cache radi:** otvori članak dvaput i pogledaj response header `cache-status` —
   drugi put treba pisati hit (Netlify Durable/Edge). Isto za `/emisije/<slug>`.

8. **Prerender radi:** `/kontakt`, `/emisije` i `o-nama/*` više se ne renderiraju kroz funkciju
   nego kao statične datoteke (vidi se u Netlify deploy summaryju pod "Prerendered pages").

9. **Player na stvarnom uređaju.** Player sada na Safariju/iOS-u koristi nativni HLS (ne skida
   hls.js uopće), a na ostalim preglednicima hls.js se učitava tek na prvi klik play.
   Provjeri: play/pause/lock-screen na iPhoneu, te u Chrome/Firefox Network tabu da se hls.js
   chunk pojavi tek nakon klika.

10. **ListenNotes kvota** — CDN keširanje (30 min + SWR) bitno smanjuje potrošnju API poziva,
    ali baci oko na mjesečnu potrošnju na listennotes.com dashboardu.

## Pospremanje

11. **Nereferencirane datoteke u static/images/** — nigdje se ne koriste, samo povećavaju deploy:
    `popi_cover_edit.png` (1,1 MB), `projekti/korona-kid/kk_logo.png` (212 KB), `2.png`, `3.png`,
    `projekti/inkluzivni-kotac/mix.png`. Obriši ih ili premjesti u `assets-src/`.

12. **Izvornici logotipa iz footera** premješteni su u `assets-src/logos/` (visoke rezolucije,
    izvan deploya). Commitaj ih ako ih želiš čuvati u repou.

## Odluka za kasnije

13. **Galerija studija na /o-nama.** Link „\* \* \* posjeti studio" vodio je na `#studio` koji ne
    postoji (galerija studija je zakomentirana dok ne stignu fotografije) — build je to sad
    hvatao kao mrtvi anchor, pa sam i link zakomentirao. Kad dobiješ fotke: odkomentiraj photo
    grid 2, dodaj mu `id="studio"` i vrati link.

14. ~~**ArticleGrid layout shift.**~~ **Riješeno** — ugrađena varijanta C iz prototipa: stupce
    određuje CSS (`auto-fill`), linije crta 2px outline na karticama, bez JS-a i bez skoka nakon
    hidratacije. Broj kartica je sad fiksan (naslovnica dohvaća 8 emisija), a zadnji red smije
    biti nepotpun.
