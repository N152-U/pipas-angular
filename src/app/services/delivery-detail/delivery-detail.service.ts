/* eslint-disable linebreak-style */
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "@environments/environment";
import { catchError, map, tap } from "rxjs/operators";
import { ActivatedRoute } from "@angular/router";
/* Ruta de los modelos */
import { DeliveryDetailModel } from '@app/models/delivery-detail/delivery-detail.module';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeliveryDetailService {

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

      /*  Crear funcion POST CreatDeliveryDetail */

      CreateDeliveryDetail  (deliveryM: DeliveryDetailModel) {

    return this.http.post(`${environment.apiUrl}deliveryDetail/create`, deliveryM)
      .pipe(
        map((resp: any) => {
          return resp;
        })
      );
  }

  /*  FUNCION GET GetallDeliveryDetail */
  GetallDeliveryDetail():Observable<any> {
    return this.http.get<{payload: DeliveryDetailModel}>(`${environment.apiUrl}deliveryDetail/getAll`)
    .pipe(tap(data=>{
    
      return data;
     }),
     catchError((err: HttpErrorResponse) => {
      
       return throwError(err);
     }))
  }

   /*  FUNCION DELETE DeleteDeliveryDetail */
   DeleteDeliveryDetail(id: string) {
    return this.http.delete(`${environment.apiUrl}deliveryDetail/delete/${id}`);
  }

  /* FUNCION GetIdDeliveryDetail */
  GetIdDeliveryDetail(id: string) {
    return this.http.get<{payload: DeliveryDetailModel}>(`${environment.apiUrl}deliveryDetail/getById/${id}`)
      .pipe(map(res=> {
        console.log("RES",res);
        return res.payload;
        
      }));
  }
  /* FUNCION UpdateDeliveryDetail */
  UpdateDeliveryDetail(deliveryDetailM: DeliveryDetailModel) {
    const {
      deliveryId,
      settlementId,
      firstName,
      paternalSurname,
      maternalSurname,
      email,
      phoneNumber,
      litersOfWater,
      numberOfFamiliesServed,
      numberOfPeopleServed,
      street,
      block,
      lot,
      externalNumber,
      internalNumber,
      corner,
      btwSecondStreet,
      reference,
      observation,
      gender,
    } = deliveryDetailM;
    return this.http.put(`${environment.apiUrl}deliveryDetail/update/${deliveryDetailM.id }`, {
      deliveryId,
      settlementId,
      firstName,
      paternalSurname,
      maternalSurname,
      email,
      phoneNumber,
      litersOfWater,
      numberOfFamiliesServed,
      numberOfPeopleServed,
      street,
      block,
      lot,
      externalNumber,
      internalNumber,
      corner,
      btwSecondStreet,
      reference,
      observation,
      gender,
    });
  }


}
