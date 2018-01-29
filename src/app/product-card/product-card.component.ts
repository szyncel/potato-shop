import { Component, Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';
import { takeWhile } from 'rxjs/operator/takeWhile';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product: Product;
  @Input('shopping-cart') shoppingCart;
  showActions=true;

  constructor(private shoppingCartService: ShoppingCartService,
    private productComponent: ProductsComponent
  ) {
  }

  async addToCart(product: Product) {
    let res = await this.shoppingCartService.addToCart(product);
    this.productComponent.refreshData();
  }

  async decrasseCart(product:Product){
    let res= await this.shoppingCartService.decrasseCart(product);
    this.productComponent.refreshData();
  }


  getQuantity() {
    if (!this.shoppingCart) return 0;
    let itemArray = this.shoppingCart.shoppingCart.items;
    let item = itemArray.filter(item => item.product._id == this.product._id);//add '_id' to product interface
    return item[0] ? item[0].count : 0;
  }






}
