import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../auth/services/login.service';
import { User } from '../../../auth/interfaces/user.interfaces';

@Component({
  selector: 'profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent implements OnInit{
  userLoginOn: boolean = false;
  userData?: User

  constructor(private loginService:LoginService){}

  ngOnInit(): void {
  this.loginService.currentUserLoginOn.subscribe({
    next:(userLoginOn) =>{
      this.userLoginOn = userLoginOn
    }
  })

  this.loginService.currentUserData.subscribe({
    next:(userData) =>{
      this.userData = userData
    }
  })
}

}
