import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../category.service';
import { ProductService } from '../../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categoryList;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
  ) {}

  save(product){
    if(product.valid){
          this.productService.create(product.value)
    .subscribe((res) => {
      console.log(res);
    })
    this.router.navigate(['admin/products']);
    // console.log(product);
    }else{
console.log('Invalid');
    }
    // console.log(product);
    // this.productService.create(product)
    // .subscribe((res) => {
    //   console.log(res);
    // })
    // console.log(product);
  }

  ngOnInit() {
    this.categoryService.getCategories()
    .subscribe(category=>
    this.categoryList=category)
  }



}
