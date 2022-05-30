/*
TODO:

2 - Per la mappatura dei tasti, fai funzionare solo quelli che servono alla calcolatrice: i numeri da 0 a 9, ESC === AC, DELETE ARROW === DELETE.
  i segni matematici, e ENTER === uguale


3 - TODO: Refactoring del progetto, e cioè vado a creare una funzione un po' più grande che prende diversi input,
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
const point = document.querySelector("#point");

const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");

// Click btn AC
clear.addEventListener("click", clearAll);

// Click btn C
cancel.addEventListener("click", deleteTemp);

// Click btn +/-
positiveOrNot.addEventListener("click", positive_negative);

// Click btn numbers
numbers.forEach((number) => number.addEventListener("click", numberClick));

// Click btn .
point.addEventListener("click", pointClick);

function pointClick(e) {
  if (temp.length < 13 && !temp.includes(".")) {
    if (temp === "") {
      temp += "0" + e.target.innerText;
    } else {
      temp += e.target.innerText;
    }

    inputNumber.innerText = temp;
  }
}

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
  if (temp.length < 13) {
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

    if (stringResult.length > 12 && operator === "×") {
      // Arrotondiamo il numero se contiene il . dato che i numeri molto grandi hanno il . nel result
      if (stringResult.includes(".")) {
        result = Math.round(result * 1000) / 1000;
      }

      // Qui trasformiamo in un numero con la e (notazione scientifica)
      result = result.toExponential(4);
    } else if (stringResult.length > 12 && operator === "+") {
      // Per evitare che un n basso col . + n faccia un numero in notazione scientifica
      if (stringResult.includes(".")) {
        result = Math.round(result * 1000) / 1000;
      }

      // Rende il risultato in notazione scentifica
      if (stringResult.indexOf("." > 3)) {
        result = result.toExponential(4);
      }
    } else if (stringResult.length > 12 && stringResult.includes(".")) {
      // Invece qui si tratta se sono divisioni o sottrazioni, arrotondiamo solamente
      result = Math.round(result * 1000) / 1000;
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
  //Per farlo funzionare regolarmente
  if (temp !== "") {
    if (!temp.includes("-")) {
      temp = "-" + temp;
    } else if (temp.includes("-")) {
      temp = temp.replace("-", "");
    }

    inputNumber.innerText = temp;
  } else if (resultChecker) {
    // Per farlo funzionare trasformando il risultato,
    //ma funziona solo una volta grazie al resultChecker
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
