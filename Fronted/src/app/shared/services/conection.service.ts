import { Connections } from '../../interfaces/Dispositivo';
import { enavironments } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ConectionService {
  constructor(private http: HttpClient) { }
  baseUrl = enavironments.baseUrl

  // Conection-page.component, Agregar-equipo.component
  getTypesDevices(): Observable<string[]> {
    return this.http.get<{ [key: string]: any }>(`${this.baseUrl}/Devices`).pipe(
      map(response => Object.keys(response)),
      catchError(error => {
        console.error('Error fetching device types', error);
        return of([]);
      })
    );
  }

  // Conection-page.component
  getNamesRouters(): Observable<{ name: string, id: number }[]> {
    return this.http.get<{ name: string, id: number }[]>(`${this.baseUrl}/router`).pipe(
      map(routers => routers.map(router => ({ name: router.name, id: router.id }))),
      catchError(error => {
        console.error('Error fetching routers', error);
        return of([]);
      })
    );
  }

  // Conection-page.component
  getNamesSwitches(): Observable<{ name: string, id: number }[]> {
    return this.http.get<{ name: string, id: number }[]>(`${this.baseUrl}/switch`).pipe(
      map(routers => routers.map(router => ({ name: router.name, id: router.id }))),
      catchError(error => {
        console.error('Error fetching routers', error);
        return of([]);
      })
    );
  }

  // Conection-page.component
  getNamesEndDevices(): Observable<{ name: string, id: number }[]> {
    return this.http.get<{ name: string, id: number }[]>(`${this.baseUrl}/endDevice`).pipe(
      map(routers => routers.map(router => ({ name: router.name, id: router.id }))),
      catchError(error => {
        console.error('Error fetching routers', error);
        return of([]);
      })
    );
  }

  // Conection-page.component
  getNamesPatchPanels(): Observable<{ name: string, id: number }[]> {
    return this.http.get<{ name: string, id: number }[]>(`${this.baseUrl}/patchPanel`).pipe(
      map(routers => routers.map(router => ({ name: router.name, id: router.id }))),
      catchError(error => {
        console.error('Error fetching routers', error);
        return of([]);
      })
    );
  }


  getPorts(deviceType: string, deviceId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/port-connections/ports`, {
      params: {
        deviceType: deviceType.toUpperCase(),
        deviceId: deviceId.toString()
      }
    });
  }

  getConnections(): Observable<Connections[]> {
    return this.http.get<Connections[]>(`${this.baseUrl}/port-connections`)
  }

  getConnectionsDevice(deviceType: string, deviceId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/port-connections/device?deviceType=${deviceType}&deviceId=${deviceId}`);
  }

  createConnection(connectionData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/port-connections`, connectionData).pipe(
      catchError(error => {
        console.error('Error creating connection', error);
        return of(null);
      })
    );
  }
  deleteConnection(id: number): Observable<void> {
    console.log(id)
    return this.http.delete<void>(`${this.baseUrl}/port-connections/${id}`)
  }
}
