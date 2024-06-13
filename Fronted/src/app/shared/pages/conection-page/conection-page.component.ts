import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Dispositivo } from '../../../interfaces/Dispositivo';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import {v4 as uuid} from 'uuid'
import { HttpClient } from '@angular/common/http';
import { EquiposServices } from '../../services/equipos.service';
import { enavironments } from '../../../../environments/envarionments';

@Component({
  selector: 'shared-conection-page',
  templateUrl: './conection-page.component.html',
  styleUrl: './conection-page.component.css'
})
export class ConectionPageComponent implements OnInit{
  constructor(private router: Router, private equiposServices: EquiposServices, private http: HttpClient) { }
  baseUrl: string = enavironments.baseUrl;



  ngOnInit(): void {

  }

  @Output()
  public newEquip: EventEmitter<Dispositivo> = new EventEmitter



  public equipo:Dispositivo ={
    id: uuid().replace(/-/g,''),
    name: '',
    deviceType: '',
    numberOfPorts: 0,
    poe: false,
    manageable: false,
    area: ''
  }


  emitEquip():void{
    if (this.equipo.name?.length === 0 ||!this.opciones.includes(this.equipo.deviceType)) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Falta el nombre o el tipo",
        showConfirmButton: false,
        timer: 1000
      });
      return;
    }


    console.log(this.equipo);
    this.newEquip.emit(this.equipo)
    this.equipo = { id:uuid(), name:'', deviceType:'',numberOfPorts: 0, poe: false, manageable: false, area: ''}

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Equipo guardado",
      showConfirmButton: false,
      timer: 1000
    });
  }

  goBack() {
    this.router.navigate(['red/equipos']);
  }

  public opciones:string[] = [
    'Switch',
    'Router',
    'Dispositivo final',
    'Patch Panel'
  ]

  public nombres:string[] = [

  ]

  onTypeChange() {
    this.equiposServices.getDeviceNamesByType(this.equipo.deviceType).subscribe((names: string[]) => {
      this.nombres = names;
    });
  }


  }
