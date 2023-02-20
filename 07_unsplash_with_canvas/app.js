import { setImageInCanvas } from "./src/imageInCanvas.js"
import setEye from "./src/eyeManager.js";
import setSliders from "./src/sliderManager.js";

const canvasContainer = document.querySelector(".canvas-container");
const errorMsg = document.querySelector(".error-msg");
let searchQuery = "girafe";
let pageIndex = 1;
let imgSize = 600;
let canvas;

const input = document.querySelector("#search");
const form = document.querySelector("form");

setEye();
setSliders();
setCanvas();
form.addEventListener("submit", handleSearch)
fetchData()

async function fetchData() {
  try {
    const response = await fetch(`https://api.unsplash.com/search/photos?page=${pageIndex}&per_page=30&query=${searchQuery}&client_id=ThkgHb61eXWX5PBPgACD0SaT6dNjzDoarehBpAZyDL0`)

    if (!response.ok) {
      throw new Error(`Erreur: ${response.status}`)
    }

    const data = await response.json()

    if (!data.total) {
      //canvasContainer.textContent = "";
      throw new Error("Utilisez un autre mot-clé")
    }

    setImageInCanvas(data.results[0], imgSize);
  }
  catch (error) {
    errorMsg.textContent = `${error}`
  }
}

function setCanvas() {
  canvas = document.createElement("canvas");
  canvas.className = 'main-canvas'
  canvas.width = imgSize;
  canvas.height = imgSize;
  canvasContainer.appendChild(canvas)
}

function handleSearch(e) {
  e.preventDefault();

  //canvasContainer.textContent = "";
  if (!input.value) {
    errorMsg.textContent = "L'objet de la recherche ne peut être vide."
    return;
  }

  errorMsg.textContent = "";
  searchQuery = input.value;
  pageIndex = 1;
  fetchData()
}