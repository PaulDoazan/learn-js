// EXO 1
const divToColor1 = document.querySelector('.div-to-color-1')
const btns1 = document.querySelectorAll('.btn-1')

btns1.forEach((el) => {
    el.addEventListener('click', (e) => {
        divToColor1.style.backgroundColor = e.target.textContent
    })
})

// EXO 2
const textToDisplay2 = document.querySelector('.text-to-display-2')
const form2 = document.querySelector('.form-2')
const input2 = document.querySelector('.input-2')

form2.addEventListener('submit', (e) => {
    e.preventDefault()
    textToDisplay2.textContent = input2.value;
})

// EXO 3
const textToDisplay3 = document.querySelector('.text-to-display-3')
const input3 = document.querySelector('.input-3')

input3.addEventListener('input', (e) => {
    textToDisplay3.textContent = e.target.value
})

//EXO 4
const textToDisplay4 = document.querySelector('.text-to-display-4')
const input4 = document.querySelector('.input-4')

input4.addEventListener('change', (e) => {
    textToDisplay4.textContent = e.target.value
})

//EXO 5
const textToDisplay5 = document.querySelector('.text-to-display-5')
const input5 = document.querySelector('.input-5')

input5.addEventListener('input', (e) => {
    textToDisplay5.textContent = e.target.value
})

//EXO 6
const textToDisplay6 = document.querySelector('.text-to-display-6')
const select6 = document.querySelector('.select-6')

select6.addEventListener('change', (e) => {
    textToDisplay6.textContent = e.target.value
})

//EXO 7
const divToColor7 = document.querySelector('.div-to-color-7')
const input7 = document.querySelector('.input-7')
input7.addEventListener('input', (e) => {
    divToColor7.style.backgroundColor = e.target.value
})

//EXO 8
const divToColor8 = document.querySelector('.div-to-color-8')
const btns8 = document.querySelectorAll('.btn-8')

btns8.forEach((el) => {
    el.addEventListener('click', (e) => {
        divToColor8.style.backgroundColor = e.target.getAttribute('data-color')
    })
})

//EXO 9
const textToDisplay9 = document.querySelector('.text-to-display-9')
const checkboxes = document.querySelectorAll('.checkbox')

checkboxes.forEach((el) => {
    el.addEventListener('change', (e) => {
        textToDisplay9.textContent = `${checkboxes[0].checked ? checkboxes[0].value : ''}${checkboxes[0].checked && checkboxes[1].checked ? ' - ' : ''}${checkboxes[1].checked ? checkboxes[1].value : ''}`
    })
})