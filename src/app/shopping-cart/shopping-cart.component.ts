import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { Product } from '../models/product';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart: ShoppingCart;

  constructor(private shoppingCartService: ShoppingCartService) { }


  async refreshShoppingCart() {
    (await this.shoppingCartService.getCart()).subscribe(cart => {
      this.cart = cart
      console.log(this.cart);
    })
  }

  async clearCart(){
    (await this.shoppingCartService.clearCart()).subscribe(res=>{
      console.log(res);
      this.refreshShoppingCart();
    })
  }


  removeFromCart(product: Product) {
    this.shoppingCartService.removeFromCart(product).then(test=>{
      this.refreshShoppingCart();
    });
  }


  async ngOnInit() {
    await this.refreshShoppingCart();
  }

}
