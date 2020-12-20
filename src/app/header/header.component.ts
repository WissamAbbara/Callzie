import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {User} from '../../shared/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user = new User('', '', '', 0, '');

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.getUser();
  }
  logout(): void{
    this.authService.logout();
  }

  getUser(): void{
    this.user = this.authService.getUser();
  }

}
