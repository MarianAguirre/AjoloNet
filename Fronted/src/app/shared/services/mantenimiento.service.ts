import { catchError, Observable, of } from 'rxjs';
import { enavironments } from '../../../environments/envarionments';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Maintenance } from '../../interfaces/Dispositivo';

@Injectable({providedIn: 'root'})
export class MantenimientoService {
  constructor(private http:HttpClient) { }
  baseUrl= enavironments.baseUrl

  getMaintenance():Observable<Maintenance[]>{
    return this.http.get<Maintenance[]>(`${this.baseUrl}/maintenance-records`)
  }
  createMaintenance(maintenanceData: any): Observable<any> {
    const url = `${this.baseUrl}/maintenance-records?deviceType=${maintenanceData.deviceType}&deviceId=${maintenanceData.device_id}`;
    return this.http.post(url, maintenanceData).pipe(
      catchError(error => {
        console.error('Error creating maintenance record', error);
        return of(null);
      })
    );
  }

  deleteMaintenance(id: number): Observable<void> {
    console.log(id)
    return this.http.delete<void>(`${this.baseUrl}/maintenance-records/${id}`)
  }



}
