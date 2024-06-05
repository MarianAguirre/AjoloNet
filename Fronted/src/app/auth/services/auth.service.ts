import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user.interfaces';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(true);
  loggedIn$ = this.loggedIn.asObservable()

  constructor(private router:Router){}

  logIn(credentials:User):void{
    this.loggedIn.next(true);
    this.redirecToHome()
  }

  logOut():void{
    this.loggedIn.next(false);
    this.redirecToHome()
  }

  private redirecToHome():void{
    this.router.navigate(['/'])
  }

  // private baseUrl =
  // private user?: User;


  // constructor(private http:HttpClient) { }

  // get currentUser(): User|undefined{
  //   if(!this.user) return undefined;
  //   return structuredClone( this.user)
  // }

  // login(email:string, password:string): Observable<User>{
  //   this.http.get<User>(`${this.baseUrl}/user/1`)
  // }

}
