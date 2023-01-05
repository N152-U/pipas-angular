import { Injectable } from '@angular/core';
/*  Rutas obligatorias */
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "@environments/environment";
import { catchError, map, tap } from "rxjs/operators";
import { ActivatedRoute } from "@angular/router";
/* Ruta de los modelos */
import { DeliveryModel } from './../../models/delivery/delivery.module';
import { Observable, throwError } from 'rxjs';
import { TankerTruckModel } from '@app/models/tankertruck/tankertruck.module';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  /*  Crear funcion POST CreateDelivery */

  CreateDelivery(deliveryM: DeliveryModel) {

    return this.http.post(`${environment.apiUrl}delivery/create`, deliveryM)
      .pipe(
        map((resp: any) => {
          return resp;
        })
      );
  }

  /*  FUNCION GET GetallDelivery */

  GetallDelivery():Observable<any> {
    return this.http.get<{payload: TankerTruckModel}>(`${environment.apiUrl}delivery/getAll`)
    .pipe(tap(data=>{
    
      return data;
     }),
     catchError((err: HttpErrorResponse) => {
      
       return throwError(err);
     }))
  }

  /*  FUNCION DELETE DeleteDelivery */
  DeleteDelivery(id: string) {
    return this.http.delete(`${environment.apiUrl}delivery/delete/${id}`);
  }

  /* FUNCION GetIdDelivery */
  GetIdDelivery(id: string) {
    return this.http.get<{ payload: DeliveryModel }>(`${environment.apiUrl}delivery/getById/${id}`)
      .pipe(map(res => {
        console.log("RES", res);
        return res.payload;

      }));
  }

}
