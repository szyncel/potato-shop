import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import 'rxjs/add/operator/switchMap';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs/Subscription';
import { WishlistService } from '../wishlist.service';
import { Wishlist } from '../models/wishlist';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category;
  cart;
  wishlist: Wishlist;
  subscription: Subscription;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService,
    private wishlistService: WishlistService
  ) {
    this.productService.getAll()
      .switchMap(products => {
        this.products = products;
        return this.route.queryParamMap;
      })
      .subscribe(params => {
        this.category = params.get('category');
        this.filteredProducts = (this.category) ?
          this.products.filter(p => p.category === this.category) : this.products;
      })
  }

  async refreshData() {
    this.subscription = (await this.shoppingCartService.getCart()).subscribe(cart => {
      this.cart = cart
    });
  }

  refreshWishlist() {
    this.wishlistService.getWishList().subscribe(wishlist => {
      this.wishlist = wishlist;
      console.log(wishlist);
    }
    );
  }

  ngOnInit() {
    this.refreshData();
    this.refreshWishlist();
  }

  ngOnDestroy() {//Potrzebne?
    this.subscription.unsubscribe();
  }
}
