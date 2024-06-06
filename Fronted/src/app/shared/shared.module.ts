import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { EquiposComponent } from './pages/equipos-page/equipos.component';
import { TablaComponent } from './components/tabla/tabla.component';
import { AgregarEquipoComponent } from './pages/agregar-equipo/agregar-equipo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TreeTableModule } from 'primeng/treetable';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { RedRoutingModule } from './red-routing.module';
import { MaterialModule } from '../material/material.module';
import { DarkModeModule } from './components/dark-mode/dark-mode.module';
import { ConectionPageComponent } from './pages/conection-page/conection-page.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ButtonModule,
    TreeTableModule,
    RedRoutingModule,
    MaterialModule,
    DarkModeModule,
    ReactiveFormsModule,


  ],
  exports: [
    HomePageComponent,
    ConectionPageComponent,
    NavbarComponent,
    LoginPageComponent,
    DarkModeModule,
    Error404PageComponent
  ],
  declarations: [
    HomePageComponent,
    NavbarComponent,
    ConectionPageComponent,
    LoginPageComponent,
    SearchBoxComponent,
    EquiposComponent,
    TablaComponent,
    AgregarEquipoComponent,
    LayoutPageComponent,
    Error404PageComponent,








  ],

})
export class SharedModule { }
