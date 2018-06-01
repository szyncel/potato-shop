import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Product } from '../../store/models/product';
import { RemoveItemConfirmComponent } from '../remove-item-confirm/remove-item-confirm.component';

@Component({
  selector: 'app-clear-cart-confirm',
  templateUrl: './clear-cart-confirm.component.html',
  styleUrls: [ './clear-cart-confirm.component.css' ]
})
export class ClearCartConfirmComponent implements OnInit {

  constructor( private shoppingCartService: ShoppingCartService,
               @Inject(MAT_DIALOG_DATA) public data: Product,
               private dialogRef: MatDialogRef<RemoveItemConfirmComponent> ) {
  }

  ngOnInit() {
  }


  async onClearCart() {
    (await this.shoppingCartService.clearCart()).subscribe(res => {
      this.shoppingCartService.change();
      this.dialogRef.close();
    });
  }

}
