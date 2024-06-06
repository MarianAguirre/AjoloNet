import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Dispositivo } from '../../../interfaces/Dispositivo';
import {v4 as uuid} from 'uuid'
import Swal from 'sweetalert2'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'shared-agregar-equipo',
  templateUrl: './agregar-equipo.component.html',
  styleUrl: './agregar-equipo.component.css'
})
export class AgregarEquipoComponent implements OnInit{

  constructor(private router: Router, private fb:FormBuilder) { }


  ngOnInit(): void {

  }


  @Output()
  public newEquip: EventEmitter<Dispositivo> = new EventEmitter



  public equipo:Dispositivo ={
    id: uuid().replace(/-/g,''),
    name: '',
    type: '',
    port: 0,
    poe: false,
    manageable: false,
    area: ''
  }


  emitEquip():void{
    if (this.equipo.name.length === 0 ||!this.opciones.includes(this.equipo.type)) {
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
    this.equipo = { id:uuid(), name:'', type:'',port: 0, poe: false, manageable: false, area: ''}

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

  }


