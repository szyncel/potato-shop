import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { OrderService } from '../order.service';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MyOrdersComponent implements OnInit {
  orders;
  userId: string;

  rows=[];



  constructor(
    private orderService: OrderService,
    private authService: AuthService) {
    this.userId = this.authService.currentUser._id;
  }

  ngOnInit() {
    // console.log(this.userId);
    this.orderService.getOrders(this.userId).subscribe(orders => {
      this.orders=orders;
      for (let order in orders) {
        let o = orders[order];
        this.rows.push({
          nr: o._id, 
          date: o.datePlaced, 
          sum: '123', 
          status: 'waiting', 
          action: o._id
        });
        this.rows = [...this.rows];
      }
    })
  }



}
