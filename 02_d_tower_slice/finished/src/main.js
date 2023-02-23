import { getRandomIntInclusive } from './utils.js'

const colors = ['#063c77', '#f19648', '#f5d259', '#d84f35']

export default function main(stage) {
    stage = createBackground(stage);
    return stage;
}

function createBackground(stage) {
    let graphics = new createjs.Graphics();
    let rectangle = new createjs.Shape(graphics)
    graphics.beginFill('rgba(0,0,0,0.1)');
    graphics.drawRect(0, 0, stage.width, stage.height)

    stage.addChild(rectangle);

    return stage;
}