import { Component, OnInit } from '@angular/core';
import { DataUser } from '../../../interfaces/user.interfaces';
import { enavironments } from '../../../../environments/envarionments';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  errorMessage: string = "";
  user!: DataUser;
  baseUrl = enavironments.baseUrl;
  updateForm: FormGroup;

  constructor(private userService: UserService, private formBuilder: FormBuilder) {
    this.updateForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      password: [''],
      role: [{ value: '', disabled: true }]
    });
  }

  ngOnInit(): void {
    this.userService.getUserData().subscribe(
      (response: DataUser) => {
        console.log('Datos recibidos:', response); // Verifica la estructura de los datos
        this.user = response; // Asignar directamente a user
        this.updateForm.patchValue({
          username: this.user.username,
          firstname: this.user.firstname,
          lastname: this.user.lastname,
          role: this.user.role
        });
      },
      (error: any) => {
        console.error('Error al obtener los datos del usuario', error);
        this.errorMessage = 'Error al obtener los datos del usuario';
      }
    );
  }

  //Guarda los cambios del usuario
  save(): void {
    if (!this.user.id) {
      Swal.fire(
        'Error',
        'El ID del usuario es indefinido.',
        'error'
      );
      return;
    }

    Swal.fire({
      title: '¿Haz rellenado todos los campos?',
      text: `Al actualizar tu usuario debes asegurarte de rellenar todos los campos necesarios`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, actualiza'
    }).then((result) => {
      if (result.isConfirmed) {
        const formValue = this.updateForm.value;
        const updatedUser: DataUser = {
          ...this.user,
          ...formValue,
          password: formValue.password || null // Establecer la contraseña como null si no se ha cambiado
        };

        this.userService.updateUserData(this.user.id!, updatedUser).subscribe(
          () => {
            Swal.fire(
              'Actualizado!',
              'El usuario ha sido actualizado.',
              'success'
            );
            console.log('Usuario actualizado exitosamente.');
          },
          (error: any) => {
            console.error('Error al actualizar el usuario:', error);
            Swal.fire(
              'Error',
              'Hubo un problema al actualizar el usuario.',
              'error'
            );
          }
        );
      }
    });
  }
}
