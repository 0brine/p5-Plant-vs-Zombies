/// <reference path="aProjectile.ts"/>

class Pea extends Projectile {
  hitSound = sounds.splat;
  dmg = 20;

  constructor(x: number, y: number) {
    super(x, y);
  }

  draw(_x?: number, _y?: number, _size?: number) {
    let size = _size ?? 1;
    // set x and y into middle of its cell if it is not spesefied
    let x = _x ?? this.x;
    let y = _y ?? this.y;

    x += SCALE * 0.5 * size;
    y += SCALE * 0.5 * size;

    fill("#99ff00");
    stroke("#77dd00");
    strokeWeight(SCALE * 0.05 * size);
    circle(x, y, SCALE * 0.35 * size);
  }
}