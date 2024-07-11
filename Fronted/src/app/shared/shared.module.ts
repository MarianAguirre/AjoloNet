
import { NgModule } from '@angular/core';

import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { AgregarEquipoComponent } from './pages/agregar-equipo/agregar-equipo.component';
import { AreasPageComponent } from './pages/areas-page/areas-page.component';
import { CommonModule } from '@angular/common';
import { ConectionPageComponent } from './pages/conection-page/conection-page.component';
import { DarkModeModule } from './components/dark-mode/dark-mode.module';
import { EquiposComponent } from './pages/equipos-page/equipos.component';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { MaterialModule } from '../modulos/material/material.module';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PrimeNGModule } from './../modulos/primeNG/primeng.module';
import { RedRoutingModule } from './red-routing.module';
import { RouterModule } from '@angular/router';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { RacksPageComponent } from './pages/racks-page/racks-page.component';
import { CamelCaseToTitleCasePipe } from '../pipe/capitalize.pipe';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { DynamicVlansComponent } from './components/dynamic-vlans/dynamic-vlans.component';
import { SelectRackComponent } from './components/select-rack/select-rack.component';
import { PdfComponent } from './components/pdf/pdf.component';



@NgModule({
  imports: [
    CommonModule,
    DarkModeModule,
    FormsModule,
    MaterialModule,
    MdbCollapseModule,
    PrimeNGModule,
    ReactiveFormsModule,
    RedRoutingModule,
    RouterModule,




  ],
  exports: [
    ConectionPageComponent,
    DarkModeModule,
    Error404PageComponent,
    HomePageComponent,
    NavbarComponent,
    PrimeNGModule


  ],
  declarations: [
    AdminPageComponent,
    AgregarEquipoComponent,
    AreasPageComponent,
    ConectionPageComponent,
    EquiposComponent,
    Error404PageComponent,
    HomePageComponent,
    LayoutPageComponent,
    NavbarComponent,
    SearchBoxComponent,
    RacksPageComponent,
    CamelCaseToTitleCasePipe,
    ProfilePageComponent,
    DynamicVlansComponent,
    SelectRackComponent,
    PdfComponent,



  ],

})
export class SharedModule { }
