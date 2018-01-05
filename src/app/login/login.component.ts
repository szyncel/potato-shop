import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { error } from 'selenium-webdriver';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) { }

    login(form) {
      const user={
        email:form.value.email,
        password:form.value.password
      }
      //console.log(form.value);
      this.authService.signin(user)
        .subscribe((res) => {
          if (res) {
            let returnUrl=this.route.snapshot.queryParamMap.get('returnUrl');
            this.router.navigate([returnUrl || '/']);
          } else {
            console.log('Nieudane logowanie');
          }
          //console.log(data.body.token);
          // console.log(data.headers.get('x-auth'));
        })
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
