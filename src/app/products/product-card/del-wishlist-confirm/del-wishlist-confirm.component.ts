import { Component, Inject, OnInit } from '@angular/core';
import { WishlistService } from '../../../services/wishlist.service';
import { WishlistComponent } from '../../../wishlist/wishlist.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Product } from '../../../store/models/product';

@Component({
  selector: 'app-del-wishlist-confirm',
  templateUrl: './del-wishlist-confirm.component.html',
  styleUrls: [ './del-wishlist-confirm.component.css' ]
})
export class DelWishlistConfirmComponent implements OnInit {

  constructor( private wishlistService: WishlistService,
               private wishlistComponent: WishlistComponent,
               @Inject(MAT_DIALOG_DATA) public data: Product,
               private dialogRef: MatDialogRef<DelWishlistConfirmComponent> ) {
  }

  ngOnInit() {
  }

  onDelFromWishlist() {
    this.wishlistService.removeFromWishlist(this.data).subscribe(res=>{
      this.dialogRef.close();
    });
  }
}
