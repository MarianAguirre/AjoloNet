import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from '../interfaces/user.interfaces';
import { enavironments } from '../../../environments/envarionments';

@Injectable({providedIn: 'root'})
export class UserService {
  public loginUrl = enavironments.loginUrl
  constructor(private http: HttpClient) { }

  getUser(id:number): Observable<User>{
    return this.http.get<User>(`${this.loginUrl}/user/${id}`).pipe(
      catchError(this.handleErrors)
    )
  }

  updateUser(userRequest:User):Observable<any>{
    return this.http.put(`${this.loginUrl}/user`, userRequest).pipe(
      catchError(this.handleErrors)
    )
  }

  private handleErrors(error:HttpErrorResponse){
    if(error.status ===0){
      console.error('Se ha producido un error ', error.error)
    }else{
      console.error('Backend retorno el codigo estado ', error.status, error.error)
    }
    return throwError(()=> new Error('Algo fallo. Por favor intente nuevamente'))
  }
}
