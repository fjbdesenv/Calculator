/* variabes  */

const elementDisplay = document.getElementById("display");
let active = false;
let numbers = [];
let currentNumber = "";
let hasPoint = false;

const reset = () => {
  numbers = [];
  currentNumber = "";
  hasPoint = false;
};

const setDisplay = (content) => {
  elementDisplay.innerHTML = content;
};

const cleanDisplay = () => {
  setDisplay("");
};

const on = () => {
  setDisplay("0");
  active = true;
  reset();
  elementDisplay.classList.remove("off");
};

const off = () => {
  cleanDisplay();
  reset();
  active = false;
  elementDisplay.classList.add("off");
};

const checkDisplay = () => {
  return elementDisplay.innerHTML === "0" ? true : false;
};

const isOperator = (operator) => {
  return (
    operator === "-" || operator === "+" || operator === "*" || operator === "/"
  );
};

const checkNumbersAndOperator = (
  num1 = undefined,
  operator = undefined,
  num2 = undefined
) => {
  console.log(num1, operator, num2);
  return (
    typeof num1 === "number" && typeof num2 === "number" && isOperator(operator)
  );
};

const getNumber = (number) => {
  if (typeof number === "number" && active) {
    checkDisplay()
      ? setDisplay(number)
      : setDisplay(elementDisplay.innerHTML + number);
    currentNumber += number;
  }
};

const point = () => {
  if (!hasPoint) {
    hasPoint = true;
    setDisplay(elementDisplay.innerHTML + ".");
    currentNumber += ".";
  }
};

const getOperator = (operator) => {
  if (isOperator(operator)) {
    if (currentNumber != numbers[numbers.length - 1]) {
      numbers.push(currentNumber);
    }
    numbers.push(operator);
    currentNumber = "";
    hasPoint = false;
    cleanDisplay();
    setDisplay(numbers.join(" ") + " ");
  }
};

const calculateResult = () => {
  console.log(numbers[0], numbers[1], numbers[2]);
  let result = "Erro";

  switch (numbers[1]) {
    case "+":
      result = Number(numbers[0]) + Number(numbers[2]);
      break;
    case "-":
      result = Number(numbers[0]) - Number(numbers[2]);
      break;
    case "/":
      result = Number(numbers[0]) / Number(numbers[2]);
      break;
    case "*":
      result = Number(numbers[0]) * Number(numbers[2]);
      break;
  }
  numbers = numbers.slice(3);
  numbers.unshift(result);
};

const calculate = () => {
  hasPoint = false;
  numbers.push(currentNumber);
  onDisplay = true;

  while (numbers.length > 1) {
    if (
      checkNumbersAndOperator(
        Number(numbers[0]),
        numbers[1],
        Number(numbers[2])
      )
    ) {
      calculateResult();
    } else {
      reset();
      setDisplay("Erro");
      return;
    }
  }
  setDisplay(numbers[0]);
  currentNumber = numbers[0];
};
