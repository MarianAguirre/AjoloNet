import { Component, OnInit } from '@angular/core';
import { enavironments } from '../../../../environments/envarionments';
import { HttpClient } from '@angular/common/http';






@Component({
  selector: 'shared-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit{
  ngOnInit(): void {
  }

  baseUrl: string = enavironments.baseUrl;
  userLoginOn: boolean = false;







}
