import { Component, Input, OnInit } from '@angular/core';
import { Dispositivo } from '../../../interfaces/Dispositivo';
import { EquiposServices } from '../../services/equipos.service';


@Component({
  selector: 'shared-equipos-pages',
  templateUrl: './equipos.component.html',
})
export class EquiposComponent implements OnInit {
  dispositivos: Dispositivo[] = [];


  constructor(private equiposServices: EquiposServices) {}

  ngOnInit(): void {
    this.equiposServices.getRouters().subscribe((data: any) => {
      this.dispositivos = data

    });
  }



  public isUpperCase: boolean = false

  toggleUpperCase():void{
    this.isUpperCase = !this.isUpperCase
  }


  public orederBy:keyof Dispositivo | undefined| ''= '';

  changeOrder(value: keyof Dispositivo){
    this.orederBy= value;
  }

}
