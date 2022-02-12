abstract class Projectile {
  x: number;
  y: number;
  abstract dmg: number;
  abstract hitSound: SoundHelper;
  speed = 5;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  update() {
    this.x += this.speed * deltaTime * SCALE;

    if (this.x < -SCALE || this.x > width + SCALE) {
      this.destroy();
    }

    let z: Zombie;
    if (z = objects.zombies.filter((z) => z.y === this.y && z.x < this.x + SCALE * this.speed / 10)?.[0]) {
      this.action(z);
    }
  }

  abstract draw(_x?: number, _y?: number, _size?: number): void;

  action(zombie: Zombie) {
    zombie.getDmg(this);
    this.hitSound.play();
    this.destroy();
  }

  destroy(): void {
    // remove self from the array
    objects.projectiles.forEach((p, i, a) => {
      if (p === this)
        a.splice(i, 1);
    });
  }
}