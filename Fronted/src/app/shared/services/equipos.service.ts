import { Dispositivo } from './../../interfaces/Dispositivo';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { enavironments } from '../../../environments/envarionments';



@Injectable({providedIn: 'root'})
export class EquiposServices {
  constructor(private http:HttpClient) {
  }



dispositivo: Dispositivo[] =[]
private baseUrl: string = enavironments.baseUrl

getDevices(): Observable<{ routers: Dispositivo[], switches: Dispositivo[], patchPanels: Dispositivo[], endDevices: Dispositivo[] }> {
  return this.http.get<{ routers: Dispositivo[], switches: Dispositivo[], patchPanels: Dispositivo[], endDevices: Dispositivo[] }>(`${this.baseUrl}/Devices`).pipe(
    catchError(error => {
      console.error('Error fetching devices', error);
      return of({ routers: [], switches: [], patchPanels: [], endDevices: [] });
    })
  );
}
  getRouters():Observable<Dispositivo[]>{
    return this.http.get<Dispositivo[]>(`${this.baseUrl}/router `)
  }

  getSwitch():Observable<Dispositivo[]>{
    return this.http.get<Dispositivo[]>(`${this.baseUrl}/switch `)
  }

  deleteEquipo(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/router/id/${id}`);
  }

  // updateEquipo(id: string): Observable<void> {
  //   return this.http.put<void>(`${this.baseUrl}/patchPanel/id/${id}`);
  // }
}


