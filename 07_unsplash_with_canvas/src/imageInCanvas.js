import cards from "./cards.js";

let ctx, ctxTool, stage, stageTool, pixelsContainer, bmpWidth, bmpHeight;
const pixelSlider = document.querySelector(".pixelSlider")

export function setImageInCanvas(img, size) {
    const mainCanvas = document.querySelector(".main-canvas")
    const toolCanvas = document.querySelector(".tool-canvas")

    toolCanvas.width = size;
    toolCanvas.height = size;

    ctxTool = toolCanvas.getContext('2d');
    stageTool = new createjs.Stage(toolCanvas);


    ctx = mainCanvas.getContext('2d');
    stage = new createjs.Stage(mainCanvas);

    startLoad(img);
    cards(stage, size);

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    stage.mainTickerHandler = createjs.Ticker.addEventListener("tick", () => {
        stage.update();
        stageTool.update();
    });

    function startLoad(img) {
        let preload = new createjs.LoadQueue(true);
        preload.on("fileload", handleFileLoad);
        preload.loadFile({ id: "image", src: img.urls.regular, type: createjs.Types.IMAGE });
    }

    function handleFileLoad(e) {
        let img = e.result;
        let ratio = img.width / img.height
        bmpHeight = size;
        bmpWidth = bmpHeight * ratio;
        let margin = bmpHeight - bmpWidth;


        let bmp = new createjs.Bitmap(img).set({
            scaleX: bmpWidth / img.width, scaleY: bmpHeight / img.height,
            x: margin / 2,
        });

        stageTool.addChild(bmp);

        let count = 0;
        let tickerHandler = createjs.Ticker.addEventListener('tick', () => {
            count++;
            if (count === 1) {
                /**  draw pixelized img */
                drawImage()
            } else {
                createjs.Ticker.removeEventListener('tick', tickerHandler)
            }
        })
    }
}

export function drawImage(pixelSize = 40) {
    pixelSize = pixelSlider.value
    pixelsContainer = new createjs.Container();
    for (let i = 0; i < pixelSize; i++) {
        for (let j = 0; j < pixelSize; j++) {
            let imgData = ctxTool.getImageData(i * (bmpWidth / pixelSize), j * (bmpHeight / pixelSize), bmpWidth / pixelSize, bmpHeight / pixelSize);

            imgData.data[0]
            imgData.data[1]
            imgData.data[2]
            imgData.data[3]

            let gr = new createjs.Graphics()
            let sh = new createjs.Shape(gr)

            gr.beginFill(`rgba(${imgData.data[0]}, ${imgData.data[1]}, ${imgData.data[2]}, 1)`)
            gr.drawRect(i * (bmpWidth / pixelSize), j * (bmpHeight / pixelSize), bmpWidth / pixelSize, bmpHeight / pixelSize)

            pixelsContainer.addChild(sh);
        }
    }
    stage.removeAllChildren();
    stage.addChild(pixelsContainer);
}