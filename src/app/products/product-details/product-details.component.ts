import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { WishlistService } from '../../services/wishlist.service';
import { ProductsComponent } from '../products.component';
import { WishlistComponent } from '../../wishlist/wishlist.component';
import { Product } from '../../shared/models/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product;
  shoppingCart;
  id;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService,
    private wishlistService: WishlistService,
    private productComponent: ProductsComponent,
    private wishlistComponent: WishlistComponent
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.productService.get(this.id).subscribe(p => {
      this.product = p
    });
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
    this.refresh();
  }

}
