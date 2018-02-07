import { Component, OnInit } from '@angular/core';
import { FormData } from '../../models/order';
import { Router } from '@angular/router';
import { ShoppingCart } from '../../models/shopping-cart';
import { OrderService } from '../../order.service';
import { ShoppingCartService } from '../../shopping-cart.service';



@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  shipping: FormData;
  cart: ShoppingCart

  constructor(
    private router: Router,
    private orderService: OrderService,
    private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    this.shipping = this.orderService.getForm();
    (await this.shoppingCartService.getCart()).subscribe(cart => console.log(cart))
    //console.log(this.shipping);
  }


  goToPrevious() {
    this.router.navigate(['/checkout/address']);
  }


  placeOrder() {
    console.log(this.shipping);
  }

}
