export interface ArtworkSizes {
  thumbnail: string;
  medium: string;
  large: string;
}

// Simple in-memory cache to avoid repeated API calls (null results are cached too)
const artworkCache = new Map<string, ArtworkSizes | null>();

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

  const response = await fetch(url, {
    headers: {
      'User-Agent': 'RadioRoza/1.0 (radio-rozari@gmail.com)',
    },
  });

  if (!response.ok) return null;

  const data: { recordings?: { releases?: { id: string }[] }[] } = await response.json();
  return data.recordings?.[0]?.releases?.[0]?.id ?? null;
}

async function getCoverArt(mbid: string): Promise<ArtworkSizes | null> {
  const response = await fetch(`https://coverartarchive.org/release/${mbid}`);

  if (!response.ok) return null;

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
}

async function getAlbumArtMusicBrainz(artist: string, track: string): Promise<ArtworkSizes | null> {
  const mbid = await searchMusicBrainz(artist, track);
  if (!mbid) return null;
  return getCoverArt(mbid);
}

export async function getAlbumArt(artist: string, track: string): Promise<ArtworkSizes | null> {
  const cacheKey = `${artist}|${track}`.toLowerCase();

  const cached = artworkCache.get(cacheKey);
  if (cached !== undefined) return cached;

  // 1. iTunes — single fast request, covers most popular releases
  const itunesArt = await getAlbumArtItunes(artist, track).catch(() => null);
  if (itunesArt) {
    artworkCache.set(cacheKey, itunesArt);
    return itunesArt;
  }

  // 2. Fall back to MusicBrainz + Cover Art Archive (two requests, rate-limited)
  const coverArt = await getAlbumArtMusicBrainz(artist, track).catch(() => null);
  artworkCache.set(cacheKey, coverArt);
  return coverArt;
}
