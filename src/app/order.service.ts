import { Injectable } from '@angular/core';
import { FormData, Shipping } from './models/order';
import { CheckoutStepsService } from './checkout-steps.service';

@Injectable()
export class OrderService {
  private formData: FormData = new FormData();
  private isAddressFormValid: boolean = false;
  // private isConfirmFormValid: boolean = false;

  constructor(private checkoutStepsService: CheckoutStepsService) { }


  getAddress(): Shipping {
    var addr: Shipping = {
      firstName: this.formData.firstName,
      lastName: this.formData.lastName,
      address: this.formData.address,
      zip: this.formData.zip,
      city: this.formData.city,
      country: this.formData.country
    };
    return addr;
  }

  setAddress(data: Shipping) {
    this.isAddressFormValid = true;
    this.formData.firstName = data.firstName;
    this.formData.lastName = data.lastName;
    this.formData.address = data.address;
    this.formData.city = data.city;
    this.formData.country = data.country;
    this.formData.zip = data.zip;
    // activate next step
    this.checkoutStepsService.validateSteps('checkout/confirm');
  }

  getForm(): FormData {
    return this.formData;
  }

}
