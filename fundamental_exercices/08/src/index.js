import { getMyParent, getMyAge } from "./utils.js";
import principale from "./main.js";
import { maVariable, mySurname as nomDeFamille } from "./data.js";

let myFather = getMyParent(true);
console.log(myFather);

principale();

console.log(maVariable);
console.log(nomDeFamille);