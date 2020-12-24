import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../../shared/models/user.model';
import {Subscription} from 'rxjs';
import {Message} from 'primeng/api';
import {HttpService} from '../../../shared/services/http.service';
import {AuthService} from '../../../shared/services/auth.service';
import {DynamicDialogConfig} from 'primeng-lts/dynamicdialog';
import {API_CONST} from '../../../shared/services/shared.constants';

@Component({
  selector: 'app-users-modal',
  templateUrl: './users-modal.component.html',
  styleUrls: ['./users-modal.component.css']
})
export class UsersModalComponent implements OnInit, OnDestroy {

  // Roles of the Employees (in the Select Menu).
  roles: {name: string}[] = [];

  // Selected Role in the Select Menu.
  selectedRole: {name: string};
  // User object that represent the User choosed to edit or the new user.
  user: User;

  // Array that holds all Subscriptions started in the component.
  subscriptions: Subscription[] = [];

  // Array that holds Messages to show to users.
  msgs: Message[] = [];

  // Boolean value that decide if the modal is opened as edit a current user or new user.
  editMode: boolean;

  // Class Constuctor.
  // Services Injected: HttpService, AuthService, Dynamic Dialog Config service.
  constructor(private httpService: HttpService, private authService: AuthService,
              private dynamicDialogConfig: DynamicDialogConfig) {
  }

  // Function that runs when the Component opens.
  ngOnInit(): void {
    this.editMode = false;
    this.user = new User('', '', '', 0, 'Callzie@123');
    this.getRoles();
    if (!!this.dynamicDialogConfig.data) {
      this.editMode = true;
      const user: User = this.dynamicDialogConfig.data;
      this.selectedRole = {name: user.role};
      this.user = new User(user.username, user.email, user.role, user.id);
    }
  }

  // Function that fill the roles in the Select Menu.
  getRoles(): void {
  this.roles = [
    {name: 'Admin'},
    {name: 'Operation'},
    {name: 'Quality'},
    {name: 'Inbound'},
    {name: 'Outbound'}
  ];
  }

  // Function that is triggered when the user click on save Button.
  createNewUser(): void {
    this.showErrorMessage();
    this.msgs = [];
    this.user.role = this.selectedRole.name;
    if (!this.editMode) {
      this.subscriptions.push(
        this.httpService.post(API_CONST.ACTIONS.REGISTER, this.user).subscribe(
          () => {
            this.closeDialog();
          },
          () => {
            this.showErrorMessage();
          }));
    } else {
      this.subscriptions.push(
        this.httpService.put(API_CONST.ACTIONS.USER + this.user.id, this.user).subscribe(
          () => {
            this.closeDialog();
          },
          () => {
            this.showErrorMessage();
          }));
    }
  }

  // Function that is triggered when the user click on Delete Button.
  deleteUser(): void {
    this.showErrorMessage();
    this.msgs = [];
    this.subscriptions.push(
        this.httpService.delete(API_CONST.ACTIONS.DELETE + this.user.id).subscribe(
          () => {
            this.closeDialog();
          },
          () => {
            this.showErrorMessage();
          }));

  }

  // Function that is triggered when the user click on Close Button.
  closeDialog(): void {
    window.location.reload();
  }

  // Function to show an Error to the User On Failure of creating a new user or Editing a user.
  showErrorMessage(): void {
    this.msgs = [];
    this.msgs.push({severity: 'warn', summary: 'Error: ', detail: 'This Username or Email is Used!'});
  }

  // Function to show an Error to the User On Failure of Deleting a user.
  showErrorDelete(): void {
    this.msgs = [];
    this.msgs.push({severity: 'warn', summary: 'Error: ', detail: 'Error Occurred!'});
  }

  // Function that runs when the component is destroyed.
  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
