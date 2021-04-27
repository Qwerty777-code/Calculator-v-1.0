const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

// Вычисляем first and second values взависимости от оператора
const calculate = {
  '/': (firstNumber, secondNumber) => firstNumber / secondNumber,

  '*': (firstNumber, secondNumber) => firstNumber * secondNumber,

  '+': (firstNumber, secondNumber) => firstNumber + secondNumber,

  '-': (firstNumber, secondNumber) => firstNumber - secondNumber,

  '=': (firstNumber, secondNumber) => secondNumber
};

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

function sendNumberValue(number) {
  // Заменить текущее отображаемое значение если first value is entered
  if (awaitingNextValue) {
    calculatorDisplay.textContent = number;
    awaitingNextValue = false;
  } else {
      // Если значение value 0 заменить его, если нет, то добавить цифру
  const displayValue = calculatorDisplay.textContent;
  calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;  // Если DisplayValue === 0, ?тогда это просто number :или displayValue + number
  }
}

function addDecimal() {
  // Если operator указан, НЕ добавлять demical
  if (awaitingNextValue) return;
  // Если нет точки, добавить одну
  if (!calculatorDisplay.textContent.includes('.')) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
}

function useOperator(operator) {
  const currentValue = Number(calculatorDisplay.textContent);
  // Запрет multiple operators
  if (operatorValue && awaitingNextValue) {
    operatorValue = operator;
    return;
  }
  // Назначаем firstValue нет значения
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    const calculation = calculate[operatorValue](firstValue, currentValue);
    calculatorDisplay.textContent = calculation;
    firstValue = calculation;
  }
  // Готово для next value, store operator
  awaitingNextValue = true;
  operatorValue = operator;
}

// Сброс всех значений до первоначальных
function resetAll() {
  calculatorDisplay.textContent = '0';
  firstValue = 0;
  operatorValue = '';
  awaitingNextValue = false;
}

// Добавить прослушиватель события для чисел, операторов, десятичых кнопок
inputBtns.forEach((inputBtn) => {     // метод позволяет выполнить передаваемую функцию для каждого эллемента в массиве(Массив кнопок с разным классом)
  if (inputBtn.classList.length === 0) {    //button, где className.length = 0
    inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
  } else if (inputBtn.classList.contains('operator')) {   // button, где classlist имеет определенный класс 'operator'
    inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
  } else if (inputBtn.classList.contains('decimal')) {
    inputBtn.addEventListener('click', () => addDecimal());
  }
});

// Event Listener (Прослушиватель события)
clearBtn.addEventListener('click', resetAll);
