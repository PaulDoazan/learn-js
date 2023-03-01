import main from "./main.js";

export default function init() {
    // let canvas = document.getElementById("demoCanvas");
    // let stage = new createjs.Stage(canvas);

    main();

    // createjs.Ticker.timingMode = createjs.Ticker.RAF;
    // createjs.Ticker.addEventListener("tick", () => {
    //     stage.update();
    // });
}

window.addEventListener('load', init)