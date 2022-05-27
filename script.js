/*
Iniziamo col capirci qualcosa.
Facciamo prima delle funzioni con le operazioni di base
nel console.log

poi
dove l'user può inserire i numeri

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
  "÷"


  FIXME: prevenire che si rompa il tutto quando mettono troppi numeri;
  FIXME: prevenire che quando premi 34098 volte uguale non succede nulla e solo
  la prima volta esegue il task;
*/

// || COMPONENT ||
const espression = document.querySelector("#espression");
const inputNumber = document.querySelector("#input-number");

const clear = document.querySelector("#clear");
const cancel = document.querySelector("#delete");
const positiveOrNot = document.querySelector("#negative-positive");

const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");

console.log(operators);

let x = 15;
let y = 5;
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
