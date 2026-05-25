export interface Show {
  href: string;
  title: string;
  tags: string[];
  description?: string;
  image?: string;
  authors: string[];
  playlist_url?: string;
  listennotes_id?: string;
  active: boolean;
  external: boolean;
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
    active: true,
    external: false,
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
    active: true,
    external: false,
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
    active: true,
    external: false,
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
    active: true,
    external: false,
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
    active: true,
    external: false,
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
    active: true,
    external: false,
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
    active: true,
    external: false,
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
    active: true,
    external: false,
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
    active: true,
    external: false,
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
    active: true,
    external: false,
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
    active: true,
    external: false,
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
    active: true,
    external: false,
  },
  {
    href: '/emisije/o-seksu-uz-pivo',
    title: 'O seksu uz pivo',
    tags: ['Health', 'Sex', 'Educational'],
    description: `
    O svemu onome o čemu (ne) pričate s drugima! Razgovor o seksu bolje klizi uz pivo, zato ćemo svakoga puta popiti jedno novo pivo te komentirati kako nam se sviđa. Nazdravite s nama i pridružite se razgovoru!

     Svake zadnje subote u mjesecu u 22h

    LINK: https://www.listennotes.com/podcasts/o-seksu-uz-pivo-stella-i-kai-TOcBQwIYCdA/'`,
    image:
      'https://www.mar-com.hr/radio-davor/admin/serijal/uploads/4bc4c3d89d4e8e0c4e7cd5a68098efdc1e73579e-4bc4c3d89d4e8e0c4e7cd5a68098efdc1e73579e-ousp.jpg',
    authors: ['Stella', 'Kai'],
    playlist_url: 'https://www.listennotes.com/podcasts/o-seksu-uz-pivo-stella-i-kai-TOcBQwIYCdA',
    listennotes_id: '26419921b1d7478ab041bc1e5effd167',
    active: false,
    external: true,
  },
  {
    href: '/emisije/reality-check',
    title: 'Reality Check',
    tags: ['Croatia', 'Indie'],
    description: `Reality Check je vrsta infotainment programa koji je nastao iz želje i potrebe da se što veći broj muzičara iz Hrvatske i regije probije do publike ali i da se publika, putem radio stanica i raznih platformi i društvenih mreža upozna s njihovom muzikom. Tijekom prve sezone slušatelji su tako imali najčešće premijerno čuti preko 500 novih singlova.

    Istovremeno, sve pjesme su predstavljene kroz video spotove na YouTube kanalu emisije Reality Check 808. Autor i voditelj emisije je Dubravko Jagatić – dugogodišnji novinar i glazbeni kritičar koji sustavno prati hrvatsku u regionalnu muzičku scenu oko 40 godina.

    Link: https://www.youtube.com/@RealityCheck-xv8wg`,
    image:
      'https://www.mar-com.hr/radio-davor/admin/serijal/uploads/8adc3c89348c2ac79d5f6dc02a68f1745c9613b8-reality.jpg',
    authors: ['Dubravko Jagatić'],
    playlist_url: 'https://www.youtube.com/@RealityCheck-xv8wg',
    active: true,
    external: true,
  },
  {
    href: '/emisije/inkluzivni-kotac',
    title: 'Inkluzivni kotač',
    tags: ['Educational', 'Inclusion', 'Interview'],
    description: `Inkluzivni kotač je partnerski projekt udruge Ri Rock i Romske organizacije mladih Hrvatske. Pokrenut je s ciljem poboljšanja medijske reprezentacije o Romskoj zajednici te ostalim ranjivim skupinama kako bi se smanjio učinak neadekvatne medijske reprezentacije na marginalizaciju Roma te uvela pozitivna promjena unutar zajednice.

    Projekt „Inkluzivni kotač“ je podržan kroz Fond za aktivno građanstvo, sredstvima Islanda, Lihtenštajna i Norveške u okviru EGP grantova. Prema Nacionalnom planu za uključivanje Roma za razdoblje od 2021. – 2027. pripadnici romske nacionalne manjine susreću se sa specifičnim problemima među kojima su i: isključenost iz društvenog i kulturnog života, niska razina sudjelovanja u općim politikama i aktivnostima na razini lokalnih zajednica.

    U suradnji sa Radio Rožom održati će se radionica radijskog izvještavanja o ranjivim skupinama te proizvodnja 16 radijskih emisija.

    Više informacija o projektu "Inkluzivni kotač" možete pročitati na linku OVDJE.`,
    image: 'https://www.rirock.hr/urednik/uploads/16698856721663746682kotac.png',
    authors: [''],
    playlist_url: 'https://www.mixcloud.com/RadioRoza/playlists/inkluzivni-kota%C4%8D/',
    active: false,
    external: false,
  },
  {
    href: '/emisije/nije-kasno-i-nije-kraj',
    title: 'Nije kasno i nije kraj',
    tags: ['Educational', 'Inclusion', 'Interview'],
    description: `Radijska emisija i mjesto na kojem umirovljenici govore o temama iz života umirovljenika. Ako se želite uključiti u proces stvaranja radijskih emisija, kontaktirajte Maticu umirovljenika na broj 051/212-109 ili producenticu na 092 269 08 79.

    Voditeljice: Branka Kolić i Enza Vaccaro

    https://www.facebook.com/Nije-kasno-i-nije-kraj-101590369315021/`,
    image: '/images/shows/nije-kasno-i-nije-kraj.jpg',
    authors: ['Branka Kolić', 'Enza Vaccaro'],
    playlist_url: 'https://www.mixcloud.com/RadioRoza/playlists/nije-kasno-i-nije-kraj/',
    active: false,
    external: false,
  },
  {
    href: '/emisije/bubanj-i-bass',
    title: 'Nije kasno i nije kraj',
    tags: ["Drum'n'bass", 'Jungle'],
    description: `Emisija se vodi na dva jezika simultano. Mlada ali iskusna emisija posvećena drum and bass glazbi sa naglaskom na regionalnu scenu, uz praćenje novih izdanja, najave evenata, mixevi,...
    Svaki Petak ikada od 2020. godina pa na dalje od 18h pa do 20h isključi svijet i uključi www.radio808.com na 93.9Mhz (Zagrebačko područje) ili online i svim aplikacijama za reprodukciju glazbe.

    Svaku nedjelju od 21h isključi svijet i uključi www.radio-roza.org.

    Support/Podrška:
    DJ FrenkyBoy www.facebook.com/DJFrenkyBoy
    Bass Couture www.facebook.com/basscouturezgb
    Klubskascena.hr www.klubskascena.hr`,
    image:
      'https://www.mar-com.hr/radio-davor/admin/serijal/uploads/3a6d0950cf6f89b16d3dc81447a0bbe5b45c7beb-bb.jpg',
    authors: ['DJ FrankyBoy'],
    playlist_url: '',
    active: false,
    external: true,
  },
  {
    href: '/emisije/salmiakki-pop',
    title: 'Salmiakki pop',
    tags: ['Funk', 'Balkan'],
    description: `

    Uusi uusi uusi

    Tako se kaže novo na finskom, gdje trenutno živi i radi protagonist sa slike, a ako prepoznajete ove bafe i brčine, znate da je dobar groove zagarantiran!

    Salmiakki Pop! emisija o B strani svjetske pop produkcije. Salmiakki je odvratni slatkiš nordijskih naroda napravljen od šećera, likoricije i amonijevih soli. Ekstremno slano i slatko - takva je i mjuza u emisiji.

    Već neko vrijeme se emitira na RADIO D59B, a od danas i na radio-roza.org! Dr. Smeđi Šećer svakog drugog utorka u mjesecu u 19h stiže u eter Rože i kopa.
`,
    image:
      'https://www.mar-com.hr/radio-davor/admin/serijal/uploads/ff9c5dda3237bd33961e62b413caf7d29a2d59a7-salmiakkipop.png',
    authors: ['Dr. Smeđi Šećer'],
    playlist_url: 'https://soundcloud.com/smedi-secer/sets/salmiakki-pop-the-salty-sweet',
    active: false,
    external: true,
  },
  {
    href: '/emisije/sound',
    title: 'S.o.U.N.d',
    tags: ['Funk', 'Balkan'],
    description: `Siluj obilno Uho Neka drhti ime je kolektiva koji nastaje 2016. godine kao mailing lista preko koje se svakodnevno dijeli nova/stara/neotkrivena glazba. Trenutačno funkcionira kao radijska emisija otvorenog formata koju možete uživo slušati svakog utorka u 21h.

    Mailing lista nastaje kako bi uzajamno dijeljenje glazbe izbjegli razmjenjivanje iste putem socijalnih mreža, koje već dovoljno trajno mijenjaju načine na koje komuniciramo.

    S vremenom interna lista za razmjenu glazbe među prijateljima i poznanicima prirodno raste, te početkom 2020. godine nastaje ideja za pretvaranje liste u nešto novo. Sound kolektiv je zatim odlučio dijeliti sonične simpatije putem radija (Rože), kako bi i ljudi izvan interne mailing grupe mogli uživati novootkrivene ljubavi.

    Koliko će još Sound forma i formata promijeniti ni sami ne znamo, uživamo u poigravanju sa konceptnim kolažima, setovima i tipičnim radijskim šablonama. It's all about the joy of experimentation.

    Urednici: Luka Rodela, Kasja Borić
    IG:  https://www.instagram.com/silujobilnouhonekadrhti/  `,
    image:
      'https://www.mar-com.hr/radio-davor/admin/serijal/uploads/791300bb91c89580cb7c9ab6871e4e12c9beac75-sound_deactivate.jpg',
    authors: ['Luka Rodela', 'Kasja Borić'],
    playlist_url: 'https://www.mixcloud.com/RadioRoza/playlists/sound/',
    active: false,
    external: false,
  },
  {
    href: '/emisije/korona-kid',
    title: 'Korona Kid',
    tags: ['Educational', 'Youth'],
    description: `Interaktivni, tehnološki napredni, ali istovremeno zabavni načini učenja, pokazali su svoju važnost u novoj stvarnosti koju nam je stvorila pandemija korone. Kako bismo učinili sve da naša djeca i mladi što lakše shvate, a onda se i prilagode novonastaloj situaciji, pokrenuli smo projekt Korona kid.`,
    image: '/images/shows/korona-kid.png',
    authors: ['Luka Rodela', 'Kasja Borić'],
    playlist_url: 'https://www.mixcloud.com/RadioRoza/playlists/korona-kid/',
    active: false,
    external: false,
  },
  {
    href: '/emisije/mrtvi-kanal',
    title: 'Mrtvi kanal',
    tags: ['Metal'],
    description: `U svakoj emisiju očekuje te 2 sata raznih hitova metal zike iz Rijeke, Hrvatske i svijeta što novih, što starih, a i pokoja vijest iz metal svijeta. Pozivamo sve ljubitelje žestokih nota da subotom od 18h otvore pivu, odu na Radio Rožu i slušaju metal emisiju "MRTVI KANAL".`,
    image: '/images/shows/mrtvi-kanal.jpg',
    authors: [
      'Stefan Drmač',
      'Mateo Rožić',
      'Tihana',
      'Ivana Prica',
      'Viktor Brusić',
      'Edi Grubor',
      'Martina Blečić',
    ],
    playlist_url: 'https://www.mixcloud.com/RadioRoza/playlists/mrtvi-kanal/',
    active: false,
    external: false,
  },
  {
    href: '/emisije/gdd',
    title: 'Game dev diary',
    tags: ['Games', 'Video games', 'Interview'],
    description: `Ćakule s našim gostima o izradi igara, igrama, konferencijama, ma sve što nam padne na pamet.`,
    image: '/images/shows/gdd.jpg',
    authors: ['Vedran Vivoda', 'Zeno Žokalj'],
    playlist_url: 'https://www.mixcloud.com/RadioRoza/playlists/gdd-podcast/',
    active: false,
    external: false,
  },
  {
    href: '/emisije/audio-brickzine',
    title: 'Audio Brickzine',
    tags: ['Youth', 'Educational', 'Interview'],
    description: `Brickzine, časopis za djecu o stvaranju kulture jedan je od projekata u sklopu programske linije Brickhouse Rijeka 2020 Europske prijestolnice kulture. Časopis se izdaje dva puta godišnje, a nositelj projekta i izdavač je Gradska knjižnica Rijeka.

        Glavni urednik: Kristian Benić (Gradska knjižnica Rijeka)
        Grafički urednik: Dragan Kordić (slobodni ilustrator)
        Uredništvo: Vedrana Balen Spinčić (Gradsko kazalište lutaka Rijeka), Natali Bosić (Vijeće mladih Benčić), Barbara Zupičić (Art kino), Ivana Lučić (MMSU), Anda Bukvić (U novoroditeljskom žanru), Jelena Pervan (Hrkalova “mama”)

    MALO UREDNIŠTVO

    Projekt „Malo uredništvo“ provodi se od siječnja 2018. godine kroz program Vijeća mladih Benčić. Aktivnost je usko vezana uz projekt Brickzine. Dvije glavne aktivnosti
    koje se provode kroz projekt – stvaranje sadržaja za tiskano i online izdanje časopisa od strane djece te stvaranje audio verzije časopisa.

    MENTORSKI RAD

    Kroz radionice djeca i mladi biraju teme kojima se žele baviti te se zatim spajaju s mentorima – stručnjacima iz područja književnosti, izdavaštva, novinarstva, stripa ili
    specifičnih disciplina. Mentorstvo se odvija na način da dijete/sudionik radionice odabere temu kojom se želi baviti, zatim Vijeće mladih Benčić bira mentora u suradnji s urednikom časopisa Brickzine. Nakon toga se organizira sastanak mentora i djeteta/sudionika radionice, potom suradnja teče putem e-maila ili drugog digitalnog sredstva komunikacije. Rezultat mentorstva su članci raznih tema, formata i oblika koji će se objavljivati u tiskanom ili digitalnom izdanju časopisa Brickzine. Cilj ove aktivnosti je uspostaviti točku aktivacije djece i mladih koji se žele angažirati na časopisu Brickzine (informacije o uključivanju će biti uskoro dostupne u online
    izdanju) te u budućnosti pravog dječjeg uredništva s moći odlučivanja i utjecaja na izgled i sadržaj časopisa.

    Suradnici – mentori: Davor Mandić, Anja Kožul, Dragan Kordić, Tanja Kanazir

    AUDIO DIGITALIZACIJA

    Tokom provođenja aktivnosti Malog uredništva u 2018. godini, nastala je ideja o prenošenju Brickzine-a u audio format čime nam je želja bila raditi na ostvarenju nekoliko vrlo važnih ciljeva:

        s polaznicima Malog uredništva raditi na popularizaciji čitanja, razvijati vještine čitanja s razumijevanjem, naučiti tehnike disanja i dikcije te raditi na razvoju samopouzdanja i pozitivnih osjećaja vezanih za čitanje
        zajedničkim istraživanjem doprinijeti audio sadržaju za djecu i mlade koji će omogućiti slabovidnoj i slijepoj djeci, kao i djeci s disleksijom i
        drugim teškoćama da imaju pristup jednakim sadržajima kao i djeca bez teškoća
        razvijati nove oblike interdisciplinarnih medijskih sadržaja za djecu i mlade kojima će se istraživati mogućnosti kreativnije i zabavnije upotrebe tradicionalnih
        medija te ponuditi siguran sadržaj i povećati konzumacija edukativnog-odgojih sadržaja

    U siječnju 2019. godine započela je pilot aktivnost izrade audio verzije časopisa. U obliku podcasta obrađen je dio sadržaja prvog tiskanog broja na temu „ulica“. Uz čitanje tekstova, sadržaj je obogaćen raznim zvukovima koje su korisnici programa naučili snimati i/ili proizvoditi.
    Malo uredništvo, kao i sama aktivnost audio digitalizacije novih brojeva Brickzine-a nastaviti će se kroz 2019. i 2020. godinu. Ovim putem pozivamo djecu stariju od 10 godina koja su zainteresirana za novinarstvo i pisanje da nam se jave i pridruže Malom uredništvu!

    Nositelj: Vijeće mladih Benčić (Natali Bosić i Ivana Golob Mihić)
    Suradnici – audio digitalizacija: Petra Šarac (dikcija), Radio Roža (audio, Davor Popdankovski, Davor Margan, Sebastijan Tomažin)
    Projekt je financijski podržan od strane Rijeka 2020 Europske prijestolnice kulture.`,
    image: '/images/shows/audio-brickzine.jpg',
    authors: [
      'Vedrana Balen Spinčić',
      'Natali Bosić',
      'Barbara Zupičić',
      'Ivana Lučić',
      'Anda Bukvić',
      'Jelena Pervan',
    ],
    playlist_url: 'https://www.mixcloud.com/RadioRoza/playlists/audio-brickzine/',
    active: false,
    external: false,
  },
  {
    href: '/emisije/ri-rock-mix',
    title: 'Ri Rock Mix',
    tags: ['Ri Rock', 'Mixtape'],
    description: `Radio Roža predstavlja riječku rock povijest kroz serijal mixeva nazvanim Ri Rock Mix. Rock u Rijeci postoji još od 1957. godine kada je pokrenut klub Husar, prvi rock i disko-klub u Hrvatskoj, Jugoslaviji i jedan od prvih u Europi. Posljedica plesnjaka u Husaru početkom 60-ih počinju se formirati prvi bendovi u gradu.`,
    image: '/images/shows/rirock_mix.jpg',
    authors: ['Filip Žiljak'],
    playlist_url: 'https://www.mixcloud.com/RadioRoza/playlists/rirockmix/',
    active: false,
    external: false,
  },
  {
    href: '/emisije/rijecki-djir',
    title: 'Riječki đir',
    tags: ['History', 'Interview'],
    description: `Riječki đir je audio putovanje prostorom i vremenom Rijeke i okolice. Nema granica, nema predrasuda, nema premalenih priča, nema nevažnih detalja. Rijeka je svijet prepun priča koje se prelamaju se na njenom asfaltu, zrcale u njenoj vodi. Mislimo da je poznajemo, a stalno je nanovo otkrivamo. Dat ćemo glasove ljudima iz prošlosti, sadašnjosti...I pokušat ćemo dokučiti budućnost.

    Urednice emisije su Ana Galant i Marija Rađa. Ana je komparatistica i kroatistica, Marija je povjesničarka i nastavnica, a obje dijele ljubav prema riječkoj (i svjetskoj) povijesti. Zajedno s tonskim majstorima Edinom Veskovićem i Sebastijanom Tomažinom stvaraju Riječke đireve.

    Teme kojima se bavimo su riječke, hrvatske, svjetske. Pametnih, zanimljivih, darovitih sugovornika ne manjka. Dapače. Radmila Matejčić pokazala nam je da se grad itekako može čitati (i slušati), konzultiramo se i s Danilom Klenom, Vandom Ekl i mnogim drugom stručnjacima iz prošlosti kroz njihove tekstove, a pozivamo u goste povjesničare, arhitekte, književnike, istraživače, entuzijaste, vrijedne i važne ljude koji svojim radom bogate naše prostore.

    I znanstveno, i lepršavo, ozbiljno i uz smijeh, kopamo po knjižnicama i arhivima, zavirujemo posvuda kako bismo slušateljima omogućili doživljaj Rijeke. Ma gdje god bili, mi smo Riječki đir, za vas na Radio Roži.

    Emisija se emitira jednom mjesečno, zadnjeg četvrtka u mjesecu, u 18h.

    Sve dosadašnje epizode pronađite na MixCloudu Radija Rože. Za sve prijedloge, komentare, ideje...obratite nam se na mail: redakcija.radioroza@gmail.com`,
    image: '/images/shows/rijecki_dir.jpg',
    authors: ['Ana Galant', 'Marija Rađa'],
    playlist_url: 'https://www.mixcloud.com/RadioRoza/playlists/rije%C4%8Dki-%C4%91ir/',
    active: false,
    external: false,
  },
  {
    href: '/emisije/rndm',
    title: 'RNDM',
    tags: ['Minimal', 'Ambient', 'Electro'],
    description: `Rezidenti RNDM na RR prezentiraju elektroniku u žanrovski neograničenim setovima te ovisno o trenutnom mindsetu. Imate priliku poslušati presjek glazbe prigodne za varijantu klupskog groovea ili pak „easy listening mood-a.“ RNFM rezidenciju programa imaju u klubu Tunel, a za više informacija o svemu što rade pogledajte na njihovoj FB stranici!`,
    image:
      'https://www.mar-com.hr/radio-davor/admin/serijal/uploads/d0aaa24c5c9f3923633ed81d41f0380ef900f8b4-rndm.jpg',
    authors: ['RNDM'],
    playlist_url: 'https://www.mixcloud.com/RadioRoza/playlists/rndm-crates/',
    active: false,
    external: false,
  },
  {
    href: '/emisije/da-cratez',
    title: 'Da Cratez',
    tags: ['Hip Hop', 'Rap'],
    description: `Emisija posvećena hip-hop kulturi u kojoj će se promovirati naefirmirani izvođači iz Rijeke, regije i svijeta.`,
    image:
      'https://www.mar-com.hr/radio-davor/admin/serijal/uploads/e5dfb11049cbb2a84fa3b3cc4179b5c9e8e3f30b-rep_dese.jpg',
    authors: ['Filip Žiljak'],
    playlist_url: 'https://www.mixcloud.com/RadioRoza/playlists/da-cratez/',
    active: true,
    external: false,
  },
  {
    href: '/emisije/rapertoar',
    title: 'Rapertoar',
    tags: ['Hip Hop', 'Rap'],
    description: `Emisija posvećena hip-hop kulturi u kojoj će se promovirati naefirmirani izvođači iz Rijeke, regije i svijeta.`,
    image:
      'https://www.mar-com.hr/radio-davor/admin/serijal/uploads/e5dfb11049cbb2a84fa3b3cc4179b5c9e8e3f30b-rep_dese.jpg',
    authors: ['Filip Žiljak'],
    playlist_url: 'https://www.mixcloud.com/RadioRoza/playlists/rapertoar/',
    active: false,
    external: false,
  },
  {
    href: '/emisije/tbls',
    title: 'Thomas Bernhard liže sladoled',
    tags: ['Art', 'Poetry', 'Music'],
    description: `Thomas Bernhard liže sladoled na Radio Roži poziva vas da uzmete sve ono što vas smiruje. Uz poeziju i prozu, zastajemo, razmišljamo, maštamo i odmaramo od zbrke. Ovo je slow radio, emisija za klupicu u parku koju vode i uređuju uređuju književnica Eva Simčić i dramaturginja Nataša Antulov.`,
    image: '/images/shows/tbls.jpg',
    authors: ['Eva Simčić', 'Nataša Antulov'],
    playlist_url: 'https://www.mixcloud.com/RadioRoza/playlists/tbls/',
    active: true,
    external: false,
  },
  {
    href: '/emisije/air-check',
    title: 'Air Check',
    tags: ['World music', 'Jazz', 'Traditional'],
    description: `Emisija u kojoj s gostima tematiziramo tradicionalnu, filmsku, jazz i povezanu glazbu koja ima svoju jaku publiku izvan pop okvira.`,
    image: '/images/shows/air-check.jpg',
    authors: ['Tomislav Mile Milićević', 'Marija Rađa'],
    playlist_url: 'https://www.mixcloud.com/RadioRoza/playlists/air-check/',
    active: false,
    external: false,
  },
  {
    href: '/emisije/cetiri-godisnja-doba-kruzne-ulice',
    title: 'Četiri godišnja doba Kružne ulice',
    tags: ['Ri Rock', 'Educational', 'History'],
    description:
      'Projekt “Četiri godišnja doba Kružne ulice” provodi se kroz Riječki program lokalnog partnerstva (RPLP) u suradnji s Grad Rijeka, a temelji se na aktivnom uključivanju zajednice i kreativnim rješenjima za poboljšanje javnog prostora.',
    authors: ['Filip Žiljak'],
    image: '/images/shows/cetiri-godisnja-doba.jpg',
    playlist_url:
      'https://www.mixcloud.com/RadioRoza/playlists/%C4%8Detiri-godi%C5%A1nja-doba-kru%C5%BEne-ulice/',
    active: false,
    external: false,
  },
  {
    href: '/emisije/mixtape',
    title: 'Mixtape',
    tags: ['Eclectic'],
    description: 'Najbolja selekcija sa vinila Rože i prijatelja.',
    authors: [],
    playlist_url: 'https://www.mixcloud.com/RadioRoza/playlists/mixtape/',
    active: false,
    external: false,
  },
  {
    href: '/emisije/sos-podcast',
    title: 'SOS Podcast',
    tags: ['Educational', 'Human rights'],
    description:
      'Projekt financira Ministarstvo rada, mirovinskoga sustava, obitelji i socijalne politike. Svrha projekta je osiguravanje dostupne, pravovremene, kvalitetne i sveobuhvatne podrške žrtvama seksualnog nasilja kroz izravan rad s njima. Također, projektom se podiže svjesnost javnosti o problematici seksualnog nasilja i uznemiravanja te razina upoznatosti samih žrtava o pravima koja im pripadaju. Partneri na projektu su Centar za socijalnu skrb Rijeka, udruga Ri Rock, udruga Domine – organizacija za promicanje ženskih prava, udruga Ženska soba te Sveučilište u Rijeci.',
    image: '/images/shows/sos-podcast.jpg',
    authors: ['SOS Rijeka'],
    playlist_url: 'https://www.mixcloud.com/RadioRoza/playlists/sos-podcast/',
    active: false,
    external: false,
  },
  {
    href: '/emisije/digitalne-rozice',
    title: 'Digitalne rožice',
    tags: ['Educational', 'Youth'],
    description:
      'Digitalne rožice europski je projekt koji u fokus postavlja opću populaciju djece i mladih te djecu i mlade s teškoćama u razvoju. U suradnji s partnerskim udrugama (RUKE, Muzikopter) koje već dugi niz godina provode programske aktivnosti koje uključuju rad s djecom i mladima, nastoji se utjecati na niz pozitivnih promjena: kulturnu i umjetničku edukaciju, razvoj samostalnosti, poboljšanje slike o sebi te poboljšanje socio-emocionalnog kontakta, izgradnju interpersonalnih odnosa, osobni rast i razvoj kroz oslobađanje kreativnosti i individualnosti djece i mladih.',
    image: '/images/shows/digitalne-rozice.svg',
    authors: [],
    playlist_url: 'https://www.mixcloud.com/RadioRoza/playlists/digitalne-ro%C5%BEice/',
    active: false,
    external: false,
  },
  {
    href: '/emisije/odasiljac',
    title: 'Odašiljač',
    tags: ['Educational', 'Youth', 'Human rights'],
    description:
      'Projekt Odašiljač okuplja novinare iz tri partnerske udruge: Udruge Ri Rock, S.O.S. Rijeka i Pariter. Cilj je izgradnja stručnih kadrova koji će adekvatno izvještavati o ranjivim skupinama unutar tri radijske emisije emitirane na riječkom radiju zajednice (Community radio) – Radio Roži. Putem emisija javnost će biti informirana o trima temama: djeca i mladi; rodna ravnopravnost, diskriminacija i ženska prava; žrtve nasilja. ',
    authors: ['SOS Rijeka', 'Pariter', 'Ri Rock'],
    playlist_url: 'https://www.mixcloud.com/RadioRoza/playlists/oda%C5%A1ilja%C4%8D/',
    active: false,
    external: false,
  },
  {
    href: '/emisije/nevidljive',
    title: 'Nevidljive',
    tags: ['Human rights', 'Educational'],
    description:
      'Obrađivat će teme iz domene rodne ravnopravnosti i reproduktivne pravde. Kroz razgovore sa ženama pokrit će se aktualne teme iz politike, kulture i ekonomije iz pozicije rodne ravnopravnosti te omogućiti sudjelovanje ženama različitih profila, profesija i stupnja obrazovanja, a sve kako bi se aktivno radilo na uključivanju socijalno osjetljivijih skupina u javni i društveni život i kako bi se neispričanim pričama dala platforma za zahtijevanje promjena. Cilj emisije je informirati širu javnost o ženskim pravima te diskriminirajućim situacijama s kojima se ženske osobe susreću u javnom i privatnom životu te osnažiti ih za reagiranje na nepravdu i pokretanje promjena.',
    image: '/images/shows/nevidljive.png',
    authors: ['Pariter'],
    playlist_url: 'https://www.mixcloud.com/RadioRoza/playlists/nevidljive/',
    active: false,
    external: false,
  },
  {
    href: '/emisije/sos',
    title: 'SOS',
    tags: ['Human rights', 'Educational'],
    description:
      'Obradit će se teme pružanja primarne pravne i psihološke pomoći žrtvama obiteljskog, partnerskog i seksualnog nasilja, pojedini aspekti radnog prava vezani uz nasilje i uznemiravanje na radnom mjestu te važnosti rada s mladima u svrhu prevencije i edukacije o nasilju. Omogućit će se da se žrtve nasilja zauzmu za sebe kroz progovaranje o svojim doživljajima te da „dobiju svoj glas“. Izlazak u javnost s vlastitom pričom na neke od njih djeluje terapeutski, ali je i iznimno korisno za druge osobe u sličnim situacijama i za društvo općenito. Predstavljanje neće biti intruzivno te pruža mogućnost zadržavanja anonimnosti. Gosti emisije bit će korisnici/e Udruge, stručnjaci/kinje i volonteri/ke koji s njima rade te istraživači/ce koje se bave temom socijalno marginaliziranih i ranjivih skupina.',
    image: '/images/shows/sos.png',
    authors: ['SOS Rijeka'],
    playlist_url: 'https://www.mixcloud.com/RadioRoza/playlists/sos/',
    active: false,
    external: false,
  },
  {
    href: '/emisije/skolica',
    title: 'Školica',
    tags: ['Youth', 'Human rights'],
    description:
      'Adresirat će probleme djece i mladih u različitoj dobi - prve godine života, vrtić, predškolska dob, niži i viši razredi osnovne škole, srednja škola te fakultetsko doba. Osim tema povezanih sa samim školovanjem (bullying, poteškoće s učenjem), obradit će se i teme vezane uz obiteljski život (problemi u ponašanju, zanemarivanost od strane roditelja, popravne institucije) te svakodnevne aktivnosti (pronalazak zaposlenja, hobiji). U emisiji će gostovati djeca i mladi (s dozvolom roditelja/staratelja), predstavnici institucija, voditelji izvannastavnih aktivnosti i dr. dionici čiji rad uključuje rad s djecom i mladima. Ugostit će se gosti iz drugih županija kako bi se mogla usporediti situacija PGŽ-a i ostatka Hrvatske. Cilj emisije je osvijestiti javnost o problemima djece i mladih, njihovom pogledu na svijet i percepciji stvarnosti. Bitno je javno progovarati o mladima i njihovim pravima jer su oni budućnost, a problem s kojima se susreću mogu izazvati trajne posljedice na njih i njihovo okruženje.',
    image: '/images/shows/skolica.png',
    authors: [],
    playlist_url: 'https://www.mixcloud.com/RadioRoza/playlists/skolica/',
    active: false,
    external: false,
  },
  {
    href: '/emisije/17-bitnih',
    title: '17 bitnih',
    tags: [],
    authors: [],
    playlist_url: 'https://www.mixcloud.com/RadioRoza/playlists/17-bitnih/',
    active: false,
    external: false,
  },
  {
    href: '/emisije/prilog',
    title: 'Prilog',
    tags: [],
    authors: [],
    playlist_url: 'https://www.mixcloud.com/RadioRoza/playlists/prilog/',
    active: false,
    external: false,
  },
  {
    href: '/emisije/artefact',
    title: 'ARTeFACT',
    tags: [],
    authors: [],
    playlist_url: 'https://www.mixcloud.com/RadioRoza/playlists/artefact/',
    active: false,
    external: false,
  },
  {
    href: '/emisije/mia',
    title: 'MIA',
    tags: [],
    authors: [],
    playlist_url: 'https://www.mixcloud.com/RadioRoza/playlists/mia/',
    active: false,
    external: false,
  },
  {
    href: '/emisije/dj',
    title: 'Đ',
    tags: [],
    authors: [],
    playlist_url: 'https://www.mixcloud.com/RadioRoza/playlists/%C4%91/',
    active: false,
    external: false,
  },
  {
    href: '/emisije/rr-intervjui',
    title: 'RR intervjui',
    tags: [],
    authors: [],
    playlist_url: 'https://www.mixcloud.com/RadioRoza/playlists/rr-intervjui/',
    active: false,
    external: false,
  },
  {
    href: '/emisije/kad-bi-svi',
    title: 'Kad bi svi',
    tags: [],
    authors: [],
    playlist_url: 'https://www.mixcloud.com/RadioRoza/playlists/kad-bi-svi/',
    active: false,
    external: false,
  },
  {
    href: '/emisije/ri-rock-podcast',
    title: 'Ri Rock podcast',
    tags: [],
    authors: [],
    playlist_url: 'https://www.mixcloud.com/RadioRoza/playlists/ri-rock-podcast/',
    active: false,
    external: false,
  },
  {
    href: '/emisije/ziroskop',
    title: 'Žiroskop',
    tags: [],
    authors: [],
    playlist_url: 'https://www.mixcloud.com/RadioRoza/playlists/ziroskop/',
    active: false,
    external: false,
  },
];
