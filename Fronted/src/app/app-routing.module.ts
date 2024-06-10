import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { EquiposComponent } from './shared/pages/equipos-page/equipos.component';
import { LoginPageComponent } from './shared/pages/login-page/login-page.component';
import { AgregarEquipoComponent } from './shared/pages/agregar-equipo/agregar-equipo.component';
import { AuthModule } from './auth/auth.module';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [

  {
    path:'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path:'red',
    loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule),
    // canActivate: [AuthGuard],
    // canMatch: [AuthGuard],
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
