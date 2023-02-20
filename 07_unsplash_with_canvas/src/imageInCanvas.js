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

        stage.marginBmp = margin;

        let bmp = new createjs.Bitmap(img).set({
            scaleX: bmpWidth / img.width,
            scaleY: bmpHeight / img.height,
            x: ratio > 1 ? margin / 2 : 0,
            width: bmpWidth,
            height: bmpHeight,
            margin: margin
        });

        stage.bmp = bmp;
        stageTool.addChild(bmp);

        let count = 0;
        let tickerHandler = createjs.Ticker.addEventListener('tick', () => {
            count++;
            if (count === 1) {
                /**  draw pixelized img */
                drawImage()
                createjs.Ticker.on('tick', () => {
                    cards(stage);
                }, null, true)
            } else {
                createjs.Ticker.removeEventListener('tick', tickerHandler)
            }
        })
    }
}

export function drawImage() {
    let pixelSize = pixelSlider.value
    pixelsContainer = new createjs.Container();
    stageTool.addChild(stage.bmp);

    createjs.Ticker.on('tick', () => {
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
        pixelsContainer.x = stage.marginBmp > 0 ? stage.marginBmp / 2 : 0
        stage.removeChild(stage.pixelsContainer);
        stage.removeChild(stage.bmp);

        if (Number(pixelSlider.value) <= 30) {
            stage.addChildAt(stage.bmp, 0);
        } else {
            stage.addChildAt(pixelsContainer, 0);
            stage.pixelsContainer = pixelsContainer
        }
    }, null, true)
}