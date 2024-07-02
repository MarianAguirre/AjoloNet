import { Injectable } from '@angular/core';
import { DatosUser, User } from '../../interfaces/user.interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { enavironments } from '../../../environments/envarionments';


@Injectable({providedIn: 'root'})
export class UserService {
  constructor(private http:HttpClient) {}
  private baseUrl: string = enavironments.baseUrl

  getUser(){
    // /api/admin/users
    // /api/admin/update/{id}
    // api/user/update/{id}
    // api/users/profile
    // api/user/me
      }

      getUsers():Observable<User>{
        return this.http.get<User>(`${this.baseUrl}/admin/users`)
      }


  getUserDatos():Observable<DatosUser>{
    return this.http.get<DatosUser>(`${this.baseUrl}/user/me`)
  }

  updateUserDatos(id: number, user: DatosUser): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/user/update/${id}`, user);
  }

}
