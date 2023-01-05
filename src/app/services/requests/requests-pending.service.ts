import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestsPendingService {
  @Output() getRequestsPending: EventEmitter<any> = new EventEmitter();
  constructor() { }


  notify(countPendingRequests:number)
  {
    this.getRequestsPending.emit(countPendingRequests);
  }
}