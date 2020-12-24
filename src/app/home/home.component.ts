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

  // Roles of the Employees (in the Select Menu).
  roles: {label: string, value: string}[];
  // List that holds all users as User Objects.
  usersList: User[];
  // Search Query
  search: '';
  // Table Columns
  cols: any[];
  // Logged-in User.
  user: User = new User('', '', '', 0);
  // Array that holds all Subscriptions started in the component.
  subscriptions: Subscription[] = [];
  // Configuration of the Dynamic Dialog (Users-Modal).
  config = {
    header: '',
    contentStyle: {overflow: 'visible', 'min-width': '250px'}, closable: false,
    style: {'min-width': '300px', width: '37%'}, baseZIndex: 10000, data: this.user, onclose: this.getUsers()
  };

  // Class Constuctor.
  // Services Injected: AuthService, Dialog service.
  constructor(private authService: AuthService, private dialogServie: DialogService) { }

  // Function that runs when the Component opens.
  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.checkUser();
    this.getUsers();
    this.cols = [
      {field: 'username', header: 'Name'},
      {field: 'email', header: 'Email'},
      {field: 'role', header: 'Role'},
      {field: 'edit', header: ''}
    ];
    this.roles = [
      {label: 'Admin', value: 'Admin'},
      {label: 'Operation', value: 'Operation'},
      {label: 'Quality', value: 'Quality'},
      {label: 'Inbound', value: 'Inbound'},
      {label: 'Outbound', value: 'Outbound'}
    ];
  }

  // This Function is used to Get all users in the System.
  getUsers(): void{
    this.subscriptions.push(
      this.authService.getUsers().subscribe(
        (data: User[]) => {
          this.usersList = data;
          this.usersList = this.usersList.filter((el) => el.username !== this.user.username);
        },
        () => {
          this.authService.logout();
        }));
  }

  // This Function is used to check the JWT token of the Logged in.
  checkUser(): void{
    this.subscriptions.push(
      this.authService.getUserInformation().subscribe(
        (data: User) => {
          if (this.user.id !== data.id){
            this.authService.logout();
          }
        },
        () => {
          this.authService.logout();
        }));
  }

  // This Function is used to open the Users-Modal Component as a Dynamic Dialog.
  showModalDialog(user?: User): void {
    this.config.header = `${user ? 'Edit' : 'New'} User`;
    this.config.data = user && user;
    this.dialogServie.open(UsersModalComponent, this.config);
  }

  // Function that runs when the component is destroyed.
  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
