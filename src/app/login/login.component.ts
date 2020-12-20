import {Component, OnDestroy, OnInit} from '@angular/core';
import {Login} from '../../shared/models/login.model';
import {Subscription} from 'rxjs';
import {AuthService} from '../../shared/services/auth.service';
import {User} from '../../shared/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService) { }
  loginRequest: Login = new Login('', '');
  subscriptions: Subscription[] = [];
  error = '';
  ngOnInit(): void {

  }
  login(): void {
    this.error = '';
    this.subscriptions.push(
      this.authService.login(this.loginRequest).subscribe(
        data => {
          this.authService.storeToken(data.token);
          this.getUserInformation();
        },
        () => {
          this.showError();
        }));
  }
  getUserInformation(): void {
    this.subscriptions.push(
      this.authService.getUserInformation().subscribe(
        (data: User) => {
          this.authService.saveUser(data);
          this.authService.route();
        }));
  }
  showError(): void {
    this.error = '';
    this.error = 'This Username, or Password is Incorrect!';
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
