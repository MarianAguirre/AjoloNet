import { Component, Input, OnInit } from '@angular/core';
import { Dispositivo } from '../../../interfaces/Dispositivo';
import { EquiposServices } from '../../services/equipos.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Component({
  selector: 'shared-equipos-pages',
  templateUrl: './equipos.component.html'
})
export class EquiposComponent implements OnInit {
  dispositivos: Dispositivo[] = [];


  constructor(private equiposServices: EquiposServices, private http:HttpClient) {}

  ngOnInit(): void {
    this.equiposServices.getRouters().subscribe((data: any) => {
      this.dispositivos = data

    });
  }


  getDevices(): Observable<Dispositivo[]>{
    return this.http.get<Dispositivo[]>('http://172.17.207.87:8001/router')
  }


  public orederBy:keyof Dispositivo | undefined| ''= '';

  changeOrder(value: keyof Dispositivo){
    this.orederBy= value;
  }

  deleteDevice(id: string): void {
    this.http.delete(`http://localhost:4000/delete/${id}`).subscribe(
        () => {
            // Actualizar la lista de dispositivos después de eliminar
            this.dispositivos = this.dispositivos.filter(device => device.id !== id);
        },
        error => {
            console.error("Error al eliminar dispositivo:", error);
        }
    );
}




}
