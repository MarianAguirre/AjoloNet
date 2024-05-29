import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'shared-agregar-equipo',
  templateUrl: './agregar-equipo.component.html',
  styleUrl: './agregar-equipo.component.css'
})
export class AgregarEquipoComponent {

  @Output()
  public newEquip: EventEmitter<string> = new EventEmitter

  // public equipo: Equipos ={
  //   name: ''
  // }

  emitEquip():void{

  }

}
