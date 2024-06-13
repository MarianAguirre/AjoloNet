import { Component } from '@angular/core';
import { enavironments } from '../../../../environments/envarionments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';





@Component({
  selector: 'shared-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {

  baseUrl: string = enavironments.baseUrl;

  constructor(private http: HttpClient){}


  search(term:string):void{
    if (term.length === 0) return;

    this.http.get(`${this.baseUrl}/Devices`)
    .subscribe (resp => {
      console.log(resp)
    })
    console.log('Busco busco')
    console.log({term})

  }


}
