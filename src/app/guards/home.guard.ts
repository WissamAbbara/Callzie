import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';
import {ROUTES} from '../../shared/services/shared.constants';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(): boolean{
    if (!this.authService.isLoggedIn()){
      this.router.navigate([ROUTES.LOGIN]);
    }
    return this.authService.isLoggedIn();
  }
}
