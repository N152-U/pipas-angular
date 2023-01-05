import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "@environments/environment";
import { catchError, map, tap } from "rxjs/operators";
import { ActivatedRoute } from "@angular/router";
import { collaboratorModel } from '@app/models/collaborator/collaborator.module';
import { CatalogModel } from '@app/models/catalog/catalog.module';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(
    private http: HttpClient,
  ) { }

  getByIdCatalogSettlement(id: number) {
    return this.http.get<{ payload: collaboratorModel }>(`${environment.apiUrl}catalog/settlement/getByCollaborator/${id}`)
      .pipe(map(res => {
        return res.payload;
      })); 
  }

  getdependency(): Observable<any> {
    return this.http.get<{ payload: CatalogModel}>(`${environment.apiUrl}catalog/dependency/getAll`)
      .pipe(tap(data => {
        return data;
      }),
        catchError((err: HttpErrorResponse) => {
          return throwError(err);
        })
      )
  }

  getcapacity(): Observable<any> {
    return this.http.get<{ payload: CatalogModel}>(`${environment.apiUrl}catalog/capacity/getAll`)
      .pipe(tap(data => {
        return data;
      }),
        catchError((err: HttpErrorResponse) => {
          return throwError(err);
        })
      )
  }

  getSettlement(): Observable<any> {
    return this.http.get<{ payload: CatalogModel}>(`${environment.apiUrl}catalog/settlement/getAll`)
      .pipe(tap(data => {
        return data;
      }),
        catchError((err: HttpErrorResponse) => {
          return throwError(err);
        })
      )
  }

  getStatuses(): Observable<any> {
    return this.http.get<{ payload: CatalogModel}>(`${environment.apiUrl}catalog/status/getAll`)
      .pipe(tap(data => {
        return data;
      }),
        catchError((err: HttpErrorResponse) => {
          return throwError(err);
        })
      )
  }



}
