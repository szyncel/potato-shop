import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
product={};
id;

  constructor(
    private productService:ProductService,
    private route:ActivatedRoute
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.productService.get(this.id).subscribe(p => {
      console.log(p);
      this.product = p
    });
   }

  ngOnInit() {
    
  }

}
