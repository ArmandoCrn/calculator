/*
TODO:

2 - Per la mappatura dei tasti, fai funzionare solo quelli che servono alla calcolatrice: i numeri da 0 a 9, ESC === AC, DELETE ARROW === DELETE.
  i segni matematici, e ENTER === uguale

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

// Click btn operator
operators.forEach((operator) => operator.addEventListener("click", operatorClick));

// Click btn equals
equals.addEventListener("click", equalsClick);

let n1 = "";
let n2 = "";
let temp = "";
let result = 0;
let operator = "";
let resultChecker = false;

function setN1(value) {
  n1 = value;
}

function setN2(value) {
  n2 = value;
}

function setTemp(value) {
  temp = value;
}

function setResult(value) {
  result = value;
}

function setOperator(value) {
  operator = value;
}

function setExpressionTxt(txt) {
  expression.innerText = txt;
}

function setInputNumberTxt(txt) {
  inputNumber.innerText = txt;
}

function numberClick(e) {
  if (temp.length < 13) {
    temp += e.target.innerText;

    setInputNumberTxt(temp);
  }
}

function deleteTemp() {
  // Equivale a (temp !== ""), perche "" === false, e quindi quando conterrà qualcosa, diverrà true
  if (temp) {
    let lastN = temp.length - 1;
    setTemp(temp.slice(0, lastN));

    if (temp.length === 0) {
      setInputNumberTxt(0);
    } else {
      setInputNumberTxt(temp);
    }
  }
}

function clearAll() {
  setN1("");
  setN2("");
  setTemp("");
  setResult(0);
  setOperator("");

  setExpressionTxt("");
  setInputNumberTxt(0);
}

function operatorClick(e) {
  // Quando una stringa vuota viene trasformata in un numero, diventa 0
  if (n1 === "") {
    setN1(+temp);
  }

  if (operator !== "") {
    equalsClick();
  }

  // if e.target.innertext === operator return
  setTemp("");
  setOperator(e.target.innerText);

  setExpressionTxt(`${n1} ${operator}`);
  setInputNumberTxt(0);
}

function equalsClick() {
  if (n1 !== "" && temp !== "") {
    setN2(+temp);

    if (n2 === 0 && operator === "÷") {
      alert("You can't divide by 0.");
      clearAll();
      return;
    }

    operate(n1, n2, operator);

    roundAndExponential(operator);

    setExpressionTxt(`${n1} ${operator} ${n2} =`);
    setInputNumberTxt(result);

    setN1(result);
    setN2("");
    setTemp("");
    setResult(0);
    setOperator("");

    // Serve per aggiungere il punto al result
    resultChecker = true;
  }
}

function roundAndExponential(operator) {
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
}

function pointClick(e) {
  if (temp.length < 13 && !temp.includes(".")) {
    if (temp === "") {
      temp += "0" + e.target.innerText;
    } else {
      temp += e.target.innerText;
    }

    setInputNumberTxt(temp);
  }
}

function positive_negative() {
  //Per farlo funzionare regolarmente
  if (temp !== "") {
    if (!temp.includes("-")) {
      setTemp("-" + temp);
    } else if (temp.includes("-")) {
      setTemp(temp.replace("-", ""));
    }

    setInputNumberTxt(temp);
  } else if (resultChecker) {
    // Trasformiamo il risultato +/-, grazie al resultChecker, ma funziona solo una volta
    setN1(String(n1));
    resultChecker = false;

    if (!n1.includes("-")) {
      setN1("-" + n1);
    } else if (n1.includes("-")) {
      setN1(n1.replace("-", ""));
    }

    setN1(+n1);
    setInputNumberTxt(n1);
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
