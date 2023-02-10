export default function loadPicture(stage, fileName, ctx) {
    let loaderBar;
    let bar;
    let imageContainer;
    let loaderWidth;
    let loaderColor;
    let preload;

    createLoaderBar(stage, imageContainer)
    startLoading(imageContainer)

    function createLoaderBar(stage) {
        imageContainer = new createjs.Container();
        imageContainer.x = 100;
        imageContainer.y = 50;

        let barHeight = 20;
        loaderColor = 'black';
        loaderBar = new createjs.Container();

        bar = new createjs.Shape();
        bar.graphics.beginFill(loaderColor).drawRect(0, 0, 1, barHeight);

        loaderWidth = 200;
        stage.addChild(imageContainer);

        let bgBar = new createjs.Shape();
        let padding = 3
        bgBar.graphics.setStrokeStyle(1).beginStroke(loaderColor).drawRect(-padding / 2, -padding / 2, loaderWidth + padding, barHeight + padding);

        loaderBar.x = 200;
        loaderBar.y = 290;
        loaderBar.addChild(bar, bgBar);

        imageContainer.refLoaderBar = loaderBar;

        stage.addChild(loaderBar);
    }

    function startLoading(imageContainer) {
        preload = new createjs.LoadQueue(true);

        preload.on("progress", handleProgress);
        preload.on("complete", handleComplete);
        preload.on("fileload", handleFileLoad);
        preload.loadFile(`./images/${fileName}.jpg`);

        function handleProgress(e) {
            bar.scaleX = e.loaded * loaderWidth;
        }

        function handleComplete(e) {
            loaderBar.visible = false;
        }

        function handleFileLoad(e) {
            let image = e.result;
            let ratio = image.width / image.height
            let h = 400;
            let w = h * ratio;
            let margin = h - w;


            let bmp = new createjs.Bitmap(image).set({
                scaleX: w / image.width, scaleY: h / image.height,
                x: margin / 2,
            });

            let border = new createjs.Shape(
                new createjs.Graphics().setStrokeStyle(2).beginStroke("#000000").drawRect(margin / 2, 0, w, h).endFill()
            )

            let container = new createjs.Container();
            container.addChild(border, bmp);
            let pixelsContainer = new createjs.Container();

            let count = 0;
            let tickerHandler = createjs.Ticker.addEventListener('tick', () => {
                count++;
                if (count > 1) {
                    createjs.Ticker.removeEventListener('tick', tickerHandler)
                    /**  create pixelized image */

                    let pixelSize = 40;
                    for (let i = 0; i < pixelSize; i++) {
                        for (let j = 0; j < pixelSize; j++) {
                            let imgData = ctx.getImageData(imageContainer.x + margin / 2 + i * (w / pixelSize), imageContainer.y + j * (h / pixelSize), w / pixelSize, h / pixelSize);

                            imgData.data[0]
                            imgData.data[1]
                            imgData.data[2]
                            imgData.data[3]

                            let gr = new createjs.Graphics()
                            let sh = new createjs.Shape(gr)

                            gr.beginFill(`rgba(${imgData.data[0]}, ${imgData.data[1]}, ${imgData.data[2]}, 1)`)
                            gr.drawRect(imageContainer.x + margin / 2 + i * (w / pixelSize), imageContainer.y + j * (h / pixelSize), w / pixelSize, h / pixelSize)

                            pixelsContainer.addChild(sh);
                        }
                    }


                    /**  invert colors */

                    // let pixelNumber = 80;
                    // for (let i = 0; i < pixelNumber; i++) {
                    //     for (let j = 0; j < pixelNumber; j++) {
                    //         let imgData = ctx.getImageData(imageContainer.x + margin / 2 + i * (w / pixelNumber), imageContainer.y + j * (h / pixelNumber), w / pixelNumber, h / pixelNumber);

                    //         imgData.data[0] = 255 - imgData.data[0];
                    //         imgData.data[1] = 255 - imgData.data[0];
                    //         imgData.data[2] = 255 - imgData.data[2];
                    //         imgData.data[3] = 255;

                    //         let gr = new createjs.Graphics()
                    //         let sh = new createjs.Shape(gr)

                    //         gr.beginFill(`rgba(${imgData.data[0]}, ${imgData.data[1]}, ${imgData.data[2]}, 1)`)
                    //         gr.drawRect(imageContainer.x + margin / 2 + i * (w / pixelNumber), imageContainer.y + j * (h / pixelNumber), w / pixelNumber, h / pixelNumber)

                    //         pixelsContainer.addChild(sh);
                    //     }
                    // }


                    /** turn into colors */

                    // let imgData = ctx.getImageData(imageContainer.x + margin / 2, imageContainer.y, w, h);
                    // for (let i = 0; i < imgData.data.length; i += 4) {
                    //     let gray = (imgData.data[i] * 0.2126 + imgData.data[i + 1] * 0.7152 + imgData.data[i + 2] * 0.0722) / 3;

                    //     imgData.data[i] = 255 - imgData.data[i];
                    //     imgData.data[i + 1] = 255 - imgData.data[i + 1];
                    //     imgData.data[i + 2] = 255 - imgData.data[i + 2];
                    //     imgData.data[i + 3] = 255;
                    // }

                    // ctx.putImageData(imgData, imageContainer.x + margin / 2, imageContainer.y);

                    // createjs.Ticker.removeEventListener('tick', stage.mainTickerHandler)


                    /** turn into grayscale */

                    // let imgData = ctx.getImageData(imageContainer.x + margin / 2, imageContainer.y, w, h);
                    // for (let i = 0; i < imgData.data.length; i += 4) {
                    //     let gray = (imgData.data[i] * 0.2126 + imgData.data[i + 1] * 0.7152 + imgData.data[i + 2] * 0.0722) / 3;

                    //     imgData.data[i] = gray;
                    //     imgData.data[i + 1] = gray;
                    //     imgData.data[i + 2] = gray;
                    //     imgData.data[i + 3] = 255;
                    // }

                    // ctx.putImageData(imgData, imageContainer.x + margin / 2, imageContainer.y);

                    // createjs.Ticker.removeEventListener('tick', stage.mainTickerHandler)

                    //container.visible = false;
                    stage.addChild(pixelsContainer);
                }
            })

            imageContainer.addChild(container);
        }
    }
}