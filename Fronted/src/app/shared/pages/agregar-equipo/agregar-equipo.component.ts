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

  constructor(private router: Router, private http:HttpClient, private equiposServices:EquiposServices) {}

  public equipo:Dispositivo ={
    name: '',
    deviceType: '',
    numberOfPorts: 0,
    poe: false,
    manageable: false,
    areaName: '',
    rack: ''
  }
  public areas: string[] = [];
  public racks: string[] = [];
  public baseUrl = enavironments.baseUrl;
  public opciones:string[] = [
    'Switch',
    'Router',
    'Dispositivo final',
    'Patch Panel'
  ]

  @Output()
  public newEquip: EventEmitter<Dispositivo> = new EventEmitter

  // Envia los datos al backend
  emitEquip():void{
    if (!this.opciones.includes(this.equipo.deviceType) || this.equipo.numberOfPorts === 0 ) {
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
    this.equipo = {name:'', deviceType:'',numberOfPorts: 0, poe: false, manageable: false, areaName: '', rack:''}
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Equipo guardado",
      showConfirmButton: false,
      timer: 1000
    });
  }

  // Botones para ir a la tabla y a las areas
  goBack() {
    this.router.navigate(['red/equipos']);
  }
  goConection() {
    this.router.navigate(['red/areas']);
  }


  // Funciones para agregar nuevos equipos dependiendo del tipo
  newRouter():void{
    if (this.equipo.name.length === 0 ||!this.opciones.includes(this.equipo.deviceType) ||  this.equipo.numberOfPorts === 0) return;
    this.http.post<Dispositivo>(`${this.baseUrl}/router`, this.equipo).subscribe(
      (data) =>{
      }
    )
  }
  newSwitch():void{
    if (this.equipo.name.length === 0 ||!this.opciones.includes(this.equipo.deviceType) ||  this.equipo.numberOfPorts === 0) return;
    this.http.post<Dispositivo>(`${this.baseUrl}/switch`, this.equipo).subscribe(
      (data) =>{
      }
    )
  }
  newDispositivo():void{
    if (this.equipo.name.length === 0 || this.equipo.numberOfPorts === 0) return;
    this.http.post<Dispositivo>(`${this.baseUrl}/endDevice`, this.equipo).subscribe(
      (data) =>{
      }
    )
  }
  newPatch():void{
    if (this.equipo.numberOfPorts === 0) return;
    this.http.post<Dispositivo>(`${this.baseUrl}/patchPanel`, this.equipo).subscribe(
      (data) =>{
      }
    )
  }


  // Obtiene las areas y las relfeja en el select de areas
  ngOnInit(): void {
    this.equiposServices.getArea().subscribe((areas: string[]) => {
      this.areas = areas;
    });
    this.equiposServices.getRack().subscribe((racks: string[]) => {
      this.racks = racks;
    });
  }

  }


