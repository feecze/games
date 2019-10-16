class Hamburger {
  constructor(size, stuffing) {

    this.size = size;
    this.stuffing = stuffing;
    this.topping = [];
    console.log(
      'Hamburger sizes: small and big, hamburger stuffing: cheese, salad, potato'
    );
  }

  addTopping(topping) {
    this.topping.push(topping);
    console.log('Hamburger toppings: spice, mayo');
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

let sizes = [
  {
    name: 'small',
    price: 50,
    calories: 40
  },
  {
    name: 'medium',
    price: 80,
    calories: 70
  },
  {
    name: 'big',
    price: 110,
    calories: 100
  }
]

let nodeSize = document.querySelector('.size');
for (let size of sizes) {
  let newItem = document.createElement('div');
  newItem.classList.add('size_item')

  let nodeName = document.createElement('p');
  nodeName.textContent = size.name;
  newItem.appendChild(nodeName);

  let nodePrice = document.createElement('p');
  nodePrice.textContent = size.price;
  newItem.appendChild(nodePrice);

  let nodeCalories = document.createElement('p');
  nodeCalories.textContent = size.calories;
  newItem.appendChild(nodeCalories);


  let radioButton = document.createElement('radio');
  newItem.appendChild(radioButton);
  nodeSize.appendChild(newItem);

}