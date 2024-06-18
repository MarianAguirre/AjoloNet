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
  getPatch():Observable<Dispositivo[]>{
    return this.http.get<Dispositivo[]>(`${this.baseUrl}/patchPanel `)
  }
  getEnd():Observable<Dispositivo[]>{
    return this.http.get<Dispositivo[]>(`${this.baseUrl}/endDevices `)
  }


  deleteEquipo(id: string,deviceType:string): Observable<void> {
    console.log(id,deviceType)
    return this.http.delete<void>(`${this.baseUrl}/Devices/${deviceType}/${id}`);
  }


  getEquipo(id: string,deviceType:string): Observable<void> {
    console.log(id,deviceType)
    return this.http.get<void>(`${this.baseUrl}/Devices/${deviceType}/${id}`);
  }
  getDeviceNamesByType(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/devices/`);
  }

  getArea(): Observable<string[]> {
    return this.http.get<{ name: string }[]>(`${this.baseUrl}/area`).pipe(
      map(areas => areas.map(area => area.name)),
      catchError(error => {
        console.error('Error fetching areas', error);
        return of([]);
      })
    );
  }



  getTiposDispositivos(): Observable<string[]> {
    return this.http.get<{ [key: string]: any }>(`${this.baseUrl}/Devices`).pipe(
      map(response => Object.keys(response)),
      catchError(error => {
        console.error('Error fetching device types', error);
        return of([]);
      })
    );
  }

  getNombresRouters():Observable<string[]> {
    return this.http.get<{ name: string }[]>(`${this.baseUrl}/router`).pipe(
      map(routers => routers.map(router => router.name)),
      catchError(error => {
        console.error('Error fetching routers', error);
        return of([]);
      })
    );
  }
  getNombresSwitches(): Observable<string[]> {
    return this.http.get<{ name: string }[]>(`${this.baseUrl}/switch`).pipe(
      map(switches => switches.map(switchDevice => switchDevice.name)),
      catchError(error => {
        console.error('Error fetching switches', error);
        return of([]);
      })
    );
  }

  getNombresEndDevices(): Observable<string[]> {
    return this.http.get<{ name: string }[]>(`${this.baseUrl}/endDevice`).pipe(
      map(endDevices => endDevices.map(endDevice => endDevice.name)),
      catchError(error => {
        console.error('Error fetching end devices', error);
        return of([]);
      })
    );
  }

  getNombresPatchPanels(): Observable<string[]> {
    return this.http.get<{ name: string }[]>(`${this.baseUrl}/patchPanel`).pipe(
      map(patchPanels => patchPanels.map(patchPanel => patchPanel.name)),
      catchError(error => {
        console.error('Error fetching patch panels', error);
        return of([]);
      })
    );
  }

  getEndDevicesPorAreas(areaName: string): Observable<Dispositivo[]> {
    return this.http.get<Dispositivo[]>(`${this.baseUrl}/area/${areaName}`);
  }
}

