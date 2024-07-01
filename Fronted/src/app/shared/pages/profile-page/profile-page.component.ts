import { Component, OnInit } from '@angular/core';
import { DatosUser } from '../../../interfaces/user.interfaces';
import { EquiposServices } from '../../services/equipos.service';
import { HttpClient } from '@angular/common/http';
import { enavironments } from '../../../../environments/envarionments';


@Component({
  selector: 'profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  errorMessage: string = "";
  user!: DatosUser;
  usuario!:DatosUser
  baseUrl  = enavironments.baseUrl

  constructor(private equipoService: EquiposServices, private http: HttpClient) {}

  ngOnInit(): void {
    this.equipoService.getUserDatos().subscribe(
      (response: DatosUser) => {
        console.log('Datos recibidos:', response); // Verifica la estructura de los datos
        this.user = response; // Asignar directamente a user
      },
    );
  }


  save(): void {
    // if (!this.user.id) {
    //   Swal.fire(
    //     'Error',
    //     'El ID del usuario es indefinido.',
    //     'error'
    //   );
    //   return;
    // }
    // Swal.fire({
    //   title: '¿Haz rellenado todos los campos?',
    //   text: `Al actualizar tu usuario debes asegurarte de rellenar todos los campos`,
    //   icon: 'warning',
    //   showCancelButton:true,
    //   confirmButtonColor: '#3085d6',
    //   cancelButtonColor: '#d33',
    //   confirmButtonText: 'Sí, actualiza'
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     this.equipoService.updateUserDatos(this.user.id!, this.user).subscribe(
    //       () => {
    //         this.user = this.user.map(d => d.id === this.user.id ? this.user : d);
    //         Swal.fire(
    //           'Actualizado!',
    //           'El usuario ha sido actualizado.',
    //           'success'
    //         );
    //       },
    //       (error: any) => {
    //         Swal.fire(
    //           'Error',
    //           'Hubo un problema al actualizar el usuario.',
    //           'error'
    //         );
    //       }
    //     );
    //   }
    // });
  }
}
