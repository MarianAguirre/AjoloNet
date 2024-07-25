import { Component, OnInit } from '@angular/core';
import { ConectionService } from '../../services/conection.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DeviceDataService } from '../../services/device-data.service';

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

    this.Tipos1();
    this.get()
  }

  deviceType: string[] = ['ROUTER', 'SWITCH', 'PATCH_PANEL', 'END_DEVICE'];
  locatedForm: FormGroup;
  devices: any[];
  conexiones: any[];

  Tipos1() {
    this.locatedForm.get('deviceType')?.valueChanges.subscribe(deviceType => {
      if (deviceType === 'ROUTER') {
        this.conectionService.getNombresRouters().subscribe(devices => this.devices = devices);
      } else if (deviceType === 'SWITCH') {
        this.conectionService.getNombresSwitches().subscribe(devices => this.devices = devices);
      } else if (deviceType === 'END_DEVICE') {
        this.conectionService.getNombresEndDevices().subscribe(devices => this.devices = devices);
      } else {
        this.conectionService.getNombresPatchPanels().subscribe(devices => this.devices = devices);
      }
      this.locatedForm.get('deviceId')?.setValue('');
    });
  }

  loadConnections(deviceType: string, deviceId: string) {
    this.conectionService.getConectionsDevice(deviceType, deviceId).subscribe(id => {
      this.conexiones = id;
      console.log(this.conexiones);
      this.locatedForm.get('conections')?.setValue('');
    });
  }

  get(){
    this.locatedForm.get('deviceId')?.valueChanges.subscribe(deviceId => {
      const deviceType = this.locatedForm.get('deviceType')?.value;
      if (deviceId) {
        this.conectionService.getConectionsDevice(deviceType, deviceId).subscribe(id => {
          this.conexiones = id;
          console.log(this.conexiones)
          this.locatedForm.get('conections')?.setValue('');
        });
      }
    });
  }
}
