import { Component, Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';
import { ProductsComponent } from '../products/products.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { WishlistService } from '../wishlist.service';
import { Wishlist } from '../models/wishlist';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product: Product;
  @Input('shopping-cart') shoppingCart;
  @Input('wishlist') wishlist: Wishlist;
  showActions = true;


  constructor(
    private shoppingCartService: ShoppingCartService,
    private wishlistService: WishlistService,
    private productComponent: ProductsComponent,
    private navbarComponent: NavbarComponent
  ) {

  }

  addToCart(product: Product) {
    this.shoppingCartService.addToCart(product);
    this.productComponent.refreshData();
    //this.navbarComponent.refreshCounter();
    this.shoppingCartService.change();
  };


  addToWishlist(product: Product) {
    if (this.getTest()) {
      this.wishlistService.removeFromWishlist(product).subscribe(res => {
        console.log(res);
        this.productComponent.refreshWishlist();
      })
    } else {
      this.wishlistService.addToWishList(product).subscribe(res => {
        console.log(res);
        this.productComponent.refreshWishlist();
      });
    }
    
  }


  getTest() {
    let wishlistArray = this.wishlist.items;
    let item = wishlistArray.filter(item => item.product._id == this.product._id);
    return item[0] ? 1 : 0;
  }

}
