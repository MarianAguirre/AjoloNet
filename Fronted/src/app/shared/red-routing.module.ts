import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { AgregarEquipoComponent } from './pages/agregar-equipo/agregar-equipo.component';
import { EquiposComponent } from './pages/equipos-page/equipos.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ConectionPageComponent } from './pages/conection-page/conection-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';

const routes : Routes =[
  {
    path:'',
    component:LayoutPageComponent,
    children: [
      {
        path: 'admin', component: AdminPageComponent
      },
      {
        path: 'equipos/nuevo-equipo', component: AgregarEquipoComponent
      },
      {
        path: 'equipos', component: EquiposComponent
      },
      {
        path: 'conexiones', component: ConectionPageComponent
      },
      {
        path: 'home', component: HomePageComponent
      },
      {
        path: '**', redirectTo: 'home'
      }

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
