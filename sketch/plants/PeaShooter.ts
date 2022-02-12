/// <reference path="aPlant.ts"/>

class PeaShooter extends Plant {
  actionSound = sounds.throw;
  readonly cost = 100;
  readonly projectile: (new (x: number, y: number) => Projectile) = Pea;
  health = 4;
  fireRate = 1.5;
  countdown = 0;

  constructor(cell: Cell) {
    super(cell);
    if (cell == null) return;
  }

  draw(_x?: number, _y?: number, _size?: number) {
    let size = _size ?? 1;
    // set x and y into middle of its cell if it is not spesefied
    let x = _x ?? this.cell.x * SCALE + (1 - size) * SCALE * 0.5;
    let y = _y ?? this.cell.y * SCALE + (1 - size) * SCALE * 0.5;

    x += SCALE * 0.5 * size;
    y += SCALE * 0.5 * size;

    noFill();
    stroke("#99ff00");
    strokeWeight(SCALE * 0.1 * size);
    circle(x, y, SCALE * 0.7 * size);
  }
}