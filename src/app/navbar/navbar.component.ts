import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  cart$: Observable<ShoppingCart>;
  //subscription: any;
  //shoppingCartItemCount: number;


  constructor(public authService: AuthService,
    private shoppingCartService: ShoppingCartService) {
  }


  async refreshCounter() {
    this.cart$= await this.shoppingCartService.getCart();
    console.log('test:',this.cart$);
  }



  ngOnInit() {
    if (!this.cart$) this.refreshCounter();
     this.shoppingCartService.getEmittedValue()
      .subscribe(item => this.refreshCounter())
  };
}
