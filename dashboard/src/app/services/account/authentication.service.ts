import { IUser } from './../../../../../CONSTANTS/interfaces/user.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor() {}

  isUserAuthenticated() {
    let token = localStorage.getItem('token');
    if (token) return true;
    else return false;
  }

  isUserSuper() {
    let user: IUser = JSON.parse(localStorage.getItem('user'));
    if (user && user.type === 'Super') return true;
    else return false;
  }
}
