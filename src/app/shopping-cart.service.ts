import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Product } from './models/product';

@Injectable()
export class ShoppingCartService {

  constructor(private http: HttpClient) { }


  private create() {
    return this.http.post('/api/shopping-carts', {
      dateCreated: new Date().getTime()
    });
  }

  private getCart(cartId: String) {
    return this.http.get(`/api/shopping-carts/${cartId}`);
  }

  private async getOrCreateCart() {
    let cartId = localStorage.getItem('cartId');
    if (!cartId) {
      let result: any = await this.create().toPromise();
      localStorage.setItem('cartId', result._id);
      return this.getCart(result._id).toPromise();
    }
    return this.getCart(cartId).toPromise();
  }


  async addToCart(product: Product) {
    let cartId = await this.getOrCreateCart();
    return this.http.patch('/api/shopping-carts/add', { id: cartId, product: product });
    // this.http.post()
    // item$.subscribe()
    // return item$;
  }

}
