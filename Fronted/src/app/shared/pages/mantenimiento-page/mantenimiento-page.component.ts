import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConectionService } from '../../services/conection.service';
import { MantenimientoService } from '../../services/mantenimiento.service';
import Swal from 'sweetalert2';
import { timer } from 'rxjs';
import { Maintenance } from '../../../interfaces/Dispositivo';

@Component({
  selector: 'mantenimiento-page',
  templateUrl: './mantenimiento-page.component.html',
  styleUrls: ['./mantenimiento-page.component.css']
})
export class MantenimientoPageComponent implements OnInit {
  constructor(
    private mantenimientoService: MantenimientoService,
    private portService: ConectionService,
    private fb: FormBuilder
  ) {
    this.maintenanceForm = this.fb.group({
      deviceType: ['', Validators.required],
      device_id: ['', Validators.required],
      deviceName: [''], // Campo oculto para el nombre del dispositivo
      performedBy: ['', Validators.required],
      description: ['', Validators.required],
      materialsUsed: ['', Validators.required],
      maintenanceDate: ['', Validators.required]
    });
  }

  maintenanceForm: FormGroup;
  device_type: string[] = ['ROUTER', 'SWITCH', 'PATCH_PANEL', 'END_DEVICE'];
  devices: any[] = [];
  registros: Maintenance[] = [];
  public visible: boolean = false;

  ngOnInit(): void {
    this.Types();
    this.loadMaintenance();
    this.setDefaultDateTime(); // Establecer fecha y hora predeterminadas
  }

  //muestra el dialogo para crear equipos
  showDialog(): void {
    this.visible = true;
  }

  //Trae los tipos que existen
  Types(): void {
    this.maintenanceForm.get('deviceType')?.valueChanges.subscribe(device_type => {
      if (device_type === 'ROUTER') {
        this.portService.getNamesRouters().subscribe(devices => this.devices = devices);
      } else if (device_type === 'SWITCH') {
        this.portService.getNamesSwitches().subscribe(devices => this.devices = devices);
      } else if (device_type === 'END_DEVICE') {
        this.portService.getNamesEndDevices().subscribe(devices => this.devices = devices);
      } else {
        this.portService.getNamesPatchPanels().subscribe(devices => this.devices = devices);
      }
      this.maintenanceForm.get('device_id')?.setValue('');
      this.maintenanceForm.get('deviceName')?.setValue(''); // Resetear el nombre del dispositivo
    });
  }

  //Coloca el tiempo
  setDefaultDateTime(): void {
    const currentDate = new Date();
    const defaultDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      12,
      0,
      0
    );
    this.maintenanceForm.get('maintenanceDate')?.setValue(defaultDate.toISOString().substring(0, 16));
  }

  //Carga los mantenimietos registrados
  loadMaintenance(): void {
    this.mantenimientoService.getMaintenance().subscribe((data: Maintenance[]) => {
      this.registros = data;
      console.log(data);
    });
  }

  //Obtiene el dispositivo
  onDeviceChange(event: any): void {
    const selectedDeviceId = event.target.value;
    const selectedDevice = this.devices.find(device => device.id == selectedDeviceId);
    if (selectedDevice) {
      this.maintenanceForm.get('deviceName')?.setValue(selectedDevice.name);
    }
  }

  //Crea el mantenimiento
  onSubmit(): void {
    const maintenanceData = {
      deviceType: this.maintenanceForm.get('deviceType')?.value,
      device_id: this.maintenanceForm.get('device_id')?.value,
      deviceName: this.maintenanceForm.get('deviceName')?.value,
      maintenanceDate: new Date(this.maintenanceForm.get('maintenanceDate')?.value).toISOString(),
      performedBy: this.maintenanceForm.get('performedBy')?.value,
      description: this.maintenanceForm.get('description')?.value,
      materialsUsed: this.maintenanceForm.get('materialsUsed')?.value,
    };

    this.mantenimientoService.createMaintenance(maintenanceData).subscribe(response => {
      console.log(maintenanceData);
      timer(100).subscribe(() => this.visible = false);
      if (response) {
        Swal.fire({
          title: 'Mantenimiento registrado',
          icon: 'success',
        });
        this.maintenanceForm.reset();
        this.setDefaultDateTime(); // Restablecer fecha y hora predeterminadas
        this.loadMaintenance();
      } else {
        Swal.fire({
          title: "Error al registrar el mantenimiento",
          text: 'Verifica que los campos estén completados',
          icon: 'error',
        });
      }
    });
  }

  //Elimina un registro de mantenimiento
  deleteMaintenance(connection): void {
    console.log(connection)
    if (!connection.id) {
      Swal.fire('Error', 'El ID del registro es indefinido.', 'error');
      return;
    }
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Seguro que quieres eliminar este registro?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.mantenimientoService.deleteMaintenance(connection.id).subscribe(
          () => {
            Swal.fire('Eliminado!', 'El registro ha sido eliminada.', 'success');
            this.loadMaintenance()
          },
          (error) => {
            Swal.fire('Error', 'Hubo un problema al eliminar el registro.', 'error');
          }
        );
      }
    });
  }
}
