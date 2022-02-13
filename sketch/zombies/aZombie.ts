abstract class Zombie extends MyObject {
  x: number;
  lane: number;
  dmg = 100;
  speed = -0.25;
  abstract hp: number;

  get y() {
    return this.lane * SCALE;
  }

  constructor() {
    super();
    this.x = width;
    this.lane = floor(random(game.sizeY));
  }

  update() {
    this.x += this.speed * deltaTime * SCALE;

    if (this.x < -SCALE) {
      console.log("lost");
      this.destroy();
    }

    // plant in reach to eat
    let p: Plant;
    p = game.grid[this.lane].filter((c) => c.plant != null && c.x * SCALE < this.x && c.x * SCALE > this.x - SCALE)?.[0]?.plant;

    if (p != null) {
      this.action(p);
    }
  }

  action(plant: Plant) {
    console.log("eat");
    plant.getEaten(this);
  }

  abstract draw(): void;

  getDmg(projectile: Projectile) {
    this.hp -= projectile.dmg;

    if (this.hp <= 0) {
      this.destroy();
    }
  }

  destroy() {
    // remove self from the array
    objects.zombies.forEach((z, i, a) => {
      if (z === this)
        a.splice(i, 1);
    });
  }
}