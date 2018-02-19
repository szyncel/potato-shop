import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Product } from './models/product';
import { Wishlist } from './models/wishlist';

@Injectable()
export class WishlistService {
  @Output() test: EventEmitter<any> = new EventEmitter();
  
  constructor(private http: HttpClient) { }

  change() {
    console.log('change started');
    this.test.emit(true);
  }

  getEmittedValue() {
    return this.test;
  }


  getWishList(): Observable<any> {//getOrCreateWishlist
    let token = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('x-auth', token);
    return this.http.get('/api/wishlist', { headers: headers }).map(wishlist => new Wishlist(wishlist["wishlist"][0].items));
  }


  private create(): Observable<any> {
    let token = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('x-auth', token);
    //send token
    return this.http.post('/wishlist', {}, { headers: headers });
  }


  addToWishList(product: Product): Observable<any> {
    let token = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('x-auth', token);

    return this.http.post('/api/wishlist/add', product, { headers: headers });
    //if no wishlist
    //create
    //...
    //add prod to wishlist
  }


  removeFromWishlist(product: Product): Observable<any> {
    let token = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('x-auth', token);
    return this.http.post('/api/wishlist/remove', product, { headers: headers });

  }

}
