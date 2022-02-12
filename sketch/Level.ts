class Level {
  private zombieSpawns: [(new () => Zombie), number][];

  constructor(...zombieSpawns: [(new () => Zombie), number][]) {
    this.zombieSpawns = zombieSpawns;
  }

  update() {
    for (const z of this.zombieSpawns) {
      if (z[1] < 0)
        continue;

      z[1] -= deltaTime;
      if (z[1] < 0) {
        objects.zombies.push(new z[0]());
      }
    }
  }
}