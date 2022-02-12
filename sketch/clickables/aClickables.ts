abstract class Clickables {
  x: number;
  y: number;
  timeout: number;
  despawnTimer = 10;
  size = 1;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  abstract action(): void;

  update() {
    this.despawnTimer -= deltaTime;

    if (this.despawnTimer <= 0) {
      this.destroy();
    }
  }

  destroy(): void {
    // remove self from the array
    objects.clickables.forEach((s, i, a) => {
      if (s === this)
        a.splice(i, 1);
    });

    clearTimeout(this.timeout);
  }

  abstract draw(_x?: number, _y?: number, _size?: number): void;
}