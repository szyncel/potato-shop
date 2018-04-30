import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../services/order.service';
import {MatDialog, MatTableDataSource} from "@angular/material";
import {OrderDetailsDialogComponent} from "./order-details/order-details.component";

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  orders$;

  displayedColumns = ['id', 'data', 'suma', 'status', 'actions'];

  dataSource;

  constructor(
    private orderService: OrderService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.loadOrderList();
  }

  loadOrderList() {
    this.orders$ = this.orderService.getAllOrders();
    this.orders$.subscribe(orders => {
      this.dataSource = new MatTableDataSource(orders);
    });
  }

  onDetailsDialog(orderId) {
    let dialogRef = this.dialog.open(OrderDetailsDialogComponent, {
      width: '600px',
      data: {id: orderId}
    });
    dialogRef.afterClosed().subscribe(() => {
      this.loadOrderList();
      dialogRef = null;
    });
  }

}
