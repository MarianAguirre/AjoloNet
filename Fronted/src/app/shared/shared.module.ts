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

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SidebarComponent,
    HomePageComponent,
    EjemploPageComponent,
    NavbarComponent,
    LoginPageComponent
  ],
  declarations: [
    SidebarComponent,
    HomePageComponent,
    NavbarComponent,
    EjemploPageComponent,
    LoginPageComponent,
    SearchBoxComponent,
    EquiposComponent
  ]
})
export class SharedModule { }
