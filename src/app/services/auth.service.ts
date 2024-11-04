import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { auth } from '../models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(private _http: HttpClient) { }

  path: string = 'https://localhost:7023/api/Authentication';

  login(username: string, password: string) {
    if (localStorage.getItem('Auth')) {
      this.loggedIn$.next(true);
      return;
    }
    this._http.post(`${this.path}/login`, { username, password }).subscribe(p => {
      localStorage.setItem('Auth', JSON.stringify(p));
      this.loggedIn$.next(true);
    })
  }

  logout() {
    localStorage.removeItem('Auth');
    this.loggedIn$.next(false);
  }

  refreshToken(): Observable<auth | null> {
    let auth = localStorage.getItem('Auth');
    if (auth) {
      let authParsed : auth = JSON.parse(auth);
      return this._http.post<auth>(`${this.path}/refresh-token`, {
        accessToken: authParsed.token,
        refreshToken: authParsed.refreshToken,
      })
    }
    return of();
  }
}
