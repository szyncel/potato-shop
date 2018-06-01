import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {WishlistService} from '../services/wishlist.service';
import {Wishlist} from '../shared/models/wishlist';
import {ShoppingCart} from '../shared/models/shopping-cart';
import {ShoppingCartService} from '../services/shopping-cart.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishlist: Wishlist;
  wishlistLength: number;
  cart: ShoppingCart;
  user;

  constructor(private authService: AuthService,
              private wishlistService: WishlistService,
              private shoppingCartService: ShoppingCartService
  ) {
  }

  updateWishlist() {
    this.wishlistService.getWishList().then(wishlist => {
      this.wishlist = wishlist
      this.wishlistLength = wishlist.items.length;
    });
  }

  async refreshCart() {
    (await this.shoppingCartService.getCart()).subscribe(cart => this.cart = cart);
  }

  ngOnInit() {
    this.user = this.authService.isLoggedIn();
    if (this.user) this.updateWishlist();
    this.refreshCart();
  }

}
