import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enavironments } from '../../../environments/envarionments';
import { catchError, Observable, of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class MantenimientoService {
  constructor(private http:HttpClient) { }
  baseUrl= enavironments.baseUrl

  getMaintenance():Observable<string[]>{
    return this.http.get<string[]>(`${this.baseUrl}/maintenance-records`)
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
}
