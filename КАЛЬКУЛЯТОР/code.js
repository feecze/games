let calculator = document.querySelector('.calculator');
let result = document.querySelector('.result');
let display = [];
calculator.addEventListener('click', handlerClick);

function handlerClick(event) {
  let value = +event.target.getAttribute('data-value');
  let action = event.target.getAttribute('data-action');

  if (value || action) {
    if(action === '=') {
      calculateResult();
    }else {
      let temp = value || action;
      addValue(temp);
    }
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
    if(typeof item === number) {
      tempDigit.push(item);
    }else {
      tempActions.push(item);
      let number = tempDigit.reduce((acc, number, index) => {
        let pow = index === 0 ? 1 : index - 1
        acc += Math.pow(number, pow);
        return acc;
      }, 0);

      tempNumber.push(number);
    }
  });

  tempNumber.forEach((item) => {
    tempActions.forEach((action) => {
      
    })
  })
}