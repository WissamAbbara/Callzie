import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {User} from '../../shared/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // User Object that holds the Information of the Logged in User.
  user = new User('', '', '', 0, '');

  // Class Constuctor.
  // Services Injected: AuthService.
  constructor(private authService: AuthService) { }

  // Function that runs when the Component opens.
  ngOnInit(): void {
    this.getUser();
  }

  // Function to call the Logout Function in the AuthService.
  logout(): void{
    this.authService.logout();
  }

  // Function to get the User from the AuthService.
  getUser(): void{
    this.user = this.authService.getUser();
  }

}
