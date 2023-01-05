import { Injectable } from '@angular/core';
import { environment } from "@environments/environment";
import { catchError, map, tap } from "rxjs/operators";
import { ActivatedRoute } from "@angular/router";
import { voucherModel } from '@app/models/voucher/voucher.module';
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { tripsModel } from '@app/models/trips/trips.module';
import { Observable, pipe, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TripsService {
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
  ) { }

  create(trips: tripsModel) {
    return this.http.post(`${environment.apiUrl}trip/create`, trips)
      .pipe(
        map((resp: any) => {
          return resp;
        })
      )
  }
  getTotalRegisters(offset, limit, collaborator=null, settlement=null, street= null, status= null, created_at=null )
  {
     // Initialize Params Object
     let params = new HttpParams();

     // Begin assigning parameters
     params = params.append('offset', offset);
     params = params.append('limit', limit);
     if(collaborator)
     params = params.append('collaborator', collaborator);
     if(settlement)
     params = params.append('settlement', settlement);
     if(street)
     params = params.append('street', street);
     if(status)
     params = params.append('status', status);
     if(created_at)
     params = params.append('created_at', created_at);

    return this.http.get<{ payload: number }>(`${environment.apiUrl}trip/getTotalCount`,{params})
    .pipe(tap(data => {
      return  data.payload;
    }),
      catchError((err: HttpErrorResponse) => {
        return throwError(err);
      }))
  }

  getTotalDetailRegisters(offset, limit, collaborator=null, settlement=null, street= null,status= null)
  {
     // Initialize Params Object
     let params = new HttpParams();

     // Begin assigning parameters
     params = params.append('offset', offset);
     params = params.append('limit', limit);
     if(collaborator)
     params = params.append('collaborator', collaborator);
     if(settlement)
     params = params.append('settlement', settlement);
     if(street)
     params = params.append('street', street);
     if(status)
     params = params.append('status', status.name);

    return this.http.get<{ payload: number }>(`${environment.apiUrl}trip/getTotalCountDaily`,{params})
    .pipe(tap(data => {
      return  data.payload;
    }),
      catchError((err: HttpErrorResponse) => {
        return throwError(err);
    }))
  }

  getAllTrips(offset, limit,collaborator=null, settlement=null, street= null,status= null,created_at=null): Observable<any> {
    let params = new HttpParams();

    // Begin assigning parameters
    params = params.append('offset', offset);
    params = params.append('limit', limit);
    if(collaborator)
    params = params.append('collaborator', collaborator);
    if(settlement)
    params = params.append('settlement', settlement);
    if(street)
    params = params.append('street', street);
    if(status)
     params = params.append('status', status.name);
     if(created_at)
     params = params.append('created_at', created_at);
     console.log("Filtro",collaborator)
     console.log("Filtro",settlement)
     console.log("Filtro",street)
     console.log("Filtro",status)
    return this.http.get<{ payload: tripsModel }>(`${environment.apiUrl}trip/getAll`, {params})
      .pipe(tap(data => {
        return data;
      }),
        catchError((err: HttpErrorResponse) => {
          return throwError(err);
      }))
  }

  getAllDaily(offset, limit, collaborator=null, settlement=null, street= null, status= null) {
    let params = new HttpParams();
    params = params.append('offset', offset);
    params = params.append('limit', limit);
    if(collaborator)
    params = params.append('collaborator', collaborator);
    
    if(settlement)
    params = params.append('settlement', settlement);
    if(street)
    params = params.append('street', street);
    console.log(collaborator)
    if(status)
    params = params.append('status', status.name);
    
    return this.http.get<{ payload: tripsModel }>(`${environment.apiUrl}trip/getAllDaily`, {params})
    .pipe(map(res => {
      return res.payload;
    }));
  }

  getCountVehicle(): Observable<any> {
    return this.http.get<{ payload: tripsModel }>(`${environment.apiUrl}trip/getCountVehicle`)
      .pipe(tap(data => {
        return data.payload;
      }),
        catchError((err: HttpErrorResponse) => {
          return throwError(err);
      }))
  }
  
  getCountTripsDaily(): Observable<any> {
    return this.http.get<{ payload: tripsModel }>(`${environment.apiUrl}trip/getCountTripsDaily`)
      .pipe(tap(data => {
        return data.payload;
      }),
        catchError((err: HttpErrorResponse) => {
          return throwError(err);
      }))
  }

  getTotalLitersDaily(): Observable<any> {
    return this.http.get<{ payload: tripsModel }>(`${environment.apiUrl}trip/getCountLitersDaily`)
      .pipe(tap(data => {
        return data.payload;
      }),
        catchError((err: HttpErrorResponse) => {
          return throwError(err);
      }))
  }


  getRecordsBetweenDates(startDate, endDate): Observable<any> {
    return this.http.get<{ payload: tripsModel }>(`${environment.apiUrl}trip/getRecordsBetweenDates/${startDate}/${endDate}`)
      .pipe(tap(data => {
        return data.payload;
      }),
        catchError((err: HttpErrorResponse) => {
          return throwError(err);
      }))
  }  
  
  getAllEco(): Observable<any> {
    return this.http.get<{ payload: tripsModel }>(`${environment.apiUrl}trip/getAllEco`)
      .pipe(tap(data => {
        return data;
      }),
        catchError((err: HttpErrorResponse) => {
          return throwError(err);
      }))
  }

  getByIdTrip(id: number) {
    return this.http.get<{ payload: tripsModel }>(`${environment.apiUrl}trip/getById/${id}`)
      .pipe(map(res => {
        return res.payload;
      }));
  }

  getByIdEnlace(id: String) {
    return this.http.get<{ payload: tripsModel }>(`${environment.apiUrl}trip/${id}/getCollaborator`)
      .pipe(map(res => {
        return res.payload;
      }));
  }

  detailGetById(id: String)  {
    return this.http.get<{ payload: tripsModel }>(`${environment.apiUrl}trip/${id}/detailGetById`)
      .pipe(map(res => {
        return res.payload;
      }));
  }

  getByIdCollaboratorDriver(id: String) {
    return this.http.get<{ payload: tripsModel }>(`${environment.apiUrl}trip/${id}/getCollaboratorDriver`)
      .pipe(map(res => {
        return res.payload;
      }));
  }

  updateTrips(id: number, params: any) {
    return this.http.put(`${environment.apiUrl}/trip/${id}/updateByStatus`, params);
  }

  assign(id: string, params: any) {
    return this.http.put(`${environment.apiUrl}trip/${id}/assign/`, params);
  }

  deleteTrips(id: String) {
    return this.http.delete(`${environment.apiUrl}trip/delete/${id}`);
  }

  unassignTrip(id: String, params: any) {
    return this.http.put(`${environment.apiUrl}trip/${id}/unassign`,params);
  }

  concludeTrip(id: String, params: any) {
    return this.http.put(`${environment.apiUrl}trip/${id}/conclude`,params);
  }

  
}