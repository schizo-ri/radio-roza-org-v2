export interface ArtworkSizes {
  thumbnail: string;
  medium: string;
  large: string;
}

export interface ArtistFanart {
  fanart: string | null;
  fanart2: string | null;
  fanart3: string | null;
  banner: string | null;
  logo: string | null;
  thumb: string | null;
  bio: string | null;
  genre: string | null;
}

// Simple in-memory caches to avoid repeated API calls
const artworkCache = new Map<string, ArtworkSizes | null>();
const fanartCache = new Map<string, ArtistFanart | null>();

async function getAlbumArtItunes(artist: string, track: string): Promise<ArtworkSizes | null> {
  const query = `${artist} ${track}`;
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=1`;

  const response = await fetch(url);
  const data: { results?: { artworkUrl100: string }[] } = await response.json();

  if (data.results && data.results.length > 0) {
    const artwork = data.results[0].artworkUrl100;
    return {
      thumbnail: artwork, // 100x100
      medium: artwork.replace('100x100bb', '300x300bb'), // 300x300
      large: artwork.replace('100x100bb', '600x600bb'), // 600x600
    };
  }
  return null;
}

async function searchMusicBrainz(artist: string, track: string): Promise<string | null> {
  const query = `artist:"${artist}" AND recording:"${track}"`;
  const url = `https://musicbrainz.org/ws/2/recording/?query=${encodeURIComponent(query)}&fmt=json&limit=1`;

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'RadioRoza/1.0 (radio-rozari@gmail.com)',
      },
    });

    if (response.status === 404) {
      console.log('MusicBrainz not found');
      return null;
    }

    const data: { recordings?: { releases?: { id: string }[] }[] } = await response.json();

    if (data.recordings && data.recordings.length > 0) {
      const recording = data.recordings[0];
      if (recording.releases && recording.releases.length > 0) {
        return recording.releases[0].id; // MBID
      }
    }

    return null;
  } catch (error) {
    console.error('Error searching MusicBrainz:', error);
    return null;
  }
}

async function getCoverArt(mbid: string): Promise<ArtworkSizes | null> {
  const url = `https://coverartarchive.org/release/${mbid}`;

  try {
    const response = await fetch(url);

    if (response.status === 404) {
      console.log('CoverArt not found');
      return null;
    }

    const data: {
      images: { front: boolean; thumbnails: { small: string; large: string }; image: string }[];
    } = await response.json();

    const frontCover = data.images.find((img) => img.front === true);
    if (!frontCover) return null;

    return {
      thumbnail: frontCover.thumbnails.small, // 250px
      medium: frontCover.thumbnails.large, // 500px
      large: frontCover.image, // Full size
    };
  } catch (error) {
    console.error('Nema cover art za ovaj release', (error as Error).message);
    return null;
  }
}

async function getAlbumArtMusicBrainz(artist: string, track: string): Promise<ArtworkSizes | null> {
  const mbid = await searchMusicBrainz(artist, track);
  if (!mbid) {
    console.log('Nije pronađen u MusicBrainz');
    return null;
  }
  return getCoverArt(mbid);
}

export async function getAlbumArt(artist: string, track: string): Promise<ArtworkSizes | null> {
  const cacheKey = `${artist}|${track}`.toLowerCase();

  if (artworkCache.has(cacheKey)) {
    return artworkCache.get(cacheKey)!;
  }

  // 1. Try MusicBrainz + Cover Art Archive
  const coverArt = await getAlbumArtMusicBrainz(artist, track);
  if (coverArt) {
    artworkCache.set(cacheKey, coverArt);
    return coverArt;
  }

  console.log('Trying iTunes');
  // 2. Fall back to iTunes
  const coverArtItunes = await getAlbumArtItunes(artist, track);
  if (coverArtItunes) {
    artworkCache.set(cacheKey, coverArtItunes);
    return coverArtItunes;
  }

  // Cache null results too to avoid repeated failed lookups
  artworkCache.set(cacheKey, null);
  return null;
}

export async function getArtistFanart(artist: string): Promise<ArtistFanart | null> {
  const cacheKey = artist.toLowerCase();

  if (fanartCache.has(cacheKey)) {
    return fanartCache.get(cacheKey)!;
  }

  try {
    const url = `https://www.theaudiodb.com/api/v1/json/2/search.php?s=${encodeURIComponent(artist)}`;
    const response = await fetch(url);

    if (response.status === 404) {
      fanartCache.set(cacheKey, null);
      return null;
    }

    const data: {
      artists?: {
        strArtistFanart: string | null;
        strArtistFanart2: string | null;
        strArtistFanart3: string | null;
        strArtistBanner: string | null;
        strArtistLogo: string | null;
        strArtistThumb: string | null;
        strArtistBiographyEN: string | null;
        strArtistGenre: string | null;
      }[];
    } = await response.json();

    if (data.artists && data.artists.length > 0) {
      const a = data.artists[0];
      const result: ArtistFanart = {
        fanart: a.strArtistFanart,
        fanart2: a.strArtistFanart2,
        fanart3: a.strArtistFanart3,
        banner: a.strArtistBanner,
        logo: a.strArtistLogo,
        thumb: a.strArtistThumb,
        bio: a.strArtistBiographyEN,
        genre: a.strArtistGenre,
      };
      fanartCache.set(cacheKey, result);
      return result;
    }

    fanartCache.set(cacheKey, null);
    return null;
  } catch (error) {
    console.error('Nema fanart za ovog artista', (error as Error).message);
    fanartCache.set(cacheKey, null);
    return null;
  }
}
