import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Shipping} from '../../models/form-data';
import {OrderService} from '../../order.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  shipping: Shipping;

  form: any;

  constructor(
    private router: Router,
    private orderService: OrderService) {
  }

  ngOnInit() {
    // console.log(this.orderService.getAddress());
    this.shipping = this.orderService.getAddress();
    console.log('Adres załadowany');
  }

  save(form: any) {
    this.orderService.setAddress(this.shipping);
  }

  goToNext(form: any) {
    if (form.valid) {
      this.save(form);
      this.router.navigate(['/checkout/confirm']);
    }
  }
}
