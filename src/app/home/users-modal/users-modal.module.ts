
import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';

import {UsersModalComponent} from './users-modal.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {DynamicDialogConfig, DynamicDialogModule, DynamicDialogRef} from 'primeng/dynamicdialog';
import {DropdownModule} from 'primeng/dropdown';
import {MessagesModule} from 'primeng/messages';
import {ToastModule} from 'primeng/toast';
import {DialogModule} from 'primeng/dialog';
import {AccordionModule} from 'primeng-lts/accordion/';

@NgModule({
  declarations: [
    UsersModalComponent
  ],
  imports: [
    ButtonModule,
    CommonModule,
    DynamicDialogModule,
    DropdownModule,
    FormsModule,
    MessagesModule,
    ToastModule,
    AccordionModule,
    DialogModule,
    InputTextModule,
    ReactiveFormsModule

  ],
  providers: [DynamicDialogRef, DynamicDialogConfig],
  exports: [
    UsersModalComponent
  ]
})
export class UsersModalModule { }
