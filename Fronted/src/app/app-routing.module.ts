import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { EjemploPageComponent } from './shared/pages/ejemplo-page/ejemplo-page.component';
import { EquiposComponent } from './shared/pages/equipos-page/equipos.component';

const routes: Routes = [
  {
    path: 'Home',
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
    path: '',
    component: HomePageComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
