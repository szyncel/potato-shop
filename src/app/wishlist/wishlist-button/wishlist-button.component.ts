import { Component, Input, OnInit } from '@angular/core';
import { Wishlist } from '../../shared/models/wishlist';
import { WishlistService } from '../../services/wishlist.service';
import { Product } from '../../shared/models/product';
import { WishlistComponent } from '../wishlist.component';
import { ProductsComponent } from '../../products/products.component';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { ProductService } from '../../services/product.service';
import { ShoppingCart } from '../../shared/models/shopping-cart';

@Component({
  selector: 'wishlist-button',
  templateUrl: './wishlist-button.component.html',
  styleUrls: [ './wishlist-button.component.css' ]
})
export class WishlistButtonComponent implements OnInit {
  shoppingCart: ShoppingCart;
  wishlist: Wishlist;
  @Input('product') product: Product;

  constructor(
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService,
    private wishlistService: WishlistService,
    private productComponent: ProductsComponent,
    private wishlistComponent: WishlistComponent
  ) {
  }

  async addToWishlist() {
    if (this.getTest()) {
      this.delFromWishlist();
    } else {
      await this.wishlistService.addToWishList(this.product);
      await this.refresh();
      this.wishlistService.change();


    }
  }

  async delFromWishlist() {
    await this.wishlistService.removeFromWishlist(this.product);
    await this.refresh();
    this.wishlistComponent.updateWishlist();
    this.wishlistService.change();
  }

  async refresh() {
    this.wishlistService.getWishList().then(wishlist => this.wishlist = wishlist);
  }

  getTest() {
    const wishlistArray = this.wishlist.items;
    const item1 = wishlistArray.filter(item => item.product._id === this.product._id);
    return item1[ 0 ] ? true : false;
  }

  async ngOnInit() {
    (await this.shoppingCartService.getCart()).subscribe(cart => this.shoppingCart = cart);
    this.refresh();
  }
}
