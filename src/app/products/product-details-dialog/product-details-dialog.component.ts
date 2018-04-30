import {Component, Inject, OnInit} from '@angular/core';
import {Product} from "../../store/models/product";
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {ProductsComponent} from "../products.component";
import {WishlistComponent} from "../../wishlist/wishlist.component";
import {ProductService} from "../../services/product.service";
import {WishlistService} from "../../services/wishlist.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-product-details-dialog',
  templateUrl: './product-details-dialog.component.html',
  styleUrls: ['./product-details-dialog.component.css']
})
export class ProductDetailsDialogComponent implements OnInit {

  product$: Observable<Product>;

  shoppingCart;

  id;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private shoppingCartService: ShoppingCartService,
              private wishlistService: WishlistService,
              private productComponent: ProductsComponent,
              private wishlistComponent: WishlistComponent,
              private dialogRef: MatDialogRef<ProductDetailsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  addToCart(product: Product) {
    this.shoppingCartService.addToCart(product);
    this.productComponent.refreshData();
    this.shoppingCartService.change();
    this.wishlistComponent.refreshCart();
    this.refresh();
  };

  async refresh() {
    (await this.shoppingCartService.getCart()).subscribe(c => this.shoppingCart = c);
  }

  ngOnInit() {
    this.product$ = this.productService.get(this.data.id);
    this.product$.subscribe(res=>console.log(res));
    this.refresh();
  }

}
