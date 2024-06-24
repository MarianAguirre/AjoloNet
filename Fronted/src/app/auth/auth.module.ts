import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { MaterialModule } from '../modulos/material/material.module';
import { DarkModeModule } from '../shared/components/dark-mode/dark-mode.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';





@NgModule({
  declarations: [
    LayoutPageComponent,
    LoginPageComponent,
    RegisterPageComponent,

  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    DarkModeModule,
    ReactiveFormsModule,
    HttpClientModule



  ]
})
export class AuthModule { }
