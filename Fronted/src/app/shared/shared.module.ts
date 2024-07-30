import { LOCALE_ID, NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import { RouterModule } from '@angular/router';
import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs, 'es')

//Paginas
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { AgregarEquipoComponent } from './pages/agregar-equipo/agregar-equipo.component';
import { AreasPageComponent } from './pages/areas-page/areas-page.component';
import { ConectionPageComponent } from './pages/conection-page/conection-page.component';
import { EquiposComponent } from './pages/equipos-page/equipos.component';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { LocatedConectionPageComponent } from './pages/located-conection-page/located-conection-page.component';
import { MantenimientoPageComponent } from './pages/mantenimiento-page/mantenimiento-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { RacksPageComponent } from './pages/racks-page/racks-page.component';
import { TableConectionPageComponent } from './pages/table-conection-page/table-conection-page.component';

//Componentes
import { DarkModeModule } from './components/dark-mode/dark-mode.module';
import { DynamicVlansComponent } from './components/dynamic-vlans/dynamic-vlans.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PdfEquipos } from './components/pdf-equipos/pdf-equipos.component';
import { PdfGeneral } from './components/pdf-general/pdf-general.component';
import { PdfMantenimiento } from './components/pdf-mantenimiento/pdf-mantenimiento.component';
import { SearchBoxComponent } from './components/user-box/user-box.component';
import { SelectRackComponent } from './components/select-rack/select-rack.component';

//Modulos
import { MaterialModule } from '../modulos/material/material.module';
import { PrimeNGModule } from './../modulos/primeNG/primeng.module';

import { CamelCaseToTitleCasePipe } from '../pipe/capitalize.pipe';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { RedRoutingModule } from './red-routing.module';
import { TranslatePipe } from '../pipe/translate.pipe';
import { TranslateService } from '@ngx-translate/core';



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
    CamelCaseToTitleCasePipe,
    ConectionPageComponent,
    DynamicVlansComponent,
    EquiposComponent,
    Error404PageComponent,
    HomePageComponent,
    LayoutPageComponent,
    LocatedConectionPageComponent,
    MantenimientoPageComponent,
    NavbarComponent,
    PdfEquipos,
    PdfGeneral,
    PdfMantenimiento,
    ProfilePageComponent,
    RacksPageComponent,
    SearchBoxComponent,
    SelectRackComponent,
    TableConectionPageComponent,
    TranslatePipe,

  ],
  providers: [TranslateService, { provide: LOCALE_ID, useValue: 'es' }]

})
export class SharedModule { }
