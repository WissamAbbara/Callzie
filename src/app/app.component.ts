import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {ROUTES} from '../shared/services/shared.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

// This Class include all services and functions of the App Component.
export class AppComponent {
  title = 'Callzie';

  // Class Constructor
  // Services Injected: Router.
  constructor(private router: Router) {
  }

  // Function to check if the current url is on the login Page.
  // return: Boolean value.
  isLogin(): boolean {
    return this.router.url === ROUTES.LOGIN;
  }
}
