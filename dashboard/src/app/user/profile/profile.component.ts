import { UsersService } from './../../services/users.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { IUser } from './../../../../../CONSTANTS/interfaces/user.interface';
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

  constructor(private userService: UsersService) {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.userForm = new FormGroup({
      name: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
    });
    this.userForm.get('name').setValue(this.user.name);
    this.userForm.get('username').setValue(this.user.username);
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
        username: this.userForm.get('username').value,
      };
    }

    return userData;
  }

  private updateUserWithResponse(response: IUser) {
    this.user = response;
    localStorage.setItem('user', JSON.stringify(response));
  }
}
