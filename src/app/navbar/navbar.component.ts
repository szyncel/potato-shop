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
  cart:ShoppingCart;

  constructor(public authService: AuthService,
    private shoppingCartService: ShoppingCartService) {
  }


  async refreshCounter() {
    (await this.shoppingCartService.getCart()).subscribe(cart=>{
      this.cart=cart
    });   
  }


  ngOnInit() {
    if (!this.cart) this.refreshCounter();
     this.shoppingCartService.getEmittedValue()
      .subscribe(item => this.refreshCounter())
  };
}
