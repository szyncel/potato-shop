import { Injectable } from '@angular/core';
import { User } from './models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  signup(user: User): Observable<User> {
    return this.http.post<User>('/api/users', user)
    .map(res => res)
  }

  signin(user): Observable<any> {
    return this.http.post('/api/users/login', user, { observe: 'response' })
      .map(response => {
        let res: any = response.body;
        console.log(res);
        if (res.token) {
          localStorage.setItem('token', res.token);
          return true;
        }
        return false;
      })
  }

}
