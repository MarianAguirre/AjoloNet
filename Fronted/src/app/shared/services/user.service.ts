import { DataUser, Users } from '../../interfaces/user.interfaces';
import { enavironments } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }
  private baseUrl: string = enavironments.baseUrl

  //Opciones de los admin
  getUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(`${this.baseUrl}/admin/users`)
  }
  updateUsers(id: number, user: Users): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/admin/update/${id}`, user);
  }

  deleteUsers(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/admin/delete/${id}`);
  }

  //Opciones de los usuarios
  getUserData(): Observable<DataUser> {
    return this.http.get<DataUser>(`${this.baseUrl}/user/me`)
  }
  updateUserData(id: number, user: DataUser): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/user/update/${id}`, user);
  }

}
