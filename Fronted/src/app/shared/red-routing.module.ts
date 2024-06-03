import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { AgregarEquipoComponent } from './pages/agregar-equipo/agregar-equipo.component';
import { EquiposComponent } from './pages/equipos-page/equipos.component';
import { EjemploPageComponent } from './pages/ejemplo-page/ejemplo-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

const routes : Routes =[
  {
    path:'',
    component:LayoutPageComponent,
    children: [
      {
        path: 'nuevo-equipo', component: AgregarEquipoComponent
      },
      {
        path: 'equipos', component: EquiposComponent
      },
      {
        path: 'ejemplos', component: EjemploPageComponent
      },
      {
        path: 'home', component: HomePageComponent
      },
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
})
export class RedRoutingModule { }
