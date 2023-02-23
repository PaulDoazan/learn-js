import { getRandomIntInclusive } from './utils.js'

const colors = ['#063c77', '#f19648', '#f5d259', '#d84f35']

export default function main(stage) {
    stage = createBackground(stage);
    return stage;
}

function customCircle(size, position) {
    let circle = new createjs.Shape();
    let radius = size * (1 + Math.random());
    circle.graphics.beginFill(colors[getRandomIntInclusive(0, colors.length - 1)]).drawCircle(0, 0, radius);
    circle.x = position.x;
    circle.y = position.y;
    circle.vy = circle.vx = 0;
    circle.radius = radius;
    circle.moveAllowed = false;

    circle.addEventListener('click', (e) => {
        e.stopPropagation();

        if (circle.moveAllowed) {
            circle.moveAllowed = false;
        } else {
            circle.moveAllowed = true;
        }
    })

    // circle.vx = circle.vy = 1;

    // stage.on('changeLaCouleur', () => {
    //     circle.graphics.beginFill("red").drawCircle(0, 0, size);
    // })

    circle.on('tick', (e) => {
        if (circle.moveAllowed && !circle.isFinished) {
            let randomNumber = Math.random();
            e.currentTarget.vy += randomNumber / 10;
            e.currentTarget.y += e.currentTarget.vy;

            if (reachLimit(e.currentTarget)) {
                e.currentTarget.parent.removeChild(e.currentTarget)
            }
        }
    })

    return circle;
}

function reachLimit(target) {
    if (target.y > 600 - target.radius) {
        target.y = 600 - target.radius
        target.isFinished = true;
    }
}

function createCircle(e, stage) {
    let position = { x: stage.mouseX, y: stage.mouseY };
    let circle = customCircle(15, position)
    stage.addChild(circle);
}

function createBackground(stage) {
    let graphics = new createjs.Graphics();
    let rectangle = new createjs.Shape(graphics)
    graphics.beginFill('white');
    graphics.drawRect(0, 0, stage.width, stage.height)

    rectangle.addEventListener('mousedown', (e) => {
        createCircle(e, stage)
    })

    stage.addChild(rectangle);

    return stage;
}