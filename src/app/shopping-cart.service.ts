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

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCart();
    let cart: Observable<any> = await this.http.get(`/api/shopping-carts/${cartId}`);
    return cart.map(cartItem => {
      // console.log(cartItem.shoppingCart.items);
      return new ShoppingCart(cartItem.shoppingCart.items)
    });
  }


  async clearCart() {
    let cartId = await this.getOrCreateCart();
    let res: Observable<any> = await this.http.delete(`/api/shopping-carts/${cartId}`);
    return res;
  }


  private async getOrCreateCart(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (!cartId) {
      let result: any = await this.create().toPromise();
      localStorage.setItem('cartId', result._id);
      return result._id;
    }
    return cartId;
  }
  async decrasseCart(product: Product) {
    let cartId = await this.getOrCreateCart();
    return this.http.patch('/api/shopping-carts/decrasse', { id: cartId, product: product }).toPromise();
  }

  async addToCart(product: Product) {
    let cartId = await this.getOrCreateCart();
    return this.http.patch('/api/shopping-carts/add', { id: cartId, product: product }).toPromise();
  }


  async removeFromCart(product: Product) {
    let cartId = await this.getOrCreateCart();
    return this.http.patch('/api/shopping-carts/delete', { id: cartId, product: product }).toPromise();
  }

}
