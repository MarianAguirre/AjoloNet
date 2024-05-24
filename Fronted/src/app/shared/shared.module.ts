import { NgModule } from '@angular/core';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SidebarComponent,
    HomePageComponent
  ],
  declarations: [
    SidebarComponent,
    HomePageComponent
  ]
})
export class SharedModule { }
