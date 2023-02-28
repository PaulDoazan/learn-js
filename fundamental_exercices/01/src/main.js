const colors = ['#063c77', '#f19648', '#f5d259', '#d84f35']

let cities = [
    {
        name: 'Paris',
        superficy: 104.5,
        population: 10858874
    },
    {
        name: 'Londres',
        superficy: 1572,
        population: 8908081
    },
    {
        name: 'Madrid',
        superficy: 608,
        population: 3280782
    },
    {
        name: 'Lisbonne',
        superficy: 100.05,
        population: 509515
    },
    {
        name: 'Rome',
        superficy: 2213,
        population: 2844395
    },
    {
        name: 'Berlin',
        superficy: 891.7,
        population: 3748148
    },
    {
        name: 'Moscou',
        superficy: 2542,
        population: 12655050
    },
    {
        name: 'Varsovie',
        superficy: 546,
        population: 1793579
    },
    {
        name: 'Copenhague',
        superficy: 292,
        population: 1345562
    },
    {
        name: 'Dublin',
        superficy: 318,
        population: 1173179
    }
]

// Logger la moyenne de population de toutes les villes
// moyenne = TOTAL / nombreDeVilles

export default function main(stage) {
    let total = 0;
    for (let indice = 0; indice < cities.length; indice++) {
        let city = cities[indice];
        total += city.population;
    }

    let moyenne = Math.round(total / cities.length);
    //Logger tous les noms de ville dont la population est au-dessus de la moyenne

    let bigCities = [];

    for (let j = 0; j < cities.length; j++) {
        if (cities[j].population > moyenne) {
            bigCities.push(cities[j])
        }
    }
    console.log(bigCities);

    //Logger un tableau des villes dont la superficie est inférieure à la moye 

    // let smallestCity = cities[0];
    // for (let n = 1; n < cities.length; n++) {
    //     let valeurCourantedeCities = cities[n]
    //     if (valeurCourantedeCities.population < smallestCity.population) {
    //         smallestCity = valeurCourantedeCities;
    //     }
    // }
    // console.log(smallestCity.name);
}