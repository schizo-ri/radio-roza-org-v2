const AUTOPLAY_KEY = 'rr:autoplay';
const VOLUME_KEY = 'rr:volume';

// Modul se evaluira i tijekom SSR-a, gdje localStorage ne postoji; u browseru
// pristup može baciti (private mode) — u oba slučaja preferencija samo ne preživi.
function readStorage(key: string): string | null {
  if (typeof localStorage === 'undefined') return null;
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key: string, value: string) {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(key, value);
  } catch {
    // vrijedi samo za ovu sesiju
  }
}

function readVolume(): number {
  const raw = readStorage(VOLUME_KEY);
  if (raw === null || raw === '') return 1; // Number(null) je 0 — bez zapisa default mora biti puna glasnoća
  const v = Number(raw);
  return Number.isFinite(v) && v >= 0 && v <= 1 ? v : 1;
}

class PlayerSettings {
  autoplayOnVisit = $state(readStorage(AUTOPLAY_KEY) === '1');
  volume = $state(readVolume());

  setAutoplay(on: boolean) {
    this.autoplayOnVisit = on;
    writeStorage(AUTOPLAY_KEY, on ? '1' : '0');
  }

  setVolume(volume: number) {
    this.volume = Math.min(1, Math.max(0, volume));
    writeStorage(VOLUME_KEY, String(this.volume));
  }
}

export const playerSettings = new PlayerSettings();
