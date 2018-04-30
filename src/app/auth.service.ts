import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {JwtHelper, tokenNotExpired} from 'angular2-jwt';

import 'rxjs/add/operator/map';
import {Auth} from "./store/models/auth";
import {User} from "./store/models/user";

@Injectable()
export class AuthService {
  @Output() test: EventEmitter<any> = new EventEmitter();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
  }


  change() {
    this.test.emit(true);
  }

  getEmittedValue() {
    return this.test;
  }


  get currentUser() {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const jwtHelper = new JwtHelper();
    return jwtHelper.decodeToken(token);
  }

  signup(user: User): Observable<User> {
    return this.http.post<User>('/api/users', user)
      .map(res => res);
  }

  signin(user: Auth): Observable<any> {
    return this.http.post('/api/users/login', user, {observe: 'response'})
      .map(response => {
        const res: any = response.body;
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


  getUser() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('x-auth', token);
    return this.http.get('/api/users/me', {headers: headers});
  }

  updateUser(user: User) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('x-auth', token);
    return this.http.put('/api/users/update', user, {headers: headers});
  }

  changeEmail(data) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('x-auth', token);

    return this.http.put('/api/users/update-email', data, {headers: headers});
  }


  changePassword(data: User) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('x-auth', token);

    return this.http.put('/api/users/update-password', data, {headers: headers});
  }

}
