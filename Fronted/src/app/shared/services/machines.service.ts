import { catchError, map, Observable, of } from 'rxjs';
import { enavironments } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Device, Maintenance, Server, VirtualMachine } from '../../interfaces/Dispositivo';

@Injectable({providedIn: 'root'})
export class MachinesServices {
  constructor(private http:HttpClient) { }
  baseUrl= enavironments.baseUrl

  createMachine(machinesData: any): Observable<any> {
    const url = `${this.baseUrl}/virtual-machines/create/${machinesData.serverId}`;
    return this.http.post(url, machinesData).pipe(
      catchError(error => {
        console.error('Error creating machines record', error);
        return of(null);
      })
    );
  }

  deleteMaintenance(id: number): Observable<void> {
    console.log(id)
    return this.http.delete<void>(`${this.baseUrl}/maintenance-records/${id}`)
  }

  getNamesServers(): Observable<{ name: string, id: number }[]> {
    return this.http.get<{ name: string, id: number }[]>(`${this.baseUrl}/servers`).pipe(
      map(servers => servers.map(server => ({ name: server.name, id: server.id }))),
      catchError(error => {
        console.error('Error fetching routers', error);
        return of([]);
      })
    );
  }

  deleteMachine(id: number): Observable<void> {
    console.log(id)
    return this.http.delete<void>(`${this.baseUrl}/virtual-machines/delete/${id}`)
  }

  updateServers(id: string, server: Device): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/servers/update/${id}`, server);
  }

  getServers(): Observable<Device[]> {
    return this.http.get<Device[]>(`${this.baseUrl}/servers`);
  }

  getMachines(id: number): Observable<Server> {
    return this.http.get<Server>(`${this.baseUrl}/servers/${id}`);
  }
}
