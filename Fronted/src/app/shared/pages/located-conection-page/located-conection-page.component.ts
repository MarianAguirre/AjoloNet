import { Component, OnInit } from '@angular/core';
import { ConectionService } from '../../services/conection.service';
import { DeviceDataService } from '../../services/device-data.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-located-conection-page',
  templateUrl: './located-conection-page.component.html',
  styleUrls: ['./located-conection-page.component.css']
})
export class LocatedConectionPageComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private conectionService: ConectionService,
    private deviceDataService: DeviceDataService
  ) {
    this.locatedForm = this.fb.group({
      deviceType: [''],
      deviceId: [''],
      conections: ['']
    });
  }

  deviceType: string[] = ['ROUTER', 'SWITCH', 'PATCH_PANEL', 'END_DEVICE'];
  locatedForm: FormGroup;
  devices: any[];
  conexiones: any[];

  ngOnInit(): void {
    const deviceType = this.deviceDataService.getDeviceType();
    const deviceId = this.deviceDataService.getDeviceId();

    if (deviceType && deviceId) {
      this.locatedForm.patchValue({
        deviceType: deviceType,
        deviceId: deviceId
      });
      this.loadConnections(deviceType, deviceId);
    }

    this.Types();
    this.get()
  }

  //Obtiene los tipos
  Types() {
    this.locatedForm.get('deviceType')?.valueChanges.subscribe(deviceType => {
      if (deviceType === 'ROUTER') {
        this.conectionService.getNamesRouters().subscribe(devices => this.devices = devices);
      } else if (deviceType === 'SWITCH') {
        this.conectionService.getNamesSwitches().subscribe(devices => this.devices = devices);
      } else if (deviceType === 'END_DEVICE') {
        this.conectionService.getNamesEndDevices().subscribe(devices => this.devices = devices);
      } else {
        this.conectionService.getNamesPatchPanels().subscribe(devices => this.devices = devices);
      }
      this.locatedForm.get('deviceId')?.setValue('');
    });
  }

  //Carga las conexiones
  loadConnections(deviceType: string, deviceId: string) {
    this.conectionService.getConnectionsDevice(deviceType, deviceId).subscribe(id => {
      this.conexiones = id;
      console.log(this.conexiones);
      this.locatedForm.get('conections')?.setValue('');
    });
  }

  //Carga las conexiones
  get() {
    this.locatedForm.get('deviceId')?.valueChanges.subscribe(deviceId => {
      const deviceType = this.locatedForm.get('deviceType')?.value;
      if (deviceId) {
        this.conectionService.getConnectionsDevice(deviceType, deviceId).subscribe(id => {
          this.conexiones = id;
          console.log(this.conexiones)
          this.locatedForm.get('conections')?.setValue('');
        });
      }
    });
  }
}
