import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private baseUrl = `${environment.BACKEND_URL}/feedbacks`;
  constructor(private http: HttpClient) {}

  sendFeedback(feedback: any) {
    return this.http.post(`${this.baseUrl}/new`, feedback);
  }

}
