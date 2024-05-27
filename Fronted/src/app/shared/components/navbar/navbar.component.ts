import { Component } from '@angular/core';

@Component({
  selector: 'shared-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  search(term:string): void{
    console.log('desde bycapitalpage')
    console.log({term})
  }

}
