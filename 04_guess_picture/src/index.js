import main from "./main.js";

export default function init() {
    let canvas = document.getElementById("demoCanvas");
    let ctx = canvas.getContext('2d');
    let stage = new createjs.Stage(canvas);

    main(stage, ctx);

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    stage.mainTickerHandler = createjs.Ticker.addEventListener("tick", () => {
        stage.update();
    });
}

window.addEventListener('load', init)