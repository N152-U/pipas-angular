/* eslint-disable linebreak-style */
import { Injectable } from '@angular/core';
/*  Rutas obligatorias */
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "@environments/environment";
import { catchError, map, tap } from "rxjs/operators";
import { ActivatedRoute } from "@angular/router";
/* Ruta de los modelos */
import { MunicipalityModel } from '@app/models/municipality/municipality.module';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MunicipalityService {

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  /*  FUNCION GET GetallMuncipality */

  GetallMuncipality():Observable<any> {
    return this.http.get<{payload: MunicipalityModel}>(`${environment.apiUrl}municipality/getAll`)
    .pipe(tap(data=>{
    
      return data;
     }),
     catchError((err: HttpErrorResponse) => {
      
       return throwError(err);
     }))
  }

 
}
