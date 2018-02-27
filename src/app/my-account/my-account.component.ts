import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  user: any = {};
  orders;
  rows=[];

  constructor(
    private authService: AuthService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.authService.getUser().subscribe(user => {
      this.user = user;
    });

    this.orderService.getLastOrders().subscribe(orders=>{
      this.orders=orders;
      for (let order in orders) {
        let o = orders[order];
        this.rows.push({
          nr: o._id, 
          date: o.datePlaced, 
          sum: `${o.totalOrderPrice} zł`, 
          status: o.status, 
          action: o._id
        });
        this.rows = [...this.rows];
      }
    })
  }

}
