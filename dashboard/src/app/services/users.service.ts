import { UserVM } from './../viewmodels/user.viewmodel';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  baseUrl = `${environment.BACKEND_URL}/users`;
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get(`${this.baseUrl}/list`)
  }

  register(registrationData: UserVM) {
    return this.http.post(`${this.baseUrl}/new`, registrationData);
  }

  updateUserData(userId: string, userData: UserVM) {
    return this.http.put(`${this.baseUrl}/${userId}`, userData);
  }

  updateUserImage(userId: string, fromData: FormData) {
    const headerDict = {
      'Content-Type': 'multipart/form-data',
    }
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.put(`${this.baseUrl}/${userId}/changeUserImage`, fromData);
  }

  deleteUser(userId: string) {
    return this.http.delete(`${this.baseUrl}/${userId}`);
  }
}
