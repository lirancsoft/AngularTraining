import {Component, OnInit} from '@angular/core';
import {IProduct} from '../../../assets/js/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.less']
})
export class ProductComponent implements OnInit {
  product: IProduct;

  constructor() {
  }

  ngOnInit(): void {
  }

}
