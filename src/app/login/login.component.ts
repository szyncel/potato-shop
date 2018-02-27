import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { WishlistService } from '../wishlist.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { ProductsComponent } from '../products/products.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error;
  registerError;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private wishlistService:WishlistService
  ) { }

  login(form) {
    const user = {
      email: form.value.e,
      password: form.value.p
    }
    this.authService.signin(user)
      .subscribe((res) => {
          let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
          this.wishlistService.change();
          this.authService.change();
          this.router.navigate([returnUrl || '/']);       
      }, (err) => {
        this.error=err.error.error;
      });
  }




  submit(form) {
    const user = new User(
      form.value.name,
      form.value.surname,
      form.value.email,
      form.value.password,
    )

    this.authService.signup(user)
      .subscribe(
        res => {
          form.reset();
          const msg:any=res;
          alert(msg.message);
        },
        error => {
          this.registerError=error.error.title;
        }
      )
  }

  ngOnInit() {
  }

}
