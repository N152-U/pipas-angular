import { Injectable } from '@angular/core';
/* Rutas para Obligatorias */
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "@environments/environment";
import { catchError, map, tap } from "rxjs/operators";
import { ActivatedRoute } from "@angular/router";
import { NgxRolesService } from "ngx-permissions";
/* Ruta de los modelos */
import { PiperoModel } from '@app/models/pipero/pipero.module';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PiperoService {

  constructor(private http: HttpClient, private route: ActivatedRoute, private rs: NgxRolesService) { }

  /*  Crear funcion POST CreatePipero */

  CreatePipero(piperoM: PiperoModel) {

    return this.http.post(`${environment.apiUrl}pipero/create`, piperoM)
      .pipe(
        map((resp: any) => {
          return resp;
        })
      );
  }

  /*  FUNCION GET GetallPipero */

  GetallPipero():Observable<any> {
    return this.http.get<{payload: PiperoModel}>(`${environment.apiUrl}pipero/getAll`)
    .pipe(tap(data=>{
    
      return data;
     }),
     catchError((err: HttpErrorResponse) => {
      
       return throwError(err);
     }))
  }


  /*  FUNCION DELETE DeletePipero */

  DeletePipero(id: string) {
    return this.http.delete(`${environment.apiUrl}pipero/delete/${id}`);
  }

  /* FUNCION GetIdPipero */

  GetIdPipero(id: string) {
    return this.http.get<{ payload: PiperoModel }>(`${environment.apiUrl}pipero/getById/${id}`)
      .pipe(map(res => {
        console.log("RES", res);
        return res.payload;

      }));
  }

  /* FUNCION UpdatePipero*/

/*   (pipero: PiperoModel) {
    const {
      firstName,
      paternalSurname,
      maternalSurname,
      gender
    } = pipero;
    return this.http.put(
      `${environment.apiUrl}pipero/update/${pipero.id}`, {
      firstName,
      paternalSurname,
      maternalSurname,
      gender
    });
  } */

  UpdatePipero(id: string, params: any) {
    return this.http.put(`${environment.apiUrl}pipero/update/${id}`, params);
}

}
