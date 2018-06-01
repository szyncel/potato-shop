import { Component, Input } from '@angular/core';
import { Product } from '../../shared/models/product';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { ProductsComponent } from '../products.component';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { WishlistService } from '../../services/wishlist.service';
import { Wishlist } from '../../shared/models/wishlist';
import { WishlistComponent } from '../../wishlist/wishlist.component';
import { MatDialog } from '@angular/material';
import { ProductDetailsDialogComponent } from '../product-details-dialog/product-details-dialog.component';
import { RemoveItemConfirmComponent } from '../../shopping-cart/remove-item-confirm/remove-item-confirm.component';
import { DelWishlistConfirmComponent } from './del-wishlist-confirm/del-wishlist-confirm.component';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: [ './product-card.component.css' ]
})
export class ProductCardComponent {
  @Input('product') product: Product;
  @Input('shopping-cart') shoppingCart;
  @Input('wishlist') wishlist: Wishlist;
  @Input('del') showDelete = false;
  showActions = true;


  constructor(
    private shoppingCartService: ShoppingCartService,
    private wishlistService: WishlistService,
    private productComponent: ProductsComponent,
    private navbarComponent: NavbarComponent,
    private wishlistComponent: WishlistComponent,
    private dialog: MatDialog
  ) {
  }

  addToCart( product: Product ) {
    this.shoppingCartService.addToCart(product).then(res => {
      this.productComponent.refreshData();
      this.shoppingCartService.change();
      this.wishlistComponent.refreshCart();
    });
  };

  delFromWishlist() {
    let dialogRef = this.dialog.open(DelWishlistConfirmComponent, {
      width: '400px',
      data: this.product
    });
    dialogRef.afterClosed().subscribe(() => {
      this.wishlistComponent.updateWishlist();
      this.wishlistService.change();
      dialogRef = null;
    });
  }


}
