class SoundHelper {
  sounds: p5.SoundFile[] = [];

  constructor(...path: string[]) {
    for (const p of path) {
      this.sounds.push(new p5.SoundFile(p));
    }
  }

  play() {
    if (this.sounds.length <= 0)
      return;

    let s = this.sounds[Math.floor(random(this.sounds.length))];
    s.setVolume(sounds.volume);
    s.play();
  }
}