import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {ROUTES} from '../shared/services/shared.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Callzie';

  constructor(private router: Router) {
  }

  isLogin(): boolean {
    return this.router.url === ROUTES.LOGIN;
  }
}
