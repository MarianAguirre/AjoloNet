import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import Swal from 'sweetalert2';
import { enavironments } from '../../../../environments/envarionments';
import { Area, ASwitch, EndDevice, Rack, Routers } from '../../../interfaces/Dispositivo';
import { EquiposServices } from '../../services/equipos.service';

@Component({
  selector: 'racks-page',
  templateUrl: './racks-page.component.html',
  styleUrl: './racks-page.component.css'
})
export class RacksPageComponent implements OnInit {

  constructor(private equiposServices: EquiposServices, private http: HttpClient) {}

  public baseUrl: string = enavironments.baseUrl;
  public racks: Rack[] = [];
  public routers: Rack[] = []
  public switches: Rack[] = []
  public patchPanels: Rack[] = []
  public dispositivos: Rack[] = []

  @Input() public equipo!: EndDevice;
  public visible: boolean = false;
  public nuevoRack: { name: string } = { name: '' };

  ngOnInit(): void {
    this.loadRacks();

  }

  loadRacks(): void {
    this.equiposServices.getRacks().subscribe((data: Rack[]) => {
      this.racks = data;

    });
  }

  loadEquiposRack(racks: Rack): void {
    if (racks.routers.length === 0) {
      this.equiposServices.getEquiposRack(racks.name).subscribe((data: any) => {
        console.log(data)
        if (data && typeof data === 'object') {
          this.routers = data.routers || [];
          this.switches = data.switches || [];
          this.patchPanels = data.patchPanels || [];
          this.dispositivos = [...this.routers, ...this.switches, ...this.patchPanels];
        } else {
          console.error('Error: data is not an object', data);
        }
      });
    }
  }

  // loadRouters(racks: Rack): void {
  //   if (racks.routers.length === 0) {
  //     this.equiposServices.getRouterRack(racks.name).subscribe((devices: Routers[]) => {
  //       racks.routers = devices;
  //     });
  //   }
  // }

  getTotalRouters(rack: Rack): number {
    return rack.routers.length;
  }
  getTotalSwitch(rack: Rack): number {
    return rack.aSwitch.length;
  }
  getTotalPatch(rack: Rack): number {
    return rack.patchPanels.length;
  }

  showDialog(): void {
    this.visible = true;
  }

  newRack(): void {
    if (!this.nuevoRack.name || this.nuevoRack.name.length === 0) return;
    timer(100).subscribe(() => this.visible = false);
    this.http.post(`${this.baseUrl}/rack`, this.nuevoRack).subscribe(
      (data) => {
        Swal.fire({
          icon: 'success',
          timer: 1000,
          title: 'Rack creado con éxito'
        });
        this.nuevoRack.name = '';  // Limpiar el campo después de enviar
        this.loadRacks(); // Recargar áreas después de crear una nueva
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          timer: 1100,
          title: 'Error al crear el rack'
        });
        console.error('Error al enviar el rack:', error);
      }
    );
  }

  deleteRack(rack: Rack): void {
    if (!rack.id) {
      Swal.fire('Error', 'El ID del rack es indefinido.', 'error');
      return;
    }

    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Seguro que quieres eliminar el ${rack.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.equiposServices.deleteRack(rack.id).subscribe(
          () => {
            this.racks = this.racks.filter(d => d.id !== rack.id);
            Swal.fire('Eliminado!', 'El rack ha sido eliminada.', 'success');
          },
          (error) => {
            Swal.fire('Error', 'Hubo un problema al eliminar el rack.', 'error');
          }
        );
      }
    });
  }
}
