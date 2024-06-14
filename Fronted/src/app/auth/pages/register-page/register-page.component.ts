import { Component, EventEmitter, Output } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { User } from '../../interfaces/user.interfaces';
import { ValidatorsService } from '../../services/validators.service';
import { EmailValidator } from '../../validators/email-validators.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

  constructor (
    private fb:FormBuilder,
    private validatorsServices: ValidatorsService,
    private emailValidator: EmailValidator
  ){}

  @Output()
  public newUser: EventEmitter<User> = new EventEmitter


  async registrar():Promise<void>{
    if(!this.registerForm.value) return;
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
        return !result && "Debes aceptar los terminos y condiciones terminos y condiciones";
      }
    });
    if (accept) {
      Swal.fire("Haz aceptado los terminos y condiciones ");
    }


  }


  public registerForm:FormGroup = this.fb.group({
    user: ['', [Validators.required, Validators.pattern(this.validatorsServices.firstNameAndLastnamePattern)]],
    email: ['', [Validators.required, Validators.pattern(this.validatorsServices.emailPattern)], [this.emailValidator]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]],
  })

  isValidField(field:string){
    return this.validatorsServices.isvalidFild(this.registerForm, field)
  }

  onSubmit(){
    this.registerForm.markAllAsTouched();
  }


}
