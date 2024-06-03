import { Injectable } from '@angular/core';
import { Dispositivo } from '../../interfaces/Dispositivo';
import { HttpClient } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid';


@Injectable({providedIn: 'root'})
export class EquiposServices {
  constructor(private http:HttpClient) {
  }




//   public equipos: Dispositivo[]=[{
//     id: uuid(),
//     name: ''
//   }]



// addEquip(equipo:Dispositivo):void{
//   const newEquip: Dispositivo = {id: uuid(),...equipo}
//   this.equipos.push(equipo)
// }

}


