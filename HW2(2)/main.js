class Hamburger {
  constructor(size, stuffing) {
  this.size = size;
  this.stuffing = stuffing;
  
  console.log('Hamburger sizes: small and big, hamburger stuffing: cheese, salad, potato');
  }

  addTopping(topping) {
    this.topping = topping;
    console.log('Hamburger toppings: spice, mayo')
  } 

  //removeTopping() {
  //  
  //}

  getToppings() {
    console.log(this.topping);
  }

  getSize() {
    console.log(this.size);
  }

  getStuffing() {
    console.log(this.stuffing)
  }

  calculatePrice() {
    let price = 0;
    
    if(this.size === 'small') {
      price += 50;
    }else if(this.size === 'big') {
      price += 100;
    }else{
      console.log('ERROR')
    }

    if (this.stuffing === 'cheese') {
      price += 10;
    } else if(this.stuffing === 'salad') {
      price += 20;
    } else if(this.stuffing === 'potato') {
      price += 15;
    } else{
      console.log('ERROR')
    }

      if(this.topping = 'spice') {
        price += 15;
      }else if(this.topping = 'mayo') {
        price += 20;
      }else{
        console.log('ERROR')
      }
    console.log(price);
    }

  calculateCalories() {
    let calories = 0;

    if(this.size === 'small') {
      calories += 20;
    } else if(this.size === 'big') {
      calories += 40;
    } else{
      console.log('ERROR')
    }

    if(this.stuffing === 'cheese') {
      calories += 20;
    } else if(this.stuffing === 'salad') {
      calories += 5;
    } else if(this.stuffing === 'potato') {
      calories += 10;
    } else{
      console.log('ERROR')
    }

   if (this.topping = 'mayo') {
      calories += 5;
    } else {
      console.log('ERROR')
    }
  
  console.log(calories);
  }
}
