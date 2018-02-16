import { Component, Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';
import { ProductsComponent } from '../products/products.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { WishlistService } from '../wishlist.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product: Product;
  @Input('shopping-cart') shoppingCart;
  @Input('wishlist') wishlist;
  showActions = true;


  constructor(
    private shoppingCartService: ShoppingCartService,
    private wishlistService: WishlistService,
    private productComponent: ProductsComponent,
    private navbarComponent: NavbarComponent
  ) {

  }

  async addToCart(product: Product) {
    await this.shoppingCartService.addToCart(product);
    await this.productComponent.refreshData();
    //this.navbarComponent.refreshCounter();
    this.shoppingCartService.change();
    //nie działa
  };


  async addToWishlist(product: Product) {
    await this.wishlistService.addToWishList(product);
  }

}
