import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product.service';
// import { NgProgress } from 'ngx-progressbar';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  productsList;

  constructor(
    private productService: ProductService,
    // public ngProgress: NgProgress
  ) { }

  ngOnInit() {
    // this.ngProgress.start();
    this.productService.getAll()
    .subscribe(products=>{
      this.productsList=products;
      // this.ngProgress.done();
    })
  }

}
