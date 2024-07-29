import { Component, OnInit } from '@angular/core';
import { DataUser } from '../../../interfaces/user.interfaces';
import { enavironments } from '../../../../environments/environments';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'shared-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  constructor(
    private userService: UserService) { }
  user: DataUser = {
    id: 0,
    username: '',
    firstname: '',
    lastname: '',
    password: '',
    role: ''
  }
  ngOnInit(): void {
    this.userService.getUserData().subscribe(
      (response: DataUser) => {
        console.log('Datos recibidos:', response); // Verifica la estructura de los datos
        this.user = response; // Asignar directamente a user
      }
    );
  }

  baseUrl: string = enavironments.baseUrl;
  userLoginOn: boolean = false;

}
