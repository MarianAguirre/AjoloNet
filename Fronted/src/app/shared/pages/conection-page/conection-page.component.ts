import { Component, OnInit } from '@angular/core';
import { ConectionService } from '../../services/conection.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'shared-conection-page',
  templateUrl: './conection-page.component.html',
  styleUrls: ['./conection-page.component.css']
})
export class ConectionPageComponent implements OnInit {
  deviceForm1: FormGroup;
  deviceForm2: FormGroup;
  deviceTypes: string[] = ['ROUTER', 'SWITCH', 'PATCH_PANEL'];
  devices1: any[] = [];
  devices2: any[] = [];
  ports1: any[] = [];
  ports2: any[] = [];

  constructor(private fb: FormBuilder, private portService: ConectionService) {
    this.deviceForm1 = this.fb.group({
      deviceType1: [''],
      deviceId1: [''],
      portNumber1: ['']
    });
    this.deviceForm2 = this.fb.group({
      deviceType2: [''],
      deviceId2: [''],
      portNumber2: ['']
    });
  }

  ngOnInit(): void {
    this.Tipos1();
    this.Tipos2();
    this.Equipos1();
    this.Equipos2();
  }

  Tipos1(){
    this.deviceForm1.get('deviceType1')?.valueChanges.subscribe(deviceType => {
      if (deviceType === 'ROUTER') {
        this.portService.getNombresRouters().subscribe(devices => this.devices1 = devices);
      } else if (deviceType === 'SWITCH') {
        this.portService.getNombresSwitches().subscribe(devices => this.devices1 = devices);
      } else {
        this.portService.getNombresPatchPanels().subscribe(devices => this.devices1 = devices);
      }
      this.deviceForm1.get('deviceId1')?.setValue('');
      this.ports1 = [];
    });
  }
  Equipos1(){
    this.deviceForm1.get('deviceId1')?.valueChanges.subscribe(deviceId => {
      const deviceType = this.deviceForm1.get('deviceType1')?.value;
      if (deviceType && deviceId) {
        this.portService.getPorts(deviceType, deviceId).subscribe(ports => {
          this.ports1 = ports;
          this.deviceForm1.get('portNumber1')?.setValue('');
        });
      }
    });
  }
  Tipos2(){
    this.deviceForm2.get('deviceType2')?.valueChanges.subscribe(deviceType => {
      if (deviceType === 'ROUTER') {
        this.portService.getNombresRouters().subscribe(devices => this.devices2 = devices);
      } else if (deviceType === 'SWITCH') {
        this.portService.getNombresSwitches().subscribe(devices => this.devices2 = devices);
      } else {
        this.portService.getNombresPatchPanels().subscribe(devices => this.devices2 = devices);
      }
      this.deviceForm2.get('deviceId2')?.setValue('');
      this.ports2 = [];
    });
  }
  Equipos2(){
    this.deviceForm2.get('deviceId2')?.valueChanges.subscribe(deviceId => {
      const deviceType = this.deviceForm2.get('deviceType2')?.value;
      if (deviceType && deviceId) {
        this.portService.getPorts(deviceType, deviceId).subscribe(ports => {
          this.ports2 = ports;
          this.deviceForm2.get('portNumber2')?.setValue('');
        });
      }
    });
  }


  onSubmit() {
    const connectionData = {
      sourceType: this.deviceForm1.get('deviceType1')?.value,
      sourceId: this.deviceForm1.get('deviceId1')?.value,
      sourcePort: this.deviceForm1.get('portNumber1')?.value,
      destinationType: this.deviceForm2.get('deviceType2')?.value,
      destinationId: this.deviceForm2.get('deviceId2')?.value,
      destinationPort: this.deviceForm2.get('portNumber2')?.value,
    };

    this.portService.createConnection(connectionData).subscribe(response => {
      console.log(connectionData)
      if (response) {
        Swal.fire({
          title: "Conexión lograda con exito",
          icon: 'success'
        })
        this.deviceForm1.reset()
        this.deviceForm2.reset()
        console.log('Connection created successfully', response);
      } else {
        Swal.fire({
          title: "Error al crear la conexió",
          text: 'Verifica que el puerto este disponible',
          icon: 'error'
        })
        console.error('Failed to create connection');
      }
    });
  }
}
