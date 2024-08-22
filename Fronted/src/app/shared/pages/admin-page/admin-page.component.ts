import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DataUser, User, Users } from '../../../interfaces/user.interfaces';
import { timer } from 'rxjs';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { enavironments } from '../../../../environments/environments';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AccessService } from '../../../auth/services/access.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  Users: Users[] = [];
  Admins: Users[] = [];
  public userDialog: boolean = false;
  public newUser: boolean = false;
  user: DataUser = {
    id: 0,
    username: '',
    firstname: '',
    lastname: '',
    password: '',
    role: ''
  }

  Usuarios: Users = {
    id: 0,
    username: '',
    firstname: '',
    lastname: '',
    role: '',
    password: ''
  }

  passwordPlaceholder: string = '';

  constructor(private userService: UserService, private cdr: ChangeDetectorRef, private formBuilder: FormBuilder, private http: HttpClient, private accessSservice: AccessService, private router: Router) { }

  ngOnInit() {
    this.loadUsers()
    this.userService.getUserData().subscribe(
      (response: DataUser) => {
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
  deleteUsuario(usuario: Users): void {
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
        this.userService.deleteUsers(usuario.id!).subscribe(
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
        const updatedUser: Users = {
          ...this.Usuarios,
          password: this.Usuarios.password === this.passwordPlaceholder ? null : this.Usuarios.password
        };

        this.userService.updateUsers(this.Usuarios.id!, updatedUser).subscribe(
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

  editUser(user: Users): void {
    this.Usuarios = { ...user };
    this.passwordPlaceholder = this.Usuarios.password || ''; // Guarda la contraseña actual para comparar
    this.Usuarios.password = ''; // Limpia el campo de la contraseña en el formulario
    this.userDialog = true;
  }


  public loginUrl = enavironments.loginUrl;

  nuevoUsuario(){
    this.newUser = true;
  }


  registerForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    firstname: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    password: ['', Validators.required]
  });

  get username() {
    return this.registerForm.controls.username;
  }
  get firstname() {
    return this.registerForm.controls.firstname;
  }
  get lastname() {
    return this.registerForm.controls.lastname;
  }
  get password() {
    return this.registerForm.controls.password;
  }

  async save() {
    if (this.registerForm.invalid) {
      Swal.fire({
        title: 'Faltan datos',
        icon: 'error',
        timer: 1000
      });
      timer(100).subscribe(() => this.newUser = false);
      return;
    }

    const object: User = {
      username: this.registerForm.value.username ?? '',
      firstname: this.registerForm.value.firstname ?? '',
      lastname: this.registerForm.value.lastname ?? '',
      password: this.registerForm.value.password ?? ''
    }
    timer(100).subscribe(() => this.newUser = false);

    const { value: accept } = await Swal.fire({
      title: "¿Crear nuevo usuario?",
      inputValue: 1,
      text: 'Presione cualquier lugar fuera del dialogo para cancelar la operacion',
      confirmButtonText: `
        Si&nbsp;<i class="fa fa-arrow-right"></i>
      `,
    });

    if (accept) {

      this.accessSservice.registrarse(object).subscribe({


        next: (data) => {
          // sessionStorage.setItem("token", data.token)
          Swal.fire({
            title: 'Usuario creado con exito',
            icon: 'success',
            timer: 1000
          })
          this.registerForm.reset();
          this.loadUsers();

        },
        error: (error) => {
          console.log(error.message)
        }
      })
    }
  }
}
