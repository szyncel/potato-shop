import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  productsList;

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.productService.getAll()
    .subscribe(products=>this.productsList=products)
  }

}