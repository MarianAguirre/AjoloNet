import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

  async registrar():Promise<void>{
    const { value: accept } = await Swal.fire({
      title: "Terms and conditions",
      input: "checkbox",
      inputValue: 1,
      inputPlaceholder: `
        I agree with the terms and conditions
      `,
      confirmButtonText: `
        Continue&nbsp;<i class="fa fa-arrow-right"></i>
      `,
      inputValidator: (result) => {
        return !result && "You need to agree with T&C";
      }
    });
    if (accept) {
      Swal.fire("You agreed with T&C :)");
    }
  }


  registerForm = new FormGroup({
    user: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl ('', Validators.required)
  })

  // constructor(private authservices:AuthService){}

  // signIn():void{
  //   const credentials:any = this.registerForm.value;
  //   this.authservices.logIn(credentials)
  // }

  get userControl(): FormControl{
    return this.registerForm.get('user') as FormControl
  }
  get emailControl(): FormControl{
    return this.registerForm.get('email') as FormControl
  }
  get passwordControl(): FormControl{
    return this.registerForm.get('password') as FormControl
  }

}
