import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Product } from './models/product';

@Injectable()
export class WishlistService {

  constructor(private http: HttpClient) { }


  getWishList(): Observable<any> {
    let token = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('x-auth', token);
    return this.http.get('/api/wishlist', { headers: headers }).map(wishlist => wishlist["wishlist"]);
  }


  create(): Observable<any> {
    //send token
    return this.http.post('/wishlist', {});
  }


  addToWishList(product: Product) {
    let token = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('x-auth', token);
    return this.http.post('/api/wishlist/add', product, { headers: headers });
    //if no wishlist
    //create
    //...
    //add prod to wishlist
  }

}
