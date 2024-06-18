import { Component, Input, OnInit } from '@angular/core';
import { Dispositivo } from '../../../interfaces/Dispositivo';
import { EquiposServices } from '../../services/equipos.service';
import { HttpClient } from '@angular/common/http';
import { enavironments } from '../../../../environments/envarionments';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';

interface AreaWithDevices {
  name: string;
  devices: Dispositivo[];
}

@Component({
  selector: 'areas-page',
  templateUrl: './areas-page.component.html',
  styleUrl: './areas-page.component.css'
})
export class AreasPageComponent implements OnInit {

  constructor(private equiposServices: EquiposServices, private http: HttpClient) {}

  public dispositivos: Dispositivo[] = [];
  public endDevices: Dispositivo[] = [];
  public areas: AreaWithDevices[] = [];
  public baseUrl: string = enavironments.baseUrl;

  @Input()
  public equipo!: Dispositivo;
  public visible: boolean = false;
  public zona: { name: string } = { name: '' };

  ngOnInit(): void {
    this.equiposServices.getArea().subscribe((areas: string[]) => {
      this.areas = areas.map(area => ({name: area, devices: []}));
      this.loadDevicesForAreas();
    });
  }

  showDialog(): void {
    this.visible = true;
  }

  newArea(): void {
    if (!this.zona.name || this.zona.name.length === 0) return;

    this.http.post(`${this.baseUrl}/area`, this.zona).subscribe(
      (data) => {
        console.log('Area enviada con éxito:', data);
        this.zona.name = '';  // Limpiar el campo después de enviar
      },
      (error) => {
        console.error('Error al enviar el área:', error);
      }
    );
  }

  getTotalEquipos(areaName: string): number {
    const area = this.areas.find(area => area.name === areaName);
    return area ? area.devices.length : 0;
  }

  private loadDevicesForAreas(): void {
    const observables: Observable<Dispositivo[]>[] = this.areas.map(area =>
      this.equiposServices.getEndDevicesPorAreas(area.name)
    );

    forkJoin(observables).subscribe(results => {
      results.forEach((devices, index) => {
        this.areas[index].devices = devices;
      });
    });
  }
}
