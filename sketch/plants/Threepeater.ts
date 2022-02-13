/// <reference path="aPlant.ts"/>

class Threepeater extends Plant {
  actionSound = sounds.throw;
  readonly cost = 325;
  readonly projectile: (new (x: number, y: number) => Projectile) = Pea;
  fireRate = 1.5;
  countdown = 0;

  constructor(cell: Cell) {
    super(cell);
    if (cell == null) return;
  }

  protected action() {
    objects.projectiles.push(new this.projectile(this.cell.x * SCALE, (this.cell.y - 1) * SCALE));
    objects.projectiles.push(new this.projectile(this.cell.x * SCALE, this.cell.y * SCALE));
    objects.projectiles.push(new this.projectile(this.cell.x * SCALE, (this.cell.y + 1) * SCALE));
    this.actionSound.play();
  }

  update() {
    if (this.isZombieInfront(-1, 0, 1)) {
      if (this.countdown <= 0) {
        this.action();
        this.countdown += this.fireRate;
      }
      this.countdown -= deltaTime;
    } else {
      this.countdown = 0;
    }
  }

  draw(_x?: number, _y?: number, _size?: number) {
    let size = _size ?? 1;
    // set x and y into middle of its cell if it is not spesefied
    let x = _x ?? this.cell.x * SCALE + (1 - size) * SCALE * 0.5;
    let y = _y ?? this.cell.y * SCALE + (1 - size) * SCALE * 0.5;

    size *= SCALE;
    x += 0.5 * size;
    y += 0.5 * size;

    noFill();
    stroke("#99ff00");
    strokeWeight(0.1 * size);
    circle(x, y, 0.7 * size);
    triangle(x - size * 0.25, y - size * 0.25, x - size * 0.3, y - size * 0.275, x - size * 0.275, y - size * 0.3);
    triangle(x - size * 0.25, y + size * 0.25, x - size * 0.3, y + size * 0.275, x - size * 0.275, y + size * 0.3);
    triangle(x - size * 0.3, y, x - size * 0.4, y + size * 0.05, x - size * 0.4, y - size * 0.05);
  }
}