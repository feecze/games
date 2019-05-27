let calculator = document.querySelector('.calculator');
let result = document.querySelector('.result');
//let finalResult = 0;
let display = [];
calculator.addEventListener('click', handlerClick);

function handlerClick(event) {
  let value = event.target.getAttribute('data-value');
  let action = event.target.getAttribute('data-action');

  if (value !== null) {
      addValue(+value);
  }else if (action !== '=') {
      addValue(action);
  }else {
    addValue(action);
    calculateResult();
  }
  render();
}

function addValue(value) {
  if(display.length < 12) {
    display.push(value);
  }
};

function render() {
  result.textContent = display.join('');
}

function calculateResult() {
  let tempNumber = [];
  let tempDigit = [];
  let tempActions = [];
  display.forEach((item) => {
    if(typeof item === 'number') {
      tempDigit.push(item);
    }else {
      tempActions.push(item);
      tempDigit = tempDigit.reverse();
      let number = tempDigit.reduce((acc, number, index) => {
        acc += number * Math.pow(10, index);
        return acc;
      }, 0);
      tempNumber.push(number);
      tempDigit = [];
    }
  });

  tempNumber.forEach((item, index) => {
    let action = tempActions.shift();

    switch (action) {
      case '/':
        debugger
        display.push(item / tempNumber[index + 1]);
      break;

      case '*':
        display.push(item * tempNumber[index + 1]);
      break;

      case '-':
        display.push(item - tempNumber[index + 1]);
      break;

      case '+':
        display.push(item + tempNumber[index + 1]);
      break;
    }
  })
}

function clearDisplay() {
  display = [];
}