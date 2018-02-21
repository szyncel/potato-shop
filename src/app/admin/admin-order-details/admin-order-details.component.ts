import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-order-details',
  templateUrl: './admin-order-details.component.html',
  styleUrls: ['./admin-order-details.component.css']
})
export class AdminOrderDetailsComponent implements OnInit {
  order;
  id;
  constructor(private orderService: OrderService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.orderService.getSingleOrder(this.id).subscribe(order => {
      console.log(order);
      this.order = order
    });
  }

}