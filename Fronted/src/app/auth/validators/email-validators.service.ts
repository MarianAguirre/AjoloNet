import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { delay, map, Observable, of } from 'rxjs';
import { enavironments } from '../../../environments/envarionments';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class EmailValidator implements AsyncValidator{

  baseUrl = enavironments.baseUrl

  constructor(private http:HttpClient) { }
  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;
    console.log({email})

  return this.http.get<any[]>(`${this.baseUrl}insertelrestodelaurlparausuarios${email}`)
  .pipe(
    map(resp=>{
      return (resp.length ===0)
      ? null
      : {emailTaken:true}
    })
  )

  }
}
