import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private baseUrl = `${environment.BACKEND_URL}/assets`;
  constructor(private http: HttpClient) {}

  getImages() {
    return this.http.get(`${this.baseUrl}/images`);
  }

  getVideo() {
    return this.http.get(`${this.baseUrl}/video`);
  }
}
