import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { enavironments } from '../../../../environments/envarionments';
import { User } from '../../../interfaces/user.interfaces';
import { AccessService } from '../../services/access.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'] // Corrected property name
})
export class RegisterPageComponent {

  public loginUrl = enavironments.loginUrl;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private accessSservice:AccessService, private router:Router) { }

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

  save(){
    if(this.registerForm.invalid) {
      Swal.fire({
      title: 'Faltan datos',
      icon: 'error',
      timer: 1000
    });
    return;}

    const object:User ={
      username: this.registerForm.value.username ??'',
      firstname: this.registerForm.value.firstname??'',
      lastname: this.registerForm.value.lastname?? '',
      password: this.registerForm.value.password??''
    }
    this.accessSservice.registrarse(object).subscribe({

      next:(data)=>{
        localStorage.setItem('token',data.token)
        Swal.fire({
          title: 'Usuario creado con exito',
          icon: 'success',
          timer: 1000
        })
        this.registerForm.reset();
      },
      error:(error)=>{
        console.log(error.message)
      }
    })
  }
  volver(){
    this.router.navigate(['/registrar'])
  }
}
