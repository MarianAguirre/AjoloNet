import { Component, Input } from '@angular/core';
import { Dispositivo } from '../../../interfaces/Dispositivo';

@Component({
  selector: 'shared-equipos-pages',
  templateUrl: './equipos.component.html',
})
export class EquiposComponent {

  @Input()
  public dispositivos: Dispositivo[]=[]

}
