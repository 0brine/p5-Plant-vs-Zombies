/// <reference path="plants/Sunflower.ts"/>
/// <reference path="plants/PeaShooter.ts"/>
document.addEventListener('contextmenu', event => event.preventDefault());

const game = {
  sizeX: 9,
  sizeY: 5,
  SCALE: 80,
  grid: [] as Cell[][],
  money: 600,
}

const objects = {
  suns: [] as Sun[],
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

const plantTypes: (new (cell: Cell) => Plant)[] = [Sunflower, PeaShooter];
let selectedPlant: (new (cell: Cell) => Plant) = Sunflower;

function setup() {
  console.log("started v1");
  Main.settings();
  Main.newField();
}

let xx = 0;

function draw() {
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
    //mouse over sun
    for (const sun of objects.suns) {
      if (x > sun.x && x < sun.x + SCALE && y > sun.y && y < sun.y + SCALE) {
        sun.action();
        return;
      }
    }


    x = floor(x / SCALE);
    y = floor(y / SCALE);

    game.grid[x][y].build(selectedPlant);
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
    for (let x = 0; x < sizeX; x++) {
      grid[x] = [];
      for (let y = 0; y < sizeY; y++) {
        grid[x][y] = new Cell(x, y);
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
    Main.drawBackground();
    Main.drawTurrets();
    Main.drawSuns();

    translate(0, UI.field.sizeY);
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

  static drawTurrets() {
    for (let x = 0; x < sizeX; x++) {
      for (let y = 0; y < sizeY; y++) {
        game.grid[x][y].plant?.draw();
      }
    }
  }

  static drawSuns() {
    for (const sun of objects.suns) {
      sun.draw();
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