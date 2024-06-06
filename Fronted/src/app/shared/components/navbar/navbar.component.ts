import { Component } from '@angular/core';





@Component({
  selector: 'shared-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  search(term:string): void{
    console.log('Busco busco')
    console.log({term})
  }

  ngAfterViewInit(): void {
    const navbarToggler = document.getElementById('navbarSupportedContent');
    navbarToggler!.addEventListener('click', () => {
      console.log('Navbar toggler clicked!');
    });
  }

}
