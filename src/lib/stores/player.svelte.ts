const LIVE_SRC = 'https://radio.radio-roza.org/hls/radioroza/live.m3u8';

export interface MixcloudShow {
  key: string;
  title: string;
  image?: string;
  url?: string;
}

class PlayerState {
  src = $state(LIVE_SRC);
  isLive = $state(true);
  artist = $state('Radio Roža');
  title = $state('');
  mixcloudShow = $state<MixcloudShow | null>(null);

  // Request counters — consumers watch for increments (high-water mark), so a
  // request fires even when the previous one asked for the same thing.
  liveResumeRequests = $state(0); // Player starts the live stream when this grows
  mixcloudPlayRequests = $state(0); // MixcloudBar calls widget.play() when this grows
  stopRequests = $state(0); // Player pauses the stream / MixcloudBar pauses the widget

  // Sleep timer — null when inactive. Background tabs throttle timeouts, so the
  // actual stop can drift up to ~a minute; fine for falling asleep to the radio.
  sleepTimerEndsAt = $state<number | null>(null);
  #sleepTimeout: ReturnType<typeof setTimeout> | null = null;

  startSleepTimer(minutes: number) {
    this.cancelSleepTimer();
    const ms = minutes * 60_000;
    this.sleepTimerEndsAt = Date.now() + ms;
    this.#sleepTimeout = setTimeout(() => {
      this.#sleepTimeout = null;
      this.sleepTimerEndsAt = null;
      this.stopRequests += 1;
    }, ms);
  }

  cancelSleepTimer() {
    if (this.#sleepTimeout) {
      clearTimeout(this.#sleepTimeout);
      this.#sleepTimeout = null;
    }
    this.sleepTimerEndsAt = null;
  }

  setLive() {
    this.src = LIVE_SRC;
    this.isLive = true;
    this.artist = 'Radio Roža';
    this.title = '';
    this.mixcloudShow = null;
  }

  setSource(src: string, artist: string, title: string) {
    this.src = src;
    this.isLive = false;
    this.artist = artist;
    this.title = title;
    this.mixcloudShow = null;
  }

  setMixcloud(show: MixcloudShow) {
    this.mixcloudShow = show;
    this.title = show.title;
    this.isLive = false;
    this.mixcloudPlayRequests += 1;
  }

  requestLivePlayback() {
    this.setLive();
    this.liveResumeRequests += 1;
  }
}

export const playerState = new PlayerState();
