import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { EquiposComponent } from './shared/pages/equipos-page/equipos.component';
import { AgregarEquipoComponent } from './shared/pages/agregar-equipo/agregar-equipo.component';

import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { guardGuard } from './auth/guard/guard.guard';


const routes: Routes = [

  {
    path:'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),

  },
  {
    path:'red',
    loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule),
    canActivate:[guardGuard]
  },
  {
    path: '404',
    component: Error404PageComponent
  },
  {
    path:'',
    redirectTo: 'red',
    pathMatch: 'full'
  },
  {
    path:'**',
    redirectTo: '404'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
