class MyObject {
}
class Plant extends MyObject {
    constructor(cell, cost, projectile, actionSound, fireRate, countDown = 0, health = 300) {
        super();
        this.cell = cell;
        this.cost = cost;
        this.projectile = projectile;
        this.actionSound = actionSound;
        this.fireRate = fireRate;
        this.countdown = countDown;
        this.health = health;
    }
    action() {
        objects.projectiles.push(new this.projectile(this.cell.x * SCALE, this.cell.y * SCALE));
        this.actionSound.play();
    }
    update() {
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
    }
    getEaten(zombie) {
        this.health -= zombie.dmg;
        if (this.health <= 0) {
            this.destroy();
        }
    }
    destroy() {
        this.cell.plant = null;
    }
    isZombieInfront(...laneOffsets) {
        if (laneOffsets.length === 0) {
            laneOffsets.push(0);
        }
        return objects.zombies.filter((z) => laneOffsets.includes(z.lane - this.cell.y) && z.x > this.cell.x * SCALE).length > 0;
    }
    isZombieBehind(...laneOffsets) {
        if (laneOffsets.length === 0) {
            laneOffsets.push(0);
        }
        return objects.zombies.filter((z) => laneOffsets.includes(z.lane - this.cell.y) && z.x < this.cell.x * SCALE).length > 0;
    }
}
class Sunflower extends Plant {
    constructor(cell) {
        super(cell);
        this.actionSound = new SoundHelper();
        this.fireRate = 24;
        this.countdown = 7;
        this.cost = 50;
        this.projectile = null;
        if (cell == null)
            return;
    }
    ;
    update() {
        if (this.countdown <= 0) {
            this.action();
            this.countdown += this.fireRate;
        }
        this.countdown -= deltaTime;
    }
    action() {
        objects.clickables.push(new Sun(this.cell.x * SCALE + random(SCALE * 0.25), this.cell.y * SCALE + random(SCALE * 0.25)));
    }
    draw(_x, _y, _size) {
        let size = _size !== null && _size !== void 0 ? _size : 1;
        let x = _x !== null && _x !== void 0 ? _x : this.cell.x * SCALE + (1 - size) * SCALE * 0.5;
        let y = _y !== null && _y !== void 0 ? _y : this.cell.y * SCALE + (1 - size) * SCALE * 0.5;
        x += SCALE * 0.5 * size;
        y += SCALE * 0.5 * size;
        noFill();
        stroke("#ffcc00");
        strokeWeight(SCALE * 0.1 * size);
        circle(x, y, SCALE * 0.7 * size);
    }
}
class Peashooter extends Plant {
    constructor(cell) {
        super(cell, 100, Pea, sounds.throw, 1.5);
        if (cell == null)
            return;
    }
    draw(_x, _y, _size) {
        let size = _size !== null && _size !== void 0 ? _size : 1;
        let x = _x !== null && _x !== void 0 ? _x : this.cell.x * SCALE + (1 - size) * SCALE * 0.5;
        let y = _y !== null && _y !== void 0 ? _y : this.cell.y * SCALE + (1 - size) * SCALE * 0.5;
        x += SCALE * 0.5 * size;
        y += SCALE * 0.5 * size;
        noFill();
        stroke("#99ff00");
        strokeWeight(SCALE * 0.1 * size);
        circle(x, y, SCALE * 0.7 * size);
    }
}
class Repeater extends Plant {
    constructor(cell) {
        super(cell, 200, Pea, sounds.throw, 1.5);
        if (cell == null)
            return;
    }
    action() {
        objects.projectiles.push(new this.projectile(this.cell.x * SCALE, this.cell.y * SCALE));
        objects.projectiles.push(new this.projectile(this.cell.x * SCALE + SCALE * 0.5, this.cell.y * SCALE));
        this.actionSound.play();
    }
    draw(_x, _y, _size) {
        let size = _size !== null && _size !== void 0 ? _size : 1;
        let x = _x !== null && _x !== void 0 ? _x : this.cell.x * SCALE + (1 - size) * SCALE * 0.5;
        let y = _y !== null && _y !== void 0 ? _y : this.cell.y * SCALE + (1 - size) * SCALE * 0.5;
        size *= SCALE;
        x += 0.5 * size;
        y += 0.5 * size;
        noFill();
        stroke("#99ff00");
        strokeWeight(0.1 * size);
        circle(x, y, 0.7 * size);
        triangle(x - size * 0.25, y - size * 0.25, x - size * 0.3, y - size * 0.275, x - size * 0.275, y - size * 0.3);
    }
}
class Threepeater extends Plant {
    constructor(cell) {
        super(cell, 325, Pea, sounds.throw, 1.5);
        if (cell == null)
            return;
    }
    action() {
        objects.projectiles.push(new this.projectile(this.cell.x * SCALE, (this.cell.y - 1) * SCALE));
        objects.projectiles.push(new this.projectile(this.cell.x * SCALE, this.cell.y * SCALE));
        objects.projectiles.push(new this.projectile(this.cell.x * SCALE, (this.cell.y + 1) * SCALE));
        this.actionSound.play();
    }
    update() {
        if (this.isZombieInfront(-1, 0, 1)) {
            if (this.countdown <= 0) {
                this.action();
                this.countdown += this.fireRate;
            }
            this.countdown -= deltaTime;
        }
        else {
            this.countdown = 0;
        }
    }
    draw(_x, _y, _size) {
        let size = _size !== null && _size !== void 0 ? _size : 1;
        let x = _x !== null && _x !== void 0 ? _x : this.cell.x * SCALE + (1 - size) * SCALE * 0.5;
        let y = _y !== null && _y !== void 0 ? _y : this.cell.y * SCALE + (1 - size) * SCALE * 0.5;
        size *= SCALE;
        x += 0.5 * size;
        y += 0.5 * size;
        noFill();
        stroke("#99ff00");
        strokeWeight(0.1 * size);
        circle(x, y, 0.7 * size);
        triangle(x - size * 0.25, y - size * 0.25, x - size * 0.3, y - size * 0.275, x - size * 0.275, y - size * 0.3);
        triangle(x - size * 0.25, y + size * 0.25, x - size * 0.3, y + size * 0.275, x - size * 0.275, y + size * 0.3);
        triangle(x - size * 0.3, y, x - size * 0.4, y + size * 0.05, x - size * 0.4, y - size * 0.05);
    }
}
class Zombie extends MyObject {
    constructor(maxHp, speed = 0.25, dmg = 100) {
        super();
        this.maxHp = maxHp;
        this.hp = this.maxHp;
        this.speed = -speed;
        this.dmg = dmg;
        this.x = width;
        this.lane = floor(random(game.sizeY));
    }
    get y() {
        return this.lane * SCALE;
    }
    update() {
        var _a, _b;
        this.x += this.speed * deltaTime * SCALE;
        if (this.x < -SCALE) {
            console.log("lost");
            this.destroy();
        }
        let p;
        p = (_b = (_a = game.grid[this.lane].filter((c) => c.plant != null && c.x * SCALE < this.x && c.x * SCALE > this.x - SCALE)) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.plant;
        if (p != null) {
            this.action(p);
        }
    }
    action(plant) {
        console.log("eat");
        plant.getEaten(this);
    }
    getDmg(projectile) {
        this.hp -= projectile.dmg;
        if (this.hp <= 0) {
            this.destroy();
        }
    }
    destroy() {
        Main.afterUpdateFunctions.push(() => {
            objects.zombies.forEach((z, i, a) => {
                if (z === this)
                    a.splice(i, 1);
            });
        });
    }
}
class NormalZombie extends Zombie {
    constructor() {
        super(200, 0.25, 100);
    }
    draw(_x, _y, _size) {
        let size = _size !== null && _size !== void 0 ? _size : 1;
        let x = _x !== null && _x !== void 0 ? _x : this.x + (1 - size) * SCALE * 0.5;
        let y = _y !== null && _y !== void 0 ? _y : this.y + (1 - size) * SCALE * 0.5;
        size *= SCALE;
        x += 0.5 * size;
        y += 0.5 * size;
        fill("#999");
        stroke("#333");
        strokeWeight(0.1 * size);
        circle(x, y, 0.7 * size);
        arc(x, y, 0.7 * size, 0.7 * size, 0, 2 * PI * this.hp / this.maxHp, OPEN);
    }
}
class Level {
    constructor(...zombieSpawns) {
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
class SoundHelper {
    constructor(...path) {
        this.sounds = [];
        for (const p of path) {
            this.sounds.push(new p5.SoundFile(p));
        }
    }
    play() {
        if (this.sounds.length <= 0)
            return;
        let s = this.sounds[Math.floor(random(this.sounds.length))];
        s.setVolume(sounds.volume);
        s.play();
    }
}
document.addEventListener('contextmenu', event => event.preventDefault());
const game = {
    sizeX: 9,
    sizeY: 5,
    SCALE: 80,
    grid: [],
    money: 700,
    oldTime: new Date().getTime(),
};
const objects = {
    clickables: [],
    projectiles: [],
    zombies: [],
};
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
};
const sounds = {
    volume: 0.25,
    collectSun: new SoundHelper("assets/CollectSun.ogg"),
    planted: new SoundHelper("assets/Planted.ogg"),
    splat: new SoundHelper("assets/Splat.ogg", "assets/Splat2.ogg", "assets/Splat3.ogg"),
    throw: new SoundHelper("assets/Throw.ogg", "assets/Throw2.ogg"),
};
const levels = [
    new Level([NormalZombie, 0], [NormalZombie, 60], [NormalZombie, 70], [NormalZombie, 80], [NormalZombie, 90], [NormalZombie, 90], [NormalZombie, 120], [NormalZombie, 120], [NormalZombie, 120]),
];
const plantTypes = [Sunflower, Peashooter, Repeater, Threepeater];
let selectedPlant = Sunflower;
function preload() {
}
function setup() {
    console.log("started v1");
    Main.settings();
    Main.newField();
}
let xx = 0;
function draw() {
    Main.update();
    background(UI.general.backgroundColor);
    Main.drawPlantBar();
    Main.drawField();
    Main.drawStatusBar();
}
function mouseClicked() {
    let x = mouseX;
    let y = mouseY;
    if (x < 0 || x > width || y < 0 || y > height) {
        return;
    }
    if (y < UI.plantBar.sizeY) {
        if (x < UI.plantBar.card.sizeX * plantTypes.length) {
            let plantIndex = floor(x / UI.plantBar.card.sizeX);
            selectedPlant = plantTypes[plantIndex];
            return;
        }
        return;
    }
    y -= UI.plantBar.sizeY;
    if (y < UI.field.sizeY) {
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
    if (y < UI.statusbar.sizeY) {
        return;
    }
    y -= UI.field.sizeY;
}
class Main {
    static update() {
        deltaTime /= 1000;
        if (deltaTime > 1)
            deltaTime = 0;
        Main.updateZombieSpwans();
        Main.updatePlants();
        Main.updateObjects();
        while (Main.afterUpdateFunctions.length > 0) {
            Main.afterUpdateFunctions.shift()();
        }
    }
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
            rect(i * UI.plantBar.card.sizeX, 0, UI.plantBar.card.sizeX, UI.plantBar.card.sizeY);
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
        Main.drawPlants();
        Main.drawObjects();
        translate(0, UI.field.sizeY);
    }
    static updateZombieSpwans() {
        levels[0].update();
    }
    static updatePlants() {
        var _a;
        for (const column of grid) {
            for (const cell of column) {
                (_a = cell.plant) === null || _a === void 0 ? void 0 : _a.update();
            }
        }
    }
    static updateObjects() {
        Main.updateClickables();
        Main.updateProjectiles();
        Main.updateZombies();
    }
    static updateClickables() {
        const clickables = objects.clickables;
        for (const clickable of clickables) {
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
                }
                else {
                    fill(UI.field.lightGrass);
                }
                noStroke();
                rect(x * SCALE, y * SCALE, SCALE, SCALE);
            }
        }
    }
    static drawPlants() {
        var _a;
        for (let x = 0; x < sizeX; x++) {
            for (let y = 0; y < sizeY; y++) {
                (_a = game.grid[y][x].plant) === null || _a === void 0 ? void 0 : _a.draw();
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
Main.afterUpdateFunctions = [];
class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    build(plant) {
        if (this.plant != null) {
            return;
        }
        const plantInstance = new plant(null);
        if (plantInstance.cost <= game.money) {
            sounds.planted.play();
            this.plant = new plant(this);
            game.money -= plantInstance.cost;
        }
    }
}
class Clickables extends MyObject {
    constructor(x, y) {
        super();
        this.despawnTimer = 10;
        this.size = 1;
        this.x = x;
        this.y = y;
    }
    action() {
        this.customAction();
        this.collectingSound.play();
        this.destroy();
    }
    update() {
        this.despawnTimer -= deltaTime;
        if (this.despawnTimer <= 0) {
            this.destroy();
        }
    }
    destroy() {
        Main.afterUpdateFunctions.push(() => {
            objects.clickables.forEach((s, i, a) => {
                if (s === this)
                    a.splice(i, 1);
            });
        });
        clearTimeout(this.timeout);
    }
}
class Sun extends Clickables {
    constructor(x, y) {
        super(x, y);
        this.collectingSound = sounds.collectSun;
    }
    draw(_x, _y, _size) {
        let size = _size !== null && _size !== void 0 ? _size : this.size;
        let x = _x !== null && _x !== void 0 ? _x : this.x;
        let y = _y !== null && _y !== void 0 ? _y : this.y;
        x += SCALE * 0.5 * size;
        y += SCALE * 0.5 * size;
        fill("#ffff00");
        stroke("#ffcc00");
        strokeWeight(SCALE * 0.2 * size);
        circle(x, y, SCALE * 0.3 * size);
    }
    customAction() {
        game.money += 25;
    }
}
class Projectile extends MyObject {
    constructor(x, y) {
        super();
        this.speed = 5;
        this.x = x;
        this.y = y;
    }
    update() {
        var _a;
        this.x += this.speed * deltaTime * SCALE;
        if (this.x < -SCALE || this.x > width + SCALE) {
            this.destroy();
        }
        let zombie;
        if (zombie = (_a = objects.zombies.filter((z) => z.y === this.y && z.x > this.x && z.x < this.x + SCALE * this.speed / 10)) === null || _a === void 0 ? void 0 : _a[0]) {
            this.action(zombie);
        }
    }
    action(zombie) {
        zombie.getDmg(this);
        this.hitSound.play();
        this.destroy();
    }
    destroy() {
        Main.afterUpdateFunctions.push(() => {
            objects.projectiles.forEach((p, i, a) => {
                if (p === this)
                    a.splice(i, 1);
            });
        });
    }
}
class Pea extends Projectile {
    constructor(x, y) {
        super(x, y);
        this.hitSound = sounds.splat;
        this.dmg = 20;
    }
    draw(_x, _y, _size) {
        let size = _size !== null && _size !== void 0 ? _size : 1;
        let x = _x !== null && _x !== void 0 ? _x : this.x;
        let y = _y !== null && _y !== void 0 ? _y : this.y;
        x += SCALE * 0.5 * size;
        y += SCALE * 0.5 * size;
        fill("#99ff00");
        stroke("#77dd00");
        strokeWeight(SCALE * 0.05 * size);
        circle(x, y, SCALE * 0.35 * size);
    }
}
//# sourceMappingURL=build.js.map