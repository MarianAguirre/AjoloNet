import { Component, Input } from '@angular/core';
import { Dispositivo } from '../../../interfaces/Dispositivo';
import { EquiposServices } from '../../services/equipos.service';

@Component({
  selector: 'shared-equipos-pages',
  templateUrl: './equipos.component.html',
})
export class EquiposComponent {

  // constructor(private EquipoServices:EquiposServices){}
  // @Input()
  // public dispositivos: Dispositivo[]=[]

  // get equipos(): Dispositivo[]{
  //   return[...this.EquipoServices.equipos]
  // }


  // newEquip(equipo:Dispositivo):void{
  //   this.EquipoServices.addEquip(equipo)
  // }
}
