const colors = ['#063c77', '#f19648', '#f5d259', '#d84f35']
let stage, manifest, loader, zombie_1;
let arrKeydown = [];
let keysAllowed = ['a', 's', 'd', 'w', 'f', 't', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Shift', 'Enter']
let tg1, tg2;
let targetSpeed = 3;

window.addEventListener('load', init)

function init() {
    let canvas = document.getElementById("demoCanvas");
    stage = new createjs.Stage(canvas);

    setGame();

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", () => {
        stage.update();
    });

    manifest = [
        { src: "man/Walk.png", id: "zombie_1_walk" },
        { src: "man/Idle.png", id: "zombie_1_idle" },
    ];

    loader = new createjs.LoadQueue(false);
    loader.addEventListener("complete", handleComplete);
    loader.loadManifest(manifest, true, "../wip/assets/");
}

function handleComplete() {
    createZombie()
}

function createTarget(x, y, color) {
    let container = new createjs.Container()
    let gr = new createjs.Graphics()
    let fireTarget = new createjs.Shape(gr)

    gr.setStrokeStyle(5);
    gr.beginStroke(color);
    gr.drawCircle(0, 0, 50);

    container.x = x;
    container.y = y;

    container.addChild(fireTarget);

    return container;
}

function setGame() {
    tg1 = createTarget(150, 200, 'red')
    tg2 = createTarget(300, 400, 'blue')

    stage.addChild(tg1, tg2);

    window.addEventListener('keydown', onKeydown)
    window.addEventListener('keyup', onKeyup)

    stage.on('tick', moveFireTarget)

    return stage;
}

function moveFireTarget() {
    if (arrKeydown.length === 0) return;
    arrKeydown.forEach((key) => {
        if (key === 'ArrowUp') tg1.y -= targetSpeed
        if (key === 'ArrowLeft') tg1.x -= targetSpeed
        if (key === 'ArrowRight') tg1.x += targetSpeed
        if (key === 'ArrowDown') tg1.y += targetSpeed

        if (key === 'w') tg2.y -= targetSpeed
        if (key === 'a') tg2.x -= targetSpeed
        if (key === 'd') tg2.x += targetSpeed
        if (key === 's') tg2.y += targetSpeed
    })
}

function onKeyup(e) {
    e.preventDefault();
    if (arrKeydown.includes(e.key)) {
        arrKeydown = arrKeydown.filter((item) => {
            return item !== e.key
        })
    }
}

function onKeydown(e) {
    e.preventDefault()
    if (keysAllowed.includes(e.key) && !arrKeydown.includes(e.key)) {
        arrKeydown.push(e.key);
    }
}

function createZombie() {
    let spriteSheet = new createjs.SpriteSheet({
        framerate: 60,
        "images": [loader.getResult("zombie_1_walk"), loader.getResult("zombie_1_idle")],
        "frames": { "regX": 48, "height": 96, "count": 8, "regY": 0, "width": 96 },
        // define two animations, run (loops, 1.5x speed) and jump (returns to run):
        "animations": {
            "walk": [0, 7, "walk", 0.1],
            "idle": [0, 7, "idle", 0.1],
        }
    });
    zombie_1 = new createjs.Sprite(spriteSheet, "idle");

    stage.addChild(zombie_1);
    zombie_1.x = 100
    zombie_1.y = 100
}

