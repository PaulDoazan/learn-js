import movies from "./movies.json" assert { type: 'json' };

init()

function init() {
    let result = getAllTitles(movies)
    console.log(result);
}

// a. Logger le premier element du tableau movies
// b. Logger l'annee du 4eme element du tableau movies
// c. Logger le titre du dernier element du tableau movies
// d. Logger le titre du film qui a la meilleure note
// e. Logger le titre du film le plus ancien
// f. Logger tous les titres de film qui ont au moins 3 acteurs

// 1. Ecrire une fonction qui prend en parametre le tableau movies et qui retourne un nouveau tableau de tous les titres de films
// 2. Ecrire une fonction qui prend en parametre une annee et un tableau (movies), et qui retourne un nouveau tableau de titres de film de l'annee specifiee
// 3. Ecrire une fonction qui prend en parametre un realisateur et un tableau (movies), et qui retourne un nouveau tableau de tous les titres de films de ce realisateur


