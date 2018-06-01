import { Component, Inject, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-user-order-details',
  templateUrl: './user-order-details.component.html',
  styleUrls: [ './user-order-details.component.css' ]
})
export class UserOrderDetailsComponent implements OnInit {

  data$;

  displayedColumns = [ 'title', 'price' ];

  dataSource;

  constructor(
    private dialogRef: MatDialogRef<UserOrderDetailsComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private orderService: OrderService
  ) {
  }

  ngOnInit() {
    this.data$ = this.orderService.getOrder(this.data.id);
    this.data$.subscribe(order => {
      this.dataSource = new MatTableDataSource(order.items);
    });
  }

}
