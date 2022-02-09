/// <reference path="Plant.ts"/>

class Sunflower extends Plant {
  readonly dmg = 0;
  readonly cost = 50;
  timeout: number;

  constructor(cell: Cell) {
    super(cell);
    if (cell == null) return;

    // spawn sun 7s after creation
    this.timeout = setTimeout(() => {
      this.action();
    }, random(7000, 7000));
  }

  action() {
    // spawn sun
    game.money += 25;

    // call this method agin after 24 seconds
    this.timeout = setTimeout(() => {
      this.action();
    }, 24000);
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

  destroy() {
    clearTimeout(this.timeout);
  }
}