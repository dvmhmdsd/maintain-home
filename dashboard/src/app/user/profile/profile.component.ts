import { Events } from './../../services/events.service';
import { UsersService } from './../../services/users.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { IUser } from './../../../../../src/CONSTANTS/interfaces/user.interface';
import { UserVM } from 'src/app/viewmodels/user.viewmodel';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: IUser;
  editMode: boolean;
  selectedImage: File;
  userForm: FormGroup;
  isFailed: boolean;
  isLoading: boolean;

  constructor(private userService: UsersService, private events: Events) {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.userForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])),
    });
    this.userForm.get('name').setValue(this.user.name);
    this.userForm.get('email').setValue(this.user.email);
  }

  ngOnInit(): void {}

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  onFileChanged(event: any) {
    this.selectedImage = event.target.files[0];
    this.upload();
  }

  upload() {
    const uploadData = new FormData();
    uploadData.append('userImage', this.selectedImage, this.selectedImage.name);
    const userId = this.user._id;
    this.isLoading = true;
    this.userService.updateUserImage(userId, uploadData).subscribe(
      (res: IUser) => {
        this.isLoading = false;
        this.updateUserWithResponse(res);
        this.events.publish("userImageChanged", res)
      },
      (err) => {
        this.isLoading = false;
        alert(
          'حدث خطأ أثناء تحديث الصورة، من فضلك حاول مرة أخري أو قم بالإتصال بالدعم'
        );
      }
    );
  }

  updateUser() {
    const userId = this.user._id;
    let userData = this.getUserDataFromForm();

    if (userData) {
      this.isLoading = true;
      this.userService.updateUserData(userId, userData).subscribe(
        (res: IUser) => {
          this.editMode = false;
          this.isLoading = false;
          this.isFailed = false;
          this.updateUserWithResponse(res);
        },
        (err) => {
          this.isLoading = false;
          this.isFailed = true;
        }
      );
    }
  }

  private getUserDataFromForm(): UserVM {
    let userData = new UserVM();
    if (this.userForm.valid) {
      userData = {
        name: this.userForm.get('name').value,
        email: this.userForm.get('email').value,
      };
    }

    return userData;
  }

  private updateUserWithResponse(response: IUser) {
    this.user = response;
    localStorage.setItem('user', JSON.stringify(response));
  }
}
