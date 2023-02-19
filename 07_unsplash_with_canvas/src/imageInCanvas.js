export default function imageInCanvas(canvas, img) {
    let ctx = canvas.getContext('2d');
    let stage = new createjs.Stage(canvas);

    startLoad(img);

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    stage.mainTickerHandler = createjs.Ticker.addEventListener("tick", () => {
        stage.update();
    });

    function startLoad(img) {
        let preload = new createjs.LoadQueue(true);
        preload.on("fileload", handleFileLoad);
        preload.on("complete", handleComplete);
        console.log(img);
        preload.loadFile({ id: "image", src: img.urls.regular, type: createjs.Types.IMAGE });
    }

    function handleComplete(e) {

    }

    function handleFileLoad(e) {
        let img = e.result;
        let ratio = img.width / img.height
        let h = 400;
        let w = h * ratio;
        let margin = h - w;


        let bmp = new createjs.Bitmap(img).set({
            scaleX: w / img.width, scaleY: h / img.height,
            x: margin / 2,
        });

        let border = new createjs.Shape(
            new createjs.Graphics().setStrokeStyle(2).beginStroke("#000000").drawRect(0, 0, w, h).endFill()
        )

        let container = new createjs.Container();
        stage.addChild(border, bmp);
        let pixelsContainer = new createjs.Container();

        let count = 0;
        let tickerHandler = createjs.Ticker.addEventListener('tick', () => {
            count++;
            if (count === 1) {
                /**  create pixelized img */

                let pixelSize = 40;
                for (let i = 0; i < pixelSize; i++) {
                    for (let j = 0; j < pixelSize; j++) {
                        let imgData = ctx.getImageData(i * (w / pixelSize), j * (h / pixelSize), w / pixelSize, h / pixelSize);

                        imgData.data[0]
                        imgData.data[1]
                        imgData.data[2]
                        imgData.data[3]

                        let gr = new createjs.Graphics()
                        let sh = new createjs.Shape(gr)

                        gr.beginFill(`rgba(${imgData.data[0]}, ${imgData.data[1]}, ${imgData.data[2]}, 1)`)
                        gr.drawRect(i * (w / pixelSize), j * (h / pixelSize), w / pixelSize, h / pixelSize)

                        pixelsContainer.addChild(sh);
                    }
                }
                stage.addChild(pixelsContainer);
            } else {
                createjs.Ticker.removeEventListener('tick', tickerHandler)
                canvas.className = 'setUpCanvas'
            }
        })
    }
}