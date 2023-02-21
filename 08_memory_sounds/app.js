const cards = document.querySelectorAll('.card');
// array destructuring, rest parameters
const innerCards = [...document.querySelectorAll('.double-face')];
const advice = document.querySelector('.advice');
const score = document.querySelector('.score');

let cardsPicked = [];
let shuffleLock = false;
let numberOfTries = 0;

window.addEventListener('keydown', handleKeydown)

init();

function init() {
    shuffleCards();
    cards.forEach(card => card.addEventListener('click', flipCard))
}

function flipCard(e) {
    if (cardsPicked.length === 2) return;
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
        innerCards.forEach(card => card.classList.remove("active"))
        advice.textContent = `Tentez de gagner avec le moins d'essais possible.`
        score.textContent = `Nombre de coups : 0`
        numberOfTries = 0;
        cards.forEach(card => card.addEventListener("click", flipCard))

        if (shuffleLock) return;
        shuffleLock = true;
        setTimeout(() => {
            shuffleCards()
            shuffleLock = false;
        }, 600)
    }
}