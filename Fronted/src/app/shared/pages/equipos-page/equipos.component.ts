import { Component, OnInit } from '@angular/core';
import { Device } from '../../../interfaces/Dispositivo';
import { enavironments } from '../../../../environments/environments';
import { EquiposServices } from '../../services/equipos.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import Swal from 'sweetalert2';
import { DeviceDataService } from '../../services/device-data.service';

@Component({
  selector: 'shared-equipos-pages',
  templateUrl: './equipos.component.html',
  styleUrl: './equipos.component.css'
})
export class EquiposComponent implements OnInit {
  constructor(private equiposServices: EquiposServices, private http: HttpClient, private router: Router, private deviceDataService: DeviceDataService) { }

  public areas: string[] = [];
  public baseUrl: string = enavironments.baseUrl;
  public dispositivos: Device[] = [];
  public endDevices: Device[] = [];
  public equipo!: Device;
  public equipoDialog: boolean = false;
  public patchPanels: Device[] = [];
  public racks: string[] = [];
  public routers: Device[] = [];
  public switches: Device[] = [];


  ngOnInit(): void {
    // Recibe todos lo dispositivos para mostrarlos en la tabla
    this.loadDevices();

    // Obtiene los racks
    this.equiposServices.getRack().subscribe((racks: string[]) => {
      this.racks = racks;
    });

    // Obtiene las areas
    this.equiposServices.getArea().subscribe((areas: string[]) => {
      this.areas = areas;
    });
  }

  loadDevices() {
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


  // Redirige a las areas y racks
  goAreas() {
    this.router.navigate(['red/areas']);
  }
  goRacks() {
    this.router.navigate(['red/racks']);
  }

  // Transforma el booleano de true o false, a si o no
  get poeText(): string {
    return this.equipo.poe ? 'Sí' : 'No';
  }
  get manageableText(): string {
    return this.equipo.manageable ? 'Sí' : 'No';
  }

  // Permite la visibilidad del dialogo de detalles
  editProduct(equipo: Device): void {
    this.equipo = { ...equipo };
    this.equipoDialog = true;
  }

  // Funcion que elimina un equipo por id
  deleteDevices(equipo: Device): void {
    if (!equipo.id) {
      Swal.fire(
        'Error',
        'El ID del equipo es indefinido.',
        'error'
      );
      return;
    }
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Seguro que quieres eliminar el equipo ${equipo.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.equiposServices.deleteDevice(equipo.id!, equipo.deviceType).subscribe(
          () => {
            this.dispositivos = this.dispositivos.filter(d => d.id !== equipo.id);
            Swal.fire(
              'Eliminado!',
              'El equipo ha sido eliminado.',
              'success'
            );
          },
          (error: any) => {
            Swal.fire(
              'Error',
              'Hubo un problema al eliminar el equipo.',
              'error'
            );
          }
        );
      }
    });
  }

  // Actualiza los datos del equipo
  saveDevice(): void {
    if (!this.equipo.id) {
      Swal.fire(
        'Error',
        'El ID del equipo es indefinido.',
        'error'
      );
      return;
    }
    timer(100).subscribe(() => this.equipoDialog = false);
    Swal.fire({
      title: '¿Haz rellenado todos los campos?',
      text: `Al actualizar un equipo debes asegurarte de rellenar los campos de rack/area y no dejar vacio`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, actualiza'
    }).then((result) => {
      if (result.isConfirmed) {
        this.equiposServices.updateDevice(this.equipo.id!, this.equipo).subscribe(
          () => {
            this.equipoDialog = false;
            this.dispositivos = this.dispositivos.map(d => d.id === this.equipo.id ? this.equipo : d);
            Swal.fire(
              'Actualizado!',
              'El equipo ha sido actualizado.',
              'success'
            );
            this.loadDevices();
          },
          (error: any) => {
            Swal.fire(
              'Error',
              'Hubo un problema al actualizar el equipo.',
              'error'
            );
          }
        );
      }
      else { timer(100).subscribe(() => this.equipoDialog = true); }
    });
  }

  navigateToConnections(deviceType: string, deviceId: string) {
    this.deviceDataService.setDeviceData(deviceType, deviceId);
    this.router.navigate(['/red/conexiones/localizar-conexion']);
  }
}
