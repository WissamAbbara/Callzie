import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AuthService} from '../../shared/services/auth.service';
import {HomeComponent} from './home.component';
import {HomeRoutingModule} from './home-routing.module';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    HomeRoutingModule,
    FormsModule,
    CommonModule,
  ],
  providers: [AuthService]
})
export class HomeModule { }
