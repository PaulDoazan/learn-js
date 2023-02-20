import cards from "./cards.js";
import { drawImage } from "./imageInCanvas.js";

const pixelSlider = document.querySelector(".pixelSlider")
const cardSlider = document.querySelector(".cardSlider")

export default function setSliders() {
    pixelSlider.addEventListener("change", function (e) {
        drawImage()
    })

    cardSlider.addEventListener("input", function (e) {
        cards()
    })
}