import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, MatTableDataSource} from "@angular/material";
import {FormBuilder, FormGroup} from "@angular/forms";
import {OrderService} from "../../../order.service";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsDialogComponent implements OnInit {

  data$;

  form: FormGroup;

  displayedColumns = ['title', 'price'];

  dataSource;

  options = [
    {value: 'Przygotowanie', viewValue: 'Przygotowanie do wysyłki'},
    {value: 'Oczekiwanie', viewValue: 'Realizacja zamówienia'},
    {value: 'Wysłano', viewValue: 'Wysłano'}
  ];

  constructor(
    private dialogRef: MatDialogRef<OrderDetailsDialogComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private orderService: OrderService
  ) {
  }

  ngOnInit() {
    this.data$ = this.orderService.getOrder(this.data.id);
    this.createForm();
    this.initValues();
  }


  initValues() {
    this.data$.subscribe(order => {
      console.log(order);
      this.form.patchValue({
        status: order.status
      });
      this.dataSource = new MatTableDataSource(order.items);
      console.log(this.dataSource);
    });

  }


  createForm() {
    this.form = this.fb.group({
      status: null
    });
  }


  onSubmit() {
    console.log(this.form.value);
    const model = {
      status: this.form.value.status
    }
    this.orderService.editOrder(this.data.id, model)
      .subscribe(res => {
        console.log(res)
        this.dialogRef.close();
        this.snackBar.open('Status zamówienia zmieniony', 'Ok', {duration: 3500});
      }, err => {
        console.log('Error:', err.error);
      });

  }

}
