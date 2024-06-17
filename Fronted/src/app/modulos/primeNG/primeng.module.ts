import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { TreeTableModule } from 'primeng/treetable';
import {TableModule} from 'primeng/table'





@NgModule({
  imports: [
    ButtonModule,
    DialogModule,
    IconFieldModule,
    InputIconModule,
    InputSwitchModule,
    InputTextModule,
    TableModule,
    TagModule,
    ToastModule,
    TreeTableModule,


  ],
  exports: [
    ButtonModule,
    DialogModule,
    IconFieldModule,
    InputIconModule,
    InputSwitchModule,
    InputTextModule,
    TableModule,
    TableModule,
    TagModule,
    ToastModule,
    TreeTableModule,

  ],
  declarations: [

  ],

})
export class PrimeNGModule { }
