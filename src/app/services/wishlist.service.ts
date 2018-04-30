import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Product } from '../shared/models/product';
import { Wishlist } from '../shared/models/wishlist';

@Injectable()
export class WishlistService {
  @Output() test: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) { }

  change() {
    this.test.emit(true);
  }

  getEmittedValue() {
    return this.test;
  }


  async getWishList():Promise<any>{//getOrCreateWishlist
    let token = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('x-auth', token);
      let test= await this.http.get('/api/wishlist', { headers: headers }).map(wishlist=>wishlist['wishlist']).toPromise();

    if(test.length){
      return new Wishlist(test[0].items);
    }else{
      let test2:any=await this.http.post('/api/wishlist',{test:"nic"}, { headers: headers }).toPromise();
      return new Wishlist(test2.items);
    }
  }

  addToWishList(product: Product): Promise<any> {
    let token = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('x-auth', token);
    return this.http.post('/api/wishlist/add', product, { headers: headers }).toPromise();
  }


  removeFromWishlist(product: Product): Promise<any> {
    let token = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('x-auth', token);
    return this.http.post('/api/wishlist/remove', product, { headers: headers }).toPromise();
  }
}
