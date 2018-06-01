import {Component, Input} from '@angular/core';

import {ProductDetailsComponent} from '../product-details/product-details.component';
import {ShoppingCart} from "../../shared/models/shopping-cart";
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {ShoppingCartComponent} from "../../shopping-cart/shopping-cart.component";
import {WishlistComponent} from "../../wishlist/wishlist.component";
import {NavbarComponent} from "../../shared/navbar/navbar.component";
import {ProductsComponent} from "../products.component";
import {Product} from "../../store/models/product";

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
    private productDetailsComponent: ProductDetailsComponent
  ) {
  }

  async addToCart(product: Product) {
    await this.shoppingCartService.addToCart(product);
    await this.productComponent.refreshData();
    await this.shoppingCartComponent.refreshShoppingCart();
    await this.wishlistComponent.refreshCart();
    await this.productDetailsComponent.refresh();
    this.shoppingCartService.change();
  }

  async decrasseCart(product: Product) {
    await this.shoppingCartService.decrasseCart(product);
    await this.productComponent.refreshData();
    await this.shoppingCartComponent.refreshShoppingCart();
    await this.wishlistComponent.refreshCart();
    await this.productDetailsComponent.refresh();
    this.shoppingCartService.change();
  }

  getQuantity() {
    if (!this.shoppingCart) return 0;
    let itemArray = this.shoppingCart.items;
    let item = itemArray.filter(item => item.product._id == this.product._id);//add '_id' to product interface
    return item[0] ? item[0].count : 0;
  }
}
