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

let size = {
  name: 'small',
  price: 120,
  calories: 60
};

let stuffing = {
  name: 'salad',
  price: 30,
  calories: 15
};

let topping =  {
name: 'spice', 
price: 25, 
calories: 10
};

let topping2 = {
  name: 'mayo', 
  price: 51, 
  calories: 25
};

let hamburger = new Hamburger(size, stuffing);
hamburger.addTopping(topping2);
hamburger.addTopping(topping);
hamburger.calculateCalories();
hamburger.calculatePrice();