import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { ShoppingCart } from '../models/shopping-cart';
import { Wishlist } from '../models/wishlist';
import { WishlistService } from '../wishlist.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  cart: ShoppingCart;
  wishlist: Wishlist;
  user;

  constructor(public authService: AuthService,
    private shoppingCartService: ShoppingCartService,
    private wishlistService: WishlistService) {
  }

  async refreshCounter() {
    (await this.shoppingCartService.getCart()).subscribe(cart => {
      this.cart = cart
    });
  }

  refreshWishCounter() {
    let user = this.authService.isLoggedIn();
    if (user) {
      this.wishlistService.getWishList().then(w => this.wishlist = w);
    }
  }


  ngOnInit() {
    if (!this.cart) this.refreshCounter();
    this.shoppingCartService.getEmittedValue()
      .subscribe(item => this.refreshCounter());

    if (!this.wishlist) this.refreshWishCounter();
    this.wishlistService.getEmittedValue()
      .subscribe(i => this.refreshWishCounter())

    this.user=this.authService.currentUser.role;
  };

}
