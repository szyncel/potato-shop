import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders;
  userId:string;

  constructor(private orderService: OrderService,
  private authService:AuthService) {
    this.userId=this.authService.currentUser._id;
   }

  ngOnInit() {
    console.log(this.userId);
    this.orderService.getOrders(this.userId).subscribe(orders=>{
      this.orders=orders;
      console.log(this.orders);
    })
  }

}
