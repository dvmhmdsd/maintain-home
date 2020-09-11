import { UserTypes } from './../../../../../CONSTANTS/enums/user-types.enum';
import { IUser } from './../../../../../CONSTANTS/interfaces/user.interface';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginVM } from 'src/app/viewmodels/login.viewmodel';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  baseUrl = `${environment.BACKEND_URL}/users`;
  userTypes = UserTypes
  constructor(private http: HttpClient) {}

  isUserAuthenticated() {
    let token = localStorage.getItem('token');
    if (token) return true;
    else return false;
  }

  isUserSuper() {
    let user: IUser = JSON.parse(localStorage.getItem('user'));
    if (user && user.type === this.userTypes.SUPER_ADMIN) return true;
    else return false;
  }


  login(loginData: LoginVM) {
    return this.http.post(`${this.baseUrl}/login`, loginData);
  }
}
