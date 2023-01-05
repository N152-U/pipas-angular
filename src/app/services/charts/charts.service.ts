import { Injectable } from '@angular/core';
/*  Rutas obligatorias */
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { environment } from "@environments/environment";
import { catchError, map, tap } from "rxjs/operators";
import { ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs';
import { UserModel } from '../../models/user/user.module';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { throwError } from 'rxjs';
import { isDevMode } from '@angular/core';
import { time } from '@amcharts/amcharts4/core';
/* Ruta de los modelos */
import { ChartModel } from '@app/models/charts/charts.module';



const OPTIONS = {
  reportProgress: true,
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  getTotalLiters():Observable<any> {
    return this.http.get<{payload: ChartModel}>(`${environment.apiUrl}deliveryDetail/totalLiters`)
      .pipe(tap(data=>{
        return data;
       },
       (data)=>{
        return data.payload;
      }),
        catchError((err: HttpErrorResponse) => {
          return throwError(err);
        }))
  }

  getPeopleServed():Observable<any> {
    return this.http.get<{payload: ChartModel}>(`${environment.apiUrl}deliveryDetail/peopleServed`)
      .pipe(tap(data=>{
        return data;
       },
       (data)=>{
        return data.payload;
      }),
        catchError((err: HttpErrorResponse) => {
          return throwError(err);
        }))
  }

  getPiperoTrips():Observable<any> {
    return this.http.get<{payload: ChartModel}>(`${environment.apiUrl}delivery/getAllByDate`)
      .pipe(tap(data=>{
        return data;
       },
       (data)=>{
        return data.payload;
      }),
        catchError((err: HttpErrorResponse) => {
          return throwError(err);
        }))
  }

  getMunicipalityLitersTotal():Observable<any> {
    return this.http.get<{payload: ChartModel}>(`${environment.apiUrl}deliveryDetail/settlementTotalLiters`)
      .pipe(tap(data=>{
        return data;
       },
       (data)=>{
        return data.payload;
      }),
        catchError((err: HttpErrorResponse) => {
          return throwError(err);
        }))
  }

  getTripsDeliveriDetail():Observable<any> {
    return this.http.get<{payload: ChartModel}>(`${environment.apiUrl}deliveryDetail/dateDelivery`)
      .pipe(tap(data=>{
        return data;
       },
       (data)=>{
        return data.payload;
      }),
        catchError((err: HttpErrorResponse) => {
          return throwError(err);
        }))
  }
}



