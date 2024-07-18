import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enavironments } from '../../../environments/envarionments';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class MantenimientoService {
  constructor(private http:HttpClient) { }
  baseUrl= enavironments.baseUrl

  getMaintenance():Observable<string[]>{
    return this.http.get<string[]>(`${this.baseUrl}/maintenace-records`)
  }
}
