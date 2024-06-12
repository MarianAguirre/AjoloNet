import { Component, Input, OnInit } from '@angular/core';
import { Dispositivo } from '../../../interfaces/Dispositivo';
import { EquiposServices } from '../../services/equipos.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { enavironments } from '../../../../environments/envarionments';

@Component({
  selector: 'shared-equipos-pages',
  templateUrl: './equipos.component.html',
  styleUrl: './equipos.component.css'
})
export class EquiposComponent implements OnInit {
  dispositivos: Dispositivo[] = [];
  routers: Dispositivo[] = [];
  switches: Dispositivo[] = [];
  patchPanels: Dispositivo[] = [];
  endDevices: Dispositivo[] = [];
  baseUrl: string = enavironments.baseUrl;



  @Input()
  public equipo!: Dispositivo;

  public equipos!: Dispositivo[];

  constructor(private equiposServices: EquiposServices, private http: HttpClient) {}

  ngOnInit(): void {
    this.equiposServices.getDevices().subscribe((data: any) => {
      if (data && typeof data === 'object') {
        this.routers = data.routers || [];
        this.switches = data.switches || [];
        this.patchPanels = data.patchPanels || [];
        this.endDevices = data.endDevices || [];
        this.dispositivos = [...this.routers, ...this.switches, ...this.patchPanels, ...this.endDevices];
      } else {
        console.error('Error: data is not an object', data);
      }
    });
  }

  getRouters(): Observable<Dispositivo[]> {
    return this.http.get<Dispositivo[]>(`${this.baseUrl}/router/`);
  }

  getSwitch(): Observable<Dispositivo[]> {
    return this.http.get<Dispositivo[]>(`${this.baseUrl}/switch/`);
  }

  getIdRouters(id: number): Observable<Dispositivo[]> {
    return this.http.get<Dispositivo[]>(`${this.baseUrl}/router/id/${id}`);
  }

  showRouterDetails(equipo: Dispositivo): void {
    if (equipo && equipo.id) {
      const id = Number(equipo.id);  // Convertir id a número
      if (!isNaN(id)) {
        this.getIdRouters(id).subscribe((data: Dispositivo[]) => {
          console.log(`Detalles del router con id ${id}:`, data);
        });
      } else {
        console.error('El id del equipo no es un número válido');
      }
    } else {
      console.error('Equipo no está definido o no tiene un id');
    }
  }

  public orderBy: keyof Dispositivo | undefined | '' = '';

  changeOrder(value: keyof Dispositivo): void {
    this.orderBy = value;
  }

  equipoDialog: boolean = false;
  selectedEquipos!: Dispositivo[] | null;
  submitted: boolean = false;
  statuses!: any[];

  editProduct(equipo: Dispositivo): void {
    this.equipo = { ...equipo };
    this.equipoDialog = true;
    console.log(this.equipo.name);
  }

  deleteEquip(equipo: Dispositivo): void {
    // Implementación de la lógica de eliminación
  }

  hideDialog(): void {
    this.equipoDialog = false;
    this.submitted = false;
  }

  saveEquip(): void {
    // Implementación de la lógica de guardado
  }
}
