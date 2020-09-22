import { OrderVM } from './../orders/order.viewmodel';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private baseUrl = `${environment.BACKEND_URL}/orders`;
  constructor(private http: HttpClient) {}

  createOrder(order: OrderVM) {
    return this.http.post(`${this.baseUrl}/new`, order);
  }
}
