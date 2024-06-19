import { Component, Input, OnInit } from '@angular/core';
import { Area, EndDevice } from '../../../interfaces/Dispositivo';
import { EquiposServices } from '../../services/equipos.service';
import { HttpClient } from '@angular/common/http';
import { enavironments } from '../../../../environments/envarionments';
import { timer } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'areas-page',
  templateUrl: './areas-page.component.html',
  styleUrls: ['./areas-page.component.css']
})
export class AreasPageComponent implements OnInit {

  constructor(private equiposServices: EquiposServices, private http: HttpClient) {}

  public baseUrl: string = enavironments.baseUrl;
  public areas: Area[] = [];
  @Input() public equipo!: EndDevice;
  public visible: boolean = false;
  public zona: { name: string } = { name: '' };

  ngOnInit(): void {
    this.loadAreas();
  }

  loadAreas(): void {
    this.equiposServices.getAreas().subscribe((data: Area[]) => {
      this.areas = data;
    });
  }

  loadEndDevices(area: Area): void {
    if (area.endDevices.length === 0) {
      this.equiposServices.getEndDevicesArea(area.name).subscribe((devices: EndDevice[]) => {
        area.endDevices = devices;
      });
    }
  }

  getTotalEquipos(area: Area): number {
    return area.endDevices.length;
  }

  showDialog(): void {
    this.visible = true;
  }

  newArea(): void {
    if (!this.zona.name || this.zona.name.length === 0) return;
    timer(100).subscribe(() => this.visible = false);
    this.http.post(`${this.baseUrl}/area`, this.zona).subscribe(
      (data) => {
        Swal.fire({
          icon: 'success',
          timer: 1000,
          title: 'Área creada con éxito'
        });
        this.zona.name = '';  // Limpiar el campo después de enviar
        this.loadAreas(); // Recargar áreas después de crear una nueva
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          timer: 1100,
          title: 'Error al crear el área'
        });
        console.error('Error al enviar el área:', error);
      }
    );
  }

  deleteArea(area: Area): void {
    if (!area.id) {
      Swal.fire('Error', 'El ID del área es indefinido.', 'error');
      return;
    }

    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Seguro que quieres eliminar el área ${area.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.equiposServices.deleteArea(area.id).subscribe(
          () => {
            this.areas = this.areas.filter(d => d.id !== area.id);
            Swal.fire('Eliminado!', 'El área ha sido eliminada.', 'success');
          },
          (error) => {
            Swal.fire('Error', 'Hubo un problema al eliminar el área.', 'error');
          }
        );
      }
    });
  }
}
