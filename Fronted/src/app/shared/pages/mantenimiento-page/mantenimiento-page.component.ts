import { Component, OnInit } from '@angular/core';
import { Dispositivo, EndDevice } from '../../../interfaces/Dispositivo';
import { EquiposServices } from '../../services/equipos.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConectionService } from '../../services/conection.service';
import { UserService } from '../../services/user.service';
import { DatosUser } from '../../../interfaces/user.interfaces';

@Component({
  selector: 'mantenimiento-page',
  templateUrl: './mantenimiento-page.component.html',
  styleUrl: './mantenimiento-page.component.css'
})
export class MantenimientoPageComponent implements OnInit{
  mantenimientoForm: FormGroup
  device_type: string[] = ['ROUTER', 'SWITCH', 'PATCH_PANEL', 'END_DEVICES'];
  public patchPanels: Dispositivo[] = [];
  public racks: string[] = [];
  public routers: Dispositivo[] = [];
  public switches: Dispositivo[] = [];
  public dispositivos: Dispositivo[] = [];
  public endDevices: Dispositivo[] = [];
  devices:any[]=[];
  performed_by: DatosUser ={
    id: 0,
    username: '',
    firstname: '',
    lastname: '',
    password: '',
    role: ''
  }
  constructor(private userService:UserService, private portService:ConectionService, private equiposServices: EquiposServices, private fb: FormBuilder) {
    this.mantenimientoForm = this.fb.group({
      device_type: [''],
      device_id: [''],
      performed_by: [''],

    });
  }
  ngOnInit() {
      this.loadEquipos();
      this.Types();
      this.user()
  }

  public visible: boolean = false;
  showDialog(): void {
    this.visible = true;
  }

  Types(){
    this.mantenimientoForm.get('device_type')?.valueChanges.subscribe(device_type => {
      if (device_type === 'ROUTER') {
        this.portService.getNombresRouters().subscribe(devices => this.devices = devices);
      } else if (device_type === 'SWITCH') {
        this.portService.getNombresSwitches().subscribe(devices => this.devices = devices);
      }else if (device_type === 'END_DEVICES') {
        this.portService.getNombresEndDevices().subscribe(devices => this.devices = devices);
      }  else {
        this.portService.getNombresPatchPanels().subscribe(devices => this.devices = devices);
      }
      this.mantenimientoForm.get('device_id')?.setValue('');
    });
  }

  user(){
    this.userService.getUserDatos().subscribe(
      (response: DatosUser) => {
        console.log('Datos recibidos:', response); // Verifica la estructura de los datos
        this.performed_by = response; // Asignar directamente a user
      }
    );
  }




  loadEquipos() {
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

  calculateCustomerTotal(name: string) {
      let total = 0;

      if (this.dispositivos) {
          for (let customer of this.dispositivos) {
              if (customer.name === name) {
                  total++;
              }
          }
      }

      return total;
  }

  onSubmit(){}
}
