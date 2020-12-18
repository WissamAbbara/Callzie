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
  roles: {name: string}[] = [];
  selectedRole: {name: string};
  user: User;
  subscriptions: Subscription[] = [];
  msgs: Message[] = [];
  editMode: boolean;

  constructor(private httpService: HttpService, private authService: AuthService,
              private dynamicDialogConfig: DynamicDialogConfig) {
  }

  ngOnInit(): void {
    this.editMode = false;
    this.user = new User('', '', '', 0, 'Test@123');
    this.getRoles();
    if (!!this.dynamicDialogConfig.data) {
      this.editMode = true;
      const user: User = this.dynamicDialogConfig.data;
      this.selectedRole = {name: user.role};
      this.user = new User(user.username, user.email, user.role, user.id);
    }
  }
  getRoles(): void {
  this.roles = [
    {name: 'Admin'},
    {name: 'Operation'},
    {name: 'Quality'},
    {name: 'Inbound'},
    {name: 'Outbound'}
  ];
  }

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
        this.httpService.put(API_CONST.ACTIONS.USER, this.user).subscribe(
          () => {
            this.closeDialog();
          },
          () => {
            this.showErrorMessage();
          }));
    }
  }

  closeDialog(): void {
    window.location.reload();
  }

  showErrorMessage(): void {
    this.msgs = [];
    this.msgs.push({severity: 'warn', summary: 'Error: ', detail: 'This Username or Email is Used!'});
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
