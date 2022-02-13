/// <reference path="../aMyObject.ts"/>

abstract class Plant extends MyObject {
  readonly abstract cost: number;
  readonly abstract projectile: (new (x: number, y: number) => Projectile);
  health = 300;

  abstract fireRate: number;
  abstract countdown: number;

  abstract actionSound: SoundHelper;

  constructor(cell?: Cell) {
    super();
    this.cell = cell;
  }

  protected action() {
    objects.projectiles.push(new this.projectile(this.cell.x * SCALE, this.cell.y * SCALE));
    this.actionSound.play();
  }

  update() {
    if (this.isZombieInfront()) {
      if (this.countdown <= 0) {
        this.action();
        this.countdown += this.fireRate;
      }
      this.countdown -= deltaTime;
    } else {
      this.countdown = 0;
    }
  }

  getEaten(zombie: Zombie): void {
    this.health -= zombie.dmg;
    if (this.health <= 0) {
      this.destroy();
    }
  }

  destroy(): void {
    this.cell.plant = null;
  }

  protected isZombieInfront(...laneOffsets: number[]) {
    if (laneOffsets.length === 0) {
      laneOffsets.push(0);
    }
    return objects.zombies.filter((z) => laneOffsets.includes(z.lane - this.cell.y) && z.x > this.cell.x * SCALE).length > 0;
  }

  protected isZombieBehind(...laneOffsets: number[]) {
    if (laneOffsets.length === 0) {
      laneOffsets.push(0);
    }
    return objects.zombies.filter((z) => laneOffsets.includes(z.lane - this.cell.y) && z.x < this.cell.x * SCALE).length > 0;
  }

  abstract draw(_x?: number, _y?: number, _size?: number): void;

  cell: Cell;
}