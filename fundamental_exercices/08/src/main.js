export default function principale() {
    console.log('Je suis dans ma fonction principale !')
    return retourneUnNombreFoisDeux(4)
}

export function retourneUnNombreFoisDeux(nb) {
    return nb * 2
}

export function getMyName() {
    return 'Alex';
}
