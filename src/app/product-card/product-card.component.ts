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



  constructor(
    private shoppingCartService: ShoppingCartService,
    private wishlistService: WishlistService,
    private productComponent: ProductsComponent,
    private navbarComponent: NavbarComponent,
    private wishlistComponent: WishlistComponent
  ) {}

  addToCart(product: Product) {
    this.shoppingCartService.addToCart(product).then(res=>{
      this.productComponent.refreshData();
      this.shoppingCartService.change();
      this.wishlistComponent.refreshCart();
    });
  };


  async delFromWishlist() {
    await this.wishlistService.removeFromWishlist(this.product)
      // this.productComponent.refreshWishlist();
      this.wishlistComponent.updateWishlist();
      this.wishlistService.change();
      //refresh wishlsit page
  }
}
