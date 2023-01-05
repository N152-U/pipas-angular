import { Injectable } from '@angular/core';
/* Rutas para Obligatorias */
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "@environments/environment";
import { catchError, map, tap } from "rxjs/operators";
import { ActivatedRoute } from "@angular/router";
/* Ruta de los modelos */
import { TankerTruckModel } from '@app/models/tankertruck/tankertruck.module';
import { Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TankertruckService {
  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  /*  Crear funcion POST CreateTankerTruck */

  CreateTankerTruck(tanker: TankerTruckModel) {

    return this.http.post(`${environment.apiUrl}tankerTruck/create`, tanker)
      .pipe(
        map((resp: any) => {
          return resp;
        })
      );
  }

  /*  FUNCION GET GetallTankerTruck */

  GetallTankerTruck():Observable<any> {
    return this.http.get<{payload: TankerTruckModel}>(`${environment.apiUrl}tankerTruck/getAll`)
    .pipe(tap(data=>{
    
      return data;
     }),
     catchError((err: HttpErrorResponse) => {
      
       return throwError(err);
     }))
  }


  /*  FUNCION DELETE DeleteTankerTruck */
  DeleteTankerTruck(id: string) {
    return this.http.delete(`${environment.apiUrl}tankerTruck/delete/${id}`);
  }

  /* FUNCION GetIdTankerTruck */
  GetIdTankerTruck(id: string) {
    return this.http.get<{payload: TankerTruckModel}>(`${environment.apiUrl}tankerTruck/getById/${id}`)
    .pipe(map(res=> {
      console.log("RES",res);
      return res.payload;
      
    }));
  }

  UpdateTankerTruck(id: string, params: any) {
    return this.http.put(`${environment.apiUrl}tankerTruck/update/${id}`, params);
  }
}
