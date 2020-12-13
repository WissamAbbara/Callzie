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
export class AuthService {
  token: string = localStorage.getItem(STORAGE.TOKEN);
  userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(JSON.parse(localStorage.getItem(STORAGE.USER)));
  user: User;

  constructor(private http: HttpService, private router: Router) {
  }

  login(payload: Login): Observable<any> {
    return this.http.post(API_CONST.ACTIONS.LOGIN, payload);
  }
  saveUser(user: User): void{
    this.user = user;
    localStorage.setItem(STORAGE.USER, JSON.stringify(user));
    this.userSubject.next(user);
  }
  getUserInformation() {
    return this.http.get(API_CONST.ACTIONS.USER_INFO);
  }


  route(): void{
    this.router.navigate(['/home']);
  }


  isLoggedIn(): boolean {
    return !!localStorage.getItem(STORAGE.TOKEN);
  }

  storeToken(token: string): void {
    this.token = token;
    localStorage.setItem(STORAGE.TOKEN, token);
  }
  getUser(): User{
    return this.userSubject.getValue();
  }
  getToken(): string {
    return this.token;
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem(STORAGE.USER);
    localStorage.removeItem(STORAGE.TOKEN);
    this.userSubject.next(null);
    this.user = null;
    this.router.navigate([ROUTES.LOGIN]);
  }
}
