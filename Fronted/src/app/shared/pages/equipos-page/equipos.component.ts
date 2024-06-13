import { Component, Input, OnInit } from '@angular/core';
import { Dispositivo } from '../../../interfaces/Dispositivo';
import { EquiposServices } from '../../services/equipos.service';
import { HttpClient } from '@angular/common/http';
import { enavironments } from '../../../../environments/envarionments';
import Swal from 'sweetalert2';

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
      console.log(data)
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

  equipoDialog: boolean = false;
  selectedEquipos!: Dispositivo[] | null;
  submitted: boolean = false;
  statuses!: any[];

  editProduct(equipo: Dispositivo): void {
    this.equipo = { ...equipo };
    this.equipoDialog = true;
    console.log(this.equipo.name);
  }


  deleteDevices(equipo: Dispositivo): void {
    if (!equipo.id) {
      Swal.fire(
        'Error',
        'El ID del equipo es indefinido.',
        'error'
      );
      return;
    }
    console.log(equipo)
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Seguro que quieres eliminar el equipo ${equipo.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo'
    }).then((result) => {
      if (result.isConfirmed) {{
          this.equiposServices.deleteEquipo(equipo.id!, equipo.deviceType).subscribe(
            () => {
              this.dispositivos = this.dispositivos.filter(d => d.id !== equipo.id);
              Swal.fire(
                'Eliminado!',
                'El equipo ha sido eliminado.',
                'success'
              );
            },
            (error:any) => {
              Swal.fire(
                'Error',
                'Hubo un problema al eliminar el equipo.',
                'error'
              );
            }
          );
        }
      }

    });
  }



  hideDialog(): void {
    this.equipoDialog = false;
    this.submitted = false;
  }

  saveEquip(): void {
    // Implementación de la lógica de guardado
  }
}
