import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { error } from 'selenium-webdriver';
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
        if (res) {
          let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
          this.wishlistService.change();
          this.router.navigate([returnUrl || '/']);
        } else {
          console.log('Nieudane logowanie');
        }
      }, (err) => {
        this.error=err.error.error;
        console.log(err.error)
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
        res => console.log(res),
        error => console.log(error)
      )
  }


  ngOnInit() {
  }

}
