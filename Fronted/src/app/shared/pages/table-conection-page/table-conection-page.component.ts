import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { ConectionService } from '../../services/conection.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table-conection-page',
  templateUrl: './table-conection-page.component.html',
  styleUrl: './table-conection-page.component.css'
})
export class TableConectionPageComponent implements OnInit {

  dispositivos: string[];

  clonedProducts: { [s: string]: string } = {};

  constructor(private conectionService: ConectionService) {}

  ngOnInit() {
      this.loadConnections()
  }

  loadConnections(){
    this.conectionService.getConections().subscribe((data) => {
      this.dispositivos = data;
      console.log(data)
  });
  }

  deleteConnection(connection):void{
    console.log(connection)
    if (!connection.id){
      Swal.fire('Error', 'El ID del área es indefinido.', 'error');
      return;
    }
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Seguro que quieres eliminar la conexión?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.conectionService.deleteConnection(connection.id).subscribe(
          () => {
            Swal.fire('Eliminado!', 'La conexión ha sido eliminada.', 'success');
            this.loadConnections()
          },
          (error) => {
            Swal.fire('Error', 'Hubo un problema al eliminar la conexión.', 'error');
          }
        );
      }
    });
  }


}
