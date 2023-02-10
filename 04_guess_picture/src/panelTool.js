import loadPicture from "./loadPicture.js";

const colors = ['#96ceb4', '#ffeead', '#ff6f69', '#ffcc5c', '#88d8b0']
const fileNames = ["portrait", "portrait_2"]
let currentIndex = 0

export default function addPanelTool(stage, ctx) {
    addLoadingBtn(stage, ctx)
}

function addLoadingBtn(stage, ctx) {
    let container = new createjs.Container();

    let gr = new createjs.Graphics();
    let sh = new createjs.Shape(gr);

    let label = new createjs.Text("Load picture", "20px Arial", "#ff7700");
    label.y = 10;
    label.x = 5;

    gr.setStrokeStyle(4)
    gr.beginStroke(colors[0])
    gr.beginFill(colors[1])
    gr.drawRect(0, 0, 120, 40);

    container.x = 50;
    container.y = 500;

    container.addChild(sh, label);

    container.on('click', (e) => {
        loadPicture(stage, fileNames[currentIndex], ctx)
        if (currentIndex < fileNames.length - 1) {
            currentIndex++
        } else {
            currentIndex = 0
        }
    })

    stage.addChild(container);
}