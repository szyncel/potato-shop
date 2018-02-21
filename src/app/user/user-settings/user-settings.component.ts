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
  user:any = {};
  email:string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.userId = this.authService.currentUser._id;
  }

  ngOnInit() {
    this.authService.getUser().subscribe(user => {
      this.user = user;
      this.email=this.user.email;
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
    let data={
      email:this.email,
      password:f.value.password,
      newEmail:f.value.email
    }

    console.log(data);
    this.authService.changeEmail(data).subscribe(res=>{
      console.log(res);
      this.router.navigate(['my/account']);
    })
    // console.log(data);
  }

}
