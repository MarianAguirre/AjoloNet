import { AccessService } from '../../services/access.service';
import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, Validators } from '@angular/forms';
import { Login } from '../../../interfaces/login.interfaces';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  constructor(private cookie: CookieService, private formBuilder: FormBuilder, private router: Router, private accessServices: AccessService) { }

  public loginForm = this.formBuilder.group({
    username: ["", [Validators.required]],
    password: ['', Validators.required],
  })

  public loginError: string = ''


  get nombreUsuario() {
    return this.loginForm.controls.username
  }
  get clave() {
    return this.loginForm.controls.password
  }

  login() {
    if (this.loginForm.invalid) {
      Swal.fire({
        title: 'Rellene los campos faltantes',
        icon: 'error',
        timer: 1000
      })

      return;
    }

    const objecto: Login = {
      username: this.loginForm.value.username ?? '',
      password: this.loginForm.value.password ?? ''
    }

    this.accessServices.login(objecto).subscribe({
      next: (data) => {
        sessionStorage.setItem("token", data.token)
        this.router.navigate(['/red/home'])
      },
      error: (error) => {
        console.log(error.message)
        Swal.fire({
          title: 'El usuario no se pudo loguear',
          icon: 'error',
          text: 'El usuario o contraseña son incorrectos'
        })
      }
    })
  }

}

