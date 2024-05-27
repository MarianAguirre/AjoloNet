import { NgModule } from '@angular/core';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EjemploPageComponent } from './pages/ejemplo-page/ejemplo-page.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SidebarComponent,
    HomePageComponent,
    EjemploPageComponent
  ],
  declarations: [
    SidebarComponent,
    HomePageComponent,
    NavbarComponent,
    EjemploPageComponent
  ]
})
export class SharedModule { }
