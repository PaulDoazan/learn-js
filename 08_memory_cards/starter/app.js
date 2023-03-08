const cards = document.querySelectorAll('.card')

cards[0].addEventListener('click', (e) => {
    e.target.children[0].classList.add('active')
})