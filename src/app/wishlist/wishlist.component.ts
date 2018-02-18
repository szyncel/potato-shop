import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { WishlistService } from '../wishlist.service';
import { Wishlist } from '../models/wishlist';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishlist:Wishlist;

  constructor(private authService: AuthService,
    private wishlistService: WishlistService) { }

  updateWishlist() {
    this.wishlistService.getWishList().subscribe(wishlist => {
      console.log(wishlist);
      this.wishlist = wishlist});
  }

  ngOnInit() {
    this.updateWishlist();

  }

}
