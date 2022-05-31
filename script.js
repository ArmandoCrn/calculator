/*
TODO:

1 - Per la mappatura dei tasti, fai funzionare solo quelli che servono alla calcolatrice: i numeri da 0 a 9, ESC === AC, DELETE ARROW === DELETE.
  i segni matematici, e ENTER === uguale

  2.1 FIXME: Come tolgo l'alone di focus quando premo enter?

2 - Refactoring di tutte le cose che sono doppie di n1 e n2, crei una funzione che prende un argomento value e poi quando andiamo a premere
un tasto, in quella funzione a determinate condizioni con if che stanno già settati andremo a mettere la funzione che fa quel derterminato compito
e come argomento andremo a settare il risultato dell'if, quindi n1 se rispetta le condizioni di n1 e n2 se rispetta le condizioni di n2
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
let result = null;
let operator = "";
let resultChecker = false;
//FIXME: Per ora il resultChecker non viene utilizzato da nessuna parte, se resta così fino alla fine, toglilo

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
  console.log({ n1, n2, result, operator });
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
  console.log({ n1, n2, result, operator });
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
    console.log(result);
    console.log({ n1, n2, result, operator });
  }
}

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

//
//   // setExpressionTxt(`${n1} ${operator}`);
//   // setInputNumberTxt(0);
// }

// function equalsClick() {
//

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
// FIXME: il fatto che escono ancora numeri con la e se ci sono più di tot numeri dopo il punto
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

//FIXME:
// function pointClick(e) {
//   if (temp.length < 13 && !temp.includes(".")) {
//     if (temp === "") {
//       temp += "0" + e.target.innerText;
//     } else {
//       temp += e.target.innerText;
//     }

//     setInputNumberTxt(temp);
//   }
// }

function pointClick() {
  if (operator === "" && n1.length < 13 && !n1.includes(".")) {
    if (n1 === "") {
      n1 += "0.";
    } else {
      n1 += ".";
    }

    setInputNumberTxt(n1);
  } else if (operator !== "" && n2.length < 13 && !n2.includes(".")) {
    if (n2 === "") {
      n2 += "0.";
    } else {
      n2 += ".";
    }

    setInputNumberTxt(n2);
  }
}
/*
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


*/

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
