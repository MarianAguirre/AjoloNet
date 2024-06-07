import { Injectable } from '@angular/core';
import { Dispositivo } from '../../interfaces/Dispositivo';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({providedIn: 'root'})
export class EquiposServices {
  constructor(private http:HttpClient) {
  }



  getRouters():Observable<Dispositivo[]>{
    return this.http.get<Dispositivo[]>('http://localhost:4000')
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


