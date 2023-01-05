/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "@environments/environment";
import { Router } from "@angular/router";

/*----MODELS--- */
import { getRoles } from "../../../models/role/getRoles.module";
import { roleModel } from "../../../models/role/roleModel.module";
import { PermissionModel } from "../../../models/role/permissionModel.module";

import { map } from "rxjs/operators";
import { NgxRolesService } from "ngx-permissions";

@Injectable({
  providedIn: "root",
})
export class ManageRolesService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private rs: NgxRolesService
  ) {}

  createRole(role: roleModel) {
    return this.http.post(`${environment.apiUrl}role/create`, role).pipe(
      map((resp: any) => {
        role.id = resp.id;
        return role;
      })
    );
  }

  updateRole(role: roleModel) {
    const roleTemp = {
      ...role,
    };
    delete roleTemp.id;
    return this.http.put(
      `${environment.apiUrl}role/update/${role.id}`,
      roleTemp
    );
  }

  getAllRoles() {
    return this.http
      .get(`${environment.apiUrl}role/getAll`)
      .pipe(map(this.createArrayRoles));
  }

  deleteRole(id: string) {
    return this.http.delete(`${environment.apiUrl}role/delete/${id}`);
  }

  getRole(id: string) {
    return this.http
      .get<roleModel>(`${environment.apiUrl}role/getById/${id}`)
      .pipe(map(this.createArrayRole));
  }

  getPermissions() {
    return this.http
      .get(`${environment.apiUrl}permission/getAll`)
      .pipe(map(this.createArrayPermissions));
  }

  private createArrayRoles(usersObj) {
    const roles: getRoles[] = [];

    Object.keys(usersObj).forEach((key) => {
      const role: getRoles = usersObj[key];
      role.id = key;
      roles.push(role);
    });
    return roles;
  }
  private createArrayRole(usersObj) {
    const roles: roleModel[] = [];

    Object.keys(usersObj).forEach((key) => {
      const role: roleModel = usersObj[key];
      role.id = key;
      roles.push(role);
    });
    return roles;
  }
  private createArrayPermissions(permissionsObj) {
    const permissions: PermissionModel[] = [];
    Object.keys(permissionsObj).forEach((key) => {
      const permission: PermissionModel = permissionsObj[key];
      permission.id = key;
      permissions.push(permission);
    });
    return permissions;
  }
}
