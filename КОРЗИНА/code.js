class Product {
  constructor (name, price, count) {
		this.name = name;
		this.price = price;
		this.count = count;
	}
	
	// addProduct() {
	// 	let product = document.createElement('div');
	// 	let productName = document.createElement('span');
	// 	let productPrice = document.createElement('span');
	// 	let productCount = document.createElement('span');
	// 	product.appendChild(productName);
	// 	product.appendChild(productPrice);
	// 	product.appendChild(productCount);
	// 	productName.textContent = this.name;
	// 	productPrice.textContent = this.price;
	// 	productCount.textContent = this.count;
	// };
}

let testProduct = new Product ('avocado', 34, 1);
console.log(testProduct);

testProduct.addProduct();