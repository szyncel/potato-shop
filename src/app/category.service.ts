import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CategoryService {

  constructor(
    private http: HttpClient
  ) { }

  getCategories(){
    return this.http.get('/api/category')
    .map(res => res["category"])
  }

}
