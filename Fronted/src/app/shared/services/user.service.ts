import { Injectable } from '@angular/core';
import { DatosUser, User, Usuarios } from '../../interfaces/user.interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { enavironments } from '../../../environments/envarionments';


@Injectable({providedIn: 'root'})
export class UserService {
  constructor(private http:HttpClient) {}
  private baseUrl: string = enavironments.baseUrl

  getUsers():Observable<Usuarios[]>{
    return this.http.get<Usuarios[]>(`${this.baseUrl}/admin/users`)
  }
  updateUsuarios(id: number, user: Usuarios): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/admin/update/${id}`, user);
  }

  getUserDatos():Observable<DatosUser>{
    return this.http.get<DatosUser>(`${this.baseUrl}/user/me`)
  }

  updateUserDatos(id: number, user: DatosUser): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/user/update/${id}`, user);
  }

  deleteUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/admin/delete/${id}`);
  }

}
