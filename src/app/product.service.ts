import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductService {

  constructor(private http: HttpClient) { }

  create(product:any):Observable<any>{
    return this.http.post('/api/product',product);
  }

  getAll():Observable<any>{
    return this.http.get('/api/product')
    .map(res => res["product"]);
  }

  get(productId){
    return this.http.get(`/api/product/${productId}`)
    .map(res=>res["product"]);
  }

  update(productId,product){
    return this.http.put(`/api/product/${productId}`,product);
  }

  delete(productId){
    return this.http.delete(`/api/product/${productId}`);
  }
}
