/// <reference path="aZombie.ts"/>

class NormalZombie extends Zombie {
  constructor() {
    super(200, 0.25, 100);
  }

  draw(_x?: number, _y?: number, _size?: number): void {
    let size = _size ?? 1;
    // set x and y into middle of its cell if it is not spesefied
    let x = _x ?? this.x + (1 - size) * SCALE * 0.5;
    let y = _y ?? this.y + (1 - size) * SCALE * 0.5;

    size *= SCALE;
    x += 0.5 * size;
    y += 0.5 * size;

    fill("#999");
    stroke("#333");
    strokeWeight(0.1 * size);
    circle(x, y, 0.7 * size);
    arc(x, y, 0.7 * size, 0.7 * size, 0, 2 * PI * this.hp / this.maxHp, OPEN);
  }
}