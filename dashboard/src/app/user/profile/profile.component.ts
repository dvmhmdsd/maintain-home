import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { IUser } from './../../../../../CONSTANTS/interfaces/user.interface';

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

  constructor() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.userForm = new FormGroup({
      name: new FormControl("", Validators.required),
      username: new FormControl("", Validators.required)
    });
    this.userForm.get('name').setValue(this.user.name);
    this.userForm.get('username').setValue(this.user.username);
  }

  ngOnInit(): void {
  }

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
    // TODO: Send {uploadData} to new endpoint in the backend with progress https://academind.com/learn/angular/snippets/angular-image-upload-made-easy/
  }

  updateUser() {
    // TODO: Update user data on submit
  }
}
