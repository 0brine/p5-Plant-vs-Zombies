/// <reference path="aPlant.ts"/>

class Sunflower extends Plant {
  constructor(cell: Cell) {
    super(cell, 50, null, null, 24, 7);
    if (cell == null) return;
  }

  update() {
    if (this.countdown <= 0) {
      this.action();
      this.countdown += this.fireRate;
    }

    this.countdown -= deltaTime;
  }

  action() {
    // spawn sun
    objects.clickables.push(new Sun(this.cell.x * SCALE + random(SCALE * 0.25), this.cell.y * SCALE + random(SCALE * 0.25)));
  }

  draw(_x?: number, _y?: number, _size?: number) {
    let size = _size ?? 1;
    // set x and y into middle of its cell if it is not spesefied
    let x = _x ?? this.cell.x * SCALE + (1 - size) * SCALE * 0.5;
    let y = _y ?? this.cell.y * SCALE + (1 - size) * SCALE * 0.5;

    x += SCALE * 0.5 * size;
    y += SCALE * 0.5 * size;

    noFill();
    stroke("#ffcc00");
    strokeWeight(SCALE * 0.1 * size);
    circle(x, y, SCALE * 0.7 * size);
  }
}