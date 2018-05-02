import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ShoppingCart } from '../shared/models/shopping-cart';
import { Product } from '../shared/models/product';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { RemoveItemConfirmComponent } from './remove-item-confirm/remove-item-confirm.component';
import { ClearCartConfirmComponent } from './clear-cart-confirm/clear-cart-confirm.component';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: [ './shopping-cart.component.css' ]
})
export class ShoppingCartComponent implements OnInit {

  displayedColumns = [ 'image', 'name', 'count', 'action' ];

  dataSource;

  cart: ShoppingCart;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.refreshShoppingCart();
  }

  async refreshShoppingCart() {
    (await this.shoppingCartService.getCart()).subscribe(cart => {
      this.cart = cart;
      this.dataSource = new MatTableDataSource(this.cart.items);
    });
  }

  async clearCart() {
    let dialogRef = this.dialog.open(ClearCartConfirmComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(() => {
      this.refreshShoppingCart();
      dialogRef = null;
    });
  }

  removeFromCart( product: Product ) {
    let dialogRef = this.dialog.open(RemoveItemConfirmComponent, {
      width: '400px',
      data: product
    });
    dialogRef.afterClosed().subscribe(() => {
      this.refreshShoppingCart();
      dialogRef = null;
    });
  }
}
