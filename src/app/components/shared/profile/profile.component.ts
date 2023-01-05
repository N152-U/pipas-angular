import { isDevMode } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { UserModel } from '@app/models/user/user.module';
import { AuthService } from '@app/services/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private auth: AuthService,
    public user: UserModel,
  ) {
    
console.log(this.user)
  }

  ngOnInit(): void {
  }

}
