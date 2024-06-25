import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interfaces';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { enavironments } from '../../../environments/envarionments';


@Injectable({providedIn: 'root'})
export class AuthService {

  private baseUrl = enavironments.loginUrl
  private user?: User

  constructor(private http:HttpClient){}

  get currentUser(): User|undefined{
    if(!this.user) return undefined;
    return structuredClone(this.user);
  }

  logout(){
    this.user = undefined;
    localStorage.clear();
  }
}
