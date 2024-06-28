import { Component, OnInit } from '@angular/core';
import { EquiposServices } from '../../services/equipos.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent implements OnInit{

  constructor(private equipoService:EquiposServices){}
  ngOnInit(): void {

    this.equipoService.getUsers().subscribe(response =>{

    })
  }


}
