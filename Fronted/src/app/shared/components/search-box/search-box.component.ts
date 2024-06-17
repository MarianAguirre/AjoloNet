import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../auth/interfaces/user.interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent{

  constructor(private authService:AuthService,
    private router:Router
  ){}



  onLogout(){
    this.authService.logout(  )
    this.router.navigate(['/auth/login'])
  }

  get user():User|undefined{
    return this.authService.currentUser
  }


}
