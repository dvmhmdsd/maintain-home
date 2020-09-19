import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FeedbacksService {
  private baseUrl = `${environment.BACKEND_URL}/feedbacks`;
  constructor(private http: HttpClient) {}

  getFeedbacks() {
    return this.http.get(`${this.baseUrl}/list`);
  }
}
