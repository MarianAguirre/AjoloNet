import { Component } from '@angular/core';
import { DatosUser, User } from '../../../interfaces/user.interfaces';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent{

  constructor(private router:Router, private userService:UserService){}

  user!: DatosUser;

  logout(){
    localStorage.removeItem("token")
    this.router.navigate(["/auth"])
  }

  ngOnInit(): void {
    this.userService.getUserDatos().subscribe(
      (response: DatosUser) => {
        this.user = response; // Asignar directamente a user
      },
      (error: any) => {
        console.error('Error al obtener los datos del usuario', error);
      }
    );
  }

}
