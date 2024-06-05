import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  loginForm = new FormGroup({
    userEmail: new FormControl('', Validators.required),
    password: new FormControl ('', Validators.required)
  })

  constructor(private authservices:AuthService){}

  signIn():void{
    const credentials:any = this.loginForm.value;
    this.authservices.logIn(credentials)
  }

  get userEmailControl(): FormControl{
    return this.loginForm.get('userEmail') as FormControl
  }
  get passwordControl(): FormControl{
    return this.loginForm.get('password') as FormControl
  }

}
