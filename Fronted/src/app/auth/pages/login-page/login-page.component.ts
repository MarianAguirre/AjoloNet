import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccessService } from '../../services/access.service';
import { Login } from '../../../interfaces/login.interfaces';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit{
  constructor(private formBuilder:FormBuilder, private router:Router, private accessServices:AccessService){}

  public loginForm = this.formBuilder.group({
    username: ["", [Validators.required]],
    password: ['', Validators.required],
  })

  public loginError:string = ''

  ngOnInit(): void {
  }

  get nombreUsuario(){
    return this.loginForm.controls.username
  }
  get clave(){
    return this.loginForm.controls.password
  }

  login(){
    if(this.loginForm.invalid){
      Swal.fire({
        title: 'Rellene los campos faltantes',
        icon: 'error',
        timer: 1000
      })

      return;}

    const objecto:Login={
      username: this.loginForm.value.username??'',
      password: this.loginForm.value.password??''
    }

    this.accessServices.login(objecto).subscribe({
      next:(data) =>{
        localStorage.setItem("token", data.token)
        this.router.navigate(['/red/home'])
      },
      error:(error)=>{
        console.log(error.message)
      }
    })
  }


}

