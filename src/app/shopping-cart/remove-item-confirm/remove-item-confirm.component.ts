import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Product } from '../../store/models/product';

@Component({
  selector: 'app-remove-item-confirm',
  templateUrl: './remove-item-confirm.component.html',
  styleUrls: [ './remove-item-confirm.component.css' ]
})
export class RemoveItemConfirmComponent implements OnInit {

  constructor( private shoppingCartService: ShoppingCartService,
               @Inject(MAT_DIALOG_DATA) public data: Product,
               private dialogRef: MatDialogRef<RemoveItemConfirmComponent>,
  ) {
  }

  ngOnInit() {
  }

  onDelete() {
    this.shoppingCartService.removeFromCart(this.data).then(test => {
      // this.refreshShoppingCart();
      this.shoppingCartService.change();
      this.dialogRef.close();
    });
  }
}
