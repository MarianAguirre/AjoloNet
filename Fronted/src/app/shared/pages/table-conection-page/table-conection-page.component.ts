import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { ConectionService } from '../../services/conection.service';

@Component({
  selector: 'app-table-conection-page',
  templateUrl: './table-conection-page.component.html',
  styleUrl: './table-conection-page.component.css'
})
export class TableConectionPageComponent implements OnInit {

  dispositivos: string[];

  statuses!: SelectItem[];

  clonedProducts: { [s: string]: string } = {};

  constructor(private conectionService: ConectionService) {}

  ngOnInit() {
      this.conectionService.getConections().subscribe((data) => {
          this.dispositivos = data;
          console.log(data)
      });

  }

  onRowEditInit(equipo) {
      this.clonedProducts[equipo.id as string] = { ...equipo };
  }

  onRowEditSave(equipo) {
      if (equipo.price > 0) {
          delete this.clonedProducts[equipo.id as string];
      } else {
      }
  }

  onRowEditCancel(equipo , index: number) {
      this.dispositivos[index] = this.clonedProducts[equipo.id as string];
      delete this.clonedProducts[equipo.id as string];
  }

}
