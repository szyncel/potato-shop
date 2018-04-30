import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/interfaces';
import { CheckoutStepsService } from './checkout-steps.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class CheckoutStepsGuardService implements CanActivate {

  constructor(private router: Router, private checkoutStepsService: CheckoutStepsService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let path: string = route.routeConfig.path;
    // console.log(path);
    // return true;
    return this.checkoutStepsService.checkStep(path);
  };



}
