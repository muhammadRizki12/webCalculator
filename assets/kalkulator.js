//Calculator IS NUMBER
// Objek calculator
const calculator = {
  displayNumber: "0",
  operator: null,
  firstNumber: null,
  waitingForSecondNumber: false
};

function updateDisplay() {
  document.querySelector("#displayNumber").innerText = calculator.displayNumber;
}

function clearCalculator() {
  calculator.displayNumber = "0";
  calculator.operator = null;
  calculator.firstNumber = null;
  calculator.waitingForSecondNumber = false;
}

function inputDigit(digit) {
  if (calculator.displayNumber === "0") {
    calculator.displayNumber = digit;
  } else {
    calculator.displayNumber += digit;
  }
}

// element buttons
const buttons = document.querySelectorAll(".button");
for (let button of buttons) {
  button.addEventListener("click", function(event) {
    // mendapatkan objek elemen yang diklik
    const target = event.target;

    // Clear
    //target melihat dan memastikan
    if (target.classList.contains("clear")) {
      clearCalculator();
      updateDisplay();
      return;
    }

    // negative
    if (target.classList.contains("negative")) {
      inverseNumber();
      updateDisplay();
      return;
    }

    // equals
    if (target.classList.contains("equals")) {
      performCalculation();
      updateDisplay();
      return;
    }

    // operator
    if (target.classList.contains("operator")) {
      handleOperator(target.innerText);
      return;
    }

    // update display
    inputDigit(target.innerText);
    updateDisplay();
  });

  // method inverse number
  function inverseNumber() {
    if (calculator.displayNumber === "0") {
      return;
    }
    calculator.displayNumber = calculator.displayNumber * -1;
    // Number dikali negatif
  }

  // Pertambahan dan pengurangan
  function handleOperator(operator) {
    if (!calculator.waitingForSecondNumber) {
      calculator.operator = operator; //isi operator
      calculator.waitingForSecondNumber = true;
      calculator.firstNumber = calculator.displayNumber; //angka kedua setelah operator

      // mengatur ulang nilai display number supaya tombol selanjutnya dimulai dari angka pertama lagi
      calculator.displayNumber = "0";
    } else {
      alert("Operator sudah ditetapkan");
    }
  }

  // Sama dengan
  function performCalculation() {
    if (calculator.firstNumber == null || calculator.operator == null) {
      alert("Anda belum menetapkan operator");
      return;
    }
    let result = 0;
    if (calculator.operator === "+") {
      result =
        parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
      // ParseInt = mengubah string menjadi number
    } else {
      result =
        parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber);
      // ParseInt = mengubah string menjadi number
    }
    // objek yang akan dikirimkan sebagai argumen fungsi putHistory()
    const history = {
      firstNumber: calculator.firstNumber,
      secondNumber: calculator.displayNumber,
      operator: calculator.operator,
      result: result
    };
    putHistory(history);
    calculator.displayNumber = result;
    renderHistory();
  }
}
