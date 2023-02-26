import { getRandomIntInclusive } from './utils.js'

const score = document.querySelector('.score');

const colors = ['rgb(245,210,89)', 'rgb(241,150,72)'];
let red = 245;
let green = 210;
let blue = 89;
let gameSpeed = 12;
let sideRatio;
let count = 0;
let windowCenter, rectanglesContainer, stage, currentRectangle, previousRectangle, currentAxis, gameFinished;

document.addEventListener('keydown', onKeyDown)

export default function main(st) {
    stage = st;
    windowCenter = {
        x: stage.width / 2,
        y: stage.height / 2
    }

    sideRatio = stage.width > stage.height ? 1 / 6 : 1 / 3;

    rectanglesContainer = new createjs.Container();
    stage.addChild(rectanglesContainer);

    stage.addEventListener('mousedown', onKeyDown)

    createBackground();
    createFirstRectangles();
    return stage;
}

function createBackground() {
    let graphics = new createjs.Graphics();
    let rectangle = new createjs.Shape(graphics)
    graphics.beginFill('rgba(0,0,0,0.01)');
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

function createRectangle(x, y, w, h, color = `rgba(245,210,89,0.6)`) {
    let graphics = new createjs.Graphics();
    let rectangle = new createjs.Shape(graphics)
    rectangle.width = w;
    rectangle.height = h;
    rectangle.x = x;
    rectangle.y = y;
    rectangle.velocity = gameSpeed;
    rectangle.fallVelocity = 0;
    graphics.beginFill(color);
    graphics.drawRect(0, 0, w, h)

    rectanglesContainer.addChild(rectangle);

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
    if (e.keyCode) {
        if (e.keyCode === 32) {
            lockSquare()
            checkResult()
        }
    } else {
        lockSquare()
        checkResult()
    }
}

function lockSquare() {
    currentRectangle.removeEventListener('tick', currentRectangle.tickHandler)
}

function restart() {
    red = 245;
    green = 210;
    blue = 89;
    currentRectangle = previousRectangle = null;
    rectanglesContainer.removeAllChildren();
    createFirstRectangles()
}

function checkResult() {
    if (gameFinished) {
        gameFinished = false;
        console.log('restqrt');
        restart();
        count = 0;
        score.textContent = `Ton score est de : ${count}`
        return;
    }
    if (inPreviousRectangle()) {
        let r1 = previousRectangle;
        let r2 = currentRectangle;

        let xMin = Math.max(r1.x, r2.x);
        let xMax = Math.min(r1.x + r1.width, r2.x + r2.width);
        let yMin = Math.max(r1.y, r2.y)
        let yMax = Math.min(r1.y + r1.height, r2.y + r2.height);

        let newRectangle = handleCurrentRectangle(xMin, xMax, yMin, yMax);
        currentRectangle = newRectangle;

        currentAxis = currentAxis === 'x' ? 'y' : 'x';
        launch(newRectangle)

        count++
        score.textContent = `Ton score est de : ${count}`
    } else {
        gameFinished = true;
    }
}

function handleCurrentRectangle(xMin, xMax, yMin, yMax) {
    let x_overlap = xMax - xMin;
    let y_overlap = yMax - yMin;

    green -= 4;
    blue -= 3;

    let newRectangle = createRectangle(xMin, yMin, x_overlap, y_overlap, `rgba(${red}, ${green}, ${blue}, 0.6)`);
    let oldRectangle = createRectangle(xMin, yMin, x_overlap, y_overlap, `rgba(${red}, ${green}, ${blue}, 0.6)`);

    let lost_minX, lost_maxX, lost_minY, lost_maxY;
    let lost_minX_2, lost_maxX_2, lost_minY_2, lost_maxY_2;

    if (currentAxis === 'x') {
        if (currentRectangle.x <= previousRectangle.x) {
            lost_minX = currentRectangle.x;
            lost_maxX = previousRectangle.x;

            lost_minX_2 = currentRectangle.x + currentRectangle.width
            lost_maxX_2 = previousRectangle.x + previousRectangle.width
        } else {
            lost_minX = previousRectangle.x + previousRectangle.width;
            lost_maxX = currentRectangle.x + currentRectangle.width;

            lost_minX_2 = previousRectangle.x
            lost_maxX_2 = currentRectangle.x
        }

        lost_minY = lost_minY_2 = currentRectangle.y;
        lost_maxY = lost_maxY_2 = currentRectangle.y + currentRectangle.height;
    } else {
        if (currentRectangle.y <= previousRectangle.y) {
            lost_minY = currentRectangle.y;
            lost_maxY = previousRectangle.y;

            lost_minY_2 = currentRectangle.y + currentRectangle.height;
            lost_maxY_2 = previousRectangle.y + previousRectangle.height;
        } else {
            lost_minY = previousRectangle.y + previousRectangle.height;
            lost_maxY = currentRectangle.y + currentRectangle.height;

            lost_minY_2 = previousRectangle.y;
            lost_maxY_2 = currentRectangle.y;
        }

        lost_minX = lost_minX_2 = currentRectangle.x;
        lost_maxX = lost_maxX_2 = currentRectangle.x + currentRectangle.width;
    }

    let lostRectangle_1 = createRectangle(lost_minX, lost_minY, lost_maxX - lost_minX, lost_maxY - lost_minY, `rgba(${red}, ${green}, ${blue}, 0.6)`);
    lostRectangle_1.speedAnimation = getRandomIntInclusive(5, 10) / 100;
    let lostRectangle_2 = createRectangle(lost_minX_2, lost_minY_2, lost_maxX_2 - lost_minX_2, lost_maxY_2 - lost_minY_2, `rgba(${red}, ${green}, ${blue}, 0.6)`);
    lostRectangle_2.speedAnimation = getRandomIntInclusive(5, 10) / 100;

    rectanglesContainer.removeChild(currentRectangle, previousRectangle);
    previousRectangle = oldRectangle;
    rectanglesContainer.addChild(oldRectangle)
    fallDown([lostRectangle_1, lostRectangle_2])
    return newRectangle;
}

function fallDown(rects) {
    rects.forEach(rect => {
        if (currentAxis === 'x') {
            rect.direction = rect.x <= currentRectangle.x ? -1 : 1;
        } else {
            rect.direction = rect.y <= currentRectangle.y ? -1 : 1;
        }
        rect.tickHandler = rect.addEventListener('tick', tickFall)
    })
}

function tickFall(e) {
    let tg = e.currentTarget;

    tg.y += tg.fallVelocity;
    tg.x += tg.fallVelocity / 3 * tg.direction;
    tg.fallVelocity += tg.speedAnimation;
    tg.rotation += tg.speedAnimation * 3 * tg.direction;

    if (tg.y > stage.height * 2) {
        tg.removeEventListener('tick', tg.tickHandler)
        rectanglesContainer.removeChild(tg);
        tg = null;
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