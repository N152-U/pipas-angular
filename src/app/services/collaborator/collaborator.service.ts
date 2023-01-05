import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "@environments/environment";
import { catchError, map, tap } from "rxjs/operators";
import { ActivatedRoute } from "@angular/router";
import { collaboratorModel } from '@app/models/collaborator/collaborator.module';
import { Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CollaboratorService {
  constructor(
    private http: HttpClient,
  ) { }
  createCollaborator(collaborator: collaboratorModel) {
    return this.http.post(`${environment.apiUrl}collaborator/create`, collaborator)
      .pipe(
        map((resp: any) => {
          return resp;
        })
      )
  }
  getAllCollaborator(): Observable<any> {
    return this.http.get<{ payload: collaboratorModel }>(`${environment.apiUrl}collaborator/getAll`)
      .pipe(tap(data => {
        return data;
      }),
        catchError((err: HttpErrorResponse) => {
          return throwError(err);
        })
      )
  }
  getByIdCollaborator(id: number) {
    return this.http.get<{ payload: collaboratorModel }>(`${environment.apiUrl}collaborator/getById/${id}`)
      .pipe(map(res => {
        return res.payload;
      }));
  }
  
  updateCollaborator(id: number, params: any) {
    return this.http.put(`${environment.apiUrl}collaborator/update/${id}`, params);
  }
  deleteCollaborator(id: number) {
    return this.http.delete(`${environment.apiUrl}collaborator/delete/${id}`);
  }
}