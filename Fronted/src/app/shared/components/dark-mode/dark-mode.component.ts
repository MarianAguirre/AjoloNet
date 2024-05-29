import { Component, signal } from '@angular/core';

@Component({
  selector: 'shared-dark-mode',
  templateUrl: './dark-mode.component.html',
  styleUrl: './dark-mode.component.css'
})
export class DarkModeComponent {
  toggleDarkTheme(): void {
    document.body.classList.toggle('dark-theme');
  }


}
