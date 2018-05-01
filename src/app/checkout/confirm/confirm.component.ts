import { Component, OnInit } from '@angular/core';
import { FormData } from '../../shared/models/form-data';
import { Router } from '@angular/router';
import { ShoppingCart } from '../../shared/models/shopping-cart';
import { OrderService } from '../../services/order.service';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { AuthService } from '../../services/auth.service';
import { Order } from '../../shared/models/order';
import { Product } from '../../shared/models/product';
import { FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';


@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: [ './confirm.component.css' ]
})
export class ConfirmComponent implements OnInit {

  shipping: FormData;

  cart: ShoppingCart;

  userId: string;

  orderId: string;

  form: FormGroup;

  displayedColumns = ['image', 'name', 'action'];

  dataSource;

  constructor(
    private router: Router,
    private orderService: OrderService,
    private shoppingCartService: ShoppingCartService,
    private authService: AuthService ) {
  }

  async ngOnInit() {
    this.shipping = this.orderService.getForm();
    this.refreshCart();
    this.userId = this.authService.currentUser._id;
  }

  async refreshCart() {
    (await this.shoppingCartService.getCart()).subscribe(c => {
      this.cart = c;
      this.dataSource = new MatTableDataSource(this.cart.items);
    });
  }


  goToPrevious() {
    this.router.navigate([ '/checkout/address' ]);
  }


  async placeOrder() {
    const order = new Order(this.userId, this.shipping, this.cart);

    (await this.shoppingCartService.clearCart()).subscribe(res => console.log(res)); //refreshing page state
    this.orderService.storeOrder(order).subscribe(res => {
      this.orderId = res.order._id;
      this.shoppingCartService.change();
      this.router.navigate([ '/order-success/', this.orderId ]);
    });
    //clear shopping cart
  }

  removeFromCart( product: Product ) {
    this.shoppingCartService.removeFromCart(product).then(test => {
      this.refreshCart();
      this.shoppingCartService.change();
    });
  }

}
