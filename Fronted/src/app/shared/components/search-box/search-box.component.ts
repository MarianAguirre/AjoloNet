import { Component } from '@angular/core';
import { User } from '../../../interfaces/user.interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent{

  constructor(private router:Router){}


  logout(){
    localStorage.removeItem("token")
    this.router.navigate(["/auth"])
  }

}
