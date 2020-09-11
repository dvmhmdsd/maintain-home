import { EditOrderVM } from './../viewmodels/edit-order.viewmodel';
import { OrdersService } from './../services/orders.service';
import { IOrder } from './../../../../CONSTANTS/interfaces/order.interface';
import { OrderStatuses } from './../../../../CONSTANTS/enums/order-statuses.enum';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  isLoadingResults = true;
  isFailed: boolean;
  displayedColumns: string[] = [
    'orderNumber',
    'name',
    'status',
    'createdAt',
    '_id',
  ];
  data: IOrder[] = [];
  orderStatuses = OrderStatuses;
  loading: boolean;
  selectedStatuses = {};

  constructor(private orderService: OrdersService) {}

  ngAfterViewInit(): void {
    this.listOrders();
  }

  listOrders() {
    this.orderService.getOrders().subscribe(
      (res: IOrder[]) => {
        this.isLoadingResults = false;
        this.data = res;
        this.isFailed = false;

        this.data.forEach(
          (order) => (this.selectedStatuses[order._id] = order.status)
        );
      },
      (err) => {
        this.isLoadingResults = false;
        this.isFailed = true;
      }
    );
  }

  ngOnInit(): void {}

  statusChanged(event: any, orderId: string) {
    let editOrderVM = new EditOrderVM();
    editOrderVM.status = event.value;

    this.loading = true;
    this.orderService.updateOrder(orderId, editOrderVM).subscribe(
      (res) => {
        this.selectedStatuses[orderId] = event.value;
      },
      (err) => {
        this.selectedStatuses[orderId] = this.orderStatuses.PENDING;
        alert(
          'حدث خطأ أثناء تحديث حالة الأمر، من فضلك حاول مرة أخري أو قم بالتواصل مع الدعم'
        );
      }
    );
  }
}
