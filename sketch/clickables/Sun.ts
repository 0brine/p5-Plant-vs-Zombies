/// <reference path="aClickables.ts"/>

class Sun extends Clickables {
  constructor(x: number, y: number) {
    super(x, y);
  }

  draw(_x?: number, _y?: number, _size?: number) {
    let size = _size ?? this.size;
    // set x and y into middle of its cell if it is not spesefied
    let x = _x ?? this.x;
    let y = _y ?? this.y;

    x += SCALE * 0.5 * size;
    y += SCALE * 0.5 * size;

    fill("#ffff00");
    stroke("#ffcc00");
    strokeWeight(SCALE * 0.2 * size);
    circle(x, y, SCALE * 0.3 * size);
  }

  action() {
    game.money += 25;
    this.destroy();
  }
}