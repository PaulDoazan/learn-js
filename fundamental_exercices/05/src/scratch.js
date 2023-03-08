let myAge = 34;
let myName = 'Paul'
let part1 = "Je m'appelle"
let part2 = "et j'ai"
let part3 = "ans."
// let maChaineDeCaractere = part1 + ' ' + myName + ' ' + part2 + ' ' + myAge + ' ' + part3;
let maChaineDeCaractere = `${part1} ${myName}, ${part2} ${myAge} ${part3}`;

let arr = [2, 3, 4, 5]
let total = 12;

arr.forEach((elementCourant) => {
    total += elementCourant
})

console.log(total);