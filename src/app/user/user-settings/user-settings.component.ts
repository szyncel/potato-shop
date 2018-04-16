import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from "@angular/forms";
import {User} from "../../store/models/user";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {
  userId: string;
  user;
  user$;
  email: string;

  personalDataForm: FormGroup;
  personalErrors;

  passwordForm: FormGroup;
  passwordErrors;

  emailForm: FormGroup;
  emailErrors;


  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.createForm();
    this.userId = this.authService.currentUser._id;
    this.user$ = this.authService.getUser();
    this.authService.getUser().subscribe(user => {
      console.log(user);
      this.user = user;
      this.email = this.user.email;
      this.initValues();
    });

  }

  onSaveData() {
    const form = this.personalDataForm.value;
    const model = {
      name: form.name,
      surname: form.surname
    } as User;
    this.authService.updateUser(model).subscribe(res => {
      this.snackBar.open('Edycja przebiegła pomyślnie', 'Ok', {duration: 3500});
      // this.router.navigate(['my/account']);
    })

  }

  onChangePassword() {
    const form = this.passwordForm.value;
    const model = {
      email: this.email,
      password: form.oldPassword,
      newPass: form.newPassword
    } as User;
    this.authService.changePassword(model).subscribe(data => {
      this.snackBar.open('Edycja przebiegła pomyślnie', 'Ok', {duration: 3500});
      // this.router.navigate(['my/account']);
    }, err => {
      this.passwordErrors = err.error;
    })
  }

  onChangeEmail() {
    const form = this.emailForm.value;
    const model = {
      email: this.email,
      password: form.password,
      newEmail: form.email
    } as User;
    this.authService.changeEmail(model).subscribe(data => {
      this.snackBar.open('Edycja przebiegła pomyślnie', 'Ok', {duration: 3500});
      // this.router.navigate(['my/account']);
    }, err => {
      this.emailErrors = err.error;
      console.log('Error:', err.error);
    })
  }

  private initValues() {
    this.personalDataForm.patchValue({
      name: this.user.name,
      surname: this.user.surname
    });
    this.emailForm.patchValue({
      email: this.user.email,
    });
  }

  private createForm() {
    this.personalDataForm = this.fb.group({
      name: null,
      surname: null
    });
    this.passwordForm = this.fb.group({
      oldPassword: null,
      newPassword: null,
      repeatPassword: null
    });
    this.emailForm = this.fb.group({
      email: null,
      password: null
    });
  }
}
