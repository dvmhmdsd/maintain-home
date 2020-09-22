import { ComplaintVM } from './../complaints/complaint.viewmodel';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ComplaintService {
  private baseUrl = `${environment.BACKEND_URL}/complaints`;
  constructor(private http: HttpClient) {}

  sendComplaint(complaint: ComplaintVM) {
    return this.http.post(`${this.baseUrl}/new`, complaint);
  }
}
