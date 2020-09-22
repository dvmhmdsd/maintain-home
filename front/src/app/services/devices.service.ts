import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {
  private baseUrl = `${environment.BACKEND_URL}/devices`;
  constructor(private http: HttpClient) { }

  getDevices() {
    return this.http.get(`${this.baseUrl}/list`);
  }
}
