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

// Logger la somme des populations de Paris et Dublin !

export default function main(stage) {
    let total = 0;
    for (let indice = 0; indice < cities.length; indice++) {
        let city = cities[indice];
        total += city.population;
    }

    console.log(total);
}