import { getRandomIntInclusive } from './utils.js'

const colors = ['rgb(245,210,89)', 'rgb(241,150,72)'];
let gameSpeed = 8;
let sideRatio = 1 / 6;
let windowCenter, rectanglesContainer, stage, currentRectangle, previousRectangle, currentAxis;

document.addEventListener('keydown', onKeyDown)

export default function main(st) {
    stage = st;
    windowCenter = {
        x: stage.width / 2,
        y: stage.height / 2
    }

    rectanglesContainer = new createjs.Container();
    stage.addChild(rectanglesContainer);

    createBackground();
    createFirstRectangles();
    return stage;
}

function createBackground() {
    let graphics = new createjs.Graphics();
    let rectangle = new createjs.Shape(graphics)
    graphics.beginFill('rgba(0,0,0,0.1)');
    graphics.drawRect(0, 0, stage.width, stage.height)

    rectanglesContainer.addChild(rectangle);
}

function createFirstRectangles() {
    let side = stage.width * sideRatio;
    currentAxis = 'x';

    previousRectangle = createRectangle(windowCenter.x - side / 2, windowCenter.y - side / 2, side, side);
    currentRectangle = createRectangle(0, windowCenter.y - side / 2, side, side);
    launch(currentRectangle);
}

function createRectangle(x, y, w, h) {
    let graphics = new createjs.Graphics();
    let rectangle = new createjs.Shape(graphics)
    rectangle.width = w;
    rectangle.height = h;
    rectangle.x = x;
    rectangle.y = y;
    rectangle.velocity = gameSpeed;
    graphics.beginFill('rgba(245,210,89,0.7)');
    graphics.drawRect(0, 0, w, h)

    stage.addChild(rectangle);

    return rectangle;
}

function launch(currentRectangle) {
    currentRectangle.tickHandler = currentRectangle.addEventListener('tick', onRectangleTick)
}

function onRectangleTick(e) {
    let tg = e.currentTarget;
    if (currentAxis === 'x') {
        tg.x += tg.velocity;

        if (tg.x > stage.width - tg.width || tg.x < 0) {
            tg.velocity *= -1;
        }
    } else {
        tg.y += tg.velocity;

        if (tg.y > stage.height - tg.height || tg.y < 0) {
            tg.velocity *= -1;
        }
    }
}

function onKeyDown(e) {
    e.preventDefault()
    if (e.keyCode === 32) {
        lockSquare()
        checkResult()
    }
}

function lockSquare() {
    currentRectangle.removeEventListener('tick', currentRectangle.tickHandler)
}

function checkResult() {
    if (inPreviousRectangle()) {
        let r1 = previousRectangle;
        let r2 = currentRectangle;
        let x_overlap = Math.max(0, Math.min(r1.x + r1.width, r2.x + r2.width) - Math.max(r1.x, r2.x));
        let y_overlap = Math.max(0, Math.min(r1.y + r1.height, r2.y + r2.height) - Math.max(r1.y, r2.y));
        let newRectangle = createRectangle(currentRectangle.x, currentRectangle.y, x_overlap, y_overlap);

        // previousRectangle.visible = false;
        previousRectangle = currentRectangle;
        currentRectangle = newRectangle;

        currentAxis = currentAxis === 'x' ? 'y' : 'x';
        launch(newRectangle)
    } else {
        console.log('Loser');
    }
}

function inPreviousRectangle() {
    let intersectLeft = currentRectangle.x + currentRectangle.width > previousRectangle.x;
    let intersectRight = currentRectangle.x < previousRectangle.x + previousRectangle.width;
    let intersectX = intersectLeft && intersectRight;
    let intersectY = currentRectangle.y + currentRectangle.height > previousRectangle.y
        && currentRectangle.y < previousRectangle.y + + previousRectangle.height
    return (intersectX && intersectY)
}