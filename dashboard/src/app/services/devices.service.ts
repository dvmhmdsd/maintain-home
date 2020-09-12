import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { IDevice } from './../../../../CONSTANTS/interfaces/device.interface';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {
  private baseUrl = `${environment.BACKEND_URL}/devices`;

  constructor(private http: HttpClient) {}

  getDevices() {
    return this.http.get(`${this.baseUrl}/list`);
  }

  createDevice(device: IDevice) {
    return this.http.post(`${this.baseUrl}/new`, device);
  }

  deleteDevice(deviceId: string) {
    return this.http.delete(`${this.baseUrl}/${deviceId}`);
  }
}
