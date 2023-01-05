/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "@environments/environment";
import { Router } from "@angular/router";

/*---- MODELS---- */
import { getUsers } from "../../../models/user/getUsers.module";
import { UserModel } from "../../../models/user/userModel.module";

import { map } from "rxjs/operators";
import { NgxRolesService } from "ngx-permissions";

@Injectable({
  providedIn: "root",
})
export class ManageUsersService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private rs: NgxRolesService
  ) {}

  crearUser(user: UserModel) {
    return this.http.post(`${environment.apiUrl}user/signup`, user).pipe(
      map((resp: any) => {
        user.id = resp.id;
        return user;
      })
    );
  }

  updateUser(user: UserModel) {
    const userTemp = {
      ...user,
    };
    delete userTemp.id;
    return this.http.put(
      `${environment.apiUrl}user/update/${user.id}`,
      userTemp
    );
  }

  deleteUser(id: string) {
    return this.http.delete(`${environment.apiUrl}user/delete/${id}`);
  }
  getUser(id: string) {
    return this.http
      .get<UserModel>(`${environment.apiUrl}user/getById/${id}`)
      .pipe(map(this.createArrayUser));
  }

  getAllUsers() {
    return this.http
      .get(`${environment.apiUrl}user/getAll/1`)
      .pipe(map(this.createArrayUsers));
  }

  private createArrayUsers(usersObj: object) {
    const users: getUsers[] = [];
    Object.keys(usersObj).forEach((key) => {
      const user: getUsers = usersObj[key];
      user.id = key;
      users.push(user);
    });
    return users;
  }
  private createArrayUser(usersObj: object) {
    const EditUser: UserModel[] = [];
    Object.keys(usersObj).forEach((id) => {
      const user: UserModel = usersObj[id];
      user.id = id;
      EditUser.push(user);
    });
    return EditUser;
  }
}
