import { Component } from '@angular/core';
import { User } from '../../../interfaces/user.interfaces';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent{

  constructor(private router:Router, private http:HttpClient){}


  logout(){
    localStorage.removeItem("token")
    this.router.navigate(["/auth"])
  }


}
