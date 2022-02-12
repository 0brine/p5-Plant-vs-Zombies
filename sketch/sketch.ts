/// <reference path="plants/Sunflower.ts"/>
/// <reference path="plants/PeaShooter.ts"/>
/// <reference path="SoundHelper.ts"/>

document.addEventListener('contextmenu', event => event.preventDefault());

const game = {
  sizeX: 9,
  sizeY: 5,
  SCALE: 80,
  grid: [] as Cell[][],
  money: 600,
  oldTime: new Date().getTime(),
}

const objects = {
  clickables: [] as Clickables[],
  projectiles: [] as Projectile[],
  zombies: [] as Zombie[],
}

const { sizeX, sizeY, SCALE, grid } = game;

const UI = {
  general: {
    backgroundColor: "#4a752c",
  },
  plantBar: {
    sizeY: 2 * SCALE,
    card: {
      sizeX: 2 * SCALE,
      sizeY: 2 * SCALE,
      borderColor: "#000",
      borderSize: 0.1 * SCALE,
      backgroundColor: "#92b872",
      backgroundColorSelected: "#b7d695",
      textOffsetX: SCALE,
      textOffsetY: SCALE * 1.5,
    },
  },
  field: {
    sizeX: game.sizeX * SCALE,
    sizeY: game.sizeY * SCALE,
    darkGrass: "#a2d149",
    lightGrass: "#aad751",
  },
  statusbar: {
    sizeY: 2 * SCALE,
    textOffsetX: 0.25 * SCALE,
    textOffsetY: 0.25 * SCALE,
    textSize: 0.5 * SCALE,
  },
}

const sounds = {
  collectSun: new SoundHelper("assets/CollectSun.ogg"),
  planted: new SoundHelper("assets/Planted.ogg"),
  splat: new SoundHelper("assets/Splat.ogg", "assets/Splat2.ogg", "assets/Splat3.ogg"),
  throw: new SoundHelper("assets/Throw.ogg", "assets/Throw2.ogg"),
}

const plantTypes: (new (cell: Cell) => Plant)[] = [Sunflower, PeaShooter];
let selectedPlant: (new (cell: Cell) => Plant) = Sunflower;

function preload() {
}

function setup() {
  console.log("started v1");

  Main.settings();
  Main.newField();

  objects.zombies.push(new NormalZombie());
}

let xx = 0;

function draw() {
  deltaTime /= 1000;
  background(UI.general.backgroundColor);

  Main.drawPlantBar();
  Main.drawField();
  Main.drawStatusBar();
}

function mouseClicked() {
  let x = mouseX;
  let y = mouseY;

  // is mouse in canves
  if (x < 0 || x > width || y < 0 || y > height) {
    return;
  }

  // is mouse over plantBar
  if (y < UI.plantBar.sizeY) {
    if (x < UI.plantBar.card.sizeX * plantTypes.length) {
      let plantIndex = floor(x / UI.plantBar.card.sizeX);
      selectedPlant = plantTypes[plantIndex];
      return
    }
    return;
  }
  y -= UI.plantBar.sizeY;

  // is mouse over field
  if (y < UI.field.sizeY) {
    //mouse over clickable
    for (const clickable of objects.clickables) {
      if (x > clickable.x && x < clickable.x + SCALE * clickable.size && y > clickable.y && y < clickable.y + SCALE * clickable.size) {
        clickable.action();
        return;
      }
    }

    x = floor(x / SCALE);
    y = floor(y / SCALE);

    game.grid[y][x].build(selectedPlant);
    return;
  }
  y -= UI.field.sizeY;

  // is mouse over statusBar
  if (y < UI.statusbar.sizeY) {
    return;
  }
  y -= UI.field.sizeY;
}

class Main {
  static settings() {
    textFont("Bradley Hand");
  }

  static newField() {
    for (let y = 0; y < sizeY; y++) {
      grid[y] = [];
      for (let x = 0; x < sizeX; x++) {
        grid[y][x] = new Cell(x, y);
      }
    }

    createCanvas(UI.field.sizeX, UI.plantBar.sizeY + UI.field.sizeY + UI.statusbar.sizeY);
  }

  static drawPlantBar() {
    strokeWeight(UI.plantBar.card.borderSize);
    stroke(UI.plantBar.card.borderColor);

    for (let i = 0; i < plantTypes.length; i++) {
      fill(UI.plantBar.card.backgroundColor);
      if (plantTypes[i] == selectedPlant) {
        fill(UI.plantBar.card.backgroundColorSelected);
      }
      rect(i * UI.plantBar.card.sizeX, 0, UI.plantBar.card.sizeX, UI.plantBar.card.sizeY)
    }

    for (let i = 0; i < plantTypes.length; i++) {
      let pt = plantTypes[i];
      let p = new pt(null);

      p.draw(i * UI.plantBar.card.sizeX, 0, 2);

      textAlign(CENTER, TOP);
      textSize(SCALE * 0.5);
      fill("#fff");
      stroke("#000");
      strokeWeight(SCALE * 0.05);
      text(`$ ${p.cost}`, i * UI.plantBar.card.sizeX + UI.plantBar.card.textOffsetX, UI.plantBar.card.textOffsetY);
    }
    translate(0, UI.plantBar.sizeY);
  }

  static drawField() {
    Main.updatePlants();
    Main.updateObjects();

    Main.drawBackground();

    Main.drawPlants();
    Main.drawObjects();

    translate(0, UI.field.sizeY);
  }
  static updatePlants() {
    for (const column of grid) {
      for (const cell of column) {
        cell.plant?.update();
      }
    }
  }

  static updateObjects() {
    Main.updateClickables();
    Main.updateProjectiles();
    Main.updateZombies();
  }

  static updateClickables() {
    for (const clickable of objects.clickables) {
      clickable.update();
    }
  }

  static updateZombies() {
    for (const zombie of objects.zombies) {
      zombie.update();
    }
  }

  static updateProjectiles() {
    for (const projectile of objects.projectiles) {
      projectile.update();
    }
  }

  static drawBackground() {
    for (let x = 0; x < sizeX; x++) {
      for (let y = 0; y < sizeY; y++) {
        if (x % 2 === y % 2) {
          fill(UI.field.darkGrass);
        } else {
          fill(UI.field.lightGrass);
        }
        noStroke();
        rect(x * SCALE, y * SCALE, SCALE, SCALE);
      }
    }
  }

  static drawPlants() {
    for (let x = 0; x < sizeX; x++) {
      for (let y = 0; y < sizeY; y++) {
        game.grid[y][x].plant?.draw();
      }
    }
  }

  static drawObjects() {
    Main.drawZombies();
    Main.drawProjectiles();
    Main.drawClickables();
  }

  static drawZombies() {
    for (const zombie of objects.zombies) {
      zombie.draw();
    }
  }

  static drawProjectiles() {
    for (const projectile of objects.projectiles) {
      projectile.draw();
    }
  }

  static drawClickables() {
    for (const clickable of objects.clickables) {
      clickable.draw();
    }
  }

  static drawStatusBar() {

    noStroke();
    textAlign(LEFT, TOP);
    textSize(UI.statusbar.textSize);
    fill("#ffffff");

    text(`$ ${game.money}`, UI.statusbar.textOffsetX, UI.statusbar.textOffsetY);

    translate(0, UI.statusbar.sizeY);
  }
}