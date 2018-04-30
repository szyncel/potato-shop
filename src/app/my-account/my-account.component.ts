import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {OrderService} from '../order.service';
import {MatTableDataSource} from "@angular/material";
import {Order} from "../models/order";

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  user: any = {};

  orders;

  displayedColumns = ['_id', 'datePlaced', 'totalOrderPrice', 'status', 'action'];

  dataSource;

  constructor(
    private authService: AuthService,
    private orderService: OrderService
  ) {
  }

  ngOnInit() {
    this.authService.getUser().subscribe(user => {
      this.user = user;
    });
    this.orderService.getLastOrders().subscribe((orders: Order[]) => {
      this.orders = orders;
      this.dataSource = new MatTableDataSource(orders);
    });
  }

}
