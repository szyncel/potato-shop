import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import 'rxjs/add/operator/map';

@Injectable()
export class CategoryService {

  constructor(
    private http: HttpClient
  ) {
  }

  getCategories() {
    return this.http.get('http://localhost:3000/api/category')
      .map(res => res["category"])
  }
}
