import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConectionService } from '../../services/conection.service';
import { MantenimientoService } from '../../services/mantenimiento.service';
import Swal from 'sweetalert2';
import { timer } from 'rxjs';

@Component({
  selector: 'mantenimiento-page',
  templateUrl: './mantenimiento-page.component.html',
  styleUrls: ['./mantenimiento-page.component.css']
})
export class MantenimientoPageComponent implements OnInit {
  mantenimientoForm: FormGroup;
  device_type: string[] = ['ROUTER', 'SWITCH', 'PATCH_PANEL', 'END_DEVICE'];
  devices: any[] = [];
  registros: string[] = [];

  constructor(
    private mantenimientoService: MantenimientoService,
    private portService: ConectionService,
    private fb: FormBuilder
  ) {
    this.mantenimientoForm = this.fb.group({
      deviceType: ['', Validators.required],
      device_id: ['', Validators.required],
      deviceName: [''], // Campo oculto para el nombre del dispositivo
      performedBy: ['', Validators.required],
      description: ['', Validators.required],
      materialsUsed: ['', Validators.required],
      maintenanceDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.Types();
    this.loadMantenimiento();
    this.setDefaultDateTime(); // Establecer fecha y hora predeterminadas
  }

  public visible: boolean = false;

  showDialog(): void {
    this.visible = true;
  }

  Types(): void {
    this.mantenimientoForm.get('deviceType')?.valueChanges.subscribe(device_type => {
      if (device_type === 'ROUTER') {
        this.portService.getNombresRouters().subscribe(devices => this.devices = devices);
      } else if (device_type === 'SWITCH') {
        this.portService.getNombresSwitches().subscribe(devices => this.devices = devices);
      } else if (device_type === 'END_DEVICE') {
        this.portService.getNombresEndDevices().subscribe(devices => this.devices = devices);
      } else {
        this.portService.getNombresPatchPanels().subscribe(devices => this.devices = devices);
      }
      this.mantenimientoForm.get('device_id')?.setValue('');
      this.mantenimientoForm.get('deviceName')?.setValue(''); // Resetear el nombre del dispositivo
    });
  }

  setDefaultDateTime(): void {
    const currentDate = new Date();
    const defaultDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      12, // Hora predeterminada
      0, // Minuto predeterminado
      0 // Segundo predeterminado
    );
    this.mantenimientoForm.get('maintenanceDate')?.setValue(defaultDate.toISOString().substring(0, 16));
  }

  loadMantenimiento(): void {
    this.mantenimientoService.getMaintenance().subscribe((data) => {
      this.registros = data;
      console.log(data);
    });
  }

  onDeviceChange(event: any): void {
    const selectedDeviceId = event.target.value;
    const selectedDevice = this.devices.find(device => device.id == selectedDeviceId);
    if (selectedDevice) {
      this.mantenimientoForm.get('deviceName')?.setValue(selectedDevice.name);
    }
  }

  onSubmit(): void {
    const maintenanceData = {
      deviceType: this.mantenimientoForm.get('deviceType')?.value,
      device_id: this.mantenimientoForm.get('device_id')?.value,
      deviceName: this.mantenimientoForm.get('deviceName')?.value,
      maintenanceDate: new Date(this.mantenimientoForm.get('maintenanceDate')?.value).toISOString(),
      performedBy: this.mantenimientoForm.get('performedBy')?.value,
      description: this.mantenimientoForm.get('description')?.value,
      materialsUsed: this.mantenimientoForm.get('materialsUsed')?.value,
    };

    this.mantenimientoService.createMaintenance(maintenanceData).subscribe(response => {
      console.log(maintenanceData);
      timer(100).subscribe(() => this.visible = false);
      if (response) {
        Swal.fire({
          title: 'Mantenimiento registrado',
          icon: 'success',
        });
        this.mantenimientoForm.reset();
        this.setDefaultDateTime(); // Restablecer fecha y hora predeterminadas
        this.loadMantenimiento();
      } else {
        Swal.fire({
          title: "Error al registrar el mantenimiento",
          text: 'Verifica que los campos estén completados',
          icon: 'error',
        });
      }
    });
  }
}
