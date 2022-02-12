var Plant = (function () {
    function Plant(cell) {
        this.cell = cell;
    }
    Plant.prototype.action = function () {
        objects.projectiles.push(new this.projectile(this.cell.x * SCALE, this.cell.y * SCALE));
        this.actionSound.play();
    };
    Plant.prototype.update = function () {
        if (this.isZombieInfront()) {
            if (this.countdown <= 0) {
                this.action();
                this.countdown += this.fireRate;
            }
            this.countdown -= deltaTime;
        }
        else {
            this.countdown = 0;
        }
    };
    Plant.prototype.getEaten = function (zombie) {
        this.health -= zombie.dmg;
        if (this.health <= 0) {
            this.destroy();
        }
    };
    Plant.prototype.destroy = function () {
        this.cell.plant = null;
    };
    Plant.prototype.isZombieInfront = function () {
        var _this = this;
        return objects.zombies.filter(function (z) { return z.lane === _this.cell.y && z.x > _this.cell.x * SCALE; }).length > 0;
    };
    Plant.prototype.isZombieBehind = function () {
        var _this = this;
        return objects.zombies.filter(function (z) { return z.lane === _this.cell.y && z.x < _this.cell.x * SCALE; }).length > 0;
    };
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
        _this.actionSound = new SoundHelper();
        _this.fireRate = 24;
        _this.countdown = 7;
        _this.cost = 50;
        _this.projectile = null;
        _this.health = 4;
        if (cell == null)
            return _this;
        return _this;
    }
    ;
    Sunflower.prototype.update = function () {
        if (this.countdown <= 0) {
            this.action();
            this.countdown += this.fireRate;
        }
        this.countdown -= deltaTime;
    };
    Sunflower.prototype.action = function () {
        objects.clickables.push(new Sun(this.cell.x * SCALE + random(SCALE * 0.25), this.cell.y * SCALE + random(SCALE * 0.25)));
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
    return Sunflower;
}(Plant));
var PeaShooter = (function (_super) {
    __extends(PeaShooter, _super);
    function PeaShooter(cell) {
        var _this = _super.call(this, cell) || this;
        _this.actionSound = sounds.throw;
        _this.cost = 100;
        _this.projectile = Pea;
        _this.health = 4;
        _this.fireRate = 1.5;
        _this.countdown = 0;
        if (cell == null)
            return _this;
        return _this;
    }
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
    return PeaShooter;
}(Plant));
var SoundHelper = (function () {
    function SoundHelper() {
        var path = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            path[_i] = arguments[_i];
        }
        this.sounds = [];
        for (var _a = 0, path_1 = path; _a < path_1.length; _a++) {
            var p = path_1[_a];
            this.sounds.push(new p5.SoundFile(p));
        }
    }
    SoundHelper.prototype.play = function () {
        if (this.sounds.length <= 0)
            return;
        this.sounds[Math.floor(random(this.sounds.length))].play();
    };
    return SoundHelper;
}());
document.addEventListener('contextmenu', function (event) { return event.preventDefault(); });
var game = {
    sizeX: 9,
    sizeY: 5,
    SCALE: 80,
    grid: [],
    money: 600,
    oldTime: new Date().getTime(),
};
var objects = {
    clickables: [],
    projectiles: [],
    zombies: [],
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
var sounds = {
    collectSun: new SoundHelper("assets/CollectSun.ogg"),
    planted: new SoundHelper("assets/Planted.ogg"),
    splat: new SoundHelper("assets/Splat.ogg", "assets/Splat2.ogg", "assets/Splat3.ogg"),
    throw: new SoundHelper("assets/Throw.ogg", "assets/Throw2.ogg"),
};
var plantTypes = [Sunflower, PeaShooter];
var selectedPlant = Sunflower;
function preload() {
}
function setup() {
    console.log("started v1");
    Main.settings();
    Main.newField();
    objects.zombies.push(new NormalZombie());
}
var xx = 0;
function draw() {
    deltaTime /= 1000;
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
        for (var _i = 0, _a = objects.clickables; _i < _a.length; _i++) {
            var clickable = _a[_i];
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
        for (var y = 0; y < sizeY; y++) {
            grid[y] = [];
            for (var x = 0; x < sizeX; x++) {
                grid[y][x] = new Cell(x, y);
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
        Main.updatePlants();
        Main.updateObjects();
        Main.drawBackground();
        Main.drawPlants();
        Main.drawObjects();
        translate(0, UI.field.sizeY);
    };
    Main.updatePlants = function () {
        var _a;
        for (var _i = 0, grid_1 = grid; _i < grid_1.length; _i++) {
            var column = grid_1[_i];
            for (var _b = 0, column_1 = column; _b < column_1.length; _b++) {
                var cell = column_1[_b];
                (_a = cell.plant) === null || _a === void 0 ? void 0 : _a.update();
            }
        }
    };
    Main.updateObjects = function () {
        Main.updateClickables();
        Main.updateProjectiles();
        Main.updateZombies();
    };
    Main.updateClickables = function () {
        for (var _i = 0, _a = objects.clickables; _i < _a.length; _i++) {
            var clickable = _a[_i];
            clickable.update();
        }
    };
    Main.updateZombies = function () {
        for (var _i = 0, _a = objects.zombies; _i < _a.length; _i++) {
            var zombie = _a[_i];
            zombie.update();
        }
    };
    Main.updateProjectiles = function () {
        for (var _i = 0, _a = objects.projectiles; _i < _a.length; _i++) {
            var projectile = _a[_i];
            projectile.update();
        }
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
    Main.drawPlants = function () {
        var _a;
        for (var x = 0; x < sizeX; x++) {
            for (var y = 0; y < sizeY; y++) {
                (_a = game.grid[y][x].plant) === null || _a === void 0 ? void 0 : _a.draw();
            }
        }
    };
    Main.drawObjects = function () {
        Main.drawZombies();
        Main.drawProjectiles();
        Main.drawClickables();
    };
    Main.drawZombies = function () {
        for (var _i = 0, _a = objects.zombies; _i < _a.length; _i++) {
            var zombie = _a[_i];
            zombie.draw();
        }
    };
    Main.drawProjectiles = function () {
        for (var _i = 0, _a = objects.projectiles; _i < _a.length; _i++) {
            var projectile = _a[_i];
            projectile.draw();
        }
    };
    Main.drawClickables = function () {
        for (var _i = 0, _a = objects.clickables; _i < _a.length; _i++) {
            var clickable = _a[_i];
            clickable.draw();
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
            sounds.planted.play();
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
var Clickables = (function () {
    function Clickables(x, y) {
        this.despawnTimer = 10;
        this.size = 1;
        this.x = x;
        this.y = y;
    }
    Clickables.prototype.action = function () {
        this.customAction();
        this.collectingSound.play();
        this.destroy();
    };
    Clickables.prototype.update = function () {
        this.despawnTimer -= deltaTime;
        if (this.despawnTimer <= 0) {
            this.destroy();
        }
    };
    Clickables.prototype.destroy = function () {
        var _this = this;
        objects.clickables.forEach(function (s, i, a) {
            if (s === _this)
                a.splice(i, 1);
        });
        clearTimeout(this.timeout);
    };
    return Clickables;
}());
var Sun = (function (_super) {
    __extends(Sun, _super);
    function Sun(x, y) {
        var _this = _super.call(this, x, y) || this;
        _this.collectingSound = sounds.collectSun;
        return _this;
    }
    Sun.prototype.draw = function (_x, _y, _size) {
        var size = _size !== null && _size !== void 0 ? _size : this.size;
        var x = _x !== null && _x !== void 0 ? _x : this.x;
        var y = _y !== null && _y !== void 0 ? _y : this.y;
        x += SCALE * 0.5 * size;
        y += SCALE * 0.5 * size;
        fill("#ffff00");
        stroke("#ffcc00");
        strokeWeight(SCALE * 0.2 * size);
        circle(x, y, SCALE * 0.3 * size);
    };
    Sun.prototype.customAction = function () {
        game.money += 25;
    };
    return Sun;
}(Clickables));
var Projectile = (function () {
    function Projectile(x, y) {
        this.speed = 5;
        this.x = x;
        this.y = y;
    }
    Projectile.prototype.update = function () {
        var _this = this;
        var _a;
        this.x += this.speed * deltaTime * SCALE;
        if (this.x < -SCALE || this.x > width + SCALE) {
            this.destroy();
        }
        var z;
        if (z = (_a = objects.zombies.filter(function (z) { return z.y === _this.y && z.x < _this.x + SCALE * _this.speed / 10; })) === null || _a === void 0 ? void 0 : _a[0]) {
            this.action(z);
        }
    };
    Projectile.prototype.action = function (zombie) {
        zombie.getDmg(this);
        this.hitSound.play();
        this.destroy();
    };
    Projectile.prototype.destroy = function () {
        var _this = this;
        objects.projectiles.forEach(function (p, i, a) {
            if (p === _this)
                a.splice(i, 1);
        });
    };
    return Projectile;
}());
var Pea = (function (_super) {
    __extends(Pea, _super);
    function Pea(x, y) {
        var _this = _super.call(this, x, y) || this;
        _this.hitSound = sounds.splat;
        _this.dmg = 10;
        return _this;
    }
    Pea.prototype.draw = function (_x, _y, _size) {
        var size = _size !== null && _size !== void 0 ? _size : 1;
        var x = _x !== null && _x !== void 0 ? _x : this.x;
        var y = _y !== null && _y !== void 0 ? _y : this.y;
        x += SCALE * 0.5 * size;
        y += SCALE * 0.5 * size;
        fill("#99ff00");
        stroke("#77dd00");
        strokeWeight(SCALE * 0.05 * size);
        circle(x, y, SCALE * 0.35 * size);
    };
    return Pea;
}(Projectile));
var Zombie = (function () {
    function Zombie() {
        this.dmg = 1;
        this.speed = -0.25;
        this.x = width;
        this.lane = floor(random(game.sizeY));
    }
    Object.defineProperty(Zombie.prototype, "y", {
        get: function () {
            return this.lane * SCALE;
        },
        enumerable: true,
        configurable: true
    });
    Zombie.prototype.update = function () {
        var _this = this;
        var _a, _b;
        this.x += this.speed * deltaTime * SCALE;
        if (this.x < -SCALE) {
            console.log("lost");
            this.destroy();
        }
        var p;
        p = (_b = (_a = game.grid[this.lane].filter(function (c) { return c.plant != null && c.x * SCALE < _this.x && c.x * SCALE > _this.x - SCALE; })) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.plant;
        if (p != null) {
            this.action(p);
        }
    };
    Zombie.prototype.action = function (plant) {
        console.log("eat");
        plant.getEaten(this);
    };
    Zombie.prototype.getDmg = function (projectile) {
        this.hp -= projectile.dmg;
        if (this.hp <= 0) {
            this.destroy();
        }
    };
    Zombie.prototype.destroy = function () {
        var _this = this;
        objects.zombies.forEach(function (z, i, a) {
            if (z === _this)
                a.splice(i, 1);
        });
    };
    return Zombie;
}());
var NormalZombie = (function (_super) {
    __extends(NormalZombie, _super);
    function NormalZombie() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hp = 100;
        return _this;
    }
    NormalZombie.prototype.draw = function (_x, _y, _size) {
        var size = _size !== null && _size !== void 0 ? _size : 1;
        var x = _x !== null && _x !== void 0 ? _x : this.x + (1 - size) * SCALE * 0.5;
        var y = _y !== null && _y !== void 0 ? _y : this.y + (1 - size) * SCALE * 0.5;
        x += SCALE * 0.5 * size;
        y += SCALE * 0.5 * size;
        fill("#999");
        stroke("#333");
        strokeWeight(SCALE * 0.1 * size);
        circle(x, y, SCALE * 0.7 * size);
    };
    return NormalZombie;
}(Zombie));
//# sourceMappingURL=build.js.map