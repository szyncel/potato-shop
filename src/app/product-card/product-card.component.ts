import { Component, Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';
import { ProductsComponent } from '../products/products.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { WishlistService } from '../wishlist.service';
import { Wishlist } from '../models/wishlist';
import { WishlistComponent } from '../wishlist/wishlist.component';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product: Product;
  @Input('shopping-cart') shoppingCart;
  @Input('wishlist') wishlist: Wishlist;
  @Input('del') showDelete = false;
  showActions = true;
  // showDelete=false;


  constructor(
    private shoppingCartService: ShoppingCartService,
    private wishlistService: WishlistService,
    private productComponent: ProductsComponent,
    private navbarComponent: NavbarComponent,
    private wishlistComponent: WishlistComponent
  ) {

  }

  addToCart(product: Product) {
    this.shoppingCartService.addToCart(product);
    this.productComponent.refreshData();
    //this.navbarComponent.refreshCounter();
    this.shoppingCartService.change();
  };


  addToWishlist() {
    if (this.getTest()) {
      this.delFromWishlist();
    } else {
      this.wishlistService.addToWishList(this.product).subscribe(res => {
        console.log(res);
        this.productComponent.refreshWishlist();
        //refresh wishlsit page
      });
    }

  }

  delFromWishlist() {
    this.wishlistService.removeFromWishlist(this.product).subscribe(res => {
      console.log(res);
      this.productComponent.refreshWishlist();
      this.wishlistComponent.updateWishlist();
      //refresh wishlsit page
    });
  }


  getTest() {
    let wishlistArray = this.wishlist.items;
    let item = wishlistArray.filter(item => item.product._id == this.product._id);
    return item[0] ? true : false;
  }

}
