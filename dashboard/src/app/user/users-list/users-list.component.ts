import {
  Component,
  OnInit,
  AfterViewInit,
  Inject,
  TemplateRef,
} from '@angular/core';
import { IUser } from './../../../../../CONSTANTS/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements AfterViewInit {
  user: IUser;
  isLoadingResults = true;
  isFailed: boolean;
  displayedColumns: string[] = ['image', 'name', 'type', '_id'];
  data: IUser[] = [];

  constructor(private usersService: UsersService, public dialog: MatDialog) {}
  ngAfterViewInit(): void {
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
  }

  openDialog(actionType: string, userIDToBeRemoved: string) {
    let DialogComponent = actionType === 'remove' ? DialogRemove : DialogEdit;

    let dialogRef = this.dialog.open(DialogComponent, {
      data: {
        userId: userIDToBeRemoved,
        usersService: this.usersService,
      },
    });

    dialogRef.afterClosed().subscribe((res: string) => {
      if (res && res !== 'close') {
        this.data = this.data.filter((item) => item._id !== userIDToBeRemoved);
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

  closeDialog() {
    this.dialogRef.close('close');
  }
}

@Component({
  selector: 'dialog-edit',
  templateUrl: './dialogs/dialog-edit.html',
})
export class DialogEdit {
  success?: boolean;
  loading?: boolean;
  error?: boolean;
  constructor(
    @Inject(UsersService) public usersService?: UsersService,
    @Inject(MAT_DIALOG_DATA) public data?: any,
    public dialogRef?: MatDialogRef<DialogRemove>
  ) {}

  closeDialog() {
    this.dialogRef.close(this.data.user._id);
  }
}
