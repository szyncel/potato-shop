import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product.service';
// import { NgProgress } from 'ngx-progressbar';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  productsList$;

  constructor(
    private productService: ProductService,
    // public ngProgress: NgProgress
  ) {
    this.productsList$=this.productService.getAll();
    this.productService.getAll()
    .subscribe(products=>{
      console.log(products);    
    })
   }

  ngOnInit() {
    // this.productService.getAll()
    // .subscribe(products=>{
    //   this.productsList$=products;     
    // })
  }

}
