import { NgModule } from '@angular/core';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EjemploPageComponent } from './pages/ejemplo-page/ejemplo-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { EquiposComponent } from './pages/equipos-page/equipos.component';
import { TablaComponent } from './components/tabla/tabla.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { DarkModeComponent } from './components/dark-mode/dark-mode.component';
import { AgregarEquipoComponent } from './pages/agregar-equipo/agregar-equipo.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SweetAlert2Module
  ],
  exports: [
    SidebarComponent,
    HomePageComponent,
    EjemploPageComponent,
    NavbarComponent,
    LoginPageComponent,
    DarkModeComponent
  ],
  declarations: [
    SidebarComponent,
    HomePageComponent,
    NavbarComponent,
    EjemploPageComponent,
    LoginPageComponent,
    SearchBoxComponent,
    EquiposComponent,
    TablaComponent,
    DarkModeComponent,
    AgregarEquipoComponent
  ]
})
export class SharedModule { }
