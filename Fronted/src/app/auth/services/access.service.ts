import { enavironments } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../../interfaces/login.interfaces';
import { Observable } from 'rxjs';
import { ResponseAccess } from '../../interfaces/ResponseAcceso';
import { User } from '../../interfaces/user.interfaces';

@Injectable({ providedIn: 'root' })
export class AccessService {

  private baseUrl: string = enavironments.loginUrl
  constructor(private http: HttpClient) { }


  registrarse(objeto: User): Observable<ResponseAccess> {
    return this.http.post<ResponseAccess>(`${this.baseUrl}/register`, objeto)
  }

  login(objeto: Login): Observable<ResponseAccess> {
    return this.http.post<ResponseAccess>(`${this.baseUrl}/login`, objeto)
  }
}
