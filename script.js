/*
TODO:
Suddiviadiamo tutto in piccoli task

FIXME: Ricorda che quello che vede l'utente può essere completamente diverso da quello che succede dietro le quinte

1 - Per ogni tasto premuto noi prenderemo il e.value/innerText (il numero) il quale sarà aggiunto come stringa all'interno di temp che dovrà
essere aggiunta pian piano ogni volta che si preme un numero.

  1.1 - Ergo creiamo una funzione che prende il click dei tasti e ad ogni click aggiunge il valore del tasto nella stringa temp, ricorda che dovrà
  essere poi trasformato in numero quando faremo le operazioni e ci servirà il risultato.

  1.2 Quando premeremo un tasto verrà mostrata a schermo anche la stringa che si sta formando piano piano, quindi oltre a mettere i numeri nella stringa
  andremo anche ad aggiornare l'innerText di inputNumber con temp stesso(che contiene il nostro numero che sta prendendo forma), ogni volta

2 - Quando premiamo un operatore il valore totale della nostro temp dovrà essere copiato e trasformato in numero per poi essere messo in x, e l'operatore che abbiamo
premuto dovrà mettere il suo innerText allinterno della variabile operator

  2.1 - Andremo a mostrare quindi la x e l'operatore che utilizziamo, ogni volta che poi cambiamo operatore non dovrebbe succedere nulla, perchè
  il numero che verrà sostituito sarà sempre uguale, ma dovremo poi cambiare operatore ogni volta, quindi magari con un template literal andremo 
  a costruire la string da mostrare come `${x} ${operator}` (Tanto non ci importa che sia una string, alla fine è solamente estetico per l'user)

  2.2 - Quando premeremo un nuovo numero andremo a cancellare il precedente valore di x facendola ritornare ad essere una stringa vuota e
  andremo a mettere i nuovi numeri in questa variabile.

  2.3 - FIXME: (Avanzata) Se premiamo nuovamente un operatore verrà eseguita immediatamente l'operazione, la stringa mostrante le operazioni sarà poi formata da
  `${result} ${operator}` e il numero che vedremo in inputNumber sarà lo stesso risultato, e se premiamo uguale non succede nulla, perchè abbiamo solo un numero,
  cioè il risultato della precedente operazione

  2.4 - FIXME: (Avanzata) L'inputNumber potrà essere formato solo da un tot di cifre massimo 4/5 coppie di 3 numeri, altrimenti
  manda tutta la grafica a quel paese

3 - Quando premiamo = la seconda stringa che abbiamo creato in temp dovrà essere passata sotto forma di numero ad y,
e chiamerà la funzione operazione che andrà a chiamare la x la y e l'operatore che abbiamo già salvato,
utilizzerà lo switch e in base all'operatore andrà ad eseguire un operazione e il numero restante sarà messo in result.
Quello che succederà a schermo sarà il result che compare nel nostro inputNumber mentre l'espression sarà formattata come segue:
`${x} ${operator} ${y} =`

  3.1 - Se premiamo uguale subito dopo aever eseguito un'operazione o se c'è un solo numero non dovrebbe succedere nulla

  3.2 - Prevenire che quando premi 34098 volte uguale non succede nulla e solo
  la prima volta esegue il task

4 - FIXME: (Avanzata)Quando premiamo il +/- trasforma il nostro risultato, devo capire cosa succede

5 - FIXME: (Avanzata)Quando premiamo il punto devo capire come avere a che fare con i numeri con la virgola (non so se c'è bisogno di costruire
una funzione al click solo per lui, e di conseguenza rimuovere la clas number nell'html e aggiustare anche il css)



QUANDO crei i btn click per i tasti
prendi il textcontent o quel che è per mettere il numero al
senza che crei un btn click per ogni tasto per il valore, ne fai uno unico
che va a prendere il valore
fai un querySelectorAll di tutti i .number e for each metti un click che prende appunto il valore
numbers.innerText

stessa cosa per l'operatore che si va a selezionare

i quali poi andranno a essere messi allinterno di firstN
secondN
e di operator

  
*/

// || COMPONENT ||
const espression = document.querySelector("#espression");
const inputNumber = document.querySelector("#input-number");

const clear = document.querySelector("#clear");
const cancel = document.querySelector("#delete");
const positiveOrNot = document.querySelector("#negative-positive");
const equal = document.querySelector("#equal");

const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");

let n1 = "";
let n2 = "";
let temp = "";
let operator = "";
let result = 0;

function sum(x, y) {
  result = x + y;
}

function sub(x, y) {
  result = x - y;
}

function mult(x, y) {
  result = x * y;
}

function div(x, y) {
  result = x / y;
}

function operate(x, y, operator) {
  switch (operator) {
    case "+":
      sum(x, y);
      break;

    case "-":
      sub(x, y);
      break;

    case "*":
      mult(x, y);
      break;

    case "/":
      div(x, y);
      break;

    case "=":
      "boh";
      break;
  }
}
