import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { CategoryService } from '../../../services/category.service';
import { Observable } from 'rxjs/Observable';
import { Category } from '../../../store/models/category';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: [ './edit.component.css' ]
})
export class EditComponent implements OnInit {

  categoryList$: Observable<Category[]>;
  form: FormGroup;
  errors$;
  data$;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit() {
    this.data$ = this.productService.get(this.data.id);
    this.createForm();
    this.categoryList$ = this.categoryService.getCategories();
    this.initValues();
  }


  onSubmit() {
    const form = this.form.value;
    const model = {
      category: form.category,
      imgUrl: form.imgUrl,
      price: form.price,
      title: form.title
    };
    this.productService.update(this.data.id, model)
      .subscribe(data => {
        this.dialogRef.close();
        this.snackBar.open('Edycja przebiegła pomyślnie', 'Ok', {duration: 1500});
      }, err => {
        this.errors$ = err.error;
        console.log('Error:', err.error);
      });


  }

  initValues() {
    this.data$.subscribe(product => {
      console.log(product);
      this.form.patchValue({
        category: product.category,
        imgUrl: product.imgUrl,
        price: product.price,
        title: product.title
      });
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
