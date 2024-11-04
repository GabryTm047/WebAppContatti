import { HttpClient, HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { auth } from '../models/auth.models';
import { contact } from '../models/contact.model';
import { AuthService } from '../services/auth.service';

export const testInterceptor: HttpInterceptorFn = (req, next) => {

  console.log('InterceptorFn chiamato');

  return next(req).pipe(tap(response => {

    console.log('InterceptorFn chiamato per risposta', response);

  }));
};


@Injectable()
export class TestDIInterceptor implements HttpInterceptor {

  constructor(private _httpClient: HttpClient, private _auth: AuthService, private _router : Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //codice prima dell'invio della req al server

    console.log('InterceptorDI chiamato');

    if(req.url.toLowerCase().endsWith('refresh-token')) {
      return next.handle(req).pipe(catchError((err, c) => {
        localStorage.removeItem('Auth');
        window.location.reload();
        return of();
      }));
    }

    let auth = localStorage.getItem('Auth');
    let newReq = req.clone();
    if (auth) {

      let authParsed : auth = JSON.parse(auth);
      const exp = new Date(Date.parse(authParsed.expiration));
      if (exp <= new Date(Date.now())) {
        return this._auth.refreshToken().pipe(switchMap(result => {
          if (result) {
            localStorage.setItem('Auth', JSON.stringify(result));
            newReq = req.clone({
              headers: req.headers.append('Authorization', 'Bearer ' + result.token)
            });
          }
          return next.handle(newReq).pipe(map(response => {

            //codice per gestire la response prima che venga mandata al chiamante
            // console.log('InterceptorDI chiamato per risposta', response);
            // if (response.type === HttpEventType.Response && response.body instanceof Array) {
            //   (<Array<contact>>response.body).forEach(p => (<any>p)['Dario'] = 'Lipari');
            // }
            return response;
          }));
        }))
      }
      else {
        const token = authParsed.token;
        newReq = req.clone({
          headers: req.headers.append('Authorization', 'Bearer ' + token)
        });

        return next.handle(newReq).pipe(map(response => {

          //codice per gestire la response prima che venga mandata al chiamante
          console.log('InterceptorDI chiamato per risposta', response);
          if (response.type === HttpEventType.Response && response.body instanceof Array) {
            (<Array<contact>>response.body).forEach(p => (<any>p)['Dario'] = 'Lipari');
          }
          return response;
        }));
      }
    }
    else {
      return next.handle(newReq).pipe(map(response => {
        this._router.navigate(['/login']);
        return response;
      }));    }
  }


}

