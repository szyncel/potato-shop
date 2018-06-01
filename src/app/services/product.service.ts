import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductService {

  constructor(private http: HttpClient) {
  }

  create(product: any): Observable<any> {
    return this.http.post('http://localhost:3000/api/product', product);
  }

  getAll(): Observable<any> {
    //http://localhost:3000
    //let url = '';
    return this.http.get('http://localhost:3000/api/product')
      .map(res => res["product"]);
  }

  get(productId) {
    return this.http.get(`http://localhost:3000/api/product/${productId}`)
      .map(res => res["product"]);
  }

  update(productId, product) {
    return this.http.put(`http://localhost:3000/api/product/${productId}`, product);
  }

  delete(productId) {
    return this.http.delete(`http://localhost:3000/api/product/${productId}`);
  }
}
