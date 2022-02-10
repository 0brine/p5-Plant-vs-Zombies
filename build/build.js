var Plant = (function () {
    function Plant(cell) {
        this.cell = cell;
    }
    Plant.prototype.action = function () { };
    Plant.prototype.destroy = function () { };
    Plant.prototype.draw = function (_x, _y, _size) { };
    return Plant;
}());
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Sunflower = (function (_super) {
    __extends(Sunflower, _super);
    function Sunflower(cell) {
        var _this = _super.call(this, cell) || this;
        _this.dmg = 0;
        _this.cost = 50;
        if (cell == null)
            return _this;
        _this.timeout = setTimeout(function () {
            _this.action();
        }, random(7000, 7000));
        return _this;
    }
    Sunflower.prototype.action = function () {
        var _this = this;
        game.money += 25;
        this.timeout = setTimeout(function () {
            _this.action();
        }, 24000);
    };
    Sunflower.prototype.draw = function (_x, _y, _size) {
        var size = _size !== null && _size !== void 0 ? _size : 1;
        var x = _x !== null && _x !== void 0 ? _x : this.cell.x * SCALE + (1 - size) * SCALE * 0.5;
        var y = _y !== null && _y !== void 0 ? _y : this.cell.y * SCALE + (1 - size) * SCALE * 0.5;
        x += SCALE * 0.5 * size;
        y += SCALE * 0.5 * size;
        noFill();
        stroke("#ffcc00");
        strokeWeight(SCALE * 0.1 * size);
        circle(x, y, SCALE * 0.7 * size);
    };
    Sunflower.prototype.destroy = function () {
        clearTimeout(this.timeout);
    };
    return Sunflower;
}(Plant));
var PeaShooter = (function (_super) {
    __extends(PeaShooter, _super);
    function PeaShooter(cell) {
        var _this = _super.call(this, cell) || this;
        _this.dmg = 20;
        _this.cost = 100;
        if (cell == null)
            return _this;
        return _this;
    }
    PeaShooter.prototype.action = function () {
    };
    PeaShooter.prototype.draw = function (_x, _y, _size) {
        var size = _size !== null && _size !== void 0 ? _size : 1;
        var x = _x !== null && _x !== void 0 ? _x : this.cell.x * SCALE + (1 - size) * SCALE * 0.5;
        var y = _y !== null && _y !== void 0 ? _y : this.cell.y * SCALE + (1 - size) * SCALE * 0.5;
        x += SCALE * 0.5 * size;
        y += SCALE * 0.5 * size;
        noFill();
        stroke("#99ff00");
        strokeWeight(SCALE * 0.1 * size);
        circle(x, y, SCALE * 0.7 * size);
    };
    PeaShooter.prototype.destroy = function () {
    };
    return PeaShooter;
}(Plant));
document.addEventListener('contextmenu', function (event) { return event.preventDefault(); });
var game = {
    sizeX: 9,
    sizeY: 5,
    SCALE: 80,
    grid: [],
    money: 600,
};
var sizeX = game.sizeX, sizeY = game.sizeY, SCALE = game.SCALE, grid = game.grid;
var UI = {
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
};
var plantTypes = [Sunflower, PeaShooter];
var selectedPlant = Sunflower;
function setup() {
    console.log("started v1");
    Main.settings();
    Main.newField();
}
var xx = 0;
function draw() {
    background(UI.general.backgroundColor);
    Main.drawPlantBar();
    Main.drawField();
    Main.drawStatusBar();
}
function mouseClicked() {
    var x = mouseX;
    var y = mouseY;
    if (x < 0 || x > width || y < 0 || y > height) {
        return;
    }
    if (y < UI.plantBar.sizeY) {
        if (x < UI.plantBar.card.sizeX * plantTypes.length) {
            var plantIndex = floor(x / UI.plantBar.card.sizeX);
            selectedPlant = plantTypes[plantIndex];
            return;
        }
        return;
    }
    y -= UI.plantBar.sizeY;
    if (y < UI.field.sizeY) {
        x = floor(x / SCALE);
        y = floor(y / SCALE);
        game.grid[x][y].build(selectedPlant);
        return;
    }
    y -= UI.field.sizeY;
    if (y < UI.statusbar.sizeY) {
        return;
    }
    y -= UI.field.sizeY;
}
var Main = (function () {
    function Main() {
    }
    Main.settings = function () {
        textFont("Bradley Hand");
    };
    Main.newField = function () {
        for (var x = 0; x < sizeX; x++) {
            grid[x] = [];
            for (var y = 0; y < sizeY; y++) {
                grid[x][y] = new Cell(x, y);
            }
        }
        createCanvas(UI.field.sizeX, UI.plantBar.sizeY + UI.field.sizeY + UI.statusbar.sizeY);
    };
    Main.drawPlantBar = function () {
        strokeWeight(UI.plantBar.card.borderSize);
        stroke(UI.plantBar.card.borderColor);
        for (var i = 0; i < plantTypes.length; i++) {
            fill(UI.plantBar.card.backgroundColor);
            if (plantTypes[i] == selectedPlant) {
                fill(UI.plantBar.card.backgroundColorSelected);
            }
            rect(i * UI.plantBar.card.sizeX, 0, UI.plantBar.card.sizeX, UI.plantBar.card.sizeY);
        }
        for (var i = 0; i < plantTypes.length; i++) {
            var pt = plantTypes[i];
            var p = new pt(null);
            p.draw(i * UI.plantBar.card.sizeX, 0, 2);
            textAlign(CENTER, TOP);
            textSize(SCALE * 0.5);
            fill("#fff");
            stroke("#000");
            strokeWeight(SCALE * 0.05);
            text("$ " + p.cost, i * UI.plantBar.card.sizeX + UI.plantBar.card.textOffsetX, UI.plantBar.card.textOffsetY);
        }
        translate(0, UI.plantBar.sizeY);
    };
    Main.drawField = function () {
        Main.drawBackground();
        Main.drawTurrets();
        translate(0, UI.field.sizeY);
    };
    Main.drawBackground = function () {
        for (var x = 0; x < sizeX; x++) {
            for (var y = 0; y < sizeY; y++) {
                if (x % 2 === y % 2) {
                    fill(UI.field.darkGrass);
                }
                else {
                    fill(UI.field.lightGrass);
                }
                noStroke();
                rect(x * SCALE, y * SCALE, SCALE, SCALE);
            }
        }
    };
    Main.drawTurrets = function () {
        var _a;
        for (var x = 0; x < sizeX; x++) {
            for (var y = 0; y < sizeY; y++) {
                (_a = game.grid[x][y].plant) === null || _a === void 0 ? void 0 : _a.draw();
            }
        }
    };
    Main.drawStatusBar = function () {
        noStroke();
        textAlign(LEFT, TOP);
        textSize(UI.statusbar.textSize);
        fill("#ffffff");
        text("$ " + game.money, UI.statusbar.textOffsetX, UI.statusbar.textOffsetY);
        translate(0, UI.statusbar.sizeY);
    };
    return Main;
}());
var Cell = (function () {
    function Cell(x, y) {
        this.x = x;
        this.y = y;
    }
    Cell.prototype.build = function (plant) {
        if (this.plant != null) {
            return;
        }
        var plantInstance = new plant(null);
        if (plantInstance.cost <= game.money) {
            this.plant = new plant(this);
            game.money -= plantInstance.cost;
        }
    };
    return Cell;
}());
var Game = (function () {
    function Game() {
    }
    return Game;
}());
//# sourceMappingURL=build.js.map