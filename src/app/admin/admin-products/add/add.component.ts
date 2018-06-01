import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Category } from '../../../store/models/category';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: [ './add.component.css' ]
})
export class AddComponent implements OnInit {
  categoryList$: Observable<Category[]>;

  form: FormGroup;

  errors$;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddComponent>,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit() {
    this.createForm();
    this.categoryList$ = this.categoryService.getCategories();
  }

  onSubmit() {
    const form = this.form.value;
    const model = {
      category: form.category,
      imgUrl: form.imgUrl,
      price: form.price,
      title: form.title
    };
    this.productService.create(model).subscribe(data => {
      this.dialogRef.close();
      this.snackBar.open('Dodano produkt', 'Ok', {duration: 3500});
    }, err => {
      this.errors$ = err.error;
      console.log('Error:', err.error);
    });
  }

  createForm() {
    this.form = this.fb.group({
      category: null,
      imgUrl: null,
      price: null,
      title: null
    });
  }
}
