import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', loadChildren: () => import('src/app/login/login.module').then(m => m.LoginModule) },
  { path: 'home', loadChildren: () => import('src/app/home/home.module').then(m => m.HomeModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
