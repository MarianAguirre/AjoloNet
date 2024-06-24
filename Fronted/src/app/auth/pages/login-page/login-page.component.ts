import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../../services/login.service';
import { Login } from '../../interfaces/login.interfaces';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit{
  constructor(private formBuilder:FormBuilder, private router:Router, private loginService:LoginService ){}

  loginForm = this.formBuilder.group({
    email: ['si@gmail.com', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  })

  public loginError:string = ''

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  get email(){
    return this.loginForm.controls.email
  }
  get password(){
    return this.loginForm.controls.password
  }

  login(){
    if(this.loginForm.valid){
      this.loginService.login(this.loginForm.value as Login).subscribe({
        next: (userData) =>{
          console.log(userData)
        },
        error: (errorData) =>{
          console.log(errorData)
          this.loginError = errorData
          Swal.fire({
            title: 'Error al iniciar sesion',
            text: `${this.loginError}`,
            icon: 'error'
          })
        },
        complete: () =>{
          console.info('Login completo')
          this.router.navigateByUrl('/red/home')
          this.loginForm.reset();
        }
      })

    }else{
      this.loginForm.markAllAsTouched();
      Swal.fire({
        title: 'Complete los datos correspondientes',
        icon: 'error'
      })
    }
  }

}

