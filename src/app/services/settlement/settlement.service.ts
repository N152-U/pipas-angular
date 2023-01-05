import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SettlementService {

  constructor(private http: HttpClient) {
    //this.getToken();
  }


  getSettlementsByMunicipalityId(type,municipality_id ):Observable<any>{
    return this.http
    .get(`${environment.apiUrl}/settlement/getSettlements/${type}/${municipality_id}`)
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
