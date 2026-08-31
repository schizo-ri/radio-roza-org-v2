// Instalacija PWA-a. Chrome/Android nudi API (beforeinstallprompt), iOS ne nudi
// ništa — ondje ostaju samo upute. Modul se evaluira i tijekom SSR-a, pa svaki
// pristup window/navigator mora biti zaštićen (isto kao u settings.svelte.ts).

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export type InstallMode = 'prompt' | 'ios' | 'none';

function isStandalone(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    if (window.matchMedia('(display-mode: standalone)').matches) return true;
  } catch {
    // stari preglednici bez matchMedia podrške za display-mode
  }
  return (navigator as Navigator & { standalone?: boolean }).standalone === true;
}

function isIos(): boolean {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent;
  // iPadOS se predstavlja kao Macintosh — razlikuje ga jedino dodir.
  return /iPad|iPhone|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
}

class InstallState {
  #deferred: BeforeInstallPromptEvent | null = null;

  // $state prati samo postojanje eventa; sam event nije reaktivni podatak.
  hasPrompt = $state(false);
  installed = $state(isStandalone());
  #ios = isIos();

  mode: InstallMode = $derived(
    this.installed ? 'none' : this.hasPrompt ? 'prompt' : this.#ios ? 'ios' : 'none'
  );

  capture(e: Event) {
    // Bez preventDefault Chrome pokaže vlastitu traku, a spremljeni event
    // postane neupotrebljiv.
    e.preventDefault();
    this.#deferred = e as BeforeInstallPromptEvent;
    this.hasPrompt = true;
  }

  markInstalled() {
    this.installed = true;
    this.#deferred = null;
    this.hasPrompt = false;
  }

  // Event je jednokratan: nakon prompt() se briše bez obzira na ishod, pa gumb
  // nestaje i kad korisnik odustane. Preglednik ga pošalje ponovno pri sljedećem
  // učitavanju stranice.
  async promptInstall() {
    const deferred = this.#deferred;
    if (!deferred) return;
    this.#deferred = null;
    this.hasPrompt = false;
    try {
      await deferred.prompt();
      await deferred.userChoice;
    } catch {
      // korisnik je zatvorio dijalog na neuobičajen način — nema što za popraviti
    }
  }
}

export const installState = new InstallState();
