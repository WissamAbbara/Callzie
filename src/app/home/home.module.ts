import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AuthService} from '../../shared/services/auth.service';
import {HomeComponent} from './home.component';
import {HomeRoutingModule} from './home-routing.module';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {DialogService, DynamicDialogModule} from 'primeng/dynamicdialog';
import {InputTextModule} from 'primeng/inputtext';
import {UsersModalModule} from './users-modal/users-modal.module';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    HomeRoutingModule,
    FormsModule,
    CommonModule,
    ButtonModule,
    TableModule,
    DynamicDialogModule,
    InputTextModule,
    UsersModalModule
  ],
  providers: [AuthService, DialogService]
})
export class HomeModule { }
