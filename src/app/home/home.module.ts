import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AuthService} from '../../shared/services/auth.service';
import {HomeComponent} from './home.component';
import {HomeRoutingModule} from './home-routing.module';
import {CardModule} from 'primeng-lts/card';
import {ButtonModule} from 'primeng/button';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    HomeRoutingModule,
    FormsModule,
    CommonModule,
    CardModule,
    ButtonModule
  ],
  providers: [AuthService]
})
export class HomeModule { }
