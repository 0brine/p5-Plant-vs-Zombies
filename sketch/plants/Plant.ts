abstract class Plant {
  readonly dmg: number;
  readonly cost: number;

  constructor(cell?: Cell) {
    this.cell = cell;
  }

  action(): void { }
  destroy(): void { }
  draw(_x?: number, _y?: number, _size?: number): void { }

  cell: Cell;
}