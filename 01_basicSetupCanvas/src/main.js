const colors = ['#063c77', '#f19648', '#f5d259', '#d84f35']

export default function main(stage) {
    let circle = new createjs.Shape();
    circle.graphics.beginFill("#f19648").drawCircle(0, 0, 50);
    circle.x = 100;
    circle.y = 100;

    circle.addEventListener('click', (e) => {
        circle.x += 5;
    })
    stage.addChild(circle);

    return stage;
}