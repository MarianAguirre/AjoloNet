import { Area, Device, EndDevice, Rack } from './../../interfaces/Dispositivo';
import { catchError, map, Observable, of } from 'rxjs';
import { enavironments } from '../../../environments/envarionments';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EquiposServices {
  constructor(private http: HttpClient) { }
  device: Device[] = []
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
  getDevices(): Observable<{ routers: Device[], switches: Device[], patchPanels: Device[], endDevices: Device[] }> {
    return this.http.get<{ routers: Device[], switches: Device[], patchPanels: Device[], endDevices: Device[] }>(`${this.baseUrl}/Devices`).pipe(
      catchError(error => {
        console.error('Error fetching devices', error);
        return of({ routers: [], switches: [], patchPanels: [], endDevices: [] });
      })
    );
  }

  // Equipos.component
  deleteDevice(id: string, deviceType: string): Observable<void> {
    console.log(id, deviceType)
    return this.http.delete<void>(`${this.baseUrl}/Devices/${deviceType}/${id}`);
  }

  // Equipos.component
  updateDevice(id: string, equipo: Device): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/Devices/${equipo.deviceType}/${id}`, equipo);
  }


  // Conection-page.component, Agregar-equipo.component
  getTypeDevices(): Observable<string[]> {
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
  getDeviceRack(name: string): Observable<{ routers: Rack[], aSwitches: Rack[], patchPanels: Rack[] }> {
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

