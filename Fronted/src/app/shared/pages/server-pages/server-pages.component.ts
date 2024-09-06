import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import Swal from 'sweetalert2';
import { enavironments } from '../../../../environments/environments';
import { Area, Device, EndDevice, Server, VirtualMachine } from '../../../interfaces/Dispositivo';
import { EquiposServices } from '../../services/equipos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MachinesServices } from '../../services/machines.service';

@Component({
  selector: 'app-server-pages',
  templateUrl: './server-pages.component.html',
  styleUrl: './server-pages.component.css'
})
export class ServerPagesComponent implements OnInit {
  constructor(
    private equiposServices: EquiposServices,
    private http: HttpClient,
    private fb: FormBuilder,
    private machinesServices: MachinesServices
  ) {
    this.machinesForm = this.fb.group({
      serverId: ['', Validators.required],
      name: ['', Validators.required],
      ip: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  name: any[]=[]

  names(){
    this.machinesServices.getNamesServers().subscribe(servers => this.name = servers)
  }


  machinesForm: FormGroup;
  public baseUrl: string = enavironments.baseUrl;
  public server: Device[]
  public dispositivos: Device[]
  public visible: boolean = false;

  // Hace visible el dialogo para la creacion de maquinas
  showDialog(): void {
    this.visible = true;
  }

  // Carga los servidores que existen
  ngOnInit(): void {
    this.loadServers();
    this.names();
  }

  onSubmit(): void {
    const machinesData = {
      serverId: this.machinesForm.get('serverId')?.value,
      name: this.machinesForm.get('name')?.value,
      ip: this.machinesForm.get('ip')?.value,
      description: this.machinesForm.get('description')?.value,
    };
    console.log(machinesData)

    this.machinesServices.createMachine(machinesData).subscribe(response => {
      console.log(machinesData);
      timer(100).subscribe(() => this.visible = false);
      if (response) {
        Swal.fire({
          title: 'Maquina creada',
          icon: 'success',
        });
        this.machinesForm.reset();
      } else {
        Swal.fire({
          title: "Error al crear la maquina",
          text: 'Verifica que los campos estén completados',
          icon: 'error',
        });
        this.machinesForm.reset();
      }
      this.loadServers();
    });
  }



  // Funcion de carga de servidores
  loadServers(): void {
    this.machinesServices.getServers().subscribe((server: Device[]) => {
      this.server = server;
      console.log(server)
      this.dispositivos =[...this.server]
    });
  }

 // Función para cargar las máquinas virtuales de un servidor
loadMachines(server: Server): void {
  if (server.virtualMachines.length === 0) {
    this.machinesServices.getMachines(server.id).subscribe((data: Server) => {
      server.virtualMachines = data.virtualMachines || []; // Extrae las máquinas virtuales del objeto recibido
    }, error => {
      console.error('Error al obtener las máquinas virtuales:', error);
    });
  }
}


  // Elimina un area
  deleteMachine(machine: VirtualMachine): void {
    if (!machine.id) {
      Swal.fire('Error', 'El ID de la maquina es indefinido.', 'error');
      return;
    }
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Seguro que quieres eliminar la maquina ${machine.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.machinesServices.deleteMachine(machine.id).subscribe(
          () => {
            // this.areas = this.areas.filter(d => d.id !== area.id);
            Swal.fire('Eliminado!', 'La maquina ha sido eliminada.', 'success');
            this.loadServers()
          },
          (error) => {
            Swal.fire('Error', 'Hubo un problema al eliminar la maquina.', 'error');
          }
        );
      }
    });
  }

}
