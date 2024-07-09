import { enavironments } from '../../../environments/envarionments';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../../interfaces/login.interfaces';
import { Observable } from 'rxjs';
import { ResponseAccesso } from '../../interfaces/ResponseAcceso';
import { User } from '../../interfaces/user.interfaces';

@Injectable({ providedIn: 'root' })
export class AccessService {

  private baseUrl: string = enavironments.loginUrl
  constructor(private http: HttpClient) { }


  registrarse(objeto: User): Observable<ResponseAccesso> {
    return this.http.post<ResponseAccesso>(`${this.baseUrl}/register`, objeto)
  }

  login(objeto: Login): Observable<ResponseAccesso> {
    return this.http.post<ResponseAccesso>(`${this.baseUrl}/login`, objeto)
  }
}
