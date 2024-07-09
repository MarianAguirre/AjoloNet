import { Area, EndDevice } from '../../../interfaces/Dispositivo';
import { Component, Input, OnInit } from '@angular/core';
import { enavironments } from '../../../../environments/envarionments';
import { EquiposServices } from '../../services/equipos.service';
import { HttpClient } from '@angular/common/http';
import { timer } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'areas-page',
  templateUrl: './areas-page.component.html',
  styleUrls: ['./areas-page.component.css']
})
export class AreasPageComponent implements OnInit {
  constructor(private equiposServices: EquiposServices, private http: HttpClient) { }

  public baseUrl: string = enavironments.baseUrl;
  public areas: Area[] = [];
  public visible: boolean = false;
  public zona: { name: string } = { name: '' };
  @Input() public equipo!: EndDevice;

  // Hace visible el dialogo para la creacion de areas
  showDialog(): void {
    this.visible = true;
  }

  // Carga las areas que existen
  ngOnInit(): void {
    this.loadAreas();
  }

  // Crea una nueva area
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

  // Funcion de carga de areas, manda llamar las areas del backend
  loadAreas(): void {
    this.equiposServices.getAreas().subscribe((data: Area[]) => {
      this.areas = data;
    });
  }

  // Funcion de carga de dispositivos finales, manda llamar los dispositivos finales que existen en el backen y lo agrupa segun el area
  loadEndDevices(area: Area): void {
    if (area.endDevices.length === 0) {
      this.equiposServices.getEndDevicesArea(area.name).subscribe((devices: EndDevice[]) => {
        area.endDevices = devices;
      });
    }
  }

  // Cuenta el total de equipos en un area
  getTotalEquipos(area: Area): number {
    return area.endDevices.length;
  }

  // Elimina un area
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
