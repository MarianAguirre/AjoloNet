import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NgModule } from '@angular/core';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {
        path: 'login', component: LoginPageComponent
      },
      // {
      //   path: 'registrar', component: RegisterPageComponent
      // },
      {
        path: '**', redirectTo: 'login'
      }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ],
})
export class AuthRoutingModule { }
