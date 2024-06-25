import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError, BehaviorSubject, tap, map } from 'rxjs';
import { Login } from '../interfaces/login.interfaces';
import { User } from '../interfaces/user.interfaces';
import { enavironments } from '../../../environments/envarionments';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public loginUrl = enavironments.loginUrl;

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {
    const token = sessionStorage.getItem('token');
    this.currentUserLoginOn = new BehaviorSubject<boolean>(!!token);
    this.currentUserData = new BehaviorSubject<string>(token || '');
  }

  login(credentials: Login): Observable<any> {
    return this.http.post<any>(`${this.loginUrl}/login`, credentials).pipe(
      tap(userData => {
        sessionStorage.setItem('token', userData.token);
        this.currentUserData.next(userData.token);
        this.currentUserLoginOn.next(true);
      }),
      map(userData => userData.token),
      catchError(this.handleErrors)
    );
  }

  logOut(): void {
    sessionStorage.removeItem('token');
    this.currentUserLoginOn.next(false);
  }

  private handleErrors(error: HttpErrorResponse): Observable<never> {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  get userData(): Observable<string> {
    return this.currentUserData.asObservable();
  }

  get userLoginOn(): Observable<boolean> {
    return this.currentUserLoginOn.asObservable();
  }

  get userToken(): string {
    return this.currentUserData.value;
  }
}
