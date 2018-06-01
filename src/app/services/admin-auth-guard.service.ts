import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import * as _ from 'lodash';

@Injectable()
export class AdminAuthGuardService implements CanActivate {

  constructor( private router: Router,
               private authService: AuthService ) {
  }

  canActivate( route, state: RouterStateSnapshot ) {
    if (this.authService.isLoggedIn() && this.authService.currentUser.role === 'admin') {
      return true;
    } else {
      this.router.navigate([ '/login' ], {queryParams: {returnUrl: state.url}});
      return false;
    }
  }

}
