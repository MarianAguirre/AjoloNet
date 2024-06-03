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
import { DarkModeComponent } from './components/dark-mode/dark-mode.component';
import { AgregarEquipoComponent } from './pages/agregar-equipo/agregar-equipo.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TreeTableModule } from 'primeng/treetable';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { RedRoutingModule } from './red-routing.module';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ButtonModule,
    TreeTableModule,
    RedRoutingModule


  ],
  exports: [
    SidebarComponent,
    HomePageComponent,
    EjemploPageComponent,
    NavbarComponent,
    LoginPageComponent,
    DarkModeComponent,
    Error404PageComponent
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
    AgregarEquipoComponent,
    LayoutPageComponent,
    Error404PageComponent,





  ],

})
export class SharedModule { }
