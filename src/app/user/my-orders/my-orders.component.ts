import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { OrderDetailsDialogComponent } from '../../admin/admin-orders/order-details/order-details.component';
import { UserOrderDetailsComponent } from './user-order-details/user-order-details.component';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: [ './my-orders.component.css' ],
  encapsulation: ViewEncapsulation.None
})
export class MyOrdersComponent implements OnInit {
  orders;
  userId: string;

  displayedColumns = [ '_id', 'datePlaced', 'totalOrderPrice', 'status', 'action' ];

  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private dialog: MatDialog ) {
    this.userId = this.authService.currentUser._id;
  }

  ngOnInit() {
    this.orderService.getOrders(this.userId).subscribe(orders => {
      this.orders = orders;
      this.dataSource = new MatTableDataSource(orders);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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
