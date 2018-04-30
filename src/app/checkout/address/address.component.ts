import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Shipping} from '../../shared/models/form-data';
import {OrderService} from '../../services/order.service';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  shipping: Shipping;

  addressForm: FormGroup;

  constructor(
    private router: Router,
    private orderService: OrderService,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    this.createForm();
    this.shipping = this.orderService.getAddress();
    this.initFormValues();
  }

  onSave() {
    const form = this.addressForm.value;
    if (this.addressForm.valid) {
      this.orderService.setAddress(form);
      this.router.navigate(['/checkout/confirm']);
    }
  }

  private createForm() {
    this.addressForm = this.fb.group({
      firstName: null,
      lastName: null,
      address: null,
      city: null,
      country: null,
      code: null
    });
  }

  private initFormValues() {
    this.addressForm.patchValue({
      firstName: this.shipping.firstName,
      lastName: this.shipping.lastName,
      address: this.shipping.address,
      city: this.shipping.city,
      country: this.shipping.country,
      code: this.shipping.code
    });
  }
}
