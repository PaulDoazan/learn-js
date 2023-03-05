let pizzas = [
    {
        name: 'Margherita',
        price: 11.50,
        ingredients: ['mozzarella', 'tomate', 'basilic ', "huile d'olive"],
        baseTomate: true
    },
    {
        name: 'Regina',
        price: 12,
        ingredients: ['mozzarella', 'tomate', 'origan', 'jambon', 'champignons'],
        baseTomate: true
    },
    {
        name: '4 saisons',
        price: 15,
        ingredients: ['artichaut', 'courgette', 'poivron', 'mozzarella', 'oignon rouge'],
        baseTomate: true
    },
    {
        name: 'Napolitaine',
        price: 14,
        ingredients: ['tomate', 'mozzarella', 'anchois', 'olives noires', 'origan'],
        baseTomate: true
    },
    {
        name: '4 fromages',
        price: 16,
        ingredients: ['tomate', 'mozzarella', 'emmental', 'comté', 'roquefort'],
        baseTomate: true
    },
    {
        name: 'Montagnarde',
        price: 19,
        ingredients: ['mozzarella', 'reblochon', 'gruyère', 'oignon', 'champignons'],
        baseTomate: false
    },
    {
        name: 'Chèvre-miel',
        price: 18,
        ingredients: ['mozzarella', 'chèvre', 'miel'],
        baseTomate: false
    },
    {
        name: 'Hawaïenne',
        price: 17,
        ingredients: ['mozzarella', 'tomate', 'jambon', 'ananas'],
        baseTomate: true
    }
]

// console.log(le nom de la derniere pizza)
// --> console.log(pizzas[pizzas.length - 1].name)
// console.log(tous les ingredients de la premiere pizza)
// let margherita = pizzas[0];
//     margherita.ingredients
//     for (let i = 0; i < margherita.ingredients.length; i++) {
//         console.log(margherita.ingredients[i])
//     }

// ecrire une fonction qui prend en parametre un tableau, cette fonction retourne tous les .name des elements du tableau dans un tableau names[]
function getAllNames(tableau) {
    let names = [];
    for (let i = 0; i < tableau.length; i++) {
        names.push(tableau[i].name);
    }
    return names;
}

export default function main() {
    let result = getPizzasByIngredient('champignons')
    console.log(result);
}

// 1. Ecrire une fonction qui prend en parametre le tableau pizzas et qui retourne le prix moyen des pizzas
function getAveragePrice(tab) {
    let totalPrices = 0;
    for (let i = 0; i < tab.length; i++) {
        totalPrices += tab[i].price;
    }
    // calculer la moyenne
    let avgPrice = (totalPrices / tab.length).toFixed(2);
    return avgPrice;
}

// 2. Ecrire une fonction qui prend en parametre un nom de pizza et qui retourne un tableau des ingredients de cette pizza
function getIngredients(pizzaName) {
    let pizzaCiblee;
    for (let i = 0; i < pizzas.length; i++) {
        if (pizzas[i].name == pizzaName) {
            pizzaCiblee = pizzas[i];
        }
    }
    let ingredientsCibles = pizzaCiblee.ingredients
    return ingredientsCibles;
    // if (pizzaCiblee) {
    //     let ingredientsCibles = pizzaCiblee.ingredients
    //     return ingredientsCibles;
    // }
}

// 3. Ecrire une fonction qui prend en parametre un tableau de pizzas et qui retourne un tableau de tous les ingredients, 
//    en evitant les elements dupliques
function getAllIngredients(arr) {
    let allIngredients = [];
    // Dqns un premier temps, on parcourt chaque pizza du tableau pizzas
    for (let i = 0; i < arr.length; i++) {
        let pizzaCiblee = arr[i];
        // dans un deuxieme temps, on parcourt chaque ingredient de chaque pizza, on se retrouve donc avec une boucle dans une boucle
        for (let j = 0; j < pizzaCiblee.ingredients.length; j++) {
            let ingredientCible = pizzaCiblee.ingredients[j]
            if (!allIngredients.includes(ingredientCible)) {
                allIngredients.push(ingredientCible);
            }
        }
    }
    return allIngredients;
}

// 4. Ecrire une fonction qui prend en parametre un ingredient et qui retourne un tableau des noms des pizzas qui ont cet ingredient
function getPizzasByIngredient(ingredient) {
    let pizzasWithIngredients = [];
    for (let i = 0; i < pizzas.length; i++) {
        let pizzaCiblee = pizzas[i];
        if (pizzaCiblee.ingredients.includes(ingredient)) {
            pizzasWithIngredients.push(pizzaCiblee.name)
        }
    }
    return pizzasWithIngredients;
}