import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {Login} from '../models/login.model';
import {User} from '../models/user.model';
import {API_CONST, ROUTES, STORAGE} from './shared.constants';

@Injectable({
  providedIn: 'root'
})

// This Service is used to Authenticate Users, and to use Services in Components.
export class AuthService {
  // JWT Token that unique the user.
  token: string = localStorage.getItem(STORAGE.TOKEN);
  // User Behavior Subject to save users to the system.
  userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(JSON.parse(localStorage.getItem(STORAGE.USER)));
  // User htat's logged in.
  user: User;
  // Class Constructor.
  // Services Injected: HttpService to send HTTP requests, Router: to Route the User.
  constructor(private http: HttpService, private router: Router) {
  }

  // Login Function to send Login data as Login object.
  // return Observable of the request.
  login(payload: Login): Observable<any> {
    return this.http.post(API_CONST.ACTIONS.LOGIN, payload);
  }

  // This Function is used to save the user to the localstorage.
  saveUser(user: User): void{
    this.user = user;
    localStorage.setItem(STORAGE.USER, JSON.stringify(user));
    this.userSubject.next(user);
  }

  // Function to get Information of the User currently Logged in.
  // return Observable of the request.
  getUserInformation(): any {
    return this.http.get(API_CONST.ACTIONS.USER_INFO);
  }


  // Function to route the user to home page.
  routeHome(): void{
    this.router.navigate(['/home']);
  }

  // Function to check if the user is logged-in or not.
  // returns Boolean value.
  isLoggedIn(): boolean {
    return !!localStorage.getItem(STORAGE.TOKEN);
  }

  // This Function is used to save the JWT Token to the localstorage.
  storeToken(token: string): void {
    this.token = token;
    localStorage.setItem(STORAGE.TOKEN, token);
  }

  // This Function is used to get the Logged-in User's Information.
  // reutrn User object.
  getUser(): User{
    return JSON.parse(localStorage.getItem(STORAGE.USER));
  }

  // This Function is used to get the user's JWT Token.
  getToken(): string {
    return this.token;
  }

  // This Function is used to get all users in the system.
  getUsers(): any{
    return this.http.get(API_CONST.ACTIONS.ALL_USERS);
  }

  // This Function is used to logout the current user and delete all information about him.
  logout(): void {
    this.token = null;
    localStorage.removeItem(STORAGE.USER);
    localStorage.removeItem(STORAGE.TOKEN);
    this.userSubject.next(null);
    this.user = null;
    this.router.navigate([ROUTES.LOGIN]);
  }
}
