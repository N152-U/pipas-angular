import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "@environments/environment";
import { catchError, map, tap } from "rxjs/operators";
import { ActivatedRoute } from "@angular/router";
/* Ruta de los modelos */
import { PromoterModel } from '@app/models/promoter/promoter.module';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromoterService {

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

   /*  Crear funcion POST CreatePromoter */

   CreatePromoter(promoterM: PromoterModel) {

    return this.http.post(`${environment.apiUrl}promoter/create`, promoterM)
      .pipe(
        map((resp: any) => {
          return resp;
        })
      );
  }

  /*  FUNCION GET GetallPromoter */

  GetallPromoter():Observable<any> {
    return this.http.get<{payload: PromoterModel}>(`${environment.apiUrl}promoter/getAll`)
    .pipe(tap(data=>{
    
      return data;
     }),
     catchError((err: HttpErrorResponse) => {
      
       return throwError(err);
     }))
  }
  /*  FUNCION DELETE DeletePromoter */
  DeletePromoter(id: string) {
    return this.http.delete(`${environment.apiUrl}promoter/delete/${id}`);
  }

  /* FUNCION GetIdPromoter */
  GetIdPromoter(id: string) {
    return this.http.get<{payload: PromoterModel}>(`${environment.apiUrl}promoter/getById/${id}`)
      .pipe(map(res=> {
        console.log("RES",res);
        return res.payload;
        
      }));
  }

  UpdatePromoter(id: string, params: any) {
    return this.http.put(`${environment.apiUrl}promoter/update/${id}`, params);
}
}
