/// <reference path="plants/Plant.ts"/>
/// <reference path="sketch.ts"/>

class Cell {
  x: number;
  y: number;

  plant: Plant;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  build<T extends Plant>(plant: (new (cell: Cell) => T)) {
    if (this.plant != null) {
      return;
    }

    const plantInstance = new plant(null);

    if (plantInstance.cost <= game.money) {
      this.plant = new plant(this);
      game.money -= plantInstance.cost;
    }
  }
}