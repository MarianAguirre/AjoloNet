import { AccessService } from '../../services/access.service';
import { Component } from '@angular/core';
import { enavironments } from '../../../../environments/environments';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../../../interfaces/user.interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

  public loginUrl = enavironments.loginUrl;

  constructor( private formBuilder: FormBuilder, private http: HttpClient, private accessSservice: AccessService, private router: Router) { }

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
      return;
    }

    const object: User = {
      username: this.registerForm.value.username ?? '',
      firstname: this.registerForm.value.firstname ?? '',
      lastname: this.registerForm.value.lastname ?? '',
      password: this.registerForm.value.password ?? ''
    }
    const { value: accept } = await Swal.fire({
      title: "Terminos y condiciones",
      input: "checkbox",
      inputValue: 1,
      inputPlaceholder: `
        Estoy de acuerdo con las condiciones
      `,
      confirmButtonText: `
        Continue&nbsp;<i class="fa fa-arrow-right"></i>
      `,
      inputValidator: (result) => {
        return !result && "Tiene que estar de acuerdo con T&C";
      }
    });
    if (accept) {
      Swal.fire("Aceptates los T&C :)");

      this.accessSservice.registrarse(object).subscribe({


        next: (data) => {
          sessionStorage.setItem("token", data.token)
          Swal.fire({
            title: 'Usuario creado con exito',
            icon: 'success',
            timer: 1000
          })
          this.registerForm.reset();
        },
        error: (error) => {
          console.log(error.message)
        }
      })
    }
  }
  volver() {
    this.router.navigate(['/registrar'])
  }
}
