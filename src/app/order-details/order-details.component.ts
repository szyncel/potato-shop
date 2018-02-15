import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  order;
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.orderService.getOrder(this.id).subscribe(order => {
      this.order = order;
      console.log(this.order);
    }

    )
  }

  ngOnInit() {
  }

}
