import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login.component';
import {LoginRoutingModule} from './login-routing.module';
import {AuthService} from '../../shared/services/auth.service';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    LoginRoutingModule,
    FormsModule,
    CommonModule,
  ],
  providers: [AuthService]
})
export class LoginModule { }
