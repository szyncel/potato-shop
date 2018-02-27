import { Component, OnInit, Input } from '@angular/core';
import { Wishlist } from '../models/wishlist';
import { WishlistService } from '../wishlist.service';
import { Product } from '../models/product';
import { WishlistComponent } from '../wishlist/wishlist.component';
import { ProductsComponent } from '../products/products.component';
import { ShoppingCartService } from '../shopping-cart.service';
import { ProductService } from '../product.service';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'wishlist-button',
  templateUrl: './wishlist-button.component.html',
  styleUrls: ['./wishlist-button.component.css']
})
export class WishlistButtonComponent implements OnInit {
  shoppingCart:ShoppingCart;
  wishlist: Wishlist;
  @Input('product') product: Product;

  constructor(
    private productService:ProductService,
    private shoppingCartService: ShoppingCartService,
    private wishlistService: WishlistService,
    private productComponent: ProductsComponent,
    private wishlistComponent: WishlistComponent
  ) {

   }

  addToWishlist() {
    if (this.getTest()) {
      this.delFromWishlist();
    } else {
      this.wishlistService.addToWishList(this.product).subscribe(res => {
        this.productComponent.refreshWishlist();
        this.wishlistService.change();
        this.refresh();
      });
    }
  }

  delFromWishlist() {
    this.wishlistService.removeFromWishlist(this.product).subscribe(res => {
      this.productComponent.refreshWishlist();
      this.wishlistComponent.updateWishlist();
      this.wishlistService.change();
      this.refresh();
    });
  }

  refresh(){
    this.wishlistService.getWishList().then(wishlist=>this.wishlist=wishlist);
  }

  getTest() {
    let wishlistArray = this.wishlist.items;
    let item = wishlistArray.filter(item => item.product._id == this.product._id);
    return item[0] ? true : false;
  }

  async ngOnInit() {
    (await this.shoppingCartService.getCart()).subscribe(cart=>this.shoppingCart=cart);
    this.refresh();
  }
}
