import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { enavironments } from '../../../../environments/envarionments';
import { User } from '../../interfaces/user.interfaces';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'] // Corrected property name
})
export class RegisterPageComponent {

  public loginUrl = enavironments.loginUrl;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

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

  @Output()
  public newUser: EventEmitter<User> = new EventEmitter<User>();

  async save(): Promise<void> {
    const { username, firstname, lastname, password } = this.registerForm.value;

    if (!username || !firstname || !lastname || !password) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Los datos son erróneos",
        showConfirmButton: false,
        timer: 1000
      });
      return;
    }

    const { value: accept } = await Swal.fire({
      title: "Términos y condiciones",
      input: "checkbox",
      inputValue: 1,
      inputPlaceholder: "Estoy de acuerdo con las condiciones",
      confirmButtonText: "Continue&nbsp;<i class='fa fa-arrow-right'></i>",
      inputValidator: (result) => {
        return !result && "Debes aceptar los términos y condiciones";
      }
    });

    if (accept) {
      Swal.fire("Has aceptado los términos y condiciones");
      this.nuevoUser = {  username, firstname, lastname, password };
      this.newUser.emit(this.nuevoUser);

      console.log(this.registerForm.value);
      console.log(this.nuevoUser);



      this.newUsuario();
    }
  }

  newUsuario(): void {
    this.http.post<User>(`${this.loginUrl}/register`, this.nuevoUser).subscribe(
      (data) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Usuario creado",
          showConfirmButton: false,
          timer: 1000
        });
      },
      (error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Usuario no creado",
          showConfirmButton: false,
          timer: 1000
        }); return
      }
    );
  }

  public nuevoUser: User = {

    username: '',
    firstname: '',
    lastname: '',
    password: '',

  };
}
