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
