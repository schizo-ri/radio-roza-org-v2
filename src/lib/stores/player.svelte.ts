const LIVE_SRC = 'https://radio.radio-roza.org/hls/radioroza/live.m3u8';

class PlayerState {
  src = $state(LIVE_SRC);
  isLive = $state(true);
  artist = $state('Radio Roža');
  title = $state('');

  setLive() {
    this.src = LIVE_SRC;
    this.isLive = true;
    this.artist = 'Radio Roža';
    this.title = '';
  }

  setSource(src: string, artist: string, title: string) {
    this.src = src;
    this.isLive = false;
    this.artist = artist;
    this.title = title;
  }
}

export const playerState = new PlayerState();
