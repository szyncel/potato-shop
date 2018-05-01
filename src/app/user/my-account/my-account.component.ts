import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {OrderService} from '../../services/order.service';
import { MatDialog, MatTableDataSource } from '@angular/material';
import {Order} from "../../shared/models/order";
import { UserOrderDetailsComponent } from '../my-orders/user-order-details/user-order-details.component';

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
    private orderService: OrderService,
    private dialog: MatDialog
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

  onDetailsDialog( orderId ) {
    let dialogRef = this.dialog.open(UserOrderDetailsComponent, {
      width: '600px',
      data: {id: orderId}
    });
    dialogRef.afterClosed().subscribe(() => {
      dialogRef = null;
    });
  }

}
