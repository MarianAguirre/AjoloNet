import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';

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
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import {TableModule} from 'primeng/table'
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { EquiposComponent } from './pages/equipos-page/equipos.component';
import { DialogModule } from 'primeng/dialog';
import { DetallesPageComponent } from './pages/detalles-page/detalles-page.component';


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
    MdbCollapseModule,
    TableModule,
    InputSwitchModule,
    InputTextModule,
    TagModule,
    IconFieldModule,
    InputIconModule,
    DialogModule


  ],
  exports: [
    HomePageComponent,
    ConectionPageComponent,
    NavbarComponent,

    DarkModeModule,
    Error404PageComponent,
    TableModule,

  ],
  declarations: [
    HomePageComponent,
    NavbarComponent,
    ConectionPageComponent,

    SearchBoxComponent,
    EquiposComponent,
    AgregarEquipoComponent,
    LayoutPageComponent,
    Error404PageComponent,
    AdminPageComponent,
    DetallesPageComponent,









  ],

})
export class SharedModule { }
