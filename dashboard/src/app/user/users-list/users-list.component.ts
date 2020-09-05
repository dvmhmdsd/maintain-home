import { Component, OnInit, AfterViewInit } from '@angular/core';
import { IUser } from './../../../../../CONSTANTS/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements AfterViewInit {
  user: IUser;
  isLoadingResults = true;
  isFailed: boolean;
  displayedColumns: string[] = ['image', 'name', 'type', 'username'];
  data: IUser[] = [];

  constructor(private userService: UsersService) {}
  ngAfterViewInit(): void {
    this.userService.getUsers().subscribe(
      (res: IUser[]) => {
        this.isLoadingResults = false;
        this.data = res.filter(admin => admin._id !== this.user._id);
        this.isFailed = false;
      },
      (err) => {
        console.log(err)
        this.isLoadingResults = false;
        this.isFailed = true;
      }
    );
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }
}
