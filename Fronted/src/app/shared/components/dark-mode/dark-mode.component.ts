import { Component, signal } from '@angular/core';

@Component({
  selector: 'shared-dark-mode',
  templateUrl: './dark-mode.component.html',
  styleUrl: './dark-mode.component.css'
})
export class DarkModeComponent {

  toggleDarkTheme(): void {
    const checkbox = document.querySelector('input')
    if(checkbox?.checked){
      document.body.classList.add('dark-theme');
    }else{
      document.body.classList.remove('dark-theme');
    }

  }


}
