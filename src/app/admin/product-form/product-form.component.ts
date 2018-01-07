import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from '../../category.service';
import { ProductService } from '../../product.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<any> = new Subject();//niepotrzebne

  categoryList;
  product = {};
  id;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.productService.get(this.id).takeUntil(this.ngUnsubscribe).subscribe(p => this.product = p);
  }

  save(product) {
    if (product.valid) {
      if (this.id) {
        this.productService.update(this.id, product.value)
          .subscribe((res) => console.log(res))
      }else{
        this.productService.create(product.value)
        .subscribe((res) => {
          console.log(res);
        })
      }
      this.router.navigate(['admin/products']);

    } else {
      console.log('Invalid');
    }
  }

  ngOnInit() {
    this.categoryService.getCategories()
      .subscribe(category =>
        this.categoryList = category)
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }



}
