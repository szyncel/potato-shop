import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {
  userId: string;
  user = {};

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.userId = this.authService.currentUser._id;
  }

  ngOnInit() {
    this.authService.getUser().subscribe(user => {
      this.user = user;
      console.log(user)
    });
  }


  save(f) {
    console.log(f.value);
    this.authService.updateUser(f.value).subscribe(res => {
      console.log(res);
      this.router.navigate(['my/account']);
    })
  }

  changePassword(f) {
    // if pass is correct. then we can change
    console.log(f.value);
  }

  changeEmail(f) {
    // if pass is correct. then we can change
    console.log(f.value);
  }

}
