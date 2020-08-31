import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

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
  stock: BehaviorSubject<Product[]> = new BehaviorSubject([
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
  ]);

  ngOnInit(): void {

    class Cart {
      productsInCart: BehaviorSubject<Record<string, number>>;

      constructor() {
        this.productsInCart = new BehaviorSubject<Record<string, number>>({});
        this.productsInCart.subscribe(console.log);
      }

      private getProductFromStock(productName: string, stock: BehaviorSubject<Product[]>): Product {
        return stock.getValue().find(product => product.name === productName);
      }

      addProduct(productName: string, stock: BehaviorSubject<Product[]>): void {
        const productFromStock: Product = this.getProductFromStock(productName, stock);
        if (!productFromStock) {
          console.log(`Product ${productName} doesn't exist in stock.`);
          return;
        }
        if (this.productsInCart[productName]) {
          console.log(`Product ${productName} already exists in your cart.`);
          return;
        }
        if (productFromStock.hasOwnProperty('limit') && productFromStock.limit > 0) {
          const cartState = this.productsInCart.getValue();
          cartState[productName] = 1;
          console.log(`The new product ${productName} added to your cart successfully.`);
          this.productsInCart.next(cartState);
        } else {
          console.log(`Product ${productName} is not available is out of stock.`);
        }
      }

      removeProduct(productName: string): void {
        const cartState = this.productsInCart.getValue();
        if (cartState[productName]) {
          delete cartState[productName];
          console.log(`Product ${productName} removed successfully.`);
          this.productsInCart.next(cartState);
        } else {
          console.log(`Product ${productName} doesn't exist in your cart.`);
        }
      }

      private updateProductsAmount(stock: BehaviorSubject<Product[]>): void {
        Object.keys(this.productsInCart.getValue()).forEach((productName: string) => {
          const productInStock = this.getProductFromStock(productName, stock);
          const productAmountInCart = this.productsInCart.getValue()[productName];
          if (productInStock.hasOwnProperty('limit') && (productInStock.limit - productAmountInCart > 0)) {
            productInStock.limit -= productAmountInCart;
          }
        });
      }

      private updateProductAmountInCart(productName: string, amount: number): void {
        this.productsInCart.getValue()[productName] = amount;
      }

      checkout(stock: BehaviorSubject<Product[]>): void {
        this.updateProductsAmount(stock);
        console.log(`Checked out with a total cost of: ₪${this.calcTotalPrice(stock)}`);
        this.productsInCart.next({});
      }

      calcTotalPrice(stock: BehaviorSubject<Product[]>): number {
        return Object.keys(this.productsInCart.getValue()).reduce((acc, productName): number => {
          return acc + this.productsInCart.getValue()[productName] * this.getProductFromStock(productName, stock).price;
        }, 0);
      }
    }

    const cart = new Cart();

    cart.addProduct('Ferrari', this.stock);
    cart.addProduct('Intel', this.stock);
    cart.removeProduct('Ferrari');
    console.log(cart.calcTotalPrice(this.stock));
    cart.checkout(this.stock);
    this.stock.subscribe(console.log);
  }
}
