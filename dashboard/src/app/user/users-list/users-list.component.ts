import {
  Component,
  OnInit,
  AfterViewInit,
  Inject,
  TemplateRef,
} from '@angular/core';
import { UserTypes } from './../../../../../CONSTANTS/enums/user-types.enum';
import { IUser } from './../../../../../CONSTANTS/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserVM } from 'src/app/viewmodels/user.viewmodel';
import { Events } from 'src/app/services/events.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements AfterViewInit {
  user: IUser;
  userTypes = UserTypes;
  isLoadingResults = true;
  isFailed: boolean;
  displayedColumns: string[] = ['image', 'name', 'type', '_id'];
  data: IUser[] = [];

  constructor(
    private usersService: UsersService,
    public dialog: MatDialog,
    private events: Events
  ) {}

  ngAfterViewInit(): void {
    this.listUsers();
  }

  listUsers() {
    this.usersService.getUsers().subscribe(
      (res: IUser[]) => {
        this.isLoadingResults = false;
        this.data = res.filter((admin) => admin._id !== this.user._id);
        this.isFailed = false;
      },
      (err) => {
        console.log(err);
        this.isLoadingResults = false;
        this.isFailed = true;
      }
    );
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));

    this.events.subscribe('userUpdated', (res) => {
      // let itemToBeReplacedPosition;
      // for (let [index, item] of this.data.entries()) {
      //   if (res._id === item._id) {
      //     itemToBeReplacedPosition = index;
      //     break;
      //   }
      // }
      // this.data.splice(itemToBeReplacedPosition, 1, res);
      // this.data = this.data
      this.listUsers();
    });
  }

  openDialog(actionType: string, user: IUser) {
    let DialogComponent = actionType === 'remove' ? DialogRemove : DialogEdit;

    let dialogRef = this.dialog.open(DialogComponent, {
      data: {
        user,
        userId: user._id,
        usersService: this.usersService,
      },
    });

    dialogRef.afterClosed().subscribe((res: string | IUser) => {
      if (res && res === 'remove') {
        this.data = this.data.filter((item) => item._id !== user._id);
      }
    });
  }
}

@Component({
  selector: 'dialog-remove',
  templateUrl: './dialogs/dialog-remove.html',
})
export class DialogRemove {
  success?: boolean;
  loading?: boolean;
  error?: boolean;
  user: IUser;

  userForm?: FormGroup;
  userTypes = [
    { text: 'مالك', value: 'Super' },
    { text: 'مدير عادي', value: 'Admin' },
  ];
  constructor(
    @Inject(UsersService) public usersService?: UsersService,
    @Inject(MAT_DIALOG_DATA) public data?: any,
    public dialogRef?: MatDialogRef<DialogRemove>
  ) {}

  removeUser() {
    this.loading = true;
    this.usersService.deleteUser(this.data.userId).subscribe(
      (res) => {
        this.loading = false;
        this.error = false;
        this.success = true;
      },
      (err) => {
        this.loading = false;
        this.success = false;
        this.error = true;
      }
    );
  }

  updateUser() {}

  closeDialog() {
    this.dialogRef.close('remove');
  }
}

@Component({
  selector: 'dialog-edit',
  templateUrl: './dialogs/dialog-edit.html',
  styleUrls: ['./dialogs/dialog.scss'],
})
export class DialogEdit {
  success?: boolean;
  loading?: boolean;
  error?: boolean;
  user: IUser;

  userForm?: FormGroup;
  userTypes = [{ text: 'مالك', value: 'Super' }];
  constructor(
    private events?: Events,
    @Inject(UsersService) public usersService?: UsersService,
    @Inject(MAT_DIALOG_DATA) public data?: any,
    public dialogRef?: MatDialogRef<DialogRemove>
  ) {
    this.userForm = new FormGroup({
      name: new FormControl(data.name, Validators.required),
      email: new FormControl(
        data.email,
        Validators.compose([
          Validators.required,
          Validators.pattern(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ),
        ])
      ),
      type: new FormControl(data.type),
    });
    this.userForm.get('name').setValue(data.user.name);
    this.userForm.get('email').setValue(data.user.email);
    this.userForm.get('type').setValue(data.user.type);
  }
  removeUser() {}

  updateUser() {
    let userData = new UserVM();
    if (this.userForm.valid) {
      userData = {
        name: this.userForm.get('name').value,
        email: this.userForm.get('email').value,
        type: this.userForm.get('type').value,
      };

      this.loading = true;
      this.usersService.updateUserData(this.data.userId, userData).subscribe(
        (res: any) => {
          this.success = true;
          this.loading = false;
          this.error = false;

          this.user = res;
          this.user._id = this.data.userId;
          this.events.publish('userUpdated', this.user);
        },
        (err) => {
          if (err.status === 400) {
            this.userForm.controls['email'].setErrors({ used: true });
          } else {
            this.success = false;
            this.loading = false;
            this.error = true;
          }
        }
      );
    }
  }

  closeDialog() {
    this.dialogRef.close(this.user);
  }
}
