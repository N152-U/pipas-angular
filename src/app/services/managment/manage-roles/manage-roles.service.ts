/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse,HttpParams } from "@angular/common/http";
import { environment } from "@environments/environment";
import { Router } from "@angular/router";

/*----MODELS--- */

import { roleModel } from "../../../models/role/roleModel.module";
import { PermissionModel } from "../../../models/role/permissionModel.module";

import { catchError, map, tap } from "rxjs/operators";
import { NgxRolesService } from "ngx-permissions";
import { Observable, throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ManageRolesService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private rs: NgxRolesService
  ) {}

   /*  FUNCION POST CreateRole */
  CreateRole(role: roleModel) {
    return this.http.post(`${environment.apiUrl}role/create`, role).pipe(
      map((resp: any) => {
        role.id = resp.id;
        return role;
      })
    );
  }
/*FUNCION PUT UpdateRole */
  UpdateRole(hash: string, params: any) {
    return this.http.put(`${environment.apiUrl}role/update/${hash}`, params);
}

/*  FUNCION GET GetAllRoles */
GetAllRoles():Observable<any> {
  return this.http.get<{payload: roleModel}>(`${environment.apiUrl}role/getAll`)
  .pipe(tap(data=>{
  
    return data;
   }),
   catchError((err: HttpErrorResponse) => {
    
     return throwError(err);
   }))
}

  GetAllRolesTable(offset, limit,role=null): Observable<any> {
    // Initialize Params Object
    let params = new HttpParams();

    // Begin assigning parameters
    params = params.append('offset', offset);
    params = params.append('limit', limit);
     if(role)
     params = params.append('role', role);
     return this.http.get<{payload: roleModel}>(`${environment.apiUrl}role/getAllTable`,{params})
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError((err: HttpErrorResponse) => {
          return throwError(err);
        })
      );
  }
  getTotalRegisters(offset, limit,role=null)
  {
         // Initialize Params Object
    let params = new HttpParams();

    params = params.append('offset', offset);
    params = params.append('limit', limit);
     if(role)
     params = params.append('role', role);
    return this.http.get<{ payload: number }>(`${environment.apiUrl}role/getTotalCount`,{params})
    .pipe(tap(data => {
      return  data.payload;
    }),
      catchError((err: HttpErrorResponse) => {
        return throwError(err);
      }))
  }
  /*  FUNCION DELETE DeleteRole */
  DeleteRole(hash: string) {
    return this.http.delete(`${environment.apiUrl}role/delete/${hash}`);
  }

 
   /* FUNCION GetIdRole */
   GetIdRole(hash: string) {
    return this.http.get<{payload: roleModel}>(`${environment.apiUrl}role/getById/${hash}`)
      .pipe(map(res=> {
        return res.payload;
        
      }));
  }
   
   /* FUNCION GetIdRolePermission */
   GetIdRolePermission(hash: string): Observable<any> {
    return this.http.get<{payload:[]}>(`${environment.apiUrl}permission/getByRoleId/${hash}`)
      .pipe(map(res=> {
        return res.payload;
        
      }));
  }
  /* FUNCION GetIdRoleDetail */
  GetIdRoleDetail(hash: string): Observable<any> {
    return this.http.get<{payload:[]}>(`${environment.apiUrl}role/getById/${hash}/detail`)
      .pipe(map(res=> {
        return res.payload;
        
      }));
  }
/* FUNCION GET GetPermissions */
GetPermissions(): Observable<any>{
    return this.http.get<{payload:[]}>(`${environment.apiUrl}permission/getAll`).pipe(map(res=> {
       
        return res.payload;
      }),
      catchError((err: HttpErrorResponse) => {
        
        return throwError(err);
      }));
       
  }

}
