import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home.component';
import {HomeGuard} from '../guards/home.guard';


const authRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate: [HomeGuard]}];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
