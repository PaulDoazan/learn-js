import movies from "./movies.json" assert { type: 'json' };
import games from "./games.json" assert { type: 'json' };

init()

function init() {

    let result = getTitlesByDirector(movies, 'Christopher Nolan')
    console.log(result);
}

// a. Logger le premier element du tableau movies
// --> console.log(movies[0]);
// b. Logger l'annee du 4eme element du tableau movies
// --> console.log(movies[3].year);
// c. Logger le titre du dernier element du tableau movies
// --> console.log(movies[movies.length - 1].title);
// d. Logger le titre du film qui a la meilleure note
// function getBestElement(arr) {
//     let bestMovie = arr[0]
//     // for (let i = 0; i < arr.length; i++) {
//     //     if (arr[i].rate > bestMovie.rate) {
//     //         bestMovie = arr[i]
//     //     }
//     // }

//     arr.forEach((el) => {
//         if (el.rate > bestMovie.rate) {
//             bestMovie = el;
//         }
//     })
//     return bestMovie.title;
// }

// e. Logger le titre du film le plus ancien
function getOldestMovie(arr) {
    let oldestMovie = arr[0]

    arr.forEach((el) => {
        if (el.year < oldestMovie.year) {
            oldestMovie = el;
        }
    })

    return oldestMovie.title
}
// f. Logger tous les titres de film qui ont au moins 3 acteurs

function getMovieWithAtLeastThreeActors(arr) {
    let result = []
    arr.forEach((el) => {
        if (el.actors.length >= 3) {
            result.push(el.title)
            console.log(el.title)
        }
    })

    return result;
}

// 1. Ecrire une fonction qui prend en parametre le tableau movies et qui retourne un nouveau tableau de tous les titres de films
function getTitlesFromArray(arr) {
    return arr.map(el => el.title)

    // for (let i = 0; i < arr.length; i++) {
    //     titlesArr.push(arr[i].title)
    // }
}

// 2. Ecrire une fonction qui prend en parametre une annee et un tableau (movies), et qui retourne un nouveau tableau de titres de film de l'annee specifiee
function getTitlesFromArrayByYear(arr, year) {
    let arrTitleByYear = []
    arr.forEach((element) => {
        if (element.year === year) arrTitleByYear.push(element.title)
    })

    return arrTitleByYear;
    // let titlesByYear = []
    // for (let i = 0; i < arr.length; i++) {
    //     if (arr[i].year === year) {
    //         titlesByYear.push(arr[i].title)
    //     }
    // }
    // return titlesByYear;
}

// 3. Ecrire une fonction qui prend en parametre un realisateur et un tableau (movies), et qui retourne un nouveau tableau de tous les titres de films de ce realisateur
function getTitlesByDirector(arr, name) {
    let elementsByDirector = []
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].director === name) {
            elementsByDirector.push(arr[i].title)
        }
    }
    return elementsByDirector;
}