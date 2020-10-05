import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {IProduct} from '../../assets/js/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products: BehaviorSubject<IProduct[]>;

  getProducts(): BehaviorSubject<IProduct[]> {
    return this.products;
  }

  getStock(): Observable<any>{
    return this.http.get('/assets/data/stock.json');
  }

  constructor(
    private http: HttpClient
  ) { }
}
