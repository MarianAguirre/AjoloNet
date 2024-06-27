import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'shared-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {


  // errorMessage:String="";
  // user?:User;
  // userLoginOn:boolean=false;
  // editMode:boolean=false;

  // registerForm=this.formBuilder.group({
  //   id:[''],
  //   lastname:['',Validators.required],
  //   firstname:['', Validators.required],
  // })

  // constructor(private userService:UserService, private formBuilder:FormBuilder, private loginService:LoginService  ){
  //   this.userService.getUser(this.user?.id!).subscribe({
  //     next: (userData) => {
  //       this.user=userData;
  //       this.registerForm.controls.id.setValue(userData.id!.toString());
  //       this.registerForm.controls.firstname.setValue( userData.firstname);
  //       this.registerForm.controls.lastname.setValue( userData.lastname);
  //     },
  //     error: (errorData) => {
  //       this.errorMessage=errorData
  //     },
  //     complete: () => {
  //       console.info("User Data ok");
  //     }
  //   })

  //   this.loginService.userLoginOn.subscribe({
  //     next:(userLoginOn) => {
  //       this.userLoginOn=userLoginOn;
  //     }
  //   })

  // }

  // get firstname()
  // {
  //   return this.registerForm.controls.firstname;
  // }

  // get lastname()
  // {
  //   return this.registerForm.controls.lastname;
  // }


  // savePersonalDetailsData()
  // {
  //   if (this.registerForm.valid)
  //   {
  //     this.userService.updateUser(this.registerForm.value as unknown as User).subscribe({
  //       next:() => {
  //         this.editMode=false;
  //         this.user=this.registerForm.value as unknown as User;
  //       },
  //       error:(errorData)=> console.error(errorData)
  //     })
  //   }
  // }


}
