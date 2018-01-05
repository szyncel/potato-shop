import { Injectable } from '@angular/core';
import { User } from './models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';

import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }


  get currentUser() {
    let token = localStorage.getItem('token');
    if (!token) return null;

    let jwtHelper = new JwtHelper();
    return jwtHelper.decodeToken(token);
  }

  signup(user: User): Observable<User> {
    return this.http.post<User>('/api/users', user)
    .map(res => res)
  }

  signin(user): Observable<any> {
    return this.http.post('/api/users/login', user, { observe: 'response' })
      .map(response => {
        let res: any = response.body;
        if (res.token) {
          localStorage.setItem('token', res.token);
          return true;
        }
        return false;
      })
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/');
  }

  isLoggedIn() {
    return tokenNotExpired();
  }

}
