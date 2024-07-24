import { Component, OnInit } from '@angular/core';
import { ConectionService } from '../../services/conection.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-located-conection-page',
  templateUrl: './located-conection-page.component.html',
  styleUrl: './located-conection-page.component.css'
})
export class LocatedConectionPageComponent implements OnInit{
  constructor(private fb:FormBuilder,private conectionService:ConectionService){
    this.locatedForm = this.fb.group({
      deviceType: [''],
      deviceId: [''],
      conections: ['']
    });
  }
  ngOnInit(): void {
    this.Tipos1()
  }
  deviceType: string[] = ['ROUTER', 'SWITCH', 'PATCH_PANEL', 'END_DEVICE']
  locatedForm:FormGroup
  devices:any[]
  conexiones:any[]



  Tipos1(){
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


  get(){
    this.locatedForm.get('deviceId')?.valueChanges.subscribe(deviceId => {
      const deviceType = this.locatedForm.get('deviceType')?.value;
      if (deviceId) {
        this.conectionService.getConectionsDevice(deviceId).subscribe(id => {
          this.conexiones = id;
          this.locatedForm.get('conections')?.setValue('');
        });
      }
    });
  }

}
