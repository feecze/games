class Hamburger {
  constructor() {
    this.size;
    this.stuffing;
    this.topping = [];
  }

  addTopping(topping) {
    this.topping.push(topping);
  }

  setSize(size) {
    this.size = size;
  }

  getToppings() {
    return this.topping;
  }

  calcToppings() {
    let accToppings = this.getToppings().reduce((acc, {price, calories}) => {
      acc.price += price;
      acc.calories += calories;
      return acc;
    },
    {price: 0, calories: 0})
    return accToppings;
  }

  getSize() {
    return this.size;
  }

  getStuffing() {
    return this.stuffing;
  }

  calculatePrice() {
    let price = this._calculateByName('price');
    console.log(`Цена бутерброда: ${price}`);
  }

  calculateCalories() {
    let calories = this._calculateByName('calories');
    console.log(`Калорий в бутерброде: ${calories}`);
  }

  _calculateByName(name) {
    let calc = 0;
    calc += this.getSize()[name];
    calc += this.getStuffing()[name];
    calc += this.calcToppings()[name];
    return calc;
  }
}

let sizes = {
  small: {
    name: 'small',
    price: 50,
    calories: 40
  },
  medium: {
    name: 'medium',
    price: 80,
    calories: 70
  },
  big: {
    name: 'big',
    price: 110,
    calories: 100
  }
}

let hamburger = new Hamburger();

function appendNewNode(parentNode, text) {
  let node = document.createElement('p');
  node.textContent = text;
  parentNode.appendChild(node);
}

function appendRadio(parentNode, value) {
  let radioButton = document.createElement('input');
  radioButton.setAttribute('type', 'radio');
  radioButton.setAttribute('name', 'size');
  radioButton.setAttribute('value', value);
  parentNode.appendChild(radioButton);
}

let nodeSize = document.querySelector('.size');
nodeSize.addEventListener('change', (event) => {
  let nodesSize = document.querySelectorAll('.size>div');
  for (let i = 0; i < nodesSize.length; i++) {
    nodesSize[i].classList.remove('active');
  }
  
  hamburger.setSize(sizes[event.target.value]);
  let parent = event.target.parentNode;
  parent.classList.add('active');
  console.log(hamburger);
})
for (let sizeName in sizes) {
  let newItem = document.createElement('div');
  newItem.classList.add('size_item')

  appendNewNode(newItem, `Name: ${sizes[sizeName].name}`);
  appendNewNode(newItem, `Price: ${sizes[sizeName].price}`);
  appendNewNode(newItem, `Calories: ${sizes[sizeName].calories}`);

  appendRadio(newItem, sizes[sizeName].name);
  nodeSize.appendChild(newItem);
}