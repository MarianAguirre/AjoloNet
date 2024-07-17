import { Component, OnInit } from '@angular/core';
import { EndDevice } from '../../../interfaces/Dispositivo';
import { EquiposServices } from '../../services/equipos.service';

@Component({
  selector: 'mantenimiento-page',
  templateUrl: './mantenimiento-page.component.html',
  styleUrl: './mantenimiento-page.component.css'
})
export class MantenimientoPageComponent implements OnInit{
  products!: EndDevice[];

  constructor(private productService: EquiposServices) {}

  ngOnInit() {
      // this.productService.getDevices().subscribe(()=>
      // )
  }
}
