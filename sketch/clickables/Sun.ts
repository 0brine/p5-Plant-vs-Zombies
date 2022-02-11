class Sun {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  draw(_x?: number, _y?: number, _size?: number) {
    let size = _size ?? 1;
    // set x and y into middle of its cell if it is not spesefied
    let x = _x ?? this.x;
    let y = _y ?? this.y

    x += SCALE * 0.5 * size;
    y += SCALE * 0.5 * size;

    fill("#ffff00");
    stroke("#ffcc00");
    strokeWeight(SCALE * 0.1 * size);
    circle(x, y, SCALE * 0.7 * size);
  }

  action() {
    game.money += 25;

    // remove self from the array
    objects.suns.forEach((s, i, a) => {
      if (s == this)
        a.splice(i, 1);
    });
  }
}