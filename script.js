/*
TODO:

1 - Per la mappatura dei tasti, fai funzionare solo quelli che servono alla calcolatrice: i numeri da 0 a 9, ESC === AC, DELETE ARROW === DELETE.
  i segni matematici, e ENTER === uguale

  2.1 FIXME: Come tolgo l'alone di focus quando premo enter?

2 - Refactoring di tutte le cose che sono doppie di n1 e n2, crei una funzione che prende un argomento value e poi quando andiamo a premere
un tasto, in quella funzione a determinate condizioni con if che stanno già settati andremo a mettere la funzione che fa quel derterminato compito
e come argomento andremo a settare il risultato dell'if, quindi n1 se rispetta le condizioni di n1 e n2 se rispetta le condizioni di n2

Quelli da fare sarebbero (se non ricordi come fare, pensaci un po' e ti verrà, alla fine devi passare sempre e solo n1 o n2):
  deleteClick(),numberClick(), pointClick() e mi sa, positive_negative();
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
cancel.addEventListener("click", deleteClick);

// Click btn +/-
positiveOrNot.addEventListener("click", positive_negative);

// Click btn numbers
numbers.forEach((number) => number.addEventListener("click", numberClick));

// Click btn .
point.addEventListener("click", pointClick);

// Click btn operator
operators.forEach((operator) => operator.addEventListener("click", operatorClick));

// Click btn equals
equals.addEventListener("click", equalsClick);

// Funzionamento tastiera
window.addEventListener("keydown", keybordOperations);

function keybordOperations(e) {
  //FIXME:
  e.preventDefault();

  if (e.key >= 0 && e.key <= 9) {
    numberClick(e);
  }

  switch (e.key) {
    case "=":
    case "Enter":
      equalsClick();
      break;

    case "Backspace":
      deleteClick();
      break;

    case "Escape":
      clearAll();
      break;

    case ".":
      pointClick();
      break;

    case "F9":
      positive_negative();
      break;

    case "+":
    case "-":
    case "*":
    case "/":
      operatorClick(e);
  }
}

let n1 = "";
let n2 = "";
let result = null;
let operator = "";
let resultChecker = false;

function setN1(value) {
  n1 = value;
}

function setN2(value) {
  n2 = value;
}

function setResult(value) {
  result = value;
}

function setOperator(value) {
  operator = value;
}

function setResultChecker(value) {
  resultChecker = value;
}

function setExpressionTxt(txt) {
  expression.innerText = txt;
}

function setInputNumberTxt(txt) {
  inputNumber.innerText = txt;
}

function deleteClick() {
  // Funziona per N1
  if (operator === "" && n1.length > 0) {
    let lastN = n1.length - 1;
    setN1(n1.slice(0, lastN));

    // Solo visivo
    if (n1.length === 0) {
      setInputNumberTxt(0);
    } else {
      setInputNumberTxt(n1);
    }
    // Funziona per N2
  } else if (operator !== "" && n2.length > 0) {
    let lastN = n2.length - 1;
    setN2(n2.slice(0, lastN));

    // Solo visivo
    if (n2.length === 0) {
      setInputNumberTxt(0);
    } else {
      setInputNumberTxt(n2);
    }
  }
}

function clearAll() {
  setN1("");
  setN2("");
  setResult(null);
  setOperator("");
  setResultChecker(false);

  setExpressionTxt("");
  setInputNumberTxt(0);
}

function numberClick(e) {
  // Primo numero
  if (operator === "" && n1.length < 13) {
    if (e.type === "click") {
      n1 += e.target.innerText;
    } else {
      n1 += e.key;
    }

    setInputNumberTxt(n1);
    // Secondo numero
  } else if (operator !== "" && n2.length < 13) {
    if (e.type === "click") {
      n2 += e.target.innerText;
    } else {
      n2 += e.key;
    }

    setInputNumberTxt(n2);
  }

  if (result !== null) {
    setResult(null);
  }

  if (resultChecker) {
    setResultChecker(false);
  }
}

function operatorClick(e) {
  if (n1 !== "" && n2 !== "") {
    equalsClick();
  }

  if (result !== null) {
    setN1(result);
  }

  if (n1 === "" && result === null) {
    setN1("0");
  }

  if (e.type === "click") {
    setOperator(e.target.innerText);
  } else {
    setOperator(e.key);
    convertOperator(operator);
  }

  setExpressionTxt(`${n1} ${operator}`);
  setInputNumberTxt(0);
}

function equalsClick() {
  if (!resultChecker && n2 !== "") {
    if (n2 === "0" && operator === "÷") {
      alert("You can't divide by 0.");
      clearAll();
      return;
    }

    operate(+n1, +n2, operator);

    roundAndExponential(operator);

    setExpressionTxt(`${n1} ${operator} ${n2} =`);
    setInputNumberTxt(result);

    setN1("");
    setN2("");
    setOperator("");
    setResultChecker(true);
  }
}

function roundAndExponential(operator) {
  let stringResult = String(result);

  if (operator === "×") {
    // Arrotondiamo il numero se contiene il . dato che i numeri molto grandi hanno il . nel result
    if (stringResult.includes(".")) {
      setResult(Math.round(result * 1000) / 1000);
      stringResult = String(result);
    }

    // Qui trasformiamo in un numero con la e (notazione scientifica)
    if (stringResult.length > 12) {
      setResult(result.toExponential(4));
    }
  } else if (operator === "+") {
    // Per evitare che un n basso col . + n faccia un numero in notazione scientifica
    if (stringResult.includes(".")) {
      setResult(Math.round(result * 1000) / 1000);
      stringResult = String(result);
    }

    // Rende il risultato in notazione scentifica
    if (stringResult.length > 12) {
      setResult(result.toExponential(4));
    }
  } else if (stringResult.length > 12 && stringResult.includes(".")) {
    // Invece qui si tratta se sono divisioni o sottrazioni, arrotondiamo solamente
    setResult(Math.round(result * 1000) / 1000);
  }
}

function pointClick() {
  // Funziona per N1
  if (operator === "" && n1.length < 13 && !n1.includes(".")) {
    if (n1 === "") {
      n1 += "0.";
    } else {
      n1 += ".";
    }

    setInputNumberTxt(n1);

    // Funziona per N2
  } else if (operator !== "" && n2.length < 13 && !n2.includes(".")) {
    if (n2 === "") {
      n2 += "0.";
    } else {
      n2 += ".";
    }

    setInputNumberTxt(n2);
  }
}

function positive_negative() {
  // Funziona per N1
  if (operator === "" && n1 !== "") {
    if (!n1.includes("-")) {
      setN1("-" + n1);
    } else if (n1.includes("-")) {
      setN1(n1.replace("-", ""));
    }

    setInputNumberTxt(n1);

    // Funziona per N2
  } else if (operator !== "" && n2 !== "") {
    if (!n2.includes("-")) {
      setN2("-" + n2);
    } else if (n2.includes("-")) {
      setN2(n2.replace("-", ""));
    }

    setInputNumberTxt(n2);

    // Trasformiamo il risultato
  } else if (result !== null) {
    let stringResult = String(result);

    if (!stringResult.includes("-")) {
      setResult("-" + stringResult);
    } else if (stringResult.includes("-")) {
      setResult(stringResult.replace("-", ""));
    }

    // Andiamo ad evitare eventuali bug visivi
    if (n1 === "") {
      setInputNumberTxt(result);
    }
  }
}

function sum(x, y) {
  setResult(x + y);
}

function sub(x, y) {
  setResult(x - y);
}

function mult(x, y) {
  setResult(x * y);
}

function div(x, y) {
  setResult(x / y);
}

function convertOperator(operator) {
  switch (operator) {
    case "*":
      setOperator("×");
      break;

    case "/":
      setOperator("÷");
      break;
  }
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
