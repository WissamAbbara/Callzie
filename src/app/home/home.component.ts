import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {User} from '../../shared/models/user.model';
import {Subscription} from 'rxjs';
import {UsersModalComponent} from './users-modal/users-modal.component';
import {DialogService} from 'primeng/dynamicdialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  roles: {name: string}[];
  usersList: User[];
  cols: any[];
  user: User = new User('', '', '', 0);
  subscriptions: Subscription[] = [];
  config = {
    header: '',
    contentStyle: {overflow: 'visible', 'min-width': '250px'}, closable: false,
    style: {'min-width': '300px', width: '37%'}, baseZIndex: 10000, data: this.user
  };

  constructor(private authService: AuthService, private dialogServie: DialogService) { }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.checkUser();
    this.usersList = [
      new User('Wissam', 'Callzie', 'Admin'),
      new User('Wissam', 'Callzie', 'Admin'),
      new User('Wissam', 'Callzie', 'Admin'),
      new User('Wissam', 'Callzie', 'Admin')
    ];
    this.cols = [
      {field: 'username', header: 'Name'},
      {field: 'email', header: 'Email'},
      {field: 'role', header: 'Role'},
      {field: 'edit', header: ''}
    ];
  }

  checkUser(): void{
    this.subscriptions.push(
      this.authService.getUserInformation().subscribe(
        () => {
        },
        () => {
          this.authService.logout();
        }));
  }
  showModalDialog(user?: User): void {
    this.config.header = `${user ? 'Edit' : 'New'} User`;
    this.config.data = user && user;
    this.dialogServie.open(UsersModalComponent, this.config);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
