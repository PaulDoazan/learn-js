export default function tools(stage) {
    stage = createTools(stage);
    return stage;
}

function createTools(stage) {
    addButton(stage, 'hello')
    return stage;
}

function addButton(stage, str) {
    let gr = new createjs.Graphics()
    let rect = new createjs.Shape(gr);

    gr.beginFill('orange')
    gr.drawRect(0, 0, 100, 50);

    rect.x = 400;
    rect.y = 100;



    stage.addChild(rect);
}