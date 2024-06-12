import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Dispositivo } from '../../../interfaces/Dispositivo';
import Swal from 'sweetalert2'
import { HttpClient } from '@angular/common/http';
import { enavironments } from '../../../../environments/envarionments';


@Component({
  selector: 'shared-agregar-equipo',
  templateUrl: './agregar-equipo.component.html',
  styleUrl: './agregar-equipo.component.css'
})
export class AgregarEquipoComponent{

  constructor(private router: Router, private http:HttpClient) { }

  @Output()
  public newEquip: EventEmitter<Dispositivo> = new EventEmitter

  baseUrl = enavironments.baseUrl


  public equipo:Dispositivo ={
    name: '',
    type: '',
    numberOfPorts: 0,
    poe: false,
    manageable: false,
    area: ''
  }


  emitEquip():void{
    if (!this.opciones.includes(this.equipo.type)) {
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
    this.equipo = {name:'', type:'',numberOfPorts: 0, poe: false, manageable: false, area: ''}

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
  goConection() {
    this.router.navigate(['red/conexiones']);
  }


  public opciones:string[] = [
    'Switch',
    'Router',
    'Dispositivo final',
    'Patch Panel'
  ]

  public areas:string[]=[
    'Sistemas',
    'Baño',
    'Cocina'
  ]

  newRouter():void{
    if (this.equipo.name.length === 0 ||!this.opciones.includes(this.equipo.type)) return;
    this.http.post<Dispositivo>(`${this.baseUrl}/router`, this.equipo).subscribe(
      (data) =>{
      }
    )
  }
  newSwitch():void{
    if (this.equipo.name.length === 0 ||!this.opciones.includes(this.equipo.type)) return;
    this.http.post<Dispositivo>(`${this.baseUrl}/switch`, this.equipo).subscribe(
      (data) =>{
      }
    )
  }
  newDispositivo():void{
    if (this.equipo.name.length === 0 ||!this.opciones.includes(this.equipo.type) || this.areas.includes(this.equipo.area)) return;
    this.http.post<Dispositivo>(`${this.baseUrl}/endDevice`, this.equipo).subscribe(
      (data) =>{
      }
    )
  }
  newPatch():void{
    if (!this.opciones.includes(this.equipo.type)) return;
    this.http.post<Dispositivo>(`${this.baseUrl}/patchPanel`, this.equipo).subscribe(
      (data) =>{
      }
    )
  }





  }


