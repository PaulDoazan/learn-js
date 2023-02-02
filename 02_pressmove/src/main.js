export default function main(stage) {
    stage = createBackground(stage);

    return stage;
}

function customCircle(size, position) {
    let circle = new createjs.Shape();
    circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, size);
    circle.x = position.x;
    circle.y = position.y;

    circle.addEventListener('click', (e) => {
        e.stopPropagation();
        circle.x += 5;
    })

    return circle;
}

function createCircle(e, stage) {
    let position = { x: stage.mouseX, y: stage.mouseY };
    let circle = customCircle(30, position)
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