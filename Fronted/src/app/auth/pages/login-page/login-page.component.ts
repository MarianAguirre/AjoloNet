import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  constructor(private authservices:AuthService,
    private router:Router
  ){}

  onLogin():void{
    this.authservices.login('si','12')
    .subscribe(user =>{
      this.router.navigate(['/red/home'])
    })


  }

}
