import { Component } from '@angular/core';
import { enavironments } from '../../../../environments/envarionments';
import { HttpClient } from '@angular/common/http';






@Component({
  selector: 'shared-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {

  baseUrl: string = enavironments.baseUrl;

  constructor(private http: HttpClient){}



}
