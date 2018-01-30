import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Product } from './models/product';
import { ShoppingCart } from './models/shopping-cart';

@Injectable()
export class ShoppingCartService {
  @Output() test: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) { }

  change() {
    console.log('change started');
    this.test.emit(true);
  }

  getEmittedValue() {
    return this.test;
  }


  private create() {
    return this.http.post('/api/shopping-carts', {
      dateCreated: new Date().getTime()
    });
  }

  async getCart(): Promise<Observable<any>> {
    let cartId = await this.getOrCreateCart();
    return this.http.get(`/api/shopping-carts/${cartId}`);
  }

  async getQuantity() {
    let cart = await this.getCart();
    let cartItems:Observable<any>=cart.map(cartItem=>cartItem.shoppingCart)

    return cartItems;
  }



  private async getOrCreateCart(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (!cartId) {
      let result: any = await this.create().toPromise();
      localStorage.setItem('cartId', result._id);
      //return this.getCart(result._id).toPromise();
      return result._id;
    }
    //return this.getCart(cartId).toPromise();
    return cartId;
  }
  async decrasseCart(product: Product) {
    let cartId = await this.getOrCreateCart();
    return this.http.patch('/api/shopping-carts/decrasse', { id: cartId, product: product }).toPromise();
  }

  async addToCart(product: Product) {
    let cartId = await this.getOrCreateCart();
    return this.http.patch('/api/shopping-carts/add', { id: cartId, product: product }).toPromise();
    // this.http.post()
    // item$.subscribe()
    // return item$;
  }

}
