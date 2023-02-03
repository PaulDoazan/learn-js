export default function main(stage) {
    stage = createBackground(stage);

    let externalBtn = document.querySelector('.external-btn');
    let form = document.querySelector('form');

    form.addEventListener('click', (e) => {
        e.preventDefault();
    })

    externalBtn.addEventListener('click', (e) => {
        e.preventDefault();
    })

    document.addEventListener('keydown', (e) => {
        // console.log(e.key)
    })
    return stage;
}

function customCircle(size, position, stage) {
    let circle = new createjs.Shape();
    circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, size);
    circle.x = position.x;
    circle.y = position.y;

    circle.addEventListener('click', (e) => {
        e.stopPropagation();
        circle.vy += 1;
    })

    circle.vx = circle.vy = 1;

    stage.on('changeLaCouleur', () => {
        circle.graphics.beginFill("red").drawCircle(0, 0, size);
    })

    circle.on('tick', (e) => {
        let randomNumber = Math.random();
        e.currentTarget.vy += randomNumber / 10;
        e.currentTarget.y += e.currentTarget.vy;

        if (e.currentTarget.y > 500) {
            e.currentTarget.parent.removeChild(e.currentTarget)
        }
    })

    return circle;
}

function createCircle(e, stage) {
    let position = { x: stage.mouseX, y: stage.mouseY };
    let circle = customCircle(5, position, stage)
    stage.addChild(circle);
}

function createBackground(stage) {
    let graphics = new createjs.Graphics();
    let rectangle = new createjs.Shape(graphics)
    graphics.beginFill('white');
    graphics.drawRect(0, 0, stage.width, stage.height)

    rectangle.addEventListener('pressmove', (e) => {
        createCircle(e, stage)
    })

    stage.addChild(rectangle);

    return stage;
}