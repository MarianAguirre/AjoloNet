import { Component, OnInit } from '@angular/core';
import { DatosUser } from '../../../interfaces/user.interfaces';
import { enavironments } from '../../../../environments/envarionments';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'shared-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  constructor(
    private userService: UserService) { }
  user: DatosUser = {
    id: 0,
    username: '',
    firstname: '',
    lastname: '',
    password: '',
    role: ''
  }
  ngOnInit(): void {
    this.userService.getUserDatos().subscribe(
      (response: DatosUser) => {
        console.log('Datos recibidos:', response); // Verifica la estructura de los datos
        this.user = response; // Asignar directamente a user
      }
    );
  }

  baseUrl: string = enavironments.baseUrl;
  userLoginOn: boolean = false;

}
