const colors = ['#063c77', '#f19648', '#f5d259', '#d84f35']

window.addEventListener('load', init)

function init() {
    let canvas = document.getElementById("demoCanvas");
    let stage = new createjs.Stage(canvas);

    setGame(stage);

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", () => {
        stage.update();
    });
}

function setGame(stage) {
    let circle = new createjs.Shape();
    circle.graphics.beginFill("#f19648").drawCircle(0, 0, 50);
    circle.x = 200;
    circle.y = 300;

    stage.addChild(circle);

    return stage;
}


