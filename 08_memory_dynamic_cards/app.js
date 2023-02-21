import fileNames from "./src/fileNames.json" assert { type: "json" };;

let cards, innerCards, advice, score, grid;
grid = document.querySelector('.grid');
grid.style = `
    display: grid;
    grid-template-columns: repeat(${6}, 1fr);
    max-width: 600px;
    gap: 10px;
    margin: 30px auto 0;
`

let cardsPicked = [];
let cardLock = false;
let numberOfTries = 0;

window.addEventListener('keydown', handleKeydown)
init();

function createCard(fileName) {
    let card = document.createElement('div')
    card.className = "card";
    card.dataset.attr = fileName;
    let doubleFace = document.createElement('div')
    doubleFace.className = "double-face";
    let face = document.createElement('div')
    face.className = "face";
    let faceImg = document.createElement('img')
    faceImg.src = `assets/images/${fileName}.svg`;
    let back = document.createElement('div')
    back.className = "back";
    let backImg = document.createElement('img')
    backImg.src = "assets/images/question.svg";

    back.appendChild(backImg)
    face.appendChild(faceImg)
    doubleFace.appendChild(face)
    doubleFace.appendChild(back)
    card.appendChild(doubleFace)

    grid.appendChild(card)
}

function createDeck() {
    fileNames.forEach(fileName => {
        for (let index = 0; index < 2; index++) {
            createCard(fileName)
        }
    });

    cards = document.querySelectorAll('.card');
    // array destructuring, rest parameters
    innerCards = [...document.querySelectorAll('.double-face')];
    advice = document.querySelector('.advice');
    score = document.querySelector('.score');
}

function init() {
    createDeck();
    shuffleCards();
    cards.forEach(card => card.addEventListener('click', flipCard))
}

function flipCard(e) {
    if (cardsPicked.length === 2 || cardLock) return;
    saveCard(e.target.children[0], e.target.getAttribute('data-attr'))
    if (cardsPicked.length === 2) result();
}

function saveCard(el, value) {
    // chainage optionnel
    if (el === cardsPicked[0]?.el) return;
    el.classList.add("active");
    // shorthand properties, proprietes abregees
    cardsPicked.push({ el, value });
}

function result() {
    saveNumberOfTries();
    if (cardsPicked[0].value === cardsPicked[1].value) {
        cardsPicked.forEach(cardPicked => {
            cardPicked.el.parentElement.removeEventListener('click', flipCard);
        })
        cardsPicked = [];
    } else {
        setTimeout(() => {
            cardsPicked.forEach(cardPicked => {
                cardPicked.el.classList.remove('active');
            })
            cardsPicked = [];
        }, 1000)
    }
}

function saveNumberOfTries() {
    numberOfTries++;
    const inactiveCards = innerCards.filter(card => !card.classList.contains('active'));

    if (inactiveCards.length === 0) {
        advice.textContent = `Bravo ! Appuyez sur "espace" pour relancer une partie.`
        score.textContent = `Nombre de coups : ${numberOfTries}`
        return;
    }

    score.textContent = `Nombre de coups : ${numberOfTries}`
}

function shuffleCards() {
    cards.forEach(card => {
        const randomPos = Math.trunc(Math.random() * 12);
        card.style.order = randomPos;
    })
}

function handleKeydown(e) {
    e.preventDefault()
    if (e.keyCode === 32) {
        const activeCards = innerCards.filter(card => card.classList.contains('active'));
        activeCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.remove("active")
            }, 100 * index)
        })
        advice.textContent = `Tentez de gagner avec le moins d'essais possible.`
        score.textContent = `Nombre de coups : 0`
        numberOfTries = 0;
        cards.forEach(card => card.addEventListener("click", flipCard))

        if (cardLock) return;
        cardLock = true;
        setTimeout(() => {
            shuffleCards()
            cardLock = false;
        }, 600 + activeCards.length * 100)
    }
}