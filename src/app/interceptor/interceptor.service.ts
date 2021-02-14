import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  private host = 'covid-193.p.rapidapi.com';
  private key = '0de6fb3729mshd9288d35a803ff2p1b7237jsn86d5df560618';
  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modifiedrequest = request.clone({setHeaders: {'x-rapidapi-host': this.host,'x-rapidapi-key': this.key}});    
    return next.handle(modifiedrequest);
  }
}
