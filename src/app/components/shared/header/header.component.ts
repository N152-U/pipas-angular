import { UserModel } from '@app/models/user/userModel.module';
import { AfterContentInit, Component, OnInit, isDevMode, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { OnDestroy } from '@angular/core';
import { NgxPermissionsService, NgxRolesService } from "ngx-permissions";
import { environment } from '@environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  hasUser: boolean = false;
  appVersion: string = '';
  appAlias: string = '';

  constructor(
    private user: UserModel,
    private router: Router,
    private auth: AuthService,
    private rs: NgxRolesService,
    private _ngZone: NgZone,
    private permissionsService: NgxPermissionsService,
  ) {
    
    if(isDevMode())console.log(this.router);
    this.auth.getUserLoggedInData.subscribe((data) => {
      if(isDevMode())console.log('detalleusuario',data)
      if (data) {
        console.log(data)
      /*   this.user.username = data.username;
        this.user.firstName = data.firstName;
        this.user.middleName = data.middleName;
        this.user.lastName = data.lastName;
        this.user.role = data.role;
        this.user.roleId = data.roleId; */
        this.user=data;
        this.hasUser = true;
     console.log(this.hasUser);
      } else {
        this.hasUser = false;
        this.auth.logOut();
      }
    });
    
   /*  if (this.auth.isAuth()) {
      let dataToken = this.auth.getTokenData();

      this.user.username = dataToken.username;
      this.user.lastName = dataToken.lastName;
      this.hasUser = true;
      console.log(this.user);
    }  */
  }

  ngOnInit(): void {
    if (isDevMode()) console.log('cargando navbar');
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.auth.getUserLoggedInData.unsubscribe();
  }

  logOut() {
    this.user=null;
   /*  this.auth.getUserLoggedInData.unsubscribe(); */
    this.hasUser = false;
    this.auth.logOut();
  }
}