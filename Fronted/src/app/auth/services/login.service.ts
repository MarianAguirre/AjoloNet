import { Injectable } from '@angular/core';
import { Login} from '../interfaces/login.interfaces';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { enavironments } from '../../../environments/envarionments';
import { catchError, Observable, throwError, BehaviorSubject, tap } from 'rxjs';
import { User } from '../interfaces/user.interfaces';

@Injectable({providedIn: 'root'})
export class LoginService {

  public baseUrl = enavironments.baseUrl

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<User> = new BehaviorSubject<User>({id:0, email:'', lastName: '', userName: '', firstName:'', password:'', role:''})

  constructor(private http: HttpClient) { }

  login(credentials:Login): Observable<User>{
    console.log(credentials);
    return this.http.get<User>(`${this.baseUrl}/`).pipe(
      tap(userData => {
        this.currentUserData.next(userData);
        this.currentUserLoginOn.next(true)
      }),
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

  get userData(): Observable<User>{
    return this.currentUserData.asObservable()
  }
  get userLoginOn(): Observable<boolean>{
    return this.currentUserLoginOn.asObservable()
  }
}
