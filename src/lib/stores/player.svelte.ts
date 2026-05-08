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
  }

  closeMixcloud() {
    this.mixcloudShow = null;
    this.setLive();
  }
}

export const playerState = new PlayerState();
