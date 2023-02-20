const cardSlider = document.querySelector(".cardSlider")
let stage;

export default function cards(st) {
    if (st) stage = st;
    let bmp = stage.bmp;
    stage.removeChild(stage.cardContainer);
    if (Number(cardSlider.value) === 2) return;
    let cardContainer = new createjs.Container();

    stage.cardContainer = cardContainer;
    stage.addChild(cardContainer);

    cardContainer.x = stage.pixelsContainer.x;

    let cardsNumber = cardSlider.value;

    let margin = bmp.margin < 0 ? bmp.margin : 0;
    let cardWidth = (bmp.width + margin) / cardsNumber;
    let cardHeight = bmp.height / cardsNumber

    // double tableau
    for (let i = 0; i < cardsNumber; i++) {
        for (let j = 0; j < cardsNumber; j++) {
            let gr = new createjs.Graphics();
            let sh = new createjs.Shape(gr);
            let card = new createjs.Container()
            card.addChild(sh)

            gr.setStrokeStyle(2);
            gr.beginStroke('#fff5d7')
            gr.beginFill('#ffaaab');
            gr.drawRect(0, 0, cardWidth, cardHeight)
            card.x = cardWidth * j;
            card.y = cardHeight * i;
            cardContainer.addChild(card);

            card.on('click', (e) => {
                e.currentTarget.visible = false;
            })
        }
    }
}