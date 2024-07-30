import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { DataUser } from '../../../interfaces/user.interfaces';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'shared-user-box',
  templateUrl: './user-box.component.html',
  styleUrl: './user-box.component.css'
})
export class SearchBoxComponent {

  constructor(private cookie: CookieService, private router: Router, private userService: UserService) { }

  user!: DataUser;

  logout() {
    sessionStorage.removeItem('token')
    this.router.navigate(["/auth"])
  }

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
