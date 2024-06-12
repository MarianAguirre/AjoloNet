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

  updateRouter(router:Dispositivo):Observable<Dispositivo>{
    return this.http.patch<Dispositivo>(`${this.baseUrl}/router`, router)
  }

  addRouter(router:Dispositivo):Observable<Dispositivo>{
    if (!router.id) throw Error('Router id is required')
    return this.http.patch<Dispositivo>(`${this.baseUrl}/router/${router.id}`, router)
  }

  deleteRouter(id:string):Observable<boolean>{
    return this.http.delete(`${this.baseUrl}/router/${id}`)
    .pipe(
      catchError(err => of(false)),
    map(resp => true))
  }

}


