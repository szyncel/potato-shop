import {Injectable} from '@angular/core';
import {FormData, Shipping} from './models/form-data';
import {CheckoutStepsService} from './checkout-steps.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class OrderService {
  private formData: FormData = new FormData();

  constructor(
    private checkoutStepsService: CheckoutStepsService,
    private http: HttpClient) {
  }


  getAddress(): Shipping {
    var addr: Shipping = {
      firstName: this.formData.firstName,
      lastName: this.formData.lastName,
      address: this.formData.address,
      code: this.formData.code,
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
    this.formData.code = data.code;
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


  storeOrder(order): Observable<any> {
    let token = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('x-auth', token);
    return this.http.post('/api/place-order', order, {headers: headers});
  }

  getOrders(userId): Observable<any> {
    let token = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('x-auth', token);

    return this.http.get(`/api/all-orders`, {headers: headers}).map(orders => orders["orders"]);
  }

  getOrder(orderId): Observable<any> {
    let token = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('x-auth', token);
    return this.http.get(`/api/order/${orderId}`, {headers: headers}).map(orders => orders["orders"]);
  }

  //Only for admin

  getAllOrders(): Observable<any> {
    return this.http.get('/api/admin-orders');
  }


  getSingleOrder(orderId) {

    return this.http.get(`/api/admin-orders/${orderId}`).map(order => order['order']);
  }

  getLastOrders() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('x-auth', token);
    return this.http.get('/api/last-orders', {headers: headers});
  }

  editOrder(orderId, model) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('x-auth', token);
    return this.http.put(`/api/admin-orders/${orderId}`, model, {headers: headers});
  }

}
