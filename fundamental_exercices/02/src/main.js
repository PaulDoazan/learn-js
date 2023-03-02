// let eleves_promo_fevrier = [
//     'Guillaume',
//     'Dounia',
//     'Stéphane',
//     'Lydiane'
// ]

// let eleves_promo_janvier = [
//     'Thomas',
//     'Pierre',
//     'Mélanie',
//     'Sophie',
//     'François'
// ]


// function maFonctionBasique(monTableauDeNomsEleves) {
//     let maPhrase = 'Bienvenue à vous '
//     for (let index = 0; index < monTableauDeNomsEleves.length; index++) {
//         let nomEleveCible = monTableauDeNomsEleves[index];
//         maPhrase += nomEleveCible;
//         let dernierIndex = monTableauDeNomsEleves.length - 1
//         if (index < dernierIndex) {
//             maPhrase += ' et '
//         }
//     }
//     maPhrase += ' !'
//     return maPhrase;
// }

// export default function main() {
//     let phraseDeBienvenueJanvier = maFonctionBasique(eleves_promo_janvier)
//     let phraseDeBienvenueFevrier = maFonctionBasique(eleves_promo_fevrier)
//     console.log(phraseDeBienvenueJanvier);
//     console.log(phraseDeBienvenueFevrier);
// }

// Reecrire la fonction maFonctionBasique pour retourner une phrase comme :
// "Les deux premiers eleves de la promo sont Guillaume et Dounia."

let eleves_promo_fevrier = [
    'Guillaume',
    'Dounia',
    'Stéphane',
    'Lydiane',
    'Pierre',
]

let eleves_promo_janvier = [
    'Thomas',
    'Pierre',
    'Mélanie',
    'Sophie',
    'François'
]

let eleves_promo_mars = [
    'Sylvain',
    'Michel',
    'Pierre',
    'Mélanie',
]

// function comparaisonDeTableaux(tab1, tab2) {
//     let smallArray;
//     if (tab1.length < tab2.length) {
//         smallArray = tab1
//     } else {
//         smallArray = tab2
//     }
//     return smallArray;
// }

// export default function main() {
//     let result = comparaisonDeTableaux(eleves_promo_mars, eleves_promo_janvier)
//     result.push('Etienne')
//     result.push('Paul')
//     result.push('Lisa')
//     result.pop()
//     result.pop()
//     console.log(result);
// }

// 1. ecrire une fonction qui retourne le plus petit des tableaux
// 2. ecrire une fonction qui retourne un tableau qui contient les noms des élèves de janvier et des élèves de février
// 3. ecrire une fonction qui retourne la phrase avec tous lers noms des eleves de fevrier et de janvier :
// "Bienvenue tout le monde : ..., ..., ... !"
// 4. ameliorer la fonction tableauTotal pour ne pas ajouter 2 fois le même nom
//         -> array.includes() eleves_promo_fevrier.includes('Stéphane') -> true

function tableauTotal(tab1, tab2) {
    let totalArray = []
    for (let i = 0; i < tab1.length; i++) {
        totalArray.push(tab1[i])
    }

    for (let i = 0; i < tab2.length; i++) {
        if (!totalArray.includes(tab2[i])) {
            totalArray.push(tab2[i])
        }
    }

    return totalArray;
}

function phraseComplete(arr1, arr2) {
    let totalArray = tableauTotal(arr1, arr2);
    let maPhrase = 'Bienvenue tout le monde : '
    for (let i = 0; i < totalArray.length; i++) {
        maPhrase += totalArray[i]
        if (i < totalArray.length - 1) {
            maPhrase += ', '
        } else {
            maPhrase += ' !'
        }
    }

    return maPhrase;
}

export default function main() {
    let uneBellePhraseBienConstruite = phraseComplete(eleves_promo_fevrier, eleves_promo_janvier);
    //total.push('Le dernier élève')
    //let total = eleves_promo_mars.concat(eleves_promo_fevrier);
    console.log(uneBellePhraseBienConstruite);
}