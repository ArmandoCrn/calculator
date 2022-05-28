/*
TODO:

1 - FIXME: (Avanzata)Quando premiamo il +/- trasforma il nostro risultato, IN TEORIA L'HO FATTO CONTROLLARE DOMANI SE TUTTO FUNZIONA FINO A QUESTO PUNTO

2 - FIXME: (Avanzata)Quando premiamo il punto devo capire come avere a che fare con i numeri con la virgola (non so se c'è bisogno di costruire
una funzione al click solo per lui, e di conseguenza rimuovere la clas number nell'html e aggiustare anche il css)

  2.1 Si può premere solamente una volta il punto, lasciare così per quanto riguarda la length dei numeri comparsi a schermo (.includes)


3 - Per la mappatura dei tasti, fai funzionare solo quelli che servono alla calcolatrice: i numeri da 0 a 9, ESC === AC, DELETE ARROW === DELETE.
  i segni matematici, e ENTER === uguale


4 - TODO: Refactoring del progetto, e cioè vado a creare una funzione un po' più grande che prende diversi input,
  in base all'input andrà a chiamare una funzione, così che non ripeteremo ogni volta il expression/inputNumber.innerText;
  LESS IS MORE. Don'tRepeatYourself, DRY, DRY!

  function refreshInterface(a, b) {
  inputNumber.innerText = a;
  expression.innerText = b;
}

function cleanValues() {
  n1 = "";
  n2 = "";
  temp = "";
  operator = "";
  result = 0;
}

*/

// || COMPONENTS ||
const expression = document.querySelector("#expression");
const inputNumber = document.querySelector("#input-number");

const clear = document.querySelector("#clear");
const cancel = document.querySelector("#delete");
const positiveOrNot = document.querySelector("#negative-positive");
const equals = document.querySelector("#equals");

const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");

// Click btn AC
clear.addEventListener("click", clearAll);
//Praticamente va a resettare sia temp, che n1 e n2 in stringe vuote

// Click btn C
cancel.addEventListener("click", deleteTemp);

positiveOrNot.addEventListener("click", positive_negative);

// Click btn numbers
numbers.forEach((number) => number.addEventListener("click", numberClick));

// Click btn operator
operators.forEach((operator) => operator.addEventListener("click", operatorClick));

// Click btn equals
equals.addEventListener("click", equalsClick);

let n1 = "";
let n2 = "";
let temp = "";
let operator = "";
let result = 0;
let resultChecker = false;

function numberClick(e) {
  if (temp.length < 14) {
    temp += e.target.innerText;

    inputNumber.innerText = temp;
  }
}

function deleteTemp() {
  // Equivale a (temp !== ""), perche "" === false, e quindi quando conterrà qualcosa, diverrà true
  if (temp) {
    let lastN = temp.length - 1;
    temp = temp.slice(0, lastN);

    if (temp.length === 0) {
      inputNumber.innerText = 0;
    } else {
      inputNumber.innerText = temp;
    }
  }
}

function clearAll() {
  n1 = "";
  n2 = "";
  temp = "";
  operator = "";
  result = 0;

  expression.innerText = "";
  inputNumber.innerText = 0;
}

function operatorClick(e) {
  // Quando una stringa vuota viene trasformata in un numero, diventa 0
  if (n1 === "") {
    n1 = +temp;
  }

  if (operator !== "") {
    equalsClick();
  }

  // if e.target.innertext === operator return
  temp = "";
  operator = e.target.innerText;

  expression.innerText = `${n1} ${operator}`;
  inputNumber.innerText = 0;
}

function equalsClick() {
  if (n1 !== "" && temp !== "") {
    n2 = +temp;

    if (n2 === 0 && operator === "÷") {
      alert("You can't divide by 0.");
      n1 = "";
      n2 = "";
      temp = "";
      operator = "";
      result = 0;
      expression.innerText = "";
      inputNumber.innerText = 0;
      return;
    }

    operate(n1, n2, operator);

    let stringResult = String(result);

    if (stringResult.length > 13 && operator === "÷") {
      result = Math.round(result * 1000) / 1000;
    } else if (stringResult.length > 12) {
      result = result.toExponential(4);
    }

    expression.innerText = `${n1} ${operator} ${n2} =`;
    inputNumber.innerText = result;
    n1 = result;
    result = 0;
    n2 = "";
    temp = "";
    operator = "";
    resultChecker = true;
  }
}

function positive_negative() {
  if (temp !== "") {
    if (!temp.includes("-")) {
      temp = "-" + temp;
    } else if (temp.includes("-")) {
      temp = temp.replace("-", "");
    }

    inputNumber.innerText = temp;
  } else if (resultChecker) {
    n1 = String(n1);
    resultChecker = false;

    if (!n1.includes("-")) {
      n1 = "-" + n1;
    } else if (n1.includes("-")) {
      n1 = n1.replace("-", "");
    }

    n1 = +n1;
    inputNumber.innerText = n1;
  }
}

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

    case "×":
      mult(x, y);
      break;

    case "÷":
      div(x, y);
      break;
  }
}
