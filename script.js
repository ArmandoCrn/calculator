/*
Iniziamo col capirci qualcosa.
Facciamo prima delle funzioni con le operazioni di base
nel console.log

poi
dove l'user può inserire i numeri


  "÷"

*/

let firstN = 15;
let secondN = 5;
result = 0;

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
  }
}

console.log(result);
operate(firstN, secondN, "%");
console.log(result);
