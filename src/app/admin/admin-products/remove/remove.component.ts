import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatCheckboxChange, MatDialogRef, MatSnackBar} from "@angular/material";
import {ProductService} from "../../../product.service";

@Component({
  selector: 'app-remove',
  templateUrl: './remove.component.html',
  styleUrls: ['./remove.component.css']
})
export class RemoveComponent implements OnInit {

  isConfirmed = false;

  /** Zawiera dane z formularza */
  form: FormGroup;

  errors$;

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<RemoveComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar,
              private productService: ProductService
  ) {
  }

  ngOnInit() {
    this.createForm();
  }

  onSubmit() {
    this.productService.delete(this.data.id)
      .subscribe(data => {
        this.dialogRef.close();
        this.snackBar.open('Usunięto produkt', 'Ok', {duration: 3500});
      }, err => {
        this.errors$ = err.error;
        console.log('Error:', err.error);
      });
  }

  /** Ustawia wartość zmiennej po zaznaczeniu/odznaczeniu checkboxa potwierdzającego operację */
  onConfirmationChange(event: MatCheckboxChange): void {
    this.isConfirmed = event.checked;
  }

  private createForm(): void {
    this.form = this.fb.group({});
  }
}
