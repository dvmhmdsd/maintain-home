import { EditOrderVM } from './../viewmodels/edit-order.viewmodel';
import { IOrder } from './../../../../CONSTANTS/interfaces/order.interface';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private baseUrl = `${environment.BACKEND_URL}/orders`;

  constructor(private http: HttpClient) {}

  getOrders() {
    return this.http.get(`${this.baseUrl}/list`)
  }

  getOrderById(orderId: string) {
    return this.http.get(`${this.baseUrl}/list/${orderId}`);
  }

  updateOrder(orderId: string, data: EditOrderVM) {
    return this.http.put(`${this.baseUrl}/${orderId}`, data);
  }
}
