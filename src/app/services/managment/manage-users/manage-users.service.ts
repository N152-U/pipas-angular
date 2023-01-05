import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { environment } from "@environments/environment";
import { Router } from "@angular/router";
/*---- MODELS---- */
import { UserModel } from "../../../models/user/userModel.module";
import { catchError, map, tap } from "rxjs/operators";
import { NgxRolesService } from "ngx-permissions";
import { Observable, throwError } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class ManageUsersService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private rs: NgxRolesService
  ) {}
  /*  FUNCION POST CreateUser */
  CreateUser(user: UserModel) {
    return this.http.post(`${environment.apiUrl}user/signup`, user).pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }
  /*  FUNCION GET GetAllUsers */
  GetAllUsers(offset, limit,username=null,firstName=null,middleName=null,lastName=null,roleName=null): Observable<any> {
    // Initialize Params Object
    let params = new HttpParams();

    // Begin assigning parameters
    params = params.append('offset', offset);
    params = params.append('limit', limit);
    if(username)
     params = params.append('username', username);
     if(firstName)
     params = params.append('firstName', firstName);
     if(middleName)
     params = params.append('middleName', middleName);
     if(lastName)
     params = params.append('lastName', lastName);
     if(roleName)
     params = params.append('roleName', roleName);
    return this.http
      .get<{ payload: UserModel }>(`${environment.apiUrl}user/getAll`,{params})
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError((err: HttpErrorResponse) => {
          return throwError(err);
        })
      );
  }
  getTotalRegisters(offset, limit,username=null,firstName=null,middleName=null,lastName=null,roleName=null)
  {
         // Initialize Params Object
    let params = new HttpParams();

    // Begin assigning parameters
    params = params.append('offset', offset);
    params = params.append('limit', limit);
    if(username)
     params = params.append('username', username);
     if(firstName)
     params = params.append('firstName', firstName);
     if(middleName)
     params = params.append('middleName', middleName);
     if(lastName)
     params = params.append('lastName', lastName);
     if(roleName)
     params = params.append('roleName', roleName);
    return this.http.get<{ payload: number }>(`${environment.apiUrl}user/getTotalCount`,{params})
    .pipe(tap(data => {
      return  data.payload;
    }),
      catchError((err: HttpErrorResponse) => {
        return throwError(err);
      }))
  }
  /*FUNCION PUT UpdateUser */
  UpdateUser(hashUser: string, params: any) {
    return this.http.put(`${environment.apiUrl}user/update/${hashUser}`, params);
  }
   /*FUNCION PUT UpdatePassword */
   UpdatePassword(hashUser: string, params: any) {
    return this.http.put(`${environment.apiUrl}user/updatePassword/${hashUser}`, params);
  }
  /*  FUNCION DELETE DeleteUser */
  DeleteUser(id: string) {
    return this.http.delete(`${environment.apiUrl}user/delete/${id}`);
  }
  /* FUNCION GetIdUser */
  GetIdUser(hash: string) {
    return this.http
      .get<{ payload: UserModel }>(`${environment.apiUrl}user/getById/${hash}`)
      .pipe(
        map((res) => {
          return res.payload;
        })
      );
  }
  GetDetailUser() {
    return this.http
      .get<{ payload: UserModel }>(`${environment.apiUrl}user/getDetail`)
      .pipe(
        map((res) => {
          return res.payload;
        })
      );
  }
  GetByIdUserDetail(hash: string) {
    return this.http
      .get<{ payload: UserModel }>(`${environment.apiUrl}user/getById/${hash}/detail`)
      .pipe(
        map((res) => {
          return res.payload;
        })
      );
  }
}