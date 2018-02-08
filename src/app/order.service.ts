import { Injectable } from '@angular/core';
import { FormData, Shipping } from './models/order';
import { CheckoutStepsService } from './checkout-steps.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class OrderService {
  private formData: FormData = new FormData();
  private isAddressFormValid: boolean = false;
  // private isConfirmFormValid: boolean = false;

  constructor(
    private checkoutStepsService: CheckoutStepsService,
    private http: HttpClient) { }


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


  storeOrder(order) {
    return this.http.post('/api/place-order', order);
  }

}
