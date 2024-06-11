import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interfaces';
import { catchError, map, Observable, of, tap } from 'rxjs';


@Injectable({providedIn: 'root'})
export class AuthService {

  private baseUrl = 'http://localhost:4000/'
  private user?: User

  constructor(private http:HttpClient){}

  get currentUser(): User|undefined{
    if(!this.user) return undefined;
    return structuredClone(this.user);
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/login`, { email, password }).pipe(
      tap(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
      })
    );
  }

  checkAuthentication():Observable<boolean> {
    if(!localStorage.getItem('token')) return of(false)
      const token = localStorage.getItem('token')

    return this.http.get<User>(`${this.baseUrl}/users/1`)
    .pipe(
      tap(user => this.user =user),
      map(user => !!user),
      catchError(err => of (false))
    )
  }

  logout(){
    this.user = undefined;
    localStorage.clear();
  }
}
