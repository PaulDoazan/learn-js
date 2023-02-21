const imagesList = document.querySelector(".images-list");
const errorMsg = document.querySelector(".error-msg");
let pageIndex = 1;

async function fetchData() {
  try {
    const response = await fetch(`https://opendata.bordeaux-metropole.fr/api/records/1.0/search/?dataset=bor_frequentation_piscine_tr&q=`)

    if (!response.ok) {
      throw new Error(`Erreur: ${response.status}`)
    }

    const data = await response.json()

    console.log(data);
    // createImages(data.results)
  }
  catch (error) {
    errorMsg.textContent = `${error}`
  }
}
//fetchData()

function createImages(data) {
  data.forEach(img => {
    const newImg = document.createElement("img");
    // newImg.src = img.urls.regular;
    imagesList.appendChild(newImg)
  })
}

const input = document.querySelector("#search");

input.addEventListener("click", handleSearch)

function handleSearch(e) {
  e.preventDefault();
  pageIndex = 1;
  fetchData()
}