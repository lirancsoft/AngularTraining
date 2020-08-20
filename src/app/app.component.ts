import {Component, OnInit} from '@angular/core';

interface Product {
  name: string;
  description: string;
  price: number;
  image: string;
  limit?: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'AngularTraining';
  stock: Product[] = [
    {
      name: 'Firefox',
      description: 'Your web, the way you like it.',
      price: 777.00,
      image: '../img/firefox_logo.png',
      limit: 30
    },
    {
      name: 'Asus',
      description: 'In Search of Incredible.',
      price: 1500.00,
      image: '../img/asus_logo.png'
    },
    {
      name: 'Ferrari',
      description: 'We are the competition. You are the fuel.',
      price: 1000000.00,
      image: '../img/ferrari_logo.png',
      limit: 5
    },
    {
      name: 'Intel',
      description: 'Look inside.',
      price: 1999.00,
      image: '../img/intel_logo.png',
      limit: 10
    },
    {
      name: 'Eilat',
      description: 'Live right.',
      price: 999999999.00,
      image: '../img/eilat_logo.png'
    },
    {
      name: 'Cisco',
      description: 'Welcome to the Human Network.',
      price: 2500.00,
      image: '../img/cisco_logo.png'
    }
  ];

  ngOnInit(): void {
    class Cart {
      productsInCart: Record<string, number>;
      totalPrice: number;

      constructor() {
        this.productsInCart = {};
        this.totalPrice = 0;
      }

      getProductFromStock(productName: string, stock: Product[]): Product {
        return stock.filter(product => product.name === productName)[0];
      }

      addProduct(productName: string, stock: Product[]): void {
        if (!this.getProductFromStock(productName, stock)) {
          console.log('Product ' + productName + ' doesn\'t exist in stock.');
          return;
        }
        if (this.productsInCart[productName]) {
          console.log('Product ' + productName + ' already exists in your cart.');
          return;
        }
        this.productsInCart[productName] = 1;
        console.log('The new product ' + productName + ' added to your cart successfully.');
        this.calcTotalPrice(stock);
      }

      removeProduct(productName: string, stock: Product[]): void {
        if (this.productsInCart[productName]) {
          delete this.productsInCart[productName];
          console.log('Product ' + productName + ' removed successfully.');
          this.calcTotalPrice(stock);
        } else {
          console.log('Product ' + productName + ' doesn\'t exist in your cart.');
        }
      }

      updateProductsAmount(stock: Product[]): void {
        for (const k of Object.keys(this.productsInCart)) {
          const product = this.getProductFromStock(k, stock);
          if (product.hasOwnProperty('limit')) {
            product.limit -= this.productsInCart[k];
          }
        }
      }

      checkout(stock: Product[]): void {
        if (this.checkAvailabilityOfAllProductsInCart(stock)) {
          this.updateProductsAmount(stock);
          console.log('Checked out with a total cost of: ₪' + this.totalPrice);
          this.productsInCart = {};
          this.totalPrice = 0;
        }
      }

      calcTotalPrice(stock: Product[]): void {
        let sum = 0;
        for (const k of Object.keys(this.productsInCart)) {
          const product = this.getProductFromStock(k, stock);
          sum += product.price;
        }
        this.totalPrice = sum;
      }

      checkAvailabilityOfAllProductsInCart(stock: Product[]): boolean {
        for (const k of Object.keys(this.productsInCart)) {
          const product = this.getProductFromStock(k, stock);
          if (product.hasOwnProperty('limit') && (product.limit - this.productsInCart[k] < 0)) {
            console.log('Product ' + k + 'is out of stock. Only ' + product.limit + ' units available.');
            return false;
          }
        }
        return true;
      }
    }

    console.log(JSON.stringify(this.stock));
    const cart = new Cart();
    console.log(JSON.stringify(cart));
    cart.addProduct('Explorer', this.stock);
    console.log(JSON.stringify(cart));
    cart.addProduct('Firefox', this.stock);
    console.log(JSON.stringify(cart));
    cart.addProduct('Firefox', this.stock);
    console.log(JSON.stringify(cart));
    cart.addProduct('Ferrari', this.stock);
    console.log(JSON.stringify(cart));
    cart.removeProduct('Explorer', this.stock);
    console.log(JSON.stringify(cart));
    cart.removeProduct('Firefox', this.stock);
    console.log(JSON.stringify(cart));
    cart.checkout(this.stock);
    console.log(JSON.stringify(cart));
    console.log(JSON.stringify(this.stock));
  }
}
