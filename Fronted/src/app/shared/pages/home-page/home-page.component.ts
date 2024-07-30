import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { DataUser } from '../../../interfaces/user.interfaces';


@Component({
  selector: 'shared-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  constructor(private userService: UserService) { }
  user!: DataUser;
  ngOnInit(): void {

    this.userService.getUserData().subscribe(
      (response: DataUser) => {
        this.user = response; // Asignar directamente a user
      },
      (error: any) => {
        console.error('Error al obtener los datos del usuario', error);
      }
    );
  }
}
