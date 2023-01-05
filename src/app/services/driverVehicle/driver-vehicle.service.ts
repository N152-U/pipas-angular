import { driverVehicleModel } from './../../models/driver-vehicle/driver-vehicle.module';
import { UserModel } from './../../models/user/userModel.module';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "@environments/environment";
import { catchError, map, tap } from "rxjs/operators";
import { ActivatedRoute } from "@angular/router";
import { Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DriverVehicleService {
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }
  createDriverVehicle(driverVehicle: driverVehicleModel) {
    return this.http.post(`${environment.apiUrl}pipa/create`, driverVehicle)
      .pipe(
        map((resp: any) => {
          return resp;
        })
      )
  }
  getAllDriverVehicle(): Observable<any> {
    return this.http.get<{ payload: driverVehicleModel }>(`${environment.apiUrl}pipa/getAll`)
      .pipe(tap(data => {
        return data;
      }),
        catchError((err: HttpErrorResponse) => {
          return throwError(err);
        })
      )
  }
  getByIdDriverVehicle(id: String) {
    return this.http.get<{ payload: driverVehicleModel }>(`${environment.apiUrl}pipa/getById/${id}`)
      .pipe(map(res => {
        return res.payload;
      }));
  }
  updateDriverVehicle(id: string, params: any) {
    return this.http.put(`${environment.apiUrl}pipa/update/${id}`, params);
  }
  deleteDriverVehicle(id: String) {
    return this.http.delete(`${environment.apiUrl}pipa/delete/${id}`);
  }
}

















