import { Component, OnInit, Input } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ProductsComponent } from '../products/products.component';
import { ShoppingCartService } from '../shopping-cart.service';
import { Product } from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
import { WishlistComponent } from '../wishlist/wishlist.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {
  @Input('product') product: Product;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private shoppingCartComponent: ShoppingCartComponent,
    private productComponent: ProductsComponent,
    private navbarComponent: NavbarComponent,
    private wishlistComponent: WishlistComponent,
    private productDetailsComponent:ProductDetailsComponent
  ) { }

  async addToCart(product: Product) {
    await this.shoppingCartService.addToCart(product);
    await this.productComponent.refreshData();
    await this.shoppingCartComponent.refreshShoppingCart();
    this.shoppingCartService.change();
    this.wishlistComponent.refreshCart();
    this.productDetailsComponent.refresh();
  }

  async decrasseCart(product: Product) {
    await this.shoppingCartService.decrasseCart(product);
    await this.productComponent.refreshData();
    await this.shoppingCartComponent.refreshShoppingCart();
    this.shoppingCartService.change();
    this.wishlistComponent.refreshCart();
    this.productDetailsComponent.refresh();
  }

  getQuantity() {
    if (!this.shoppingCart) return 0;
    let itemArray = this.shoppingCart.items;
    let item = itemArray.filter(item => item.product._id == this.product._id);//add '_id' to product interface
    return item[0] ? item[0].count : 0;
  }
}
