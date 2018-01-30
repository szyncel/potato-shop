import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  subscription: any;
  shoppingCartItemCount: number;


  constructor(public authService: AuthService,
    private shoppingCartService: ShoppingCartService) {
  }


  async refreshCounter() {
    this.subscription = (await this.shoppingCartService.getQuantity()).subscribe(cart => {
      this.shoppingCartItemCount = 0;
      for (let prodId in cart.items) {
        this.shoppingCartItemCount += cart.items[prodId].count;
      };
      console.log(`Navbar refresh: `, this.shoppingCartItemCount);
    });
  }



  ngOnInit() {
    if (!this.shoppingCartItemCount) this.refreshCounter();
    this.subscription = this.shoppingCartService.getEmittedValue()
      .subscribe(item => this.refreshCounter())
  };
}
