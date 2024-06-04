import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Dispositivo } from '../../../interfaces/Dispositivo';
import {v4 as uuid} from 'uuid'
import Swal from 'sweetalert2'




@Component({
  selector: 'shared-agregar-equipo',
  templateUrl: './agregar-equipo.component.html',
  styleUrl: './agregar-equipo.component.css'
})
export class AgregarEquipoComponent {

  constructor(private router: Router) { }

  @Output()
  public newEquip: EventEmitter<Dispositivo> = new EventEmitter

  public equipo:Dispositivo ={
    id: uuid(),
    name: '',
    type: '',
    port: 0
  }




  emitEquip():void{
    if(this.equipo.name.length === 0 ) return
      Swal.fire({
      position: "center",
      icon: "error",
      title: "Falta el nombre o el tipo del equipo",
      showConfirmButton: false,
      timer: 1000
    });
    if(!this.opciones.includes(this.equipo.type))
    return

    console.log(this.equipo);
    this.newEquip.emit(this.equipo)
    this.equipo = { id:uuid(), name:'', type:'',port: 0}

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




  }


