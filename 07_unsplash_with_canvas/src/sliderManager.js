import { drawImage } from "./imageInCanvas.js";

const pixelSlider = document.querySelector(".pixelSlider")
const cardSlider = document.querySelector(".cardSlider")

export default function setSliders() {
    pixelSlider.addEventListener("change", function (e) {
        drawImage(e.target.value)
    })

    cardSlider.addEventListener("input", function (e) {
        console.log(e.target.value);
    })
}