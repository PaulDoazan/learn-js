export default function main(stage) {
    let circle = new createjs.Shape();
    circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
    circle.x = 100;
    circle.y = 100;

    circle.on('tick', (e) => {
        e.currentTarget.x += 1;
    })
    stage.addChild(circle);

    return stage;
}