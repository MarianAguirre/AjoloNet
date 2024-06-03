import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Dispositivo } from '../../../interfaces/Dispositivo';
import {v4 as uuid} from 'uuid'


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
    console.log(this.equipo);
    this.newEquip.emit(this.equipo)
    this.equipo = {name:'', id:uuid()}
  }

  goBack() {
    this.router.navigate(['/Equipos']);
  }



  public opciones:string[] = [
    'Switch',
    'Router',
    'Dispositivo final',
    'Patch Panel'
  ]




  }


