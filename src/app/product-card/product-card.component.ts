import { Component, Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';
import { ProductsComponent } from '../products/products.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product: Product;
  @Input('shopping-cart') shoppingCart;
  showActions = true;


  constructor(
    private shoppingCartService: ShoppingCartService,
    private productComponent: ProductsComponent,
    private navbarComponent: NavbarComponent
  ) {

  }

  async addToCart(product: Product) {
    let res = await this.shoppingCartService.addToCart(product);
    let test = await this.productComponent.refreshData();
    //this.navbarComponent.refreshCounter();
    this.shoppingCartService.change();
    //nie działa
  };

}
