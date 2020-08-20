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
      private productsInCart: Record<string, number>;

      constructor() {
        this.productsInCart = {};
      }

      private getProductFromStock(productName: string, stock: Product[]): Product {
        return stock.find(product => product.name === productName);
      }

      addProduct(productName: string, stock: Product[]): void {
        const productFromStock: Product = this.getProductFromStock(productName, stock);
        if (!productFromStock) {
          console.log('Product ' + productName + ' doesn\'t exist in stock.');
          return;
        }
        if (this.productsInCart[productName]) {
          console.log('Product ' + productName + ' already exists in your cart.');
          return;
        }
        if (productFromStock.hasOwnProperty('limit') && productFromStock.limit > 0) {
          this.productsInCart[productName] = 1;
          console.log('The new product ' + productName + ' added to your cart successfully.');
        } else {
          console.log('Product ' + productName + ' is not available is out of stock.');
        }
      }

      removeProduct(productName: string): void {
        if (this.productsInCart[productName]) {
          delete this.productsInCart[productName];
          console.log('Product ' + productName + ' removed successfully.');
        } else {
          console.log('Product ' + productName + ' doesn\'t exist in your cart.');
        }
      }

      private updateProductsAmount(stock: Product[]): void {
        Object.keys(this.productsInCart).forEach((productName: string) => {
          const product = this.getProductFromStock(productName, stock);
          if (product.hasOwnProperty('limit') && (product.limit - this.productsInCart[productName] < 0)) {
            product.limit -= this.productsInCart[productName];
          }
        });
      }

      checkout(stock: Product[]): void {
        this.updateProductsAmount(stock);
        console.log('Checked out with a total cost of: ₪' + this.calcTotalPrice(stock));
        this.productsInCart = {};
      }

      calcTotalPrice(stock: Product[]): number {
        return Object.keys(this.productsInCart).reduce((acc, productName): number => {
          return acc + this.productsInCart[productName] * this.getProductFromStock(productName, stock).price;
        }, 0);
      }
    }

    console.log(JSON.stringify(this.stock));
    const cart = new Cart();
    console.log(JSON.stringify(cart));
    cart.addProduct('Explorer', this.stock);
    console.log(JSON.stringify(cart));
    console.log('price: ' + cart.calcTotalPrice(this.stock));
    cart.addProduct('Firefox', this.stock);
    console.log(JSON.stringify(cart));
    console.log('price: ' + cart.calcTotalPrice(this.stock));
    cart.addProduct('Firefox', this.stock);
    console.log(JSON.stringify(cart));
    cart.addProduct('Ferrari', this.stock);
    console.log(JSON.stringify(cart));
    console.log('price: ' + cart.calcTotalPrice(this.stock));
    cart.removeProduct('Explorer');
    console.log(JSON.stringify(cart));
    cart.removeProduct('Firefox');
    console.log(JSON.stringify(cart));
    console.log('price: ' + cart.calcTotalPrice(this.stock));
    cart.checkout(this.stock);
    console.log(JSON.stringify(cart));
    console.log('price: ' + cart.calcTotalPrice(this.stock));
    console.log(JSON.stringify(this.stock));
  }
}
