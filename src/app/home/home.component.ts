import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {User} from '../../shared/models/user.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService) { }

  user: User = new User('', '', '', 0);
  subscriptions: Subscription[] = [];
  ngOnInit(): void {
    this.checkUser();
  }

  checkUser(): void{
    this.subscriptions.push(
      this.authService.getUserInformation().subscribe(
        (data: User) => {
          this.user = data;
        },
        () => {
          this.authService.logout();
        }));
  }

}
