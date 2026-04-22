export type Day =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

export interface Show {
  title: string;
  day: Day;
  show_start: string; // "HH:MM" 24-hour format
}

function parseTime(show_start: string): number {
  const [h, m] = show_start.split(':');
  return parseInt(h) * 60 + parseInt(m);
}

export const program: Show[] = [
  { title: 'Kamenolom Light', day: 'Monday', show_start: '13:00' },
  { title: 'Naše gore riff', day: 'Monday', show_start: '16:00' },
  { title: 'Fjaka', day: 'Tuesday', show_start: '08:00' },
  { title: 'Fjaka', day: 'Tuesday', show_start: '15:00' },
  { title: 'Kuplung', day: 'Wednesday', show_start: '00:00' },
  { title: 'Space is the Place', day: 'Wednesday', show_start: '02:00' },
  { title: 'Chill Pill', day: 'Wednesday', show_start: '04:00' },
  { title: 'Don Eladio', day: 'Wednesday', show_start: '08:00' },
  { title: 'Ras Pashoy - Reggae/Dub', day: 'Wednesday', show_start: '16:00' },
  { title: 'Ritmologija', day: 'Wednesday', show_start: '20:00' },
  { title: 'Naše Gore Riff - Electro', day: 'Wednesday', show_start: '23:00' },
  { title: 'Chill Pill', day: 'Thursday', show_start: '04:00' },
  { title: 'Izvorišta', day: 'Friday', show_start: '14:00' },
  { title: 'Potrensuljka', day: 'Saturday', show_start: '00:00' },
  { title: 'Funkushima', day: 'Saturday', show_start: '14:00' },
  { title: 'Kamenolom Dark', day: 'Saturday', show_start: '20:00' },
  { title: 'Strujni Vod - Techno', day: 'Sunday', show_start: '00:00' },
  { title: 'Chill Pill', day: 'Sunday', show_start: '04:00' },
  { title: 'Don Eladio', day: 'Sunday', show_start: '10:00' },
  { title: 'Ritmologija', day: 'Sunday', show_start: '12:00' },
  { title: 'Depilacija', day: 'Sunday', show_start: '20:00' },
  { title: 'Naše Gore Riff - Indie', day: 'Friday', show_start: '15:00' },
  { title: 'Chill Pill', day: 'Monday', show_start: '00:00' },
  { title: 'Space is the Place', day: 'Monday', show_start: '04:00' },
  { title: 'Chill Pill', day: 'Tuesday', show_start: '00:00' },
  { title: 'Space is the Place', day: 'Tuesday', show_start: '04:00' },
  { title: 'Space is the Place', day: 'Friday', show_start: '04:00' },
  { title: 'Roža info', day: 'Thursday', show_start: '12:00' },
  { title: 'Yugofonija', day: 'Sunday', show_start: '18:00' },
  { title: 'Ritmologija', day: 'Tuesday', show_start: '20:00' },
  { title: 'Ja Biram', day: 'Tuesday', show_start: '23:00' },
  { title: 'Ritmologija', day: 'Friday', show_start: '18:00' },
  { title: 'Naše gore riff - Rock', day: 'Thursday', show_start: '23:00' },
  { title: 'Dramorama', day: 'Thursday', show_start: '17:00' },
  { title: 'Kamenolom Dark', day: 'Thursday', show_start: '18:00' },
  { title: 'Okolo Naokolo - Afro', day: 'Wednesday', show_start: '13:00' },
  { title: 'Okolo Naokolo - Istok', day: 'Thursday', show_start: '15:00' },
  { title: 'Fjaka', day: 'Thursday', show_start: '13:00' },
  { title: 'Funkushima', day: 'Friday', show_start: '13:00' },
  { title: 'Kava sa šlagerom', day: 'Friday', show_start: '08:00' },
  { title: 'Kapuz', day: 'Friday', show_start: '10:00' },
  { title: 'Kamenolom Light', day: 'Tuesday', show_start: '13:00' },
  { title: 'Ras Pashoy - Dubstep', day: 'Friday', show_start: '22:00' },
  { title: 'Okolo Naokolo - Afro', day: 'Sunday', show_start: '16:20' },
  { title: 'Space is the Place', day: 'Saturday', show_start: '06:00' },
  { title: 'Strujni Vod - Minimal House', day: 'Friday', show_start: '00:00' },
  { title: 'Strujni Vod - Electro Breakbeat', day: 'Thursday', show_start: '00:00' },
  { title: 'Kuplung', day: 'Monday', show_start: '22:00' },
  { title: 'Mutant Disco', day: 'Monday', show_start: '21:00' },
  { title: 'Kava sa šlagerom', day: 'Thursday', show_start: '08:00' },
  { title: 'Bubanj i Bass', day: 'Sunday', show_start: '21:00' },
  { title: 'Kuplung', day: 'Sunday', show_start: '23:00' },
  { title: 'Kapuz', day: 'Thursday', show_start: '10:00' },
  { title: 'Funkushima', day: 'Monday', show_start: '17:00' },
  { title: 'Ritmologija', day: 'Monday', show_start: '20:30' },
  { title: 'HEX.', day: 'Monday', show_start: '19:30' },
  { title: 'Kava sa šlagerom', day: 'Monday', show_start: '08:00' },
  { title: 'Funkushima', day: 'Wednesday', show_start: '10:00' },
  { title: 'Fjaka', day: 'Friday', show_start: '11:00' },
  { title: 'Okolo Naokolo - Afro', day: 'Tuesday', show_start: '17:00' },
  { title: 'Ja Biram', day: 'Saturday', show_start: '23:00' },
  { title: 'Naše Gore Riff - Indie', day: 'Saturday', show_start: '16:00' },
  { title: 'Don Eladio', day: 'Tuesday', show_start: '11:00' },
  { title: 'Fjaka', day: 'Saturday', show_start: '08:00' },
  { title: 'Fader', day: 'Friday', show_start: '20:00' },
  { title: 'Štošta', day: 'Saturday', show_start: '19:00' },
  { title: 'Reality Check', day: 'Wednesday', show_start: '21:00' },
  { title: 'Naše Gore Riff - Ri Rock', day: 'Saturday', show_start: '21:00' },
  { title: 'Podzemna kulisa - Peperton specijal', day: 'Tuesday', show_start: '21:00' },
  { title: 'Naftalina', day: 'Monday', show_start: '10:00' },
  { title: 'Kava sa šlagerom', day: 'Monday', show_start: '11:00' },
];

export interface Block {
  title: string;
  description: string;
  tags: string[];
}

export const blocks: Block[] = [
  {
    title: 'Fjaka',
    description: 'Kad ti je život previše stresan, a krevet predaleko - sjedni i slušaj.',
    tags: ['Pop', 'Ambient', 'Jazz'],
  },
  {
    title: 'Kapuz',
    description: 'Glazba za one dane kad ni kava ne pomaže. Hoodie up, world out.',
    tags: ['Hip-Hop', 'R&B', 'Lo-fi', 'Downtempo'],
  },
  {
    title: 'Kava sa šlagerom',
    description: 'Šlager hits koji idu uz jutarnju kavu - slatko, pjenjavo, možda malo lipkavo.',
    tags: ['Šlager', 'Pop', 'Retro', 'Folk'],
  },
  {
    title: 'Kamenolom Light',
    description: 'Rock koji neće razbiti prozore, ali će razbuditi susjede. Odgovorno teškaštvo.',
    tags: ['Rock', 'Alternative', 'Indie Rock', 'Grunge'],
  },
  {
    title: 'Kamenolom Dark',
    description: 'Kad Light nije dovoljno - full metal jacket za uši. Nosači slušalica, oprez!',
    tags: ['Metal', 'Heavy Metal', 'Hard Rock', 'Doom', 'Sludge'],
  },
  {
    title: 'Naše Gore Riff - Ri Rock',
    description: 'Domaći rock koji lupa jače od rakije. Balkanski riffovi bez granica.',
    tags: ['Rock', 'Domaći', 'Balkan', 'Alternative'],
  },
  {
    title: 'Naše Gore Riff - Indie',
    description: 'Indie zvukovi s naših prostora - alternativa alternativama, hipsterski approved.',
    tags: ['Indie', 'Alternative', 'Domaći', 'Lo-fi'],
  },
  {
    title: 'Naše Gore Riff - Electro',
    description: 'Kad rakija sretne sintetizator - električni Balkan za moderne nomade.',
    tags: ['Electro', 'Electronic', 'Balkan', 'Synth'],
  },
  {
    title: 'Naše gore riff',
    description: 'Domaći riffovi koji lupe pravo u srce - balkanski zvukovi bez granica.',
    tags: ['Rock', 'Balkan', 'Alternative', 'Domaći'],
  },
  {
    title: 'Naše gore riff - Rock',
    description: 'Domaći rock koji lupa jače od rakije. Balkanski riffovi bez granica.',
    tags: ['Rock', 'Hard Rock', 'Balkan', 'Domaći'],
  },
  {
    title: 'Don Eladio',
    description: 'Elegantno opasna glazba - kao dobar mezcal, glatko ide, ali ima punch.',
    tags: ['Latin', 'Jazz', 'Bossa Nova', 'World Music'],
  },
  {
    title: 'Okolo Naokolo - Afro',
    description: 'Afrički ritmovi koji te tjeraju da plešeš, čak i kad misliš da ne znaš.',
    tags: ['Afrobeat', 'World Music', 'Funk', 'Rhythm'],
  },
  {
    title: 'Okolo Naokolo - Istok',
    description: 'Putovanje na Istok bez vize - od Balkana do Bliskog istoka zvukom.',
    tags: ['World Music', 'Balkan', 'Middle East', 'Folk', 'Ethno'],
  },
  {
    title: 'Funkushima',
    description: 'Radioaktivno funkaran - groove koji se ne zaustavlja, možda i zarazno.',
    tags: ['Funk', 'Groove', 'Soul', 'Disco'],
  },
  {
    title: 'Ritmologija',
    description: 'Znanstveno dokazano: ritam liječi. Doktor preporučuje bass i hi-hat.',
    tags: ['Electronic', 'Techno', 'House', 'Bass'],
  },
  {
    title: 'Kuplung',
    description: 'Glazba koja povezuje - kao dobar kuplung, sve ide glatko u pravom rhythm-u.',
    tags: ['Electronic', 'House', 'Disco', 'Funk'],
  },
  {
    title: 'Chill Pill',
    description: 'Audio sedativ za preživljavanje modernog života. Nuspojave: smirenost.',
    tags: ['Chillout', 'Ambient', 'Lo-fi', 'Downtempo'],
  },
  {
    title: 'Strujni Vod - Electro Breakbeat',
    description: 'Visokonaponski breakbeats - pazi, udara pod 220V groovea!',
    tags: ['Electro', 'Breakbeat', 'Electronic', 'Dance'],
  },
  {
    title: 'Strujni Vod - Techno',
    description: 'Tehno koji prolazi kroz žile kao električna struja - underground pure energy.',
    tags: ['Techno', 'Underground', 'Electronic', 'Industrial'],
  },
  {
    title: 'Strujni Vod - Minimal House',
    description: 'Manje je više, ali bass je dovoljno. Minimalistički hedonizam.',
    tags: ['Minimal', 'House', 'Electronic', 'Techno'],
  },
  {
    title: 'Potrensuljka',
    description: 'Glazba koja te trese kao dobar trening - cardio za uši, workout za dušu.',
    tags: ['Electronic', 'Dance', 'Bass', 'Energetic'],
  },
  {
    title: 'Space is the Place',
    description: 'Cosmic sounds za zemaljske bića - Houston, imamo funky problem!',
    tags: ['Jazz', 'Cosmic', 'Experimental', 'Ambient', 'Avant-garde'],
  },
  {
    title: 'Ras Pashoy - Reggae/Dub',
    description: 'One love, heavy bass - Jah blagoslovio ovaj soundsystem.',
    tags: ['Reggae', 'Dub', 'Roots', 'Bass'],
  },
  {
    title: 'Ras Pashoy - Dubstep',
    description: 'Kad dub sretne 2010-e - reggae roots sa sub-bass terapijom.',
    tags: ['Dubstep', 'Dub', 'Bass', 'Electronic'],
  },
  {
    title: 'Izvorišta',
    description: 'Povratak korijenima - tradicijski zvukovi koji te vezuju za zemlju i predke.',
    tags: ['Folk', 'Traditional', 'World Music', 'Ethno'],
  },
  {
    title: 'Depilacija',
    description: 'Glazba koja skida dlake i inhibicije - raw energy bez cenzure.',
    tags: ['Punk', 'Noise', 'Experimental', 'Raw', 'Post-punk'],
  },
  {
    title: 'Roža info',
    description: 'Sve što trebaš znati, a nisi znao da trebaš - informacije začinjene muzikom.',
    tags: ['Talk', 'Info', 'News', 'Culture'],
  },
  {
    title: 'Yugofonija',
    description: 'Nostalgija na vinilu - kad je Balkan bio jedan, a glazba bila zajedničku.',
    tags: ['Retro', 'Yugo', 'Nostalgia', 'Pop', 'Rock'],
  },
  {
    title: 'Ja Biram',
    description: 'Demokratija na radiju - ti biraš, mi puštamo, svi uživamo.',
    tags: ['Mixed', 'Listener Request', 'Varied', 'Interactive'],
  },
  {
    title: 'Dramorama',
    description: 'Teatar za uši - kad riječi postaju glazba, a glazba postaje priča.',
    tags: ['Spoken Word', 'Theater', 'Culture', 'Storytelling'],
  },
  {
    title: 'Mutant Disco',
    description: 'Disco koji je mutirao u nešto bolje - evolucija plesa kroz zvuk.',
    tags: ['Disco', 'Funk', 'Post-Disco', 'Dance'],
  },
  {
    title: 'Bubanj i Bass',
    description: 'Dva najbolja prijatelja zvuka - jednostavno i nezaustavljivo.',
    tags: ['Drum & Bass', 'Electronic', 'Bass', 'Jungle'],
  },
  {
    title: 'HEX.',
    description: 'Šesterokutni zvukovi za digitalne duše - algoritmi koji groovaju.',
    tags: ['Electronic', 'Experimental', 'Glitch', 'Digital'],
  },
  {
    title: 'Naftalina',
    description: 'Vintage vibes iz babine škrinje - staro zlato koje nikad ne izlazi iz mode.',
    tags: ['Oldies', 'Retro', 'Nostalgia', 'Vintage'],
  },
  {
    title: 'Fader',
    description: 'Kad DJ postane dirigent, a mikseta postane orkestar - pure mixing magic.',
    tags: ['DJ', 'Electronic', 'Mix', 'Dance', 'House'],
  },
  {
    title: 'Štošta',
    description: 'Kad ne znaš što očekivati, ali znaš da će biti dobro - audio rulet.',
    tags: ['Eclectic', 'Mixed', 'Varied', 'Surprise'],
  },
  {
    title: 'Reality Check',
    description: 'Provjera stvarnosti kroz bass i melodiju - wake up call za uši.',
    tags: ['Electronic', 'Hip-Hop', 'Alternative', 'Bass'],
  },
  {
    title: 'Podzemna kulisa - Peperton specijal',
    description: 'Underground scena kroz piperov objektiv - kultura ispod radara.',
    tags: ['Underground', 'Alternative', 'Culture', 'Indie'],
  },
];

const DAYS_OF_WEEK: Day[] = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const sortedByDay: Show[] = [...program].sort((a, b) => a.day.localeCompare(b.day));

export function getProgramOnWeekday(day: Day): Show[] {
  return program.filter((show) => show.day === day);
}

export function getCurrentShow(): (Show & { startTimeMinutes: number }) | null {
  const now = new Date();
  const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' }) as Day;
  const currentTime = now.getHours() * 60 + now.getMinutes();

  const todayProgram = getProgramOnWeekday(currentDay);
  if (!todayProgram.length) return null;

  const startedShows = todayProgram
    .map((show) => ({ ...show, startTimeMinutes: parseTime(show.show_start) }))
    .filter((show) => show.startTimeMinutes <= currentTime)
    .sort((a, b) => b.startTimeMinutes - a.startTimeMinutes);

  return startedShows[0] ?? null;
}

export function getNextShow(): (Show & { startTimeMinutes: number }) | null {
  const now = new Date();
  const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' }) as Day;
  const currentTime = now.getHours() * 60 + now.getMinutes();
  const currentDayIndex = DAYS_OF_WEEK.indexOf(currentDay);

  const todayUpcoming = getProgramOnWeekday(currentDay)
    .map((show) => ({ ...show, startTimeMinutes: parseTime(show.show_start) }))
    .filter((show) => show.startTimeMinutes > currentTime)
    .sort((a, b) => a.startTimeMinutes - b.startTimeMinutes);

  if (todayUpcoming.length > 0) return todayUpcoming[0];

  for (let i = 1; i <= 7; i++) {
    const nextDay = DAYS_OF_WEEK[(currentDayIndex + i) % 7];
    const nextDayProgram = getProgramOnWeekday(nextDay);

    if (nextDayProgram.length > 0) {
      return nextDayProgram
        .map((show) => ({ ...show, startTimeMinutes: parseTime(show.show_start) }))
        .sort((a, b) => a.startTimeMinutes - b.startTimeMinutes)[0];
    }
  }

  return null;
}
