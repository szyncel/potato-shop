import {Component, OnInit, OnDestroy} from '@angular/core';
import {CategoryService} from '../../services/category.service';
import {ProductService} from '../../services/product.service';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../../shared/models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categoryList;
  product: Product;
  id;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.product = new Product();
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.productService.get(this.id).subscribe(p => this.product = p);
  }

  save(product) {
    console.log('pt', product.value);
    if (product.valid) {
      if (this.id) {
        this.productService.update(this.id, product.value)
          .subscribe((res) => this.router.navigate(['admin/products']))
      } else {
        this.productService.create(product.value)
          .subscribe((res) => {
            this.router.navigate(['admin/products']);
          })
      }
    } else {
      console.log('Invalid');
    }
  }

  delete() {
    if (!confirm('Czy jesteś pewny, że chcesz usunać ten produkt?')) return
    this.productService.delete(this.id)
      .subscribe((res) => console.log(res))
    this.router.navigate(['admin/products']);
  }

  ngOnInit() {
    this.categoryService.getCategories()
      .subscribe(category =>
        this.categoryList = category)
  }
}
