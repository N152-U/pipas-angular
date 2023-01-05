import { EventEmitter, Injectable, isDevMode, Output } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, delay, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth/auth.service';
import { RequestsPendingService } from '../services/requests/requests-pending.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router, private auth: AuthService, private reqpendingservice: RequestsPendingService) {}
  pendingRequestsCount = 0;
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {


    const token: string = localStorage.getItem('token');

    let request = req;

    this.pendingRequestsCount++;

    this.reqpendingservice.notify(this.pendingRequestsCount);
    //Exceptuamos el servidor 10.11.11.25, ya que al modificar la peticion se hace un preflight y no se cuenta con CORS en ese servidor
    if ( token && req.url.substring(7, 18) != '10.11.11.25' && req.url.substring(7, 19) != '10.11.11.115' && req.url.substring(7, 19) != '10.11.11.245' ) {

      request = req.clone({
        setHeaders: {
          authorization: `Bearer ${token}`,
        },
      });

    /*   Swal.fire({
        title: 'CARGANDO',
        allowEscapeKey: false,
        allowOutsideClick: false,
        onOpen: () => {
      Swal.showLoading();
        }
      }); */


    }else if(!token) {
      this.pendingRequestsCount=0;
    }


    return next.handle(request).pipe(

      finalize(() => {
        if(token && this.pendingRequestsCount>0)this.pendingRequestsCount--;
        if(isDevMode())console.log('peticiones pendientes (finalize)',this.pendingRequestsCount);

        if ((this.pendingRequestsCount == 0)) {
          this.reqpendingservice.notify(this.pendingRequestsCount);
         /*  Swal.close(); */
        }

      }),
      catchError((err: HttpErrorResponse) => {
        if(token && this.pendingRequestsCount>0)this.pendingRequestsCount--;
        if(isDevMode())console.log('peticiones pendientes (error)',this.pendingRequestsCount);

        if (err.status === 401) {
          this.router.navigateByUrl('/login');
        }
        if ((this.pendingRequestsCount == 0)) {
          this.reqpendingservice.notify(this.pendingRequestsCount);
          /* Swal.close(); */
        }
        return throwError(err);
      }),

    );


  }
}