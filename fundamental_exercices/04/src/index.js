import games from "./games.json" assert { type: 'json' };

init()

function init() {
    let result = getAllTitles(games)
    console.log(result);
}

// a. Logger le premier element du tableau games
// b. Logger l'annee du 3eme element du tableau games
// c. Logger le titre du dernier element du tableau

// 1. Ecrire une fonction qui prend en parametre le tableau games et qui retourne un nouveau tableau de tous les noms de jeux (.title)
function getAllTitles(arr) {
    let newArray = [];
    // for (let i = 0; i < arr.length; i++) {
    //     let currentTitle = arr[i].title;
    //     newArray.push(currentTitle);
    // }
    arr.forEach(item => newArray.push(item.title))
    return newArray;
    // reecrire la boucle avec un .forEach()
}
// 2. Ecrire une fonction qui prend en parametre une annee et un tableau (games), et qui retourne un nouveau tableau de noms de jeux de l'annee specifiee
function getTitlesByYear(y, arr) {
    let newArray = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i].year === y) {
            newArray.push(arr[i].title)
        }
    }

    return newArray;
}
// 3. Ecrire une fonction qui prend en parametre un tableau (games) retourne un tableau de noms de jeux, a condition que leur note soit superieur ou egal a 8
function getGamesNameByRate(tab) {
    let goodGamesNames = []

    for (let i = 0; i < tab.length; i++) {
        if (tab[i].rate > 8) {
            goodGamesNames.push(tab[i].title)
        }
    }

    return goodGamesNames;
}
// 4. Ecrire une fonction qui prend en parametre une console et un tableau (games), et qui retourne un nouveau tableau de tous les jeux disponibles sur cette console
function getAvailableGamesByDevice(device, arr) {
    let availableGames = [];

    // for (let i = 0; i < arr.length; i++) {
    //     let currentGame = arr[i];
    //     if (arr[i].devices.includes(device)) {
    //         availableGames.push(currentGame.title)
    //     }
    // }

    // fonction fléchée : () => {}
    arr.forEach((el) => {
        if (el.devices.includes(device)) availableGames.push(el.title)
    })

    return availableGames;
}

