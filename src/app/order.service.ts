import { Injectable } from '@angular/core';
import { FormData, Shipping } from './models/form-data';
import { CheckoutStepsService } from './checkout-steps.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class OrderService {
  private formData: FormData = new FormData();

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

  resetFormData(): FormData {
    this.formData.clear();
    return this.formData;
}


  storeOrder(order):Observable<any> {
    return this.http.post('/api/place-order', order);
  }

  getOrders(userId):Observable<any>{
    return this.http.get(`/api/all-orders/${userId}`).map(orders=> orders["orders"]);
  }

}
