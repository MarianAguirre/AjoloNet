import { Component, OnInit } from '@angular/core';
import { enavironments } from '../../../../environments/envarionments';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../../../auth/services/login.service';






@Component({
  selector: 'shared-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit{

  baseUrl: string = enavironments.baseUrl;
  userLoginOn: boolean = false;

  constructor(private http: HttpClient, private loginService:LoginService){}
  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe(
      {
        next:(userLoginOn)=>{
          this.userLoginOn= userLoginOn
        }
      }
    )
  }





}
