import {Component, OnInit} from '@angular/core';
import {ShoppingCartService} from '../shopping-cart.service';
import {ShoppingCart} from '../models/shopping-cart';
import {Product} from '../models/product';
import {MatTableDataSource} from "@angular/material";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  displayedColumns = ['image', 'name', 'count', 'action'];

  dataSource;

  cart: ShoppingCart;

  constructor(private shoppingCartService: ShoppingCartService) {
  }


  ngOnInit() {
    this.refreshShoppingCart();
  }


  async refreshShoppingCart() {
    (await this.shoppingCartService.getCart()).subscribe(cart => {
      this.cart = cart
      this.dataSource = new MatTableDataSource(this.cart.items);
    })
  }

  async clearCart() {
    (await this.shoppingCartService.clearCart()).subscribe(res => {
      this.refreshShoppingCart();
      this.shoppingCartService.change();
    })
  }

  removeFromCart(product: Product) {
    this.shoppingCartService.removeFromCart(product).then(test => {
      this.refreshShoppingCart();
      this.shoppingCartService.change();
    });
  }
}
