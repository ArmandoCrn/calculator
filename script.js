/*
TODO:

2 - Per la mappatura dei tasti, fai funzionare solo quelli che servono alla calcolatrice: i numeri da 0 a 9, ESC === AC, DELETE ARROW === DELETE.
  i segni matematici, e ENTER === uguale

  2.1 FIXME: Come tolgo l'alone di focus quando premo enter?

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
      deleteTemp();
      break;

    case "Escape":
      clearAll();
      break;

    //FIXME:
    case ".":
      "cose";
      break;
    //FIXME:
    case "F9":
      console.log("oauhydsgf");
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
let temp = "";
let result = null;
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

function setResultChecker(value) {
  resultChecker = value;
}

function setExpressionTxt(txt) {
  expression.innerText = txt;
}

function setInputNumberTxt(txt) {
  inputNumber.innerText = txt;
}

function deleteTemp() {
  // Equivale a (temp !== "" && temp), perche "" === false, e quindi quando conterrà qualcosa, diverrà true
  if (temp) {
    let lastN = temp.length - 1;
    setTemp(temp.slice(0, lastN));

    // Solo visivo
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
  setResult(null);
  setOperator("");
  // setResultChecker(false);

  setExpressionTxt("");
  setInputNumberTxt(0);
}

// function numberClick(e) {
//   if (result !== null) {
//     setResult(null);
//   }

//   // FIXME:
//   console.log({ n1, n2, temp, result, operator, resultChecker });

//   // setExpressionTxt("");

//   if (temp.length < 13) {
//     //se result !== null cancella expression text
//     if (e.type === "click") {
//       temp += e.target.innerText;
//     } else {
//       temp += e.key;
//     }

//     setInputNumberTxt(temp);
//   }
// }

function numberClick(e) {
  temp += e.target.innerText;

  console.log(temp);
  console.log({ n1, n2, temp, result, operator });
}

function operatorClick(e) {
  if (resultChecker) {
    setN1(result);

    console.log(n2);
    setResultChecker(false);
  } else {
    // FIXME: Funziona la concatenazione di operazioni quando si fa con uguale, ma quando fai
    // 3+3 + 5 + 8, non funziona, capisci perchè.
    if (n1 === "") {
      setN1(+temp);
    } else if (n2 === "") {
      setN2(+temp);
    }

    if (n1 !== "" && n2 !== "") {
      equalsClick();
      setN1(result);
    }
  }

  setTemp("");
  setOperator(e.target.innerText);

  console.log(operator);
  console.log({ n1, n2, temp, result, operator });
}

// function operatorClick(e) {
//   if (n1 === "") {
//     setN1(+temp);
//   } else if (n2 === "") {
//     setN2(+temp);
//   }

//   if (n2 !== "") {
//     //Per prendere il risultato e continuare ad operare
//     if (result !== null) {
//       setN1(result);
//       equalsClick();

//       console.log("2.0");
//     } else {
//       // Per multiple operazioni concatenate e non abbiamo già fatto un operazione che finisse con uguale
//       equalsClick();
//       console.log("2.1");
//     }
//   }

// FIXME: problema 1: quando cambiamo operatore scompare tutto
// }

// CASO 1 - Uguale subito dopo

function equalsClick() {
  if (!resultChecker) {
    setN2(+temp);
    setTemp("");
    setResultChecker(true);

    operate(n1, n2, operator);

    setN1("");
    setN2("");
    setTemp("");
    setOperator("");
    console.log(result);
    console.log({ n1, n2, temp, result, operator });
  } else {
    //
  }
}

// function equalsClick() {
//   if (n2 === "") {
//     setN2(+temp);
//   }

//   setTemp("");
//   // setResultChecker(true);

//   operate(n1, n2, operator);

//   console.log("4");
//   console.log({ n1, n2, temp, result, operator });

//   // Quando svuotiamo n1, n2, result e operator ?
// }

// function operatorClick(e) {
//   if (operator !== "" && !resultChecker) {
//     setN1(result);
//     equalsClick();
//   }

//   // Quando una stringa vuota viene trasformata in un numero, diventa 0
//   if (n1 === "") {
//     setN1(+temp);
//   }

//   setTemp("");
//   setResultChecker(false);

//   if (e.type === "click") {
//     setOperator(e.target.innerText);
//   } else {
//     setOperator(e.key);
//     convertOperator(operator);
//   }

//   //FIXME:
//   console.log({ n1, n2, temp, result, operator, resultChecker });
//   // setExpressionTxt(`${n1} ${operator}`);
//   // setInputNumberTxt(0);
// }

// function equalsClick() {
//   //FIXME:
//   console.log({ n1, n2, temp, result, operator, resultChecker });

//   if (temp !== "" && operator !== "") {
//     setN2(+temp);

//     if (n2 === 0 && operator === "÷") {
//       alert("You can't divide by 0.");
//       clearAll();
//       return;
//     }

//     operate(n1, n2, operator);

//     roundAndExponential(operator);

//     setExpressionTxt(`${n1} ${operator} ${n2} =`);
//     setInputNumberTxt(result);

//     setN1("");
//     setN2("");
//     setTemp("");
//     // setResult();
//     // setOperator("");

//     // Serve per aggiungere il +/- al result
//     resultChecker = true;
//   }
// }

function roundAndExponential(operator) {
  let stringResult = String(result);

  if (stringResult.length > 12 && operator === "×") {
    // Arrotondiamo il numero se contiene il . dato che i numeri molto grandi hanno il . nel result
    if (stringResult.includes(".")) {
      setResult(Math.round(result * 1000) / 1000);
    }

    // Qui trasformiamo in un numero con la e (notazione scientifica)
    setResult(result.toExponential(4));
  } else if (stringResult.length > 12 && operator === "+") {
    // Per evitare che un n basso col . + n faccia un numero in notazione scientifica
    if (stringResult.includes(".")) {
      setResult(Math.round(result * 1000) / 1000);
    }

    // Rende il risultato in notazione scentifica
    if (stringResult.indexOf("." > 3)) {
      setResult(result.toExponential(4));
    }
  } else if (stringResult.length > 12 && stringResult.includes(".")) {
    // Invece qui si tratta se sono divisioni o sottrazioni, arrotondiamo solamente
    setResult(Math.round(result * 1000) / 1000);
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
//FIXME:
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
