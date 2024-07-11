import { Area, Dispositivo, EndDevice, Rack } from './../../interfaces/Dispositivo';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { enavironments } from '../../../environments/envarionments';

@Injectable({ providedIn: 'root' })
export class EquiposServices {
  constructor(private http: HttpClient) { }
  dispositivo: Dispositivo[] = []
  private baseUrl: string = enavironments.baseUrl

  // Equipos.component, Agregar-equipo.component
  getArea(): Observable<string[]> {
    return this.http.get<{ name: string }[]>(`${this.baseUrl}/area`).pipe(
      map(areas => areas.map(area => area.name)),
      catchError(error => {
        console.error('Error fetching areas', error);
        return of([]);
      })
    );
  }

  // Equipos.component, Agregar-equipo.component
  getRack(): Observable<string[]> {
    return this.http.get<{ name: string }[]>(`${this.baseUrl}/rack`).pipe(
      map(rack => rack.map(rack => rack.name)),
      catchError(error => {
        console.error('Error fetching areas', error);
        return of([]);
      })
    );
  }

  // Equipos.component
  getDevices(): Observable<{ routers: Dispositivo[], switches: Dispositivo[], patchPanels: Dispositivo[], endDevices: Dispositivo[] }> {
    return this.http.get<{ routers: Dispositivo[], switches: Dispositivo[], patchPanels: Dispositivo[], endDevices: Dispositivo[] }>(`${this.baseUrl}/Devices`).pipe(
      catchError(error => {
        console.error('Error fetching devices', error);
        return of({ routers: [], switches: [], patchPanels: [], endDevices: [] });
      })
    );
  }

  // Equipos.component
  deleteEquipo(id: string, deviceType: string): Observable<void> {
    console.log(id, deviceType)
    return this.http.delete<void>(`${this.baseUrl}/Devices/${deviceType}/${id}`);
  }

  // Equipos.component
  updateEquipo(id: string, equipo: Dispositivo): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/Devices/${equipo.deviceType}/${id}`, equipo);
  }


  // Conection-page.component, Agregar-equipo.component
  getTiposDispositivos(): Observable<string[]> {
    return this.http.get<{ [key: string]: any }>(`${this.baseUrl}/Devices`).pipe(
      map(response => Object.keys(response)),
      catchError(error => {
        console.error('Error fetching device types', error);
        return of([]);
      })
    );
  }


  // Areas-page.component
  getAreas(): Observable<Area[]> {
    return this.http.get<Area[]>(`${this.baseUrl}/area`);
  }
  // Areas-page.component
  getEndDevicesArea(name: string): Observable<EndDevice[]> {
    return this.http.get<EndDevice[]>(`${this.baseUrl}/${name}/endDevices`)
  }
  // Areas-page.component
  deleteArea(id: number): Observable<void> {
    console.log(id)
    return this.http.delete<void>(`${this.baseUrl}/area/id/${id}`)
  }

  // Racks-page.component
  getRacks(): Observable<Rack[]> {
    return this.http.get<Rack[]>(`${this.baseUrl}/rack`);
  }

  // Racks-page.component
  getEquiposRack(name: string): Observable<{ routers: Rack[], aSwitches: Rack[], patchPanels: Rack[] }> {
    return this.http.get<{ routers: Rack[], aSwitches: Rack[], patchPanels: Rack[] }>(`${this.baseUrl}/${name}`).pipe(
      catchError(error => {
        console.error('Error fetching devices', error);
        return of({ routers: [], aSwitches: [], patchPanels: [] });
      })
    );
  }

  // Racks-page.component
  deleteRack(id: number): Observable<void> {
    console.log(id)
    return this.http.delete<void>(`${this.baseUrl}/rack/id/${id}`)
  }

}

