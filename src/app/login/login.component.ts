import {Component, OnDestroy} from '@angular/core';
import {Login} from '../../shared/models/login.model';
import {Subscription} from 'rxjs';
import {AuthService} from '../../shared/services/auth.service';
import {User} from '../../shared/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {

  // Class Constuctor.
  // Services Injected: AuthService.
  constructor(private authService: AuthService) { }

  // Login Object that is binded with the input texts in the HTMl page.
  loginRequest: Login = new Login('', '');

  // Array that holds all Subscriptions started in the component.
  subscriptions: Subscription[] = [];

  // Error Message.
  error = '';

  // Function that send the Login Information to the Back end Server.
  // On Success: the system saves the JWT token and user and route the user to home.
  // On Fail: The System shows Error Message.
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

  // Function to send a request to get the current user information.
  getUserInformation(): void {
    this.subscriptions.push(
      this.authService.getUserInformation().subscribe(
        (data: User) => {
          this.authService.saveUser(data);
          this.authService.routeHome();
        }));
  }

  // Function to show an Error on failed Login.
  showError(): void {
    this.error = '';
    this.error = 'This Username, or Password is Incorrect!';
  }

  // Function that runs when the component is destroyed.
  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
