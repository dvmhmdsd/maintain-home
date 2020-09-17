import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private baseUrl = `${environment.BACKEND_URL}/assets`;

  constructor(private http: HttpClient) {}

  getImages() {
    return this.http.get(`${this.baseUrl}/images`);
  }

  addImage(imageData: FormData) {
    return this.http.post(`${this.baseUrl}/images`, imageData);
  }

  deleteImage(imageId: string) {
    return this.http.delete(`${this.baseUrl}/images/${imageId}`);
  }

  addVideo(videoData: FormData) {
    return this.http.post(`${this.baseUrl}/video`, videoData);
  }

  getVideo() {
    return this.http.get(`${this.baseUrl}/video`)
  }

}
