import { NgModule } from '@angular/core';

import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DragDropModule } from 'primeng/dragdrop';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputOtpModule } from 'primeng/inputotp';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { PickListModule } from 'primeng/picklist';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { TreeTableModule } from 'primeng/treetable';

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
    DragDropModule,
    PickListModule,
    InputOtpModule
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
    DragDropModule,
    PickListModule,
    InputOtpModule
  ],

})
export class PrimeNGModule { }
