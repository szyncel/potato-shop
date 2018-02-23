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


  async getWishList():Promise<any>{//getOrCreateWishlist
    let token = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('x-auth', token);
      let test= await this.http.get('/api/wishlist', { headers: headers }).map(wishlist=>wishlist['wishlist']).toPromise();
    if(test.length){
      // console.log(test[0].items);
      return new Wishlist(test[0].items);
    }else{
      let test2:any=await this.http.post('/api/wishlist',{}, { headers: headers }).toPromise();
      // console.log(test2.items);
      return new Wishlist(test2.items);
    }
  }


  getWishListCopy(): Observable<any> {//getOrCreateWishlist
    let token = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('x-auth', token);
    return this.http.get('/api/wishlist', { headers: headers }).map(wishlist => new Wishlist(wishlist["wishlist"][0].items));
  }



  create(): Observable<any> {
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

  }


  removeFromWishlist(product: Product): Observable<any> {
    let token = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('x-auth', token);
    return this.http.post('/api/wishlist/remove', product, { headers: headers });

  }

}
