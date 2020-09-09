import { AuthenticationService } from './../../services/account/authentication.service';
import { LoginVM } from './../../viewmodels/login.viewmodel';
import { UsersService } from './../../services/users.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { Events } from 'src/app/services/events.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading: boolean;
  loginSuccess: boolean;
  constructor(
    private usersService: UsersService,
    private authService: AuthenticationService,
    private router: Router,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<LoginComponent>,
    private events: Events
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    if (this.authService.isUserAuthenticated()) {
      this.router.navigate(['/home']);
    }
  }

  openDialog(msg: string) {
    this.dialog.open(DialogData, {
      data: {
        msg,
      },
    });
  }

  closeDialog() {
    this.dialog.closeAll()
  }

  login() {
    let loginVM = new LoginVM();

    if (this.loginForm.valid) {
      loginVM.email = this.loginForm.get('email').value;
      loginVM.password = this.loginForm.get('password').value;
      this.openDialog('يتم تسجيل دخولك الآن ...');
      this.usersService.login(loginVM).subscribe(
        (res: any) => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify(res.user));

          this.closeDialog();
          this.openDialog('لقد تم تسجيل دخولك بنجاح');
          setTimeout(() => {
            this.closeDialog();
            this.events.publish("showLayout", true);
            this.router.navigate(['/home']);
          }, 1000);
        },
        (err) => {
          this.closeDialog();
          if (err.status === 401) {
            this.openDialog('اسم المستخدم أو كلمة السر غير صحيحان');
          } else {
            this.openDialog('حدث خطأ أثناء تسجيل دخولك، من فضلك حاول مرة أخري');
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
