import imageInCanvas from "./src/imageInCanvas.js"
const canvasContainer = document.querySelector(".canvas-container");
const errorMsg = document.querySelector(".error-msg");
let searchQuery = "girafe";
let pageIndex = 1;

async function fetchData() {
  try {
    const response = await fetch(`https://api.unsplash.com/search/photos?page=${pageIndex}&per_page=30&query=${searchQuery}&client_id=ThkgHb61eXWX5PBPgACD0SaT6dNjzDoarehBpAZyDL0`)

    if (!response.ok) {
      throw new Error(`Erreur: ${response.status}`)
    }

    const data = await response.json()

    if (!data.total) {
      imagesList.textContent = "";
      throw new Error("Utilisez un autre mot-clé")
    }

    createImage(data.results)
  }
  catch (error) {
    errorMsg.textContent = `${error}`
  }
}
fetchData()

function createImage(data) {
  let firstImage = data[0];

  const newCanvas = document.createElement("canvas");

  newCanvas.className = 'new-canvas'
  newCanvas.width = 400;
  newCanvas.height = 400;
  canvasContainer.appendChild(newCanvas)

  imageInCanvas(newCanvas, firstImage);
}

const input = document.querySelector("#search");
const form = document.querySelector("form");

form.addEventListener("submit", handleSearch)

function handleSearch(e) {
  e.preventDefault();

  canvasContainer.textContent = "";
  if (!input.value) {
    errorMsg.textContent = "L'objet de la recherche ne peut être vide."
    return;
  }

  errorMsg.textContent = "";
  searchQuery = input.value;
  pageIndex = 1;
  fetchData()
}