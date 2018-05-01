import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { WishlistService } from '../services/wishlist.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth } from '../store/models/auth';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {

  error;

  registerError;

  loginForm: FormGroup;

  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private wishlistService: WishlistService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.createForm();
  }

  onRegister() {
    const form = this.registerForm.value;
    const model = {
      name: form.name,
      surname: form.surname,
      email: form.email,
      password: form.password,
    };
    this.authService.signup(model)
      .subscribe(
        res => {
          this.registerForm.reset();
          this.registerForm.clearValidators();
          this.registerForm.markAsUntouched();
          //const msg: any = res;
          this.snackBar.open('Rejestracja przebiegła pomyślnie', 'Ok', {duration: 3500});
          //alert(msg.message);
        },
        error => {
          this.registerError = error.error.title;
        }
      );
  }

  onLogin() {
    const form = this.loginForm.value;
    const model = {
      email: form.Email,
      password: form.Haslo
    }as Auth;
    this.authService.signin(model)
      .subscribe(( res ) => {
        this.snackBar.open('Logowanie pomyślne', 'Ok', {duration: 3500});
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
        this.wishlistService.change();
        this.authService.change();
        this.router.navigate([ returnUrl || '/' ]);
      }, ( err ) => {
        this.error = err.error.error;
      });
  }

  private createForm(): void {
    this.loginForm = this.fb.group({
      Email: null,
      Haslo: null
    });
    this.registerForm = this.fb.group({
      name: null,
      surname: null,
      email: null,
      password: null
    });
  }
}
