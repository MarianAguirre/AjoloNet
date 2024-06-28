import { Component, OnInit } from '@angular/core';
import { User } from '../../../interfaces/user.interfaces';
import { Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent{

  errorMessage:String="";
  user?:User;
  userLoginOn:boolean=false;
  editMode:boolean=false;



}
