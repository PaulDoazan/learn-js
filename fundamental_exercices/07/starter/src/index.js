// EXO 1
const btns = document.querySelectorAll('.btn-1')
const result1 = document.querySelector('.result-1')

btns.forEach((element) => {
    element.addEventListener('click', (e) => {
        result1.style.backgroundColor = e.target.textContent
    })
})

// EXO 2
const input2 = document.querySelector('.input-2')
const result2 = document.querySelector('.result-2')

input2.addEventListener('input', (e) => {
    result2.textContent = e.target.value
})

// EXO 3
const input3 = document.querySelector('.input-3')
const btn3 = document.querySelector('.btn-3')
const btn3bis = document.querySelector('.btn-3bis')
const container3 = document.querySelector('.container-3')

btn3.addEventListener('click', (e) => {
    let newDiv = document.createElement("p");
    newDiv.textContent = input3.value;
    container3.appendChild(newDiv)
})

btn3bis.addEventListener('click', (e) => {
    container3.removeChild(container3.lastChild)
})

// EXO 4
const form4 = document.querySelector('.form-4')
const input4a = document.querySelector('.input-4a')
const input4b = document.querySelector('.input-4b')
const result4 = document.querySelector('.result-4')

form4.addEventListener('submit', (e) => {
    e.preventDefault();
    result4.textContent = `${input4a.value} -- ${input4b.value}`
})

// EXO 5
const input5 = document.querySelector('.input-5')
const result5 = document.querySelector('.result-5')

input5.addEventListener('input', (e) => {
    result5.textContent = e.target.value
})

// EXO 6
const select = document.querySelector('#language-select')
const result6 = document.querySelector('.result-6')

select.addEventListener('change', (e) => {
    result6.textContent = e.target.value
})

// EXO 7
const input7 = document.querySelector('.input-7')
const result7 = document.querySelector('.result-7')

input7.addEventListener('input', (e) => {
    result7.style.backgroundColor = e.target.value
})

// EXO 8
const btns8 = document.querySelectorAll('.btn-8')
const result8 = document.querySelector('.result-8')

btns8.forEach((el) => {
    el.addEventListener('click', (e) => {
        result8.style.backgroundColor = e.target.getAttribute('data-color')
    })
})

// EXO 9
const checkboxes = document.querySelectorAll('.checkbox-9');
const result9 = document.querySelector('.result-9')

checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', (e) => {
        let value1 = checkboxes[0].checked ? checkboxes[0].value : ''
        let value2 = checkboxes[1].checked ? checkboxes[1].value : ''
        let traitDunion = checkboxes[0].checked && checkboxes[1].checked ? ' - ' : ''

        result9.textContent = `${value1}${traitDunion}${value2}`
        // result9.textContent = `${checkboxes[0].checked ? checkboxes[0].value : ''} ${(checkboxes[0].checked && checkboxes[1].checked) ? '- ' : ''}${checkboxes[1].checked ? checkboxes[1].value : ''}`
    })
})