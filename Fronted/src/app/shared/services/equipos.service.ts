import { Injectable } from '@angular/core';
import { Dispositivo } from '../../interfaces/Dispositivo';
import { HttpClient } from '@angular/common/http';


@Injectable({providedIn: 'root'})
export class EquiposServices {
  constructor(private http:HttpClient) {
  }

  // private saveToLocalStorage(){

  // }
  // private loadFromLocalStorage(){

  // }



//   public equipos: Dispositivo[]=[{
//     id: uuid(),
//     name: ''
//   }]



// addEquip(equipo:Dispositivo):void{
//   const newEquip: Dispositivo = {id: uuid(),...equipo}
//   this.equipos.push(equipo)
// }

}


