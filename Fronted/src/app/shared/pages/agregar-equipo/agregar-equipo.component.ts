import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Dispositivo } from '../../../interfaces/Dispositivo';
import Swal from 'sweetalert2'
import { HttpClient } from '@angular/common/http';
import { enavironments } from '../../../../environments/envarionments';
import { EquiposServices } from '../../services/equipos.service';


@Component({
  selector: 'shared-agregar-equipo',
  templateUrl: './agregar-equipo.component.html',
  styleUrl: './agregar-equipo.component.css'
})
export class AgregarEquipoComponent implements OnInit{

  constructor(private router: Router, private http:HttpClient, private equiposServices:EquiposServices) { }

  @Output()
  public newEquip: EventEmitter<Dispositivo> = new EventEmitter

  baseUrl = enavironments.baseUrl


  public equipo:Dispositivo ={
    name: '',
    deviceType: '',
    numberOfPorts: 0,
    poe: false,
    manageable: false,
    areaName: ''
  }


  emitEquip():void{
    if (!this.opciones.includes(this.equipo.deviceType) ) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Faltan datos",
        showConfirmButton: false,
        timer: 1000
      });
      return;
    }


    console.log(this.equipo);
    this.newEquip.emit(this.equipo)
    this.equipo = {name:'', deviceType:'',numberOfPorts: 0, poe: false, manageable: false, areaName: ''}

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


  newRouter():void{
    if (this.equipo.name.length === 0 ||!this.opciones.includes(this.equipo.deviceType)) return;
    this.http.post<Dispositivo>(`${this.baseUrl}/router`, this.equipo).subscribe(
      (data) =>{
      }
    )
  }
  newSwitch():void{
    if (this.equipo.name.length === 0 ||!this.opciones.includes(this.equipo.deviceType)) return;
    this.http.post<Dispositivo>(`${this.baseUrl}/switch`, this.equipo).subscribe(
      (data) =>{
      }
    )
  }
  newDispositivo():void{
    if (this.equipo.name.length === 0 ) return;
    this.http.post<Dispositivo>(`${this.baseUrl}/endDevice`, this.equipo).subscribe(
      (data) =>{
      }
    )
  }
  newPatch():void{
    if (!this.opciones.includes(this.equipo.deviceType)) return;
    this.http.post<Dispositivo>(`${this.baseUrl}/patchPanel`, this.equipo).subscribe(
      (data) =>{
      }
    )
  }

  public areas: string[] = [];

  ngOnInit(): void {
    this.equiposServices.getArea().subscribe((areas: string[]) => {
      this.areas = areas;
    });
  }

  }


