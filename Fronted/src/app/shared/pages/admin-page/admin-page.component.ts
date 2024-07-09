import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DatosUser, Usuarios } from '../../../interfaces/user.interfaces';
import { timer } from 'rxjs';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  Users: Usuarios[] = [];
  Admins: Usuarios[] = [];
  public userDialog: boolean = false;
  user: DatosUser = {
    id: 0,
    username: '',
    firstname: '',
    lastname: '',
    password: '',
    role: ''
  }

  Usuarios: Usuarios = {
    id: 0,
    username: '',
    firstname: '',
    lastname: '',
    role: '',
    password: ''
  }

  passwordPlaceholder: string = '';

  constructor(private userService: UserService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.loadUsers()
    this.userService.getUserDatos().subscribe(
      (response: DatosUser) => {
        console.log('Datos recibidos:', response); // Verifica la estructura de los datos
        this.user = response; // Asignar directamente a user
      }
    );
  }

  // Carga a los usuarios de acuerdo a su rol
  loadUsers() {
    this.userService.getUsers().subscribe(users => {
      this.Users = users.filter(user => user.role === 'USER');
      this.Admins = users.filter(user => user.role === 'ADMIN');
      this.cdr.markForCheck();
    });
  }

  // Elimina un usuario
  deleteUsuario(usuario: Usuarios): void {
    if (!usuario.id) {
      Swal.fire(
        'Error',
        'El ID del usuario es indefinido.',
        'error'
      );
      return;
    }
    timer(100).subscribe(() => this.userDialog = false)
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Seguro que quieres eliminar el usuario ${usuario.username}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUsuario(usuario.id!).subscribe(
          () => {
            // this.usu = this.dispositivos.filter(d => d.id !== equipo.id);
            Swal.fire(
              'Eliminado!',
              'El usuario ha sido eliminado.',
              'success'
            );
            this.loadUsers()
          },
          (error: any) => {
            Swal.fire(
              'Error',
              'Hubo un problema al eliminar el usuario.',
              'error'
            );
          }
        );
      }
    });
  }

  // Guarda los cambios de un usuario
  saveUsuario(): void {
    if (!this.Usuarios.id) {
      Swal.fire(
        'Error',
        'El ID del usuario es indefinido.',
        'error'
      );
      return;
    }
    timer(100).subscribe(() => this.userDialog = false);

    Swal.fire({
      title: '¿Estas seguro de guardar los cambios realizados?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, actualiza'
    }).then((result) => {
      if (result.isConfirmed) {
        // Si la contraseña no ha sido cambiada, envía null
        const updatedUser: Usuarios = {
          ...this.Usuarios,
          password: this.Usuarios.password === this.passwordPlaceholder ? null : this.Usuarios.password
        };

        this.userService.updateUsuarios(this.Usuarios.id!, updatedUser).subscribe(
          () => {
            this.userDialog = false;
            Swal.fire(
              'Actualizado!',
              'El usuario ha sido actualizado.',
              'success'
            );
            this.loadUsers();
          },
          (error: any) => {
            Swal.fire(
              'Error',
              'Hubo un problema al actualizar el usuario.',
              'error'
            );
          }
        );
      }
      else {
        timer(100).subscribe(() => this.userDialog = true);
      }
    });
  }

  editUser(user: Usuarios): void {
    this.Usuarios = { ...user };
    this.passwordPlaceholder = this.Usuarios.password || ''; // Guarda la contraseña actual para comparar
    this.Usuarios.password = ''; // Limpia el campo de la contraseña en el formulario
    this.userDialog = true;
  }
}
