export interface Show {
  href: string;
  title: string;
  tags: string[];
  description?: string;
  image?: string;
  authors: string[];
  playlist_url?: string;
}

export const shows: Show[] = [
  {
    href: '/emisije/zivo-uzivo',
    title: 'Živo uživo',
    tags: ['Live'],
    description:
      'Prijenos nastupa uživo različitih izvođača iz Rijeke, RH i regije. Kroz 60 minuta izvođači na radiju izvode autorske pjesme, te neobavezni razgovori s gostima.',
    image:
      'https://www.mar-com.hr/radio-davor/admin/serijal/uploads/54fd082e03ea6f9508cfe89100ef882b4d835bdc-ZivoUzivoPodcastCover.jpg',
    authors: [],
    playlist_url: 'https://www.mixcloud.com/RadioRoza/playlists/%C5%BEivo-u%C5%BEivo/',
  },
  {
    href: '/emisije/worries-in-the-dance',
    title: 'Worries in the Dance',
    tags: ['Reggae', 'Dub', 'Roots'],
    description:
      'Worries in the dance je emisija posvećena reggae i dub glazbi te glazbama i (sub)kulturama koje su iz njih proizašle ili su im srodne glazbeno, svjetonazorom,  tematikom i dr. Primarni cilj emisije je, prije svega, promocija hrvatskih i regionalnih autora, izvođača te ostalih umjetnika i glazbenih djelatnika, ali i svih ostalih segmenata koji sudjeluju u funkcioniranju scene (npr. organizacija raznih događaja kao što su koncerti, festivali, radionice...). Namjera je pružiti više prostora neafirmiranim glazbenicima da predstave svoj rad publici, ali i popratiti aktualan rad afirmiranih glazbenika te informirati slušatelje o aktualnim događanjima unutar scene.',
    image:
      'https://www.mar-com.hr/radio-davor/admin/serijal/uploads/59e8631b7d6b7e8f7b3dec7c4f7de627498e5150-WarriorsPodcastCover2.jpg',
    authors: ['Tomislav Mile Milićević'],
    playlist_url: 'https://www.mixcloud.com/RadioRoza/playlists/worries-in-the-dance/',
  },
  {
    href: '/emisije/rozaik',
    title: 'Rožaik',
    tags: ['Kultura', 'Zajednica'],
    description:
      'Rožaik je mozaična emisija Radio Rože u kojoj ugošćujemo lokalne predstavnike civilnog sektora, aktiviste, znanstvenike, književnike, glazbenike i mnoge druge inspirativne osobe i inicijative čiji rad cijenimo i koje želimo predstaviti slušateljima u formatu razgovora ili priloga. Rožaik – emisija zajednice za zajednicu. Emisiju slušajte svake druge srijede.',
    image:
      'https://www.mar-com.hr/radio-davor/admin/serijal/uploads/7b9e5f42fee0a8760540bd895674e5ac7093dc21-rozaik.jpg',
    authors: ['Svi'],
    playlist_url: 'https://www.mixcloud.com/RadioRoza/playlists/ro%C5%BEaik/',
  },
  {
    href: '/emisije/fader',
    title: 'Fader',
    tags: ['Electro', 'House', 'Tehno'],
    description:
      'Radio is not dead, a posebno je živ svaki drugi petak od 20,00 - 22,00 sati. Kako radnom tjednu bolje staviti točku na "i" nego uz emisiju elektroničke glazbe. Vikend mood is "on"! Na valovima Radio Rože čekaju vas throwback iskopi, promocija novih singlova, vijesti, gosti, intervjui i 60 minutni mixevi za kraj emisije. Predstavljamo vam kolektive, DJ-e, producente, festivale i događanja, sve zbog čega poželimo još jedan party i još jedan petak i još jedan... i još jedan... U svakoj emisiji očekuje vas i ekskluzivni "FADER Guest Mix".',
    image:
      'https://www.mar-com.hr/radio-davor/admin/serijal/uploads/5faef14560718705de525d0c2015f58ced8195f7-Fader%20cover%20RR%20page.jpg',
    authors: ['Marina Jakšić', 'Ivan Dragnić'],
    playlist_url: 'https://www.mixcloud.com/RadioRoza/playlists/fader/',
  },
  {
    href: '/emisije/ja-biram',
    title: 'Ja biram',
    tags: ['Guest mix', 'Eclectic'],
    description:
      'Imaš svoj novi mix ili playlistu i želiš ju podijeliti sa svijetom? Na pravom si mjestu! Javi se Radio Roži i zavrti svoje najdraže trake. Svakog utorka u 23:00h i subotu u 23:00h u bloku "Ja Biram" emitiraju se pristigli mixevi, playliste i live setovi. Od microhousea do sočnog funka, žanrovski neograničeno i neobuzdano, na radio-roza.org',
    image:
      'https://www.mar-com.hr/radio-davor/admin/serijal/uploads/573ff0f1f6da0d9977a35294457d17967150d524-ja_biram.jpg',
    authors: [],
    playlist_url: '',
  },
  {
    href: '/emisije/izvorista',
    title: 'Izvorišta',
    tags: ['World music', 'Folk', 'Etno'],
    description:
      'Emisija koja promovira glazbu iz cijelog svijeta - world music. Urednik i voditelj Emir Fulurija vodi vas u svaki kutak svijeta i donosi najbolje od glazbe proizašle iz tradicionalnih načina izvođenja i tradicionalnim glazbalima.',
    image:
      'https://www.mar-com.hr/radio-davor/admin/serijal/uploads/017911b9941ab09d1970efb511d10ec87c28c311-IZVORI%C5%A0TA%202808.png',
    authors: ['Emir Fulurija'],
    playlist_url: '',
  },
  {
    href: '/emisije/depilacija',
    title: 'Depilacija',
    tags: ['Ex-yu', 'Eclectic'],
    description:
      'Glazbena emisija udruge Spirit koja sakuplja pjesme koje nemate prilike često čuti, a prođu kroz gusto kvalitativno sito glazbenog urednika emisije koji se krije iza veselog nadimka Otto Depilacius (Depilator ušiju). Glazba za dezinfekciju ušiju nedjeljom od 20h.',
    image:
      'https://www.mar-com.hr/radio-davor/admin/serijal/uploads/1b756750792595e4183afd96eab265368c019ab6-depilacija.png',
    authors: ['Denis Pilepić'],
    playlist_url: '',
  },
  {
    href: '/emisije/pankeraj',
    title: 'Pankeraj',
    tags: ['Punk'],
    description:
      'Radijska avantura Pankeraj obuhvaća upravo onaj dio alternativne scene koji je nedostajao na našem malom radiju! Slušate nas svaki drugi petak.',
    image:
      'https://www.mar-com.hr/radio-davor/admin/serijal/uploads/a57200cc9844f9843da5353745f06aae20457511-b818bb99b3b2b38a696dff6dc1d3e3646283bc7d-fader_insta.jpg',
    authors: ['Neven Babin', 'Andrej Vučinić', 'Hrvoje Šimić', 'Grga', 'Sebastijan Tomažin'],
    playlist_url: 'https://www.mixcloud.com/RadioRoza/playlists/pankeraj/',
  },
  {
    href: '/emisije/novi-singlovi-rijecke-scene',
    title: 'Novi singlovi riječke scene',
    tags: ['Rijeka', 'Eclectic'],
    description:
      'Najnoviji singlovi s riječke scene vrte se u eteru radio Rože svaki dan, kroz cijeli dan! Ukoliko vi ili vaš bend imate novu pjesmu, pišite nam i predlažite.',
    image:
      'https://www.mar-com.hr/radio-davor/admin/serijal/uploads/32daa1b983fe6d934eeb166aa0ac8ce2985f5fee-thumbnail_singlovi.jpg',
    authors: ['Davor Popdankovski'],
    playlist_url: '',
  },
  {
    href: '/emisije/hex',
    title: 'Hex',
    tags: ['Rock', 'Metal', 'Experimental'],
    description:
      'Svakog ponedjeljka od 19:30 do 20:30 slušajte HEX., emisiju koja pod krilaticom „heavy and experimental" u Rožin program donosi sat vremena rocka, metala, noisea, HC-a te svakojakih mikrožanrova ispred, iza i između ovih navedenih. Kroz domaće i strane glazbene novitete te intervjue s glazbenicima svaki vam put pružamo novu dozu buke.',
    image:
      'https://www.mar-com.hr/radio-davor/admin/serijal/uploads/72e9947d1436db48237514e9249934ab46e02d92-hex.jpg',
    authors: ['Martina Blečić'],
    playlist_url: 'https://www.mixcloud.com/RadioRoza/playlists/hex/',
  },
  {
    href: '/emisije/stosta',
    title: 'Štošta',
    tags: ['Etno', 'Soul', 'Funk', 'Eclectic'],
    description:
      'Štošta. će nam Rožu oplemeniti svojim setovima, naći će se tu zaista #štošta jer, kao i u svemu što radi, Mirela nije usmjerena isključivo na jedno područje, a u ovom slučaju selekcije moći ćete čuti ritmove i hitove različitih žanrova kao što je funky house, r&b, soul, hip hop, pop, indie-pop, disco i #štoštajoš.',
    image:
      'https://www.mar-com.hr/radio-davor/admin/serijal/uploads/4cc81f688140218ced0aa968038456d505c23d8d-stosta.jpg',
    authors: ['DJ Mirilo'],
    playlist_url: '',
  },
  {
    href: '/emisije/bestijada',
    title: 'Beštijada',
    tags: ['Interview', 'Animals'],
    description:
      'Beštijada je emisija posvećena životinjama i njihovoj dobrobiti koju vode i uređuju Martina Blečić i Tomislav Milićević.\nU emisiji najviše prostora dobivaju teme vezane uz zaštitu i udomljavanje napuštenih pasa i mačaka, poput programa kastracije i sterilizacije, slobodnoživućih mačaka, zakonske problematike, problema s kojima se u svom radu susreću udruge koje se bave zaštitom životinja, kao i edukacija o njima. Uz to, donosimo i veterinarske savjete, pozitivne priče o udomljavanju, psećim sportovima, predstavljamo udruge i volontere, poduzetnike koji nude proizvode i usluge za ljubimce, a rado se dotičemo i ostalih životinjskih vrsta te zaštite prirode.',
    image:
      'https://www.mar-com.hr/radio-davor/admin/serijal/uploads/67e1c9039047db3cb7143374e3ee6fedd10f69d2-thumbnail_bestijada_v3.png',
    authors: ['Martina Blečić', 'Tomislav Milićević'],
    playlist_url: 'https://www.mixcloud.com/RadioRoza/playlists/bestijada/',
  },
];
