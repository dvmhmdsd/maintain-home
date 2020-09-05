import { UserVM } from './../../viewmodels/user.viewmodel';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  userForm: FormGroup;
  userTypes = [
    { text: 'مدير بكامل الصلاحيات', value: 'Super' },
    { text: 'مدير عادي', value: 'Admin' },
  ];
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<CreateUserComponent>,
    private usersService: UsersService,
    private router: Router
  ) {
    this.userForm = new FormGroup({
      name: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      password: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(8)])
      ),
      confirmPassword: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          RxwebValidators.compare({ fieldName: 'password' }),
        ])
      ),
      type: new FormControl(''),
    });
  }

  ngOnInit(): void {}

  openDialog(msg: string) {
    this.dialog.open(DialogData, {
      data: {
        msg,
      },
    });
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  createUser() {
    let userData = new UserVM();
    if (this.userForm.valid) {
      userData = {
        name: this.userForm.get('name').value,
        username: this.userForm.get('username').value,
        type: this.userForm.get('type').value,
        password: this.userForm.get('password').value,
      };

      this.openDialog('يتم إنشاء مدير الآن ...');
      this.usersService.register(userData).subscribe(
        (res: any) => {
          this.closeDialog();
          this.openDialog('لقد تم إنشاء المدير');
          setTimeout(() => {
            this.closeDialog();
            this.router.navigate(['/user/list']);
          }, 1000);
        },
        (err) => {
          this.closeDialog();
          if (err.status === 400) {
            this.userForm.controls['username'].setErrors({ used: true });
          } else {
            this.openDialog('حدث خطأ أثناء ‘نشاء مدير، من فضلك حاول مرة أخري');
          }
        }
      );
    }
  }
}

@Component({
  selector: 'dialog-data',
  templateUrl: './dialog-data.html',
})
export class DialogData {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
