import { UserVM } from './../viewmodels/user.viewmodel';
import { LoginVM } from './../viewmodels/login.viewmodel';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  login(loginData: LoginVM) {
    return this.http.post(`${environment.BACKEND_URL}/users/login`, loginData);
  }

  register(registrationData: UserVM) {
    return this.http.post(`${environment.BACKEND_URL}/users/new`, registrationData);
  }

  updateUserData(userId: string, userData: UserVM) {
    return this.http.put(`${environment.BACKEND_URL}/users/${userId}`, userData);
  }

  deleteUser(userId: string) {
    return this.http.delete(`${environment.BACKEND_URL}/users/${userId}`);
  }
}
