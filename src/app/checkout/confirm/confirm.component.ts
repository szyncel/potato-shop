import { Component, OnInit } from '@angular/core';
import { FormData } from '../../models/order';
import { Router } from '@angular/router';
import { ShoppingCart } from '../../models/shopping-cart';
import { OrderService } from '../../order.service';
import { ShoppingCartService } from '../../shopping-cart.service';
import { AuthService } from '../../auth.service';



@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  shipping: FormData;
  cart: ShoppingCart;
  userId:String;

  constructor(
    private router: Router,
    private orderService: OrderService,
    private shoppingCartService: ShoppingCartService,
    private authService: AuthService) { }

  async ngOnInit() {
    this.shipping = this.orderService.getForm();
    (await this.shoppingCartService.getCart()).subscribe(c => this.cart = c);
    this.userId = this.authService.currentUser._id;
    //console.log(this.shipping);
  }


  goToPrevious() {
    this.router.navigate(['/checkout/address']);
  }


  placeOrder() {
    let order = {
      userId: this.userId,
      datePlaced: new Date().getTime(),
      shipping: this.shipping,
      items: this.cart.items.map(i => {
        return {
          product: {
            title: i.product.title,
            price: i.product.price,
            imgUrl: i.product.imgUrl,
            category: i.product.category
          },
          count: i.count,
          totalPrice: i.totalPrice
        }
      })
    };
    //console.log(order);
    //console.log(this.userId);
    this.orderService.storeOrder(order).subscribe(res => console.log(res));
  }

}
