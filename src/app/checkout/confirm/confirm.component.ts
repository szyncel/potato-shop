import { Component, OnInit } from '@angular/core';
import { FormData } from '../../models/form-data';
import { Router } from '@angular/router';
import { ShoppingCart } from '../../models/shopping-cart';
import { OrderService } from '../../order.service';
import { ShoppingCartService } from '../../shopping-cart.service';
import { AuthService } from '../../auth.service';
import { Order } from '../../models/order';
import { Product } from '../../models/product';



@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  shipping: FormData;
  cart: ShoppingCart;
  userId: string;
  orderId: string;

  constructor(
    private router: Router,
    private orderService: OrderService,
    private shoppingCartService: ShoppingCartService,
    private authService: AuthService) { }

  async ngOnInit() {
    this.shipping = this.orderService.getForm();
    console.log(this.shipping);
    this.refreshCart();
    this.userId = this.authService.currentUser._id;
    //console.log(this.shipping);
  }

  async refreshCart() {
    (await this.shoppingCartService.getCart()).subscribe(c => {
      this.cart = c
      console.log(this.cart);
    });
  }


  goToPrevious() {
    this.router.navigate(['/checkout/address']);
  }


  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);

    (await this.shoppingCartService.clearCart()).subscribe(res => console.log(res));//refreshing page state
    this.orderService.storeOrder(order).subscribe(res => {
      this.orderId = res.order._id;
      this.shoppingCartService.change();
      this.router.navigate(['/order-success/', this.orderId]);
      console.log(this.orderId);
    });
    //clear shopping cart
  }

  removeFromCart(product: Product) {
    this.shoppingCartService.removeFromCart(product).then(test => {
      // this.refreshShoppingCart();
      this.refreshCart();
      this.shoppingCartService.change();
    });
  }

}
