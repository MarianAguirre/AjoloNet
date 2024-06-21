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
import { TableModule} from 'primeng/table';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { DragDropModule } from 'primeng/dragdrop';







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
    RippleModule,
    AvatarModule,
    DragDropModule


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
    RippleModule,
    AvatarModule,
    DragDropModule

  ],
  declarations: [

  ],

})
export class PrimeNGModule { }
