import {Component, OnInit} from '@angular/core';
import {ShoppingCart} from '../models/shopping-cart';
import {Wishlist} from '../models/wishlist';
import {AuthService} from "../../services/auth.service";
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {WishlistService} from "../../services/wishlist.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  cart: ShoppingCart;
  wishlist: Wishlist;
  user;
  userRole;


  constructor(public authService: AuthService,
              private shoppingCartService: ShoppingCartService,
              private wishlistService: WishlistService) {
  }

  async refreshCounter() {
    (await this.shoppingCartService.getCart()).subscribe(cart => {
      this.cart = cart;
    });
  }

  logout() {
    this.authService.logout();
    this.wishlistService.change();
  }

  refreshWishCounter() {
    let user = this.authService.isLoggedIn();
    if (user) this.wishlistService.getWishList().then(w => this.wishlist = w);
  }

  ngOnInit() {
    this.refreshUser();
    if (!this.cart) this.refreshCounter();
    this.shoppingCartService.getEmittedValue()
      .subscribe(item => this.refreshCounter());

    if (!this.wishlist) this.refreshWishCounter();
    this.wishlistService.getEmittedValue()
      .subscribe(i => this.refreshWishCounter())

    this.authService.getEmittedValue().subscribe(i => this.refreshUser());

  };


  refreshUser() {
    let user = this.authService.isLoggedIn();
    if (user) this.userRole = this.authService.currentUser.role;
  }

}
