import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { WishlistService } from '../wishlist.service';
import { Wishlist } from '../models/wishlist';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishlist: Wishlist;
  wishlistLength:number;
  cart: ShoppingCart;
  user;

  constructor(private authService: AuthService,
    private wishlistService: WishlistService,
    private shoppingCartService: ShoppingCartService
  ) { }

  updateWishlist() {
    this.wishlistService.getWishList().then(wishlist => {
      this.wishlist = wishlist
      this.wishlistLength=wishlist.items.length;
      // console.log(wishlist.items.length);
    });
  }

  async refreshCart() {
    (await this.shoppingCartService.getCart()).subscribe(cart => {
      console.log(cart);
      this.cart = cart
    });
  }

  ngOnInit() {
    this.user= this.authService.isLoggedIn();
    if(this.user)this.updateWishlist();   
    this.refreshCart();
  }

}
