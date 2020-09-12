import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {
  private baseUrl = `${environment.BACKEND_URL}/complaints`;

  constructor(private http: HttpClient) {}

  getComplaints() {
    return this.http.get(`${this.baseUrl}/list`);
  }
}
