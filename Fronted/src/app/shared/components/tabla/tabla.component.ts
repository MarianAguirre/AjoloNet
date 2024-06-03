import { Component } from '@angular/core';
import { Dispositivo } from '../../../interfaces/Dispositivo';

@Component({
  selector: 'shared-tabla',
  templateUrl: './tabla.component.html',
})
export class TablaComponent {

  public orederBy:keyof Dispositivo | undefined| ''= '';



  changeOrder(value: keyof Dispositivo){
    this.orederBy= value;
  }
}
