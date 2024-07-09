import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'shared-dark-mode',
  templateUrl: './dark-mode.component.html',
  styleUrl: './dark-mode.component.css'
})
export class DarkModeComponent implements OnInit {
  ngOnInit(): void {
    this.applyThemeFromLocalStorage();
  }

  toggleDarkTheme(): void {
    const checkbox = document.querySelector('input[type="checkbox"]') as HTMLInputElement;
    if (checkbox.checked) {
      document.body.classList.add('dark-theme');
      localStorage.setItem('dark-theme', 'enabled');
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('dark-theme', 'disabled');
    }
  }

  applyThemeFromLocalStorage(): void {
    const darkThemeEnabled = localStorage.getItem('dark-theme');
    const checkbox = document.querySelector('input[type="checkbox"]') as HTMLInputElement;
    if (darkThemeEnabled === 'enabled') {
      document.body.classList.add('dark-theme');
      if (checkbox) checkbox.checked = true;
    } else {
      document.body.classList.remove('dark-theme');
      if (checkbox) checkbox.checked = false;
    }
  }
}

