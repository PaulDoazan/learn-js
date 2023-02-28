const colors = ['#063c77', '#f19648', '#f5d259', '#d84f35']
let stage;
let total = 0;
let difficulty = 6;
let maxValue = 10;
let finalLabel;
let btns = [];
let circles = [];

window.addEventListener('load', init)

function init() {
    let canvas = document.getElementById("demoCanvas");
    stage = new createjs.Stage(canvas);

    setGame();

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", () => {
        stage.update();
    });
}

function setGame() {
    let values = []
    for (let index = 0; index < difficulty; index++) {
        let result = getRandomIntInclusive(1, maxValue);
        values.push(result);
        let x = 150 + 150 * (index % 3);
        let y = 225 + Math.floor(index / 3) * 115;
        let circle = createCircle(x, y, colors[index % 4], result);
        circles.push(circle);
    }

    calculateTotal(values);
    createButtons(values)
    createFinalLabel()
}

function createFinalLabel() {
    finalLabel = new createjs.Container();
    let rect = new createjs.Shape()
    rect.graphics.beginFill("grey");
    rect.graphics.drawRect(-90, -40, 180, 80)
    finalLabel.addChild(rect);
    let label = new createjs.Text('Resultat', "50px Arial", "black");
    label.textAlign = 'center'
    label.textBaseline = 'middle'
    finalLabel.x = stage.canvas.width / 2;
    finalLabel.y = 520;

    finalLabel.addChild(label);
    finalLabel.label = label

    finalLabel.visible = false;
    finalLabel.addEventListener('click', onFinalLabelClick)

    stage.addChild(finalLabel);
}

function onFinalLabelClick() {
    btns.forEach((btn) => {
        stage.removeChild(btn);
    })
    circles.forEach((circle) => {
        stage.removeChild(circle);
    })
    finalLabel.visible = false;
    setGame();
}

function createButton(index, correctResult) {
    let container = new createjs.Container();
    let rect = new createjs.Shape();
    rect.graphics.beginFill('#f5d259').drawRect(-60, -30, 120, 60);

    container.x = 150 + index * 150;
    container.y = 80;

    let numberToDisplay = total;
    if (correctResult == false) {
        numberToDisplay += getRandomIntInclusive(1, 10);
    }
    let text = new createjs.Text(numberToDisplay, "20px Arial", "black");
    text.textAlign = 'center'
    text.textBaseline = 'middle'

    container.value = numberToDisplay;
    container.addChild(rect, text)

    container.addEventListener('click', onBtnClick)
    stage.addChild(container);

    return container;
}

function onBtnClick(e) {
    if (e.currentTarget.value === total) {
        finalLabel.label.text = 'Correct'
        maxValue += 5;
    } else {
        finalLabel.label.text = 'Loupé'
        maxValue -= 2;
        maxValue = maxValue < 3 ? maxValue + 2 : maxValue;
    }
    finalLabel.visible = true;
}

function createButtons(arrValues) {
    let randomIndex = getRandomIntInclusive(0, 2);
    for (let index = 0; index <= 2; index++) {
        let isCorrectNumber = index === randomIndex;
        let btn = createButton(index, isCorrectNumber);
        btns.push(btn)
    }
}

function calculateTotal(arrValues) {
    total = 0;
    for (let index = 0; index < arrValues.length; index++) {
        const element = arrValues[index];
        total += element;
    }
}

function createCircle(xParameter, yParameter, color, value) {
    let container = new createjs.Container();
    let circle = new createjs.Shape();
    //let radius = value > 10 ? value * 2 + 10 : 30;
    let radius = 40;
    circle.graphics.beginFill(color).drawCircle(0, 0, radius);

    container.x = xParameter;
    container.y = yParameter;

    let fontSize = value > 20 ? value + 10 : 30;
    let text = new createjs.Text(value, fontSize + "px Arial", "white");
    text.textAlign = 'center'
    text.textBaseline = 'middle'
    container.addChild(circle, text)
    stage.addChild(container);

    return container;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}



