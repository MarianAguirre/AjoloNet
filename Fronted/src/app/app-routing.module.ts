import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { EjemploPageComponent } from './shared/pages/ejemplo-page/ejemplo-page.component';
import { EquiposComponent } from './shared/pages/equipos-page/equipos.component';
import { LoginPageComponent } from './shared/pages/login-page/login-page.component';
import { AgregarEquipoComponent } from './shared/pages/agregar-equipo/agregar-equipo.component';

const routes: Routes = [
  {
    path: 'Home',
    component: HomePageComponent
  },
  {
    path: 'Login/Home',
    component: HomePageComponent
  },
  {
    path: 'Ejemplo',
    component: EjemploPageComponent
  },
  {
    path: 'Equipos',
    component: EquiposComponent
  },
  {
    path: 'Equipos/Agregar',
    component: AgregarEquipoComponent
  },
  {
    path: 'Login',
    component: LoginPageComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
